import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { EducationCertificates } from "./components/EducationCertificates";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ChatDrawer } from "./components/ChatDrawer";
import { PortfolioLoader } from "./components/PortfolioLoader";
import { PROJECTS, ALL_SKILLS } from "./data/portfolioData";

function preloadImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve();
      return;
    }
    const img = new Image();
    const finish = () => {
      if (typeof img.decode === "function") {
        img.decode().catch(() => {}).finally(resolve);
      } else {
        resolve();
      }
    };
    img.onload = finish;
    img.onerror = resolve;
    img.src = src;
    if (img.complete) finish();
  });
}

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatOrigin, setChatOrigin] = useState(null);
  const [isDarkBottom, setIsDarkBottom] = useState(true);
  const [isAboutSection, setIsAboutSection] = useState(true);

  const openChatFromEvent = useCallback((event) => {
    const el = event?.currentTarget;
    if (el && typeof el.getBoundingClientRect === "function") {
      const r = el.getBoundingClientRect();
      setChatOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    } else if (event && typeof event.clientX === "number" && event.clientX > 0) {
      setChatOrigin({ x: event.clientX, y: event.clientY });
    } else {
      setChatOrigin(null);
    }
    setChatOpen(true);
  }, []);

  const [portfolioReady, setPortfolioReady] = useState(false);
  const [loaderDismissed, setLoaderDismissed] = useState(false);

  const orbReadyRef = useRef(false);
  const assetsReadyRef = useRef(false);
  const minDelayRef = useRef(false);

  const handleOrbReady = useCallback(() => {
    orbReadyRef.current = true;
  }, []);

  const handleLoaderFinished = useCallback(() => {
    setLoaderDismissed(true);
  }, []);

  // Completely lock scrolling while the full-screen loader is mounted
  // and ensure reloads always start cleanly at the top (#about) section
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    if (loaderDismissed) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevHtmlHeight = html.style.height;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyHeight = body.style.height;
    const prevBodyTouchAction = body.style.touchAction;

    html.style.overflow = "hidden";
    html.style.height = "100%";
    body.style.overflow = "hidden";
    body.style.height = "100%";
    body.style.touchAction = "none";

    window.scrollTo(0, 0);

    return () => {
      html.style.overflow = prevHtmlOverflow;
      html.style.height = prevHtmlHeight;
      body.style.overflow = prevBodyOverflow;
      body.style.height = prevBodyHeight;
      body.style.touchAction = prevBodyTouchAction;
    };
  }, [loaderDismissed]);

  // Fast Token Stream / AI Boot timing (~0.9s boot + ~0.42s G-glide & curtain split < 1.5s total)
  useEffect(() => {
    let cancelled = false;

    const tryComplete = () => {
      if (cancelled) return;
      if (orbReadyRef.current && assetsReadyRef.current && minDelayRef.current) {
        setPortfolioReady(true);
      }
    };

    const minTimer = window.setTimeout(() => {
      minDelayRef.current = true;
      tryComplete();
    }, 900);

    // Guarantee sub-1.5s handoff even on slow third-party CDNs or WebGL warmups
    const failSafeTimer = window.setTimeout(() => {
      if (cancelled) return;
      orbReadyRef.current = true;
      assetsReadyRef.current = true;
      minDelayRef.current = true;
      tryComplete();
    }, 1050);

    const readyPoll = window.setInterval(tryComplete, 40);

    async function loadCriticalResources() {
      const waitWindowLoad =
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

      const waitFonts = document.fonts?.ready
        ? Promise.race([document.fonts.ready.catch(() => {}), new Promise((r) => window.setTimeout(r, 450))])
        : Promise.resolve();

      await Promise.all([waitWindowLoad, waitFonts]);
      if (cancelled) return;

      // Kick off non-blocking preloads for project screenshots & skill icons
      Promise.allSettled(PROJECTS.map((project) => preloadImage(project.screenshot)));
      Promise.allSettled(
        ALL_SKILLS.map((skill) => (skill.iconUrl ? preloadImage(skill.iconUrl) : Promise.resolve())),
      );

      assetsReadyRef.current = true;
      tryComplete();
    }

    loadCriticalResources();

    return () => {
      cancelled = true;
      window.clearTimeout(minTimer);
      window.clearTimeout(failSafeTimer);
      window.clearInterval(readyPoll);
    };
  }, []);

  // Reset scroll to top (#about) & trigger layout recalculation once real portfolio reveals
  useEffect(() => {
    if (!portfolioReady) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    return () => cancelAnimationFrame(raf);
  }, [portfolioReady]);

  // Re-sync scroll & section observers the exact frame scroll-lock lifts after loader exit
  useEffect(() => {
    if (!loaderDismissed) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("resize"));
    });
    return () => cancelAnimationFrame(raf);
  }, [loaderDismissed]);

  // Monitor exact section directly behind the bottom-right chatbot trigger
  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const btn = document.querySelector("[data-floating-chat]");
      const rect = btn?.getBoundingClientRect();
      // Check slightly below button center (~68% down) so theme flips promptly as sections reach the button
      const triggerY =
        rect && rect.height > 0 ? rect.top + rect.height * 0.68 : window.innerHeight - 38;

      const sectionEls = Array.from(
        document.querySelectorAll("#main-content > section"),
      ).reverse();
      const currentAtBtn = sectionEls.find(
        (section) => section.getBoundingClientRect().top <= triggerY,
      );
      const idAtBtn = currentAtBtn?.id ?? "about";

      // Light sections: projects, skills. Dark sections: about, experience, education-certificates, contact.
      const isDark =
        idAtBtn === "about" ||
        idAtBtn === "experience" ||
        idAtBtn === "education-certificates" ||
        idAtBtn === "contact";
      setIsDarkBottom(isDark);

      // Hide the bottom-right floating trigger on Hero (where main CTAs already live);
      // reveal it smoothly once scrolling past Hero into Experience+.
      const heroEl = document.getElementById("about");
      const inAbout = heroEl
        ? heroEl.getBoundingClientRect().bottom > window.innerHeight * 0.55
        : window.scrollY <= 80;
      setIsAboutSection(inAbout);
    };

    const scheduleUpdate = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(scheduleUpdate);
    document.querySelectorAll("#main-content > section").forEach((s) => observer.observe(s));

    update();
    // Run synchronously on scroll so React state updates in the exact frame without rAF lag
    window.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("pageshow", scheduleUpdate);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update, { capture: true });
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050B12] text-[var(--text-primary)] font-sans antialiased relative selection:bg-[#00E5D4]/25 selection:text-[#00E5D4]">
      {/* Fixed Full-Screen Token Stream / AI Boot Reveal (< 1.5s) */}
      {!loaderDismissed && (
        <PortfolioLoader exiting={portfolioReady} onFinished={handleLoaderFinished} />
      )}

      {/* Real Portfolio (hidden behind split dark curtain until boot completes) */}
      <div
        aria-hidden={!portfolioReady}
        className={`transition-opacity duration-300 ease-out ${
          portfolioReady ? "opacity-100" : "opacity-0 pointer-events-none select-none"
        }`}
      >
        {/* Sleek Dynamic Navbar adapting to theme on scroll */}
        <Navbar revealed={portfolioReady} />

        {/* Main Portfolio Narrative Sections */}
        <main id="main-content" className="relative z-10">
          {/* 01. Dark Cyber Hero with 3D Neural SkillOrb */}
          <Hero
            onOpenChat={openChatFromEvent}
            chatOpen={chatOpen}
            onOrbReady={handleOrbReady}
            revealed={portfolioReady}
          />

          {/* 02. Dark Industry Experience Timeline */}
          <Experience />

          {/* 03. Light Ivory Projects with 3D MacBook Pro Mockup */}
          <Projects />

          {/* 04. Light Ivory Tech Stack / Skills Arsenal */}
          <Skills />

          {/* 05. Dark Academic Education & Credentials */}
          <EducationCertificates />

          {/* 06. Dark Contact Section */}
          <Contact />
        </main>

        {/* Minimal Footer */}
        <Footer />

        {/* AI Chatbot Drawer & Dynamic Floating Trigger */}
        <ChatDrawer
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          onOpen={openChatFromEvent}
          origin={chatOrigin}
          isDark={isDarkBottom}
          isAboutSection={isAboutSection}
        />
      </div>
    </div>
  );
}
