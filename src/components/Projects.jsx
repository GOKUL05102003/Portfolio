import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MousePointer2,
} from "lucide-react";
import { PROJECTS } from "../data/portfolioData";
import { LaptopMockup } from "./LaptopMockup";
import { useMediaQuery } from "../hooks/use-media-query";
import { useVisible } from "../hooks/use-visible";

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const showcaseQuery =
  "(min-width: 1024px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)";

function projectScrollDistance(track, stage) {
  return Math.max(1, track.clientHeight - stage.clientHeight);
}

/* ────────────────────────────────────────────────────────────
   Desktop: pinned scroll-driven 3D laptop showcase
   ──────────────────────────────────────────────────────────── */
function DesktopShowcase({ active, enabled, onChange }) {
  const N = PROJECTS.length;
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(null);
  const tabFillRefs = useRef([]);

  const visible = useVisible(trackRef, "200px", enabled);

  useEffect(() => {
    if (!enabled || !visible) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;

      const { top } = track.getBoundingClientRect();

      // Active project stepping cleanly across the pinned track
      const projectTravel = projectScrollDistance(track, stage);
      const rawPosition = projectTravel > 0 ? clamp(-top / projectTravel) * (N - 1) : 0;
      const currentProject = Math.min(Math.max(0, N - 2), Math.floor(rawPosition));
      const transition = clamp((rawPosition - currentProject - 0.25) / 0.5);
      const position = currentProject + transition * transition * (3 - 2 * transition);

      const nextActive = clamp(Math.round(position), 0, N - 1);
      onChange(nextActive);

      // Update vertical rail meter fills
      tabFillRefs.current.forEach((fill, index) => {
        if (fill) {
          fill.style.transform = `scaleY(${clamp(1 - Math.abs(position - index))})`;
        }
      });

      // Update bottom horizontal progress line
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${N > 1 ? position / (N - 1) : 1})`;
      }
    };

    const scheduleMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    return () => {
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      cancelAnimationFrame(frame);
    };
  }, [N, enabled, onChange, visible]);

  const goTo = useCallback(
    (i) => {
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      const idx = clamp(i, 0, N - 1);
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const projectTravel = projectScrollDistance(track, stage);
      const target = trackTop + (N > 1 ? (idx / (N - 1)) * projectTravel : 0);
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [N],
  );

  const project = PROJECTS[clamp(active, 0, N - 1)] ?? PROJECTS[0];

  return (
    <div
      ref={trackRef}
      className="work-showcase relative"
      style={{ height: `calc(${100 + Math.max(0, N - 1) * 75}svh)` }}
    >
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-between">
        {/* Subtle dynamic GPU-composited background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[20%] left-[35%] h-[500px] w-[500px] rounded-full blur-[120px] transition-transform duration-1000 ease-out will-change-transform"
          style={{
            background: "radial-gradient(circle, rgba(0, 139, 139, 0.08), transparent 70%)",
            transform:
              active % 2 === 0 ? "translate3d(20%, 0%, 0)" : "translate3d(0%, 25%, 0)",
          }}
        />

        <div className="work-stage-layout relative mx-auto flex h-full w-full max-w-7xl flex-col px-6 lg:px-10 pt-20 pb-5 z-10 justify-between">
          {/* ── Giant outlined project number positioned at bottom right ── */}
          <span
            key={`num-${active}`}
            aria-hidden="true"
            className="work-stage-number pointer-events-none absolute right-4 xl:right-8 bottom-3 select-none font-heading font-black leading-none tracking-[-0.06em] text-[13rem] xl:text-[18rem] text-right"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(0, 0, 0, 0.08)",
              zIndex: 0,
            }}
          >
            {project.number}
          </span>

          {/* ── Section Header ── */}
          <div className="flex items-center justify-between border-b border-black/10 pb-4 z-10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#008B8B] font-bold">
                PROJECTS
              </span>
              <span className="size-1.5 rounded-full bg-[#008B8B]" />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tabular-nums text-[#111111]">
                <span className="font-bold text-[#008B8B]">{project.number}</span>
                <span className="text-[#77716A]"> / {String(N).padStart(2, "0")}</span>
              </span>
            </div>
          </div>

          {/* ── Main Stage Grid: Rail + Narrative + 3D Laptop ── */}
          <div className="work-stage-project grid min-h-0 flex-1 grid-cols-12 items-center gap-6 xl:gap-10 py-3 z-10">
            {/* 1. Left Vertical Project Rail Spine */}
            <nav
              aria-label="Projects rail"
              className="work-stage-rail col-span-1 flex h-full flex-col items-center justify-center gap-2.5 z-10"
            >
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                className="grid size-8 place-items-center rounded-full border border-black/15 text-[#77716A] transition-all hover:border-[#008B8B] hover:text-[#008B8B] hover:bg-white disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronUp size={15} />
              </button>

              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show project ${p.number}: ${p.title}`}
                  aria-current={active === i}
                  className="group/tab flex flex-col items-center gap-1.5 py-1 focus:outline-none"
                >
                  <span
                    className={`font-mono text-[11px] font-bold tabular-nums transition-colors duration-200 ${
                      active === i
                        ? "text-[#008B8B]"
                        : "text-[#77716A] group-hover/tab:text-[#111111]"
                    }`}
                  >
                    {p.number}
                  </span>
                  <span className="work-stage-rail-meter relative h-12 w-[2px] overflow-hidden rounded-full bg-black/10">
                    <span
                      ref={(el) => {
                        tabFillRefs.current[i] = el;
                      }}
                      className="absolute inset-0 origin-top bg-[#008B8B] transition-transform duration-75"
                      style={{ transform: `scaleY(${i === 0 ? 1 : 0})` }}
                    />
                  </span>
                </button>
              ))}

              <button
                type="button"
                aria-label="Next project"
                onClick={() => goTo(active + 1)}
                disabled={active === N - 1}
                className="grid size-8 place-items-center rounded-full border border-black/15 text-[#77716A] transition-all hover:border-[#008B8B] hover:text-[#008B8B] hover:bg-white disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronDown size={15} />
              </button>
            </nav>

            {/* 2. Center-Left: Project Editorial Details */}
            <div
              key={`details-${active}`}
              className="work-stage-details col-span-4 flex min-w-0 flex-col justify-center pr-3 z-10"
            >
              <span className="work-in font-mono text-xs font-bold tracking-[0.22em] text-[#008B8B] uppercase">
                PROJECT {project.number}
              </span>

              <h3 className="work-in mt-2 text-2xl sm:text-3xl xl:text-[2.25rem] font-black font-heading tracking-tight text-[#111111] uppercase leading-[1.1]">
                {project.title}
              </h3>

              <div className="work-in mt-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#008B8B]/30 bg-[#008B8B]/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#008B8B]">
                  <span className="size-1.5 rounded-full bg-[#008B8B] animate-pulse" />
                  <span>{project.category}</span>
                </span>
              </div>

              <p className="editorial-copy work-in mt-3 text-[15px] sm:text-[15.5px] text-[#3F3B36] leading-[1.72] max-w-[44ch]">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="work-in mt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#77716A] block mb-1.5">
                  STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-black/10 bg-white px-2.5 py-1 font-mono text-[11px] text-[#55514B] shadow-sm hover:border-[#008B8B] hover:text-[#008B8B] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="work-stage-actions work-in mt-5 pt-4 border-t border-black/10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-black/15 font-mono text-xs font-bold uppercase tracking-wider text-[#111111] hover:bg-[#008B8B] hover:text-white hover:border-[#008B8B] hover:shadow-md transition-all duration-300"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GITHUB REPO</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* 3. Right: 3D Laptop Mockup (Solid, No Mouse Tilt) */}
            <div className="col-span-7 flex h-full items-center justify-center relative z-10">
              <div className="work-stage-mockup w-full max-w-[840px] pb-4">
                <LaptopMockup
                  projects={PROJECTS}
                  activeProjectIndex={active}
                  openProgress={1}
                  lidAngle={0}
                  mouseTilt={{ x: 0, y: 0 }}
                />
              </div>
            </div>
          </div>

          {/* ── Footer Progress Bar ── */}
          <div className="border-t border-black/10 pt-3 pb-1 flex items-center justify-between gap-6 z-10 relative">
            <span className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#77716A] shrink-0">
              <MousePointer2 size={12} className="text-[#008B8B]" />
              {active < N - 1 ? "SCROLL TO EXPLORE" : "LAST PROJECT"}
            </span>

            <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-black/10">
              <div
                ref={progressRef}
                className="absolute inset-0 origin-left bg-[#008B8B]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Mobile / tablet: swipeable snap carousel
   ──────────────────────────────────────────────────────────── */
function MobileCarousel({ active, enabled, onChange }) {
  const scrollerRef = useRef(null);
  const N = PROJECTS.length;

  const goTo = useCallback((index, behavior = "smooth") => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[index];
    if (!scroller || !card) return;
    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2,
      behavior,
    });
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!enabled || !scroller) return;

    const onScroll = () => {
      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let bestIndex = 0;
      let bestDistance = Infinity;
      Array.from(scroller.children).forEach((element, index) => {
        const card = element;
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (distance < bestDistance) {
          bestIndex = index;
          bestDistance = distance;
        }
      });
      onChange(bestIndex);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [enabled, onChange]);

  return (
    <div className="work-carousel py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto border-b border-black/10 pb-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#008B8B] font-bold">
              PROJECTS
            </span>
            <span className="size-1.5 rounded-full bg-[#008B8B]" />
          </div>
          <span className="font-mono text-xs tabular-nums text-[#111111]">
            <span className="font-bold text-[#008B8B]">{PROJECTS[active]?.number}</span>
            <span className="text-[#77716A]"> / {String(N).padStart(2, "0")}</span>
          </span>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto py-4 scroll-px-4"
      >
        {PROJECTS.map((p, i) => (
          <article
            key={p.id}
            data-active={active === i ? "" : undefined}
            className={`group shrink-0 snap-center w-[88%] sm:w-[75%] rounded-2xl border bg-white p-4 sm:p-6 transition-[transform,opacity,border-color,box-shadow] duration-300 ease-out ${
              active === i
                ? "border-[#008B8B]/50 shadow-[0_14px_38px_-8px_rgba(0,0,0,0.12)] ring-1 ring-[#008B8B]/25 scale-100"
                : "border-black/10 shadow-sm opacity-85 scale-[0.98]"
            }`}
          >
            <div className="pb-2">
              <LaptopMockup project={p} openProgress={1} lidAngle={0} />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold tracking-wider text-[#008B8B]">
                PROJECT {p.number}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#77716A]">
                {p.category}
              </span>
            </div>

            <h3 className="mt-2 text-xl sm:text-2xl font-bold font-heading uppercase text-[#111111]">
              {p.title}
            </h3>

            <p className="editorial-copy mt-2.5 text-[14.5px] sm:text-[15px] text-[#3F3B36] leading-[1.7]">
              {p.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-black/10 bg-[#F3F1EB] px-2 py-0.5 font-mono text-[10px] text-[#55514B]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-black/10">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F3F1EB] border border-black/15 font-mono text-xs font-bold uppercase tracking-wider text-[#111111] hover:bg-[#008B8B] hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#77716A]">Swipe to explore</span>
          <div className="flex items-center gap-1.5">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Go to project ${p.number}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? "w-6 bg-[#008B8B]" : "w-2 bg-black/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={active === 0}
            className="grid size-9 place-items-center rounded-full border border-black/15 text-[#111111] disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => goTo(Math.min(N - 1, active + 1))}
            disabled={active === N - 1}
            className="grid size-9 place-items-center rounded-full border border-black/15 text-[#111111] disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const showcase = useMediaQuery(showcaseQuery);
  const [active, setActive] = useState(0);

  return (
    <section id="projects" className="relative scroll-mt-16 bg-[#F3F1EB] text-[#111111] border-t border-black/10">
      <DesktopShowcase enabled={showcase} active={active} onChange={setActive} />
      <MobileCarousel enabled={!showcase} active={active} onChange={setActive} />
    </section>
  );
}
