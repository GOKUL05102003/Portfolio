import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TARGET_NAME = "GOKUL R";
const CIPHER_POOL = "#@9$k!_&7X%q2*mV^";

interface PortfolioLoaderProps {
  exiting: boolean;
  onFinished: () => void;
}

/**
 * Fast "Token Stream / AI Boot" Reveal (< 1.5s):
 * 0.0s - 0.4s: Cyan terminal cursor blinks once and cipher-scrambles into GOKUL R
 * 0.4s - 0.9s: Thin cyan progress line sweeps left-to-right, lighting up AI ENGINEER & SOFTWARE DEVELOPER
 * 0.9s - 1.3s: "G" scales & glides smoothly to the top-left navbar G badge as the dark curtain splits open
 */
export function PortfolioLoader({ exiting, onFinished }: PortfolioLoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<"blink" | "decode" | "sweep">(() =>
    prefersReducedMotion ? "sweep" : "blink",
  );
  const [chars, setChars] = useState<string[]>(() =>
    prefersReducedMotion ? TARGET_NAME.split("") : "#G9@k!_".split(""),
  );
  const [lockedCount, setLockedCount] = useState(() =>
    prefersReducedMotion ? TARGET_NAME.length : 0,
  );
  const gRef = useRef<HTMLSpanElement>(null);

  // Stage 1 & 2 choreography (0.0s -> 0.4s cipher decode, 0.4s -> 0.9s cyan progress sweep)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let intervalId = 0;
    const blinkTimer = window.setTimeout(() => {
      setStage("decode");
      let step = 0;
      const totalSteps = 10; // ~280ms decode after 120ms blink => ~400ms total

      intervalId = window.setInterval(() => {
        step += 1;
        const resolved = Math.floor((step / totalSteps) * TARGET_NAME.length);
        setLockedCount(resolved);
        setChars(
          TARGET_NAME.split("").map((ch, idx) => {
            if (idx < resolved || ch === " ") return ch;
            const randIdx = (idx * 7 + step * 3 + Math.floor(Math.random() * 11)) % CIPHER_POOL.length;
            return CIPHER_POOL[randIdx];
          }),
        );

        if (step >= totalSteps) {
          window.clearInterval(intervalId);
          setLockedCount(TARGET_NAME.length);
          setChars(TARGET_NAME.split(""));
          setStage("sweep");
        }
      }, 28);
    }, 120);

    return () => {
      window.clearTimeout(blinkTimer);
      window.clearInterval(intervalId);
    };
  }, [prefersReducedMotion]);

  // Stage 3 choreography (0.9s -> 1.34s): glide "G" into the top-left navbar badge & open split curtains
  useEffect(() => {
    if (!exiting) return;

    if (!prefersReducedMotion) {
      const raf = requestAnimationFrame(() => {
        const gEl = gRef.current;
        const navBadge = document.querySelector("[data-nav-brand-g]");
        if (gEl && navBadge) {
          const from = gEl.getBoundingClientRect();
          const to = navBadge.getBoundingClientRect();
          const dx = to.left + to.width / 2 - (from.left + from.width / 2);
          const dy = to.top + to.height / 2 - (from.top + from.height / 2);
          const scale = Math.max(0.28, Math.min(0.56, (to.height * 0.56) / Math.max(1, from.height)));
          gEl.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
        }
      });
      const doneTimer = window.setTimeout(() => {
        onFinished();
      }, 430);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(doneTimer);
      };
    }

    const reducedTimer = window.setTimeout(() => {
      onFinished();
    }, 220);
    return () => window.clearTimeout(reducedTimer);
  }, [exiting, onFinished, prefersReducedMotion]);

  const showLine = stage === "sweep";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Gokul's Portfolio is booting"
      className="fixed inset-0 z-[9999] h-[100dvh] w-screen overflow-hidden overscroll-none select-none pointer-events-auto"
    >
      {/* Top Dark Curtain */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#060b14] transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          exiting ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 229, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 212, 0.03) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00E5D4]/60 to-transparent transition-opacity duration-200 ${
            exiting ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Bottom Dark Curtain */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#060b14] transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          exiting ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 229, 212, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 212, 0.03) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00E5D4]/60 to-transparent transition-opacity duration-200 ${
            exiting ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,212,0.11)_0%,rgba(0,200,255,0.03)_42%,transparent_70%)] transition-opacity duration-300 ${
          exiting ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Centered Boot Terminal Readout */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <div className="flex flex-col items-center">
          {/* Name Scramble / Cursor Row */}
          <div className="flex items-center justify-center font-mono font-black tracking-[0.12em] sm:tracking-[0.16em] text-[clamp(2rem,6vw,4.5rem)] leading-none">
            {stage === "blink" ? (
              <span
                aria-hidden="true"
                className="inline-block w-[0.55ch] h-[1em] bg-[#00E5D4] shadow-[0_0_18px_rgba(0,229,212,0.85)] animate-pulse"
              />
            ) : (
              <>
                <span
                  ref={gRef}
                  style={{
                    transition:
                      "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease-out",
                    willChange: "transform, opacity",
                  }}
                  className={`inline-block origin-center ${
                    lockedCount >= 1
                      ? "bg-gradient-to-br from-[#00E5D4] to-[#00C8FF] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,229,212,0.35)]"
                      : "text-[#00E5D4]"
                  } ${exiting ? "opacity-80" : "opacity-100"}`}
                >
                  {chars[0]}
                </span>

                <span
                  className={`inline-flex transition-[opacity,filter] duration-200 ease-out ${
                    exiting ? "opacity-0 blur-[4px]" : "opacity-100 blur-0"
                  }`}
                >
                  {chars.slice(1).map((ch, idx) => {
                    const charIndex = idx + 1;
                    const isLocked = charIndex < lockedCount;
                    return (
                      <span
                        key={charIndex}
                        className={`${ch === " " ? "w-[0.45ch]" : "inline-block"} ${
                          isLocked ? "text-[#F1F5F9]" : "text-[#00E5D4]/85"
                        }`}
                      >
                        {ch === " " ? "\u00A0" : ch}
                      </span>
                    );
                  })}
                  <span
                    aria-hidden="true"
                    className={`ml-1.5 inline-block w-[0.42ch] h-[0.95em] self-center bg-[#00E5D4] shadow-[0_0_14px_rgba(0,229,212,0.75)] ${
                      stage === "sweep" ? "animate-pulse" : ""
                    }`}
                  />
                </span>
              </>
            )}
          </div>

          {/* 0.4s - 0.9s: Thin Cyan Progress Sweep + Monospace Title */}
          <div
            className={`mt-5 sm:mt-6 flex flex-col items-center gap-3.5 transition-[opacity,filter] duration-200 ease-out ${
              exiting ? "opacity-0 blur-[4px]" : "opacity-100 blur-0"
            }`}
          >
            {/* Progress Track Sweeping Left-to-Right */}
            <div className="w-[min(78vw,320px)] sm:w-[380px] h-[2px] rounded-full bg-white/[0.08] overflow-hidden">
              <div
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#00E5D4] via-[#00C8FF] to-sky-300 shadow-[0_0_14px_rgba(0,229,212,0.85)] transition-transform duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: showLine ? "scaleX(1)" : "scaleX(0)" }}
              />
            </div>

            {/* Subtle Monospace Role Illumination */}
            <p
              className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.28em] transition-[opacity,color,transform] duration-[420ms] ease-out ${
                showLine
                  ? "opacity-100 translate-y-0 text-[#CBD5E1]"
                  : "opacity-0 translate-y-1 text-[#64748B]"
              }`}
            >
              <span className={showLine ? "text-[#00E5D4]" : ""}>AI Engineer</span>
              {" & "}
              <span>Software Developer</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
