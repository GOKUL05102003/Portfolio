import { useEffect, useState } from "react";

/**
 * Ambient background combining subtle tech grid lines, cursor glow spotlight,
 * and high-performance floating micro-particles.
 */
export function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!active) setActive(true);
    };

    const handleLeave = () => {
      setActive(false);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [active]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Subtle Engineering Grid Mask */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 212, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 212, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 85%)",
        }}
      />

      {/* 2. Cursor Following Spotlight Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 212, 0.06), rgba(0, 200, 255, 0.02) 40%, transparent 70%)`,
        }}
      />

      {/* 3. Static Ambient Atmosphere Nodes */}
      <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,229,212,0.06)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute top-1/2 -right-40 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,200,255,0.05)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 size-[500px] rounded-full bg-[radial-gradient(circle,rgba(8,19,31,0.5)_0%,transparent_70%)] blur-3xl" />
    </div>
  );
}
