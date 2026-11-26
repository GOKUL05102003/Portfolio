import { useState, useEffect } from "react";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data/portfolioData";
import { GithubIcon, LinkedinIcon } from "./TechIcons";

const NAV_ITEMS = [
  { label: "ABOUT", id: "about" },
  { label: "EXPERIENCE", id: "experience" },
  { label: "PROJECTS", id: "projects" },
  { label: "SKILLS", id: "skills" },
  { label: "EDUCATION & CREDENTIALS", id: "education-certificates" },
  { label: "CONTACT", id: "contact" },
];

export function Navbar({ revealed = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!revealed || window.scrollY <= 10) {
        setScrolled(false);
        setActiveSection("about");
        setDark(true);
        return;
      }

      const sections = Array.from(
        document.querySelectorAll("#main-content > section"),
      ).reverse();
      // Theme switches the moment the section touches the bottom edge of the navbar
      const navEl = document.querySelector(".site-nav");
      const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 68;
      const currentForTheme = sections.find(
        (section) => section.getBoundingClientRect().top <= navBottom + 2,
      );
      const themeId = currentForTheme?.id ?? "about";

      // Active link tracks reading threshold & recognizes bottom-of-page (#contact)
      // Only check atBottom when document is unlocked & actually taller than viewport
      const docHeight = document.documentElement.scrollHeight;
      const isUnlockedMultiScreen = docHeight > window.innerHeight + 120;
      const atBottom =
        isUnlockedMultiScreen &&
        window.scrollY > 100 &&
        window.innerHeight + Math.ceil(window.scrollY) >= docHeight - 40;
      const currentForNav = atBottom
        ? sections[0]
        : sections.find((section) => section.getBoundingClientRect().top <= navBottom + 64);
      const activeId = currentForNav?.id ?? "about";
      const isScrolled = window.scrollY > 10;

      setScrolled(isScrolled);
      setActiveSection(activeId);
      // Dark sections: about (hero), experience, education-certificates, contact
      // Light sections: projects, skills
      const isDarkSection =
        !isScrolled ||
        themeId === "about" ||
        themeId === "experience" ||
        themeId === "education-certificates" ||
        themeId === "contact";
      setDark(isDarkSection);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true, capture: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("pageshow", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate, { capture: true });
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, [revealed]);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    // Wait one animation frame so mobile drawer collapse never cancels smooth scroll
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if (id === "about") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const navHeight = document.querySelector(".site-nav")?.getBoundingClientRect().height ?? 68;
      // Land each section flush under the navbar so no previous-section strip appears
      // and the navbar theme immediately matches the target section.
      const offset = navHeight - 1;
      const targetY = Math.max(
        0,
        Math.round(el.getBoundingClientRect().top + window.scrollY - offset),
      );
      window.scrollTo({ top: targetY, behavior: "smooth" });
    });
  };

  const isDark = dark;

  return (
    <header
      className={`site-nav fixed top-0 left-0 right-0 z-40 transition-opacity duration-500 ease-out ${
        revealed ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      data-nav-elevated={scrolled}
      data-nav-theme={isDark ? "dark" : "light"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-3 transition-colors duration-300">
        {/* Brand Logo without any extra dot */}
        <button
          onClick={() => scrollTo("about")}
          className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none shrink-0"
        >
          <div
            data-nav-brand-g="true"
            className={`relative size-9 sm:size-10 rounded-[13px] border flex items-center justify-center font-black text-base sm:text-lg transition-all duration-300 shrink-0 ${isDark
              ? "bg-[#08131F] border-[#00E5D4]/60 text-[#00E5D4] shadow-[0_0_15px_rgba(0,229,212,0.2)] group-hover:border-[#00E5D4]"
              : "bg-[#DFDBD1] border-black/15 text-[#008B8B] shadow-sm group-hover:border-[#008B8B]"
              }`}
          >
            <span className={isDark ? "bg-gradient-to-br from-[#00E5D4] to-[#00C8FF] bg-clip-text text-transparent" : "text-[#008B8B]"}>
              G
            </span>
          </div>

          <div className="flex flex-col whitespace-nowrap">
            <span
              className={`font-heading font-extrabold text-sm sm:text-base tracking-tight transition-colors ${isDark ? "text-[#F1F5F9] group-hover:text-[#00E5D4]" : "text-[#111111] group-hover:text-[#008B8B]"
                }`}
            >
              {PROFILE.name}
            </span>
            <span
              className={`font-mono text-[8px] xl:text-[9px] uppercase tracking-[0.1em] xl:tracking-[0.16em] transition-colors ${isDark ? "text-[#A7B3C2]" : "text-[#77716A]"
                }`}
            >
              AI Engineer &amp; Software Developer
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 shrink-0">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative py-1 whitespace-nowrap font-mono text-[10px] xl:text-[11px] uppercase tracking-[0.1em] xl:tracking-[0.16em] transition-colors duration-200 ${isActive
                  ? isDark
                    ? "text-[#00E5D4] font-semibold"
                    : "text-[#008B8B] font-bold"
                  : isDark
                    ? "text-[#A7B3C2] hover:text-[#F1F5F9]"
                    : "text-[#55514B] hover:text-[#111111]"
                  }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0"
                    } ${isDark ? "bg-gradient-to-r from-[#00E5D4] to-[#00C8FF]" : "bg-[#008B8B]"}`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
          {/* Social Links (GitHub -> LinkedIn) */}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`p-2 rounded-xl border hover:-translate-y-0.5 transition-[transform,color,border-color] duration-200 shrink-0 ${isDark
              ? "bg-[#0B1824] border-[#00E5D4]/15 text-[#A7B3C2] hover:text-[#F1F5F9] hover:border-[#00E5D4]/40"
              : "bg-[#DFDBD1] border-black/10 text-[#55514B] hover:text-[#111111] hover:border-black/30"
              }`}
          >
            <GithubIcon className="w-4 h-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`p-2 rounded-xl border hover:-translate-y-0.5 transition-[transform,color,border-color] duration-200 shrink-0 ${isDark
              ? "bg-[#0B1824] border-[#00E5D4]/15 text-[#A7B3C2] hover:text-[#00C8FF] hover:border-[#00C8FF]/40"
              : "bg-[#DFDBD1] border-black/10 text-[#55514B] hover:text-[#008B8B] hover:border-[#008B8B]/40"
              }`}
          >
            <LinkedinIcon className="w-4 h-4" />
            <span className="sr-only">LinkedIn</span>
          </a>

          {/* Resume CTA */}
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 px-3 xl:px-3.5 py-2 rounded-xl text-xs font-semibold border hover:scale-105 active:scale-95 transition-[transform,background-color,border-color] duration-200 shadow-sm ${isDark
              ? "bg-[#0B1824] border-[#00E5D4]/30 text-[#00E5D4] hover:bg-[#00E5D4]/10 hover:border-[#00E5D4]"
              : "bg-[#DFDBD1] border-[#008B8B]/30 text-[#008B8B] hover:bg-[#008B8B]/10 hover:border-[#008B8B]"
              }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span className="font-mono uppercase tracking-wider text-[11px]">Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 shrink-0" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            className={`lg:hidden p-2 rounded-xl border transition-colors ${isDark
              ? "bg-[#0B1824] border-[#00E5D4]/20 text-[#A7B3C2] hover:text-[#F1F5F9]"
              : "bg-[#DFDBD1] border-black/15 text-[#55514B] hover:text-[#111111]"
              }`}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-5 space-y-3 shadow-2xl backdrop-blur-2xl transition-colors ${isDark ? "bg-[#08131F]/[0.97] border-[#00E5D4]/20" : "bg-[#F3F1EB]/[0.97] border-black/10"
            }`}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-left py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${activeSection === item.id
                ? isDark
                  ? "text-[#00E5D4] font-bold"
                  : "text-[#008B8B] font-bold"
                : isDark
                  ? "text-[#A7B3C2] hover:text-[#F1F5F9]"
                  : "text-[#55514B] hover:text-[#111111]"
                }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-[var(--border-color)] flex flex-col gap-2.5">
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] text-[var(--accent)] text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <FileText size={14} />
              <span>Download Resume</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
