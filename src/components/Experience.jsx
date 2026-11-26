import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { INTERNSHIPS } from "../data/portfolioData";

export function Experience() {
  const sectionRef = useRef(null);
  const spineLineRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      rafId = 0;
      const section = sectionRef.current;
      if (!section) return;

      const entries = Array.from(section.querySelectorAll(".experience-entry"));
      if (entries.length === 0) return;

      const first = entries[0];
      const last = entries[entries.length - 1];
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.65;

      // Calculate progress of scroll between first and last entry
      const totalDistance = lastRect.bottom - firstRect.top || 1;
      const currentPassed = triggerY - firstRect.top;
      const progress = Math.min(Math.max(currentPassed / totalDistance, 0), 1);

      if (spineLineRef.current) {
        spineLineRef.current.style.transform = `scaleY(${progress})`;
      }

      // Determine active index
      let currentIdx = 0;
      for (let i = 0; i < entries.length; i++) {
        const rect = entries[i].getBoundingClientRect();
        if (rect.top <= triggerY) {
          currentIdx = i;
        }
      }
      setActiveIdx((prev) => (prev !== currentIdx ? currentIdx : prev));
    };

    const scheduleScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative scroll-mt-24 pt-20 pb-24 sm:pt-28 sm:pb-32 border-t border-[#00E5D4]/15 overflow-hidden"
    >
      {/* Background ambient radial aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(0,229,212,0.06)_0%,transparent_70%)] blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#00E5D4]/15 pb-4 mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00E5D4] font-semibold">
              CAREER TIMELINE
            </span>
            <span className="size-1.5 rounded-full bg-[#00E5D4]" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A7B3C2]">
            INDUSTRY EXPERIENCE
          </span>
        </div>

        {/* Narrative Title */}
        <div className="mb-14 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-[#F1F5F9] uppercase">
            Experience
          </h2>
          <p className="editorial-copy mt-3.5 text-[15px] sm:text-[17px] text-[#CBD5E1]/90 leading-[1.72] max-w-[60ch]">
            Hands-on software and AI engineering across voice pipelines, LLM agent workflows, webhook infrastructure, and full-stack software architectures.
          </p>
        </div>

        {/* Smooth Scroll-Tracking Timeline Architecture */}
        <div className="relative mt-12">
          {/* Static gray track: centered exactly at x = 8px (left 7px + width 2px) */}
          <div
            aria-hidden="true"
            className="absolute bottom-2.5 left-[7px] top-3.5 w-[2px] bg-white/10 opacity-40 rounded-full"
          />

          {/* Dynamic Scroll-drawn vertical timeline line */}
          <div
            ref={spineLineRef}
            aria-hidden="true"
            className="absolute bottom-2.5 left-[7px] top-3.5 w-[2px] origin-top bg-gradient-to-b from-[#00E5D4] via-[#00E5D4] to-[#00C8FF] shadow-[0_0_12px_#00E5D4] rounded-full transition-transform duration-100 ease-out"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-16 sm:space-y-20">
            {INTERNSHIPS.map((item, index) => {
              const isActive = activeIdx === index;
              const isPassed = activeIdx > index;

              return (
                <div
                  key={index}
                  className="experience-entry relative pl-8 sm:pl-10 group"
                >
                  {/* Node dot on timeline: size-4 (16px) with left-0 centers exactly at 8px on the track! */}
                  <div
                    className={`timeline-dot absolute left-0 top-1.5 flex size-4 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? "border-[#00E5D4] bg-[#050B12] shadow-[0_0_14px_rgba(0,229,212,0.8)] scale-110 ring-2 ring-[#00E5D4]/30"
                        : isPassed
                          ? "border-[#00E5D4] bg-[#00E5D4]/20 shadow-[0_0_8px_rgba(0,229,212,0.35)]"
                          : "border-white/20 bg-[#08131F] opacity-50"
                    }`}
                  >
                    <div
                      className={`size-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#00E5D4] animate-ping"
                          : isPassed
                            ? "bg-[#00E5D4]"
                            : "bg-[#A7B3C2]"
                      }`}
                    />
                    {(isActive || isPassed) && (
                      <div className="absolute size-2 rounded-full bg-[#00E5D4]" />
                    )}
                  </div>

                  {/* Experience Card */}
                  <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-[#08131F]/90 border border-[#00E5D4]/15 hover:border-[#00E5D4]/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-300 backdrop-blur-xl">
                    {/* Architectural outlined watermark number (01, 02...) matching Projects section & Cyber theme */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-5 sm:right-8 bottom-1 sm:bottom-2 select-none font-heading font-black leading-none tracking-[-0.06em] text-[6.5rem] sm:text-[8.5rem] lg:text-[10rem] transition-[transform,opacity] duration-500 ease-out group-hover:translate-y-[-2px]"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: isActive
                          ? "1.5px rgba(0, 229, 212, 0.24)"
                          : "1.5px rgba(0, 229, 212, 0.11)",
                        zIndex: 0,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#00E5D4]/15">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F1F5F9] group-hover:text-[#00E5D4] transition-colors">
                            {item.company}
                          </h3>
                          {item.current && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#00E5D4]/15 text-[#00E5D4] border border-[#00E5D4]/30">
                              ACTIVE ROLE
                            </span>
                          )}
                        </div>
                        <p className="text-[#00E5D4] font-mono text-sm font-medium mt-1">
                          {item.role}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#A7B3C2]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#050B12] border border-[#00E5D4]/15">
                          <Calendar size={13} className="text-[#00E5D4]" />
                          <span>{item.period}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#050B12] border border-[#00E5D4]/15">
                          <MapPin size={13} className="text-[#00C8FF]" />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Key Responsibilities */}
                    <ul className="relative z-10 mt-5 space-y-3.5 max-w-[78ch]">
                      {item.responsibilities.map((resp, rIdx) => (
                        <li
                          key={rIdx}
                          className="editorial-copy flex items-start gap-3 text-[14px] sm:text-[15.5px] text-[#CBD5E1]/95 leading-[1.72]"
                        >
                          <span className="size-1.5 rounded-full bg-[#00E5D4] mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Pills */}
                    <div className="relative z-10 mt-6 pt-5 border-t border-[#00E5D4]/10 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7B3C2] mr-1">
                        TECH:
                      </span>
                      {item.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#050B12] text-[#E2E8F0] border border-[#00E5D4]/15 hover:border-[#00E5D4]/40 hover:text-[#00E5D4] transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
