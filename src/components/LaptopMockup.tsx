import { useEffect, useMemo, useState } from "react";
import { Lock, RotateCw, ChevronLeft, ChevronRight, Wifi, BatteryFull, Search } from "lucide-react";
import { type ProjectItem } from "../data/portfolioData";

export interface LaptopMockupProps {
  project?: ProjectItem;
  projects?: ProjectItem[];
  activeProjectIndex?: number;
  lidAngle?: number;
  openProgress?: number;
  mouseTilt?: { x: number; y: number };
  className?: string;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/**
 * Silver MacBook Pro–style 3D Laptop Mockup (Fixed 90° upright showcase)
 */
export function LaptopMockup({
  project,
  projects,
  activeProjectIndex = 0,
  lidAngle = 0,
  openProgress = 1,
  mouseTilt = { x: 0, y: 0 },
  className = "",
}: LaptopMockupProps) {
  const [failedShots, setFailedShots] = useState<Record<string, boolean>>({});
  const currentProject = project ?? (projects ? projects[activeProjectIndex] : undefined);

  const displayList = useMemo(
    () => (projects ?? (currentProject ? [currentProject] : [])),
    [projects, currentProject],
  );

  // Pre-decode project screenshots ahead of scroll transitions so frames swap with zero stutter
  useEffect(() => {
    displayList.forEach((p) => {
      if (!p.screenshot) return;
      const img = new Image();
      img.src = p.screenshot;
      if (typeof img.decode === "function") {
        img.decode().catch(() => {});
      }
    });
  }, [displayList]);

  if (!currentProject) return null;

  const open = clamp01(openProgress);
  const parallaxWeight = smoothstep(0.7, 1, open);
  const parallaxY = mouseTilt.x * 6 * parallaxWeight;
  const parallaxX = -mouseTilt.y * 4 * parallaxWeight;
  const effectiveAngle = lidAngle + parallaxX;

  const url = currentProject.liveDemo
    ? currentProject.liveDemo.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${currentProject.id}.app`;

  return (
    <div
      className={`laptop-mockup-wrapper relative w-full select-none ${className}`}
      style={{ perspective: "2200px", perspectiveOrigin: "50% 85%" }}
    >
      {/* ── Chassis (lid + hinge + base + shadow share one box) ── */}
      <div
        className="laptop-chassis relative mx-auto w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `translateY(${(1 - open) * 28}px) scale(${0.95 + open * 0.05})`,
          willChange: "transform",
        }}
      >
        {/* ── Lid ───────────────────────────────────── */}
        <div
          data-laptop-lid
          className="relative mx-auto w-[86%] origin-bottom"
          style={{
            transform: `rotateX(${effectiveAngle}deg) rotateY(${parallaxY}deg)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Aluminium outer edge */}
          <div
            className="relative rounded-[16px] sm:rounded-[22px] p-[2px] sm:p-[3px]"
            style={{
              background: "linear-gradient(180deg, #e4e6ea 0%, #b8bbc2 45%, #9a9da4 100%)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset",
            }}
          >
            {/* Black glass bezel */}
            <div className="relative rounded-[14px] sm:rounded-[19px] bg-[#060607] p-[1.4%] ring-1 ring-black/60">
              {/* Camera notch */}
              <div className="absolute inset-x-0 top-0 z-30 mx-auto flex h-[12px] sm:h-[17px] w-[16%] items-center justify-center rounded-b-[8px] sm:rounded-b-[10px] bg-[#060607]">
                <div className="h-[5px] w-[5px] rounded-full bg-[#14202e] ring-1 ring-[#1d2838]" />
              </div>

              {/* Display */}
              <div className="relative flex aspect-[16/10] w-full flex-col overflow-hidden rounded-[6px] sm:rounded-[9px] bg-white">
                {/* macOS menu bar (sits beside the notch, like a real MacBook) */}
                <div className="flex h-[12px] sm:h-[17px] shrink-0 items-center justify-between bg-[#ececee] px-2.5 sm:px-3.5 text-[#1d1d1f]">
                  <div className="flex items-center gap-2.5 text-[7px] sm:text-[9px] font-medium">
                    <span className="text-[9px] sm:text-[11px] leading-none"></span>
                    <span className="font-semibold">Safari</span>
                    <span className="hidden sm:inline opacity-80">File</span>
                    <span className="hidden sm:inline opacity-80">Edit</span>
                    <span className="hidden md:inline opacity-80">View</span>
                  </div>
                  <div className="flex items-center gap-2 text-[7px] sm:text-[9px] opacity-80">
                    <Wifi size={9} />
                    <BatteryFull size={11} />
                    <Search size={8} className="hidden sm:block" />
                  </div>
                </div>

