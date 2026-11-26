import { useState, useEffect } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import {
  FileText,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Bot,
  ArrowDown,
} from "lucide-react";
import { PROFILE } from "../data/portfolioData";
import { SkillOrb } from "./hero/SkillOrb";
import { GithubIcon, LinkedinIcon } from "./TechIcons";

export function Hero({ onOpenChat, chatOpen = false, onOrbReady, revealed = true }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PROFILE.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const ease = [0.22, 1, 0.36, 1];
  const enterState = revealed ? "visible" : "hidden";
  const revealItem = (delay = 0, y = 16) => ({
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.48, delay, ease },
    },
  });

  return (
    <section
      id="about"
      className="hero relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-12 lg:pt-20 lg:pb-10"
      onPointerMove={(e) => {
        if (chatOpen) return;
        mx.set(e.clientX / window.innerWidth);
        my.set(e.clientY / window.innerHeight);
      }}
      onPointerLeave={(e) => {
        // Do not snap back when moving over floating chat button/drawer overlay
        const rt = e.relatedTarget;
        if (rt instanceof Element && rt.closest("[data-floating-chat]")) return;
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      <div className="grain" />
      <div className="grid-bg" />

      {/* Post-Load Ambient Aurora Bloom */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 1.1, ease }}
        className="pointer-events-none absolute -top-24 left-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,229,212,0.09)_0%,rgba(0,200,255,0.03)_45%,transparent_72%)] blur-3xl"
      />

      <div className="hero-grid relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 items-center">
        {/* Left Column: Staggered Post-Load Editorial Headline & Bio */}
        <div className="content space-y-4 lg:space-y-4 xl:space-y-6">
          {/* Live Status Pill */}
          <motion.div
            initial={false}
            variants={revealItem(0.06, 16)}
            animate={enterState}
            className="status inline-flex items-center gap-2 sm:gap-2.5 max-w-full px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono font-medium border shadow-sm backdrop-blur-md"
          >
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00E5D4] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#00E5D4]" />
            </span>
            <span className="tracking-wider uppercase text-[10px] sm:text-[11px] leading-snug">{PROFILE.status}</span>
          </motion.div>

          {/* Main Name & Title */}
          <motion.div
            initial={false}
            variants={revealItem(0.14, 22)}
            animate={enterState}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[clamp(2.6rem,4.4vw,4.5rem)] font-black font-heading tracking-tight text-[#F1F5F9] leading-[1.05]">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5D4] via-[#00C8FF] to-sky-300">
                {PROFILE.name}
              </span>
            </h1>

            {/* Dynamic Role Rotator */}
            <div className="flex items-center gap-2 font-mono text-base sm:text-xl xl:text-2xl font-bold text-[#A7B3C2]">
              <span className="text-[#00E5D4]">/</span>
              <span className="text-[#F1F5F9] transition-all duration-300">
                {PROFILE.roles[roleIndex]}
              </span>
            </div>
          </motion.div>

          {/* Summary Lede */}
          <motion.p
            initial={false}
            variants={revealItem(0.22, 18)}
            animate={enterState}
            className="lede editorial-copy text-[#CBD5E1] text-[14.5px] sm:text-[16px] xl:text-[17.5px] leading-[1.7] max-w-[56ch] font-normal"
          >
            {PROFILE.summary}
          </motion.p>

          {/* Contact Details & Links Organized in 3 Clean Rows */}
          <div className="space-y-3 pt-1">
            {/* Row 1: Location & Email */}
            <motion.div
              initial={false}
              variants={revealItem(0.3, 16)}
              animate={enterState}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#08131F] border border-[#00E5D4]/15 text-xs text-[#A7B3C2] font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#00E5D4] shrink-0" />
                <span>{PROFILE.location}</span>
              </div>
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-2 max-w-full px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#08131F] border border-[#00E5D4]/15 text-xs text-[#A7B3C2] hover:border-[#00E5D4]/40 hover:text-[#00E5D4] hover:underline underline-offset-4 font-mono transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#00C8FF] shrink-0" />
                <span className="truncate">{PROFILE.email}</span>
              </a>
            </motion.div>

            {/* Row 2: Phone, Resume, GitHub -> LinkedIn (matches Navbar icon order) */}
            <motion.div
              initial={false}
              variants={revealItem(0.36, 16)}
              animate={enterState}
              className="flex flex-wrap items-center gap-2.5"
            >
              <a
                href={`tel:+91${PROFILE.phoneRaw}`}
                aria-label={`Call ${PROFILE.phone}`}
                className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#08131F] border border-[#00E5D4]/15 text-xs text-[#A7B3C2] hover:border-[#00E5D4]/40 hover:text-[#00E5D4] hover:underline underline-offset-4 font-mono transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{PROFILE.phone}</span>
              </a>

              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#08131F] border border-[#00E5D4]/25 hover:border-[#00E5D4]/50 text-xs font-mono font-semibold text-[#00E5D4] hover:bg-[#00E5D4]/10 transition-colors duration-200 whitespace-nowrap"
              >
                <FileText size={13} className="shrink-0" />
                <span>Resume</span>
                <ExternalLink size={11} className="text-[#A7B3C2] shrink-0" />
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-xl bg-[#08131F] border border-[#00E5D4]/15 text-[#A7B3C2] hover:text-[#F1F5F9] hover:border-[#00E5D4]/40 transition-colors flex items-center justify-center shrink-0"
              >
                <GithubIcon className="w-4 h-4" />
                <span className="sr-only">GitHub</span>
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-xl bg-[#08131F] border border-[#00E5D4]/15 text-[#A7B3C2] hover:text-[#00C8FF] hover:border-[#00C8FF]/40 transition-colors flex items-center justify-center shrink-0"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </motion.div>

            {/* Row 3: CTAs (Chat with my Assistant + View Projects) */}
            <motion.div
              initial={false}
              variants={{
                hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.96 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.65, delay: 0.42, ease },
                },
              }}
              animate={enterState}
              className="pt-1.5 xl:pt-2 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={onOpenChat}
                className="inline-flex items-center gap-2.5 whitespace-nowrap px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00E5D4] to-[#00C8FF] text-[#050B12] font-heading font-extrabold text-sm shadow-[0_4px_25px_rgba(0,229,212,0.35)] hover:shadow-[0_6px_35px_rgba(0,229,212,0.5)] hover:scale-105 active:scale-95 transition-[transform,box-shadow] duration-300"
              >
                <Bot size={18} className="text-[#050B12] shrink-0" />
                <span>Chat with my Assistant</span>
                <Sparkles size={14} className="text-[#050B12]/80 animate-pulse shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("projects");
                  if (el) {
                    const navHeight = document.querySelector(".site-nav")?.getBoundingClientRect().height ?? 68;
                    const targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - (navHeight - 1)));
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 whitespace-nowrap px-5 py-3.5 rounded-xl border border-[#00E5D4]/30 hover:border-[#00E5D4] text-[#00E5D4] hover:bg-[#00E5D4]/10 font-mono font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>View Projects</span>
                <ArrowDown size={14} className="text-[#00E5D4]" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Exact 3D Skill Orb from Reference Portfolio (Smooth Post-Load Entrance) */}
        <motion.div
          initial={false}
          animate={
            revealed
              ? { opacity: 1, scale: 1 }
              : prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.92 }
          }
          transition={{ duration: 0.55, delay: 0.08, ease }}
          className="hero-visual w-full flex items-center justify-center overflow-visible"
        >
          <SkillOrb mx={mx} my={my} paused={chatOpen} onOrbReady={onOrbReady} />
        </motion.div>
      </div>
    </section>
  );
}
