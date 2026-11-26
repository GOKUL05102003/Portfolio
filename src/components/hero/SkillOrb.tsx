import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { MotionValue } from "framer-motion";
import { useMediaQuery } from "../../hooks/use-media-query";
import { useVisible } from "../../hooks/use-visible";
import { DATA, ORDER, type SkillId } from "./skillOrbData";

const SkillOrbScene = lazy(() => import("./SkillOrbScene"));

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch() {
    this.props.onFailure();
  }

  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function SkillOrb({
  mx,
  my,
  paused = false,
  onOrbReady,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  paused?: boolean;
  onOrbReady?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const labels = useRef<Partial<Record<SkillId, HTMLDivElement>>>({});
  const visible = useVisible(ref);
  const compact = useMediaQuery("(width < 1024px), (pointer: coarse)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<SkillId>(ORDER[0]);
  const [hovered, setHovered] = useState<SkillId | null>(null);
  const [focusWithin, setFocusWithin] = useState(false);
  const active = hovered ?? selected;
  const live = ready && !failed && !reducedMotion;
  const markReady = useCallback(() => {
    setReady(true);
    onOrbReady?.();
  }, [onOrbReady]);
  const markFailed = useCallback(() => {
    setHovered(null);
    setFailed(true);
    onOrbReady?.();
  }, [onOrbReady]);

  const [userInteracted, setUserInteracted] = useState(false);
  const resumeTimerRef = useRef<number | null>(null);

  const registerUserActivity = useCallback(() => {
    setUserInteracted(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setUserInteracted(false);
    }, 12000);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      onOrbReady?.();
      return;
    }
    if (visible) setLoaded(true);
  }, [onOrbReady, reducedMotion, visible]);

  useEffect(() => {
    if (!live || !visible || hovered || focusWithin || userInteracted || paused) return;
    const timer = window.setTimeout(() => {
      setSelected(ORDER[(ORDER.indexOf(selected) + 1) % ORDER.length] ?? ORDER[0]);
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [focusWithin, hovered, live, paused, selected, visible, userInteracted]);

  return (
    <div
      ref={ref}
      className="so-wrap skill-orb"
      onPointerDown={registerUserActivity}
      onFocus={() => {
        setFocusWithin(true);
        registerUserActivity();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false);
      }}
    >
      {!live && (
        <div className="skill-orb-art" aria-hidden="true">
          <span />
        </div>
      )}
      {loaded && !failed && !reducedMotion && (
        <SceneBoundary onFailure={markFailed}>
          <Suspense fallback={null}>
            <div className="so-canvas" style={{ opacity: live ? 1 : 0 }}>
              <SkillOrbScene
                sel={selected}
                active={active}
                pick={setSelected}
                hover={setHovered}
                mx={mx}
                my={my}
                isMobile={compact}
                labels={labels}
                running={!paused && (!ready || visible)}
                onReady={markReady}
                onFailure={markFailed}
              />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
      {live && !compact && (
        <div className="skill-orb-labels">
          {ORDER.map((skill) => (
            <div
              key={skill}
              className="skill-orb-label"
              ref={(element) => {
                if (element) labels.current[skill] = element;
                else delete labels.current[skill];
              }}
            >
              <button
                type="button"
                className={`so-tag ${skill === active ? "on" : ""}`}
                aria-pressed={skill === active}
                onClick={() => setSelected(skill)}
                onMouseEnter={() => setHovered(skill)}
                onMouseLeave={() => setHovered(null)}
              >
                <b>{DATA[skill].label}</b>
                <i>{DATA[skill].sub}</i>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="so-mobile-dock skill-orb-dock">
        <div className="so-dock-content">
          <div className="so-dock-header">
            <span className="so-dock-cat">{DATA[active].cat}</span>
            <span className="so-dock-counter">
              {ORDER.indexOf(active) + 1} / {ORDER.length}
            </span>
          </div>
          <h3 className="so-dock-title">{DATA[active].label}</h3>
          <span className="so-dock-sub">{DATA[active].sub}</span>
        </div>
        <div className="so-dock-dots" role="group" aria-label="Hero skills">
          {ORDER.map((skill) => (
            <button
              key={skill}
              type="button"
              aria-pressed={skill === active}
              aria-label={DATA[skill].label}
              className={`so-dock-dot ${skill === active ? "on" : ""}`}
              onClick={() => setSelected(skill)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