                {/* Safari toolbar */}
                <div className="flex h-[22px] sm:h-[30px] shrink-0 items-center gap-2 sm:gap-3 border-b border-black/[0.07] bg-[#f6f6f7] px-2.5 sm:px-3.5">
                  <div className="flex items-center gap-[5px]">
                    <span className="h-[7px] w-[7px] sm:h-[9px] sm:w-[9px] rounded-full bg-[#ff5f57]" />
                    <span className="h-[7px] w-[7px] sm:h-[9px] sm:w-[9px] rounded-full bg-[#febc2e]" />
                    <span className="h-[7px] w-[7px] sm:h-[9px] sm:w-[9px] rounded-full bg-[#28c840]" />
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-black/35">
                    <ChevronLeft size={12} />
                    <ChevronRight size={12} />
                  </div>
                  <div className="mx-auto flex min-w-0 max-w-[55%] flex-1 items-center justify-center gap-1.5 rounded-md bg-black/[0.05] px-3 py-[3px]">
                    <Lock size={8} className="shrink-0 text-black/40" />
                    <span className="truncate font-mono text-[8px] sm:text-[10px] text-black/60">
                      {url}
                    </span>
                    <RotateCw size={8} className="ml-auto hidden sm:block shrink-0 text-black/30" />
                  </div>
                  <span className="rounded-full bg-[var(--accent-soft)] px-2 py-[2px] font-mono text-[7px] sm:text-[8px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                    {currentProject.liveDemo ? "Live" : "Case Study"}
                  </span>
                </div>

                {/* Screenshot stack with graceful error fallback */}
                <div className="relative min-h-0 flex-1 bg-[#0B111A] overflow-hidden">
                  {displayList.map((p) => {
                    const isActive = p.id === currentProject.id;
                    const shotFailed = Boolean(failedShots[p.id]);
                    if (shotFailed) {
                      return (
                        <div
                          key={p.id}
                          aria-hidden={!isActive}
                          style={{
                            transition:
                              "opacity 480ms cubic-bezier(0.22, 1, 0.36, 1), transform 540ms cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                          className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#071521] via-[#0B111A] to-[#050B12] ${
                            isActive
                              ? "opacity-100 scale-100 z-10"
                              : "opacity-0 scale-[1.015] pointer-events-none z-0"
                          }`}
                        >
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00E5D4] mb-2">
                            {p.category}
                          </span>
                          <h4 className="font-heading text-base sm:text-xl font-bold text-[#F1F5F9]">
                            {p.title}
                          </h4>
                          <p className="mt-1.5 text-xs text-[#A7B3C2] max-w-md">{p.tagline}</p>
                        </div>
                      );
                    }
                    return (
                      <img
                        key={p.id}
                        src={p.screenshot}
                        alt={`${p.title} — screenshot`}
                        width={1280}
                        height={800}
                        srcSet={
                          p.screenshotSmall
                            ? `${p.screenshotSmall} 640w, ${p.screenshot} 1280w`
                            : undefined
                        }
                        sizes="(max-width: 639px) 74vw, (max-width: 1023px) 62vw, 640px"
                        loading="eager"
                        decoding="sync"
                        onError={() =>
                          setFailedShots((prev) => ({ ...prev, [p.id]: true }))
                        }
                        aria-hidden={!isActive}
                        style={{
                          transition:
                            "opacity 480ms cubic-bezier(0.22, 1, 0.36, 1), transform 540ms cubic-bezier(0.22, 1, 0.36, 1)",
                          willChange: "opacity, transform",
                        }}
                        className={`absolute inset-0 block h-full w-full object-cover object-top ${
                          isActive
                            ? "opacity-100 scale-100 z-10"
                            : "opacity-0 scale-[1.015] pointer-events-none z-0"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Hinge ───────────────────────────────────── */}
        <div
          className="relative z-10 mx-auto h-[5px] sm:h-[7px] w-[78%] rounded-b-[3px]"
          style={{ background: "linear-gradient(180deg, #2a2b2f 0%, #45474d 55%, #1c1d20 100%)" }}
        />

        {/* ── Aluminium base ──────────────────────────── */}
        <div
          className="relative z-20 mx-auto -mt-[1px] h-[12px] sm:h-[17px] w-full rounded-t-[3px] rounded-b-[14px] sm:rounded-b-[22px]"
          style={{
            background:
              "linear-gradient(180deg, #f3f4f6 0%, #d5d7dc 28%, #b3b6bc 70%, #8e9198 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -2px 3px rgba(0,0,0,0.18)",
          }}
        >
          {/* Thumb scoop */}
          <div
            className="absolute inset-x-0 top-0 mx-auto h-[45%] w-[15%] rounded-b-[10px]"
            style={{
              background: "linear-gradient(180deg, #a7aab0 0%, #c9cbd0 100%)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.25)",
            }}
          />
          {/* Rubber feet */}
          <span className="absolute -bottom-[2px] left-[9%] h-[3px] w-[5%] rounded-full bg-[#2a2b2e]/70" />
          <span className="absolute -bottom-[2px] right-[9%] h-[3px] w-[5%] rounded-full bg-[#2a2b2e]/70" />
        </div>

        {/* ── Shadows: anchored to the base, centred, no transform conflicts ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[3%] -bottom-[6px] h-[10px] rounded-[50%] blur-[4px]"
          style={{ background: "rgba(0,0,0,0.35)", opacity: 0.5 + open * 0.5 }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-[4%] -bottom-[34px] h-[48px] blur-[18px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.12) 45%, transparent 72%)",
            opacity: 0.35 + open * 0.65,
          }}
        />
      </div>
    </div>
  );
}
