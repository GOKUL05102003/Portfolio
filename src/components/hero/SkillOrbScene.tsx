import { useCallback, useEffect, useMemo, useRef, type RefObject, type ComponentRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Line } from "@react-three/drei";
import {
  MathUtils,
  Vector3,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type PerspectiveCamera,
} from "three";
import type { MotionValue } from "framer-motion";
import { ORDER, type SkillId } from "./skillOrbData";

// Which areas work together; selecting one brightens its partners
const LINKS: [SkillId, SkillId][] = [
  ["web", "api"],
  ["voice", "api"],
  ["api", "orch"],
  ["api", "ret"],
  ["orch", "ml"],
  ["ret", "data"],
];

const SHELL = 2.35;
const TEAL = "#00E5D4";
const POS: Record<SkillId, Vector3> = Object.fromEntries(
  ORDER.map((id, i) => {
    const y = 1 - ((i + 0.5) * 2) / ORDER.length;
    const r = Math.sqrt(1 - y * y);
    const th = i * 2.399963;
    return [id, new Vector3(Math.sin(th) * r * SHELL, y * SHELL * 0.8, Math.cos(th) * r * SHELL)];
  }),
) as Record<SkillId, Vector3>;

/* Scales the whole orbit to the canvas size, reserving room for the
   label cards so they never leave the canvas or clip at any edge. */
function CameraFit({ isMobile }: { isMobile: boolean }) {
  const { size, camera } = useThree();
  useEffect(() => {
    if (!size.width || !size.height) return;
    if (isMobile) {
      const pxPerUnit = Math.max(size.width / (SHELL * 2.3), 26);
      const worldH = size.height / pxPerUnit;
      const fov = (camera as PerspectiveCamera).fov;
      camera.position.z = Math.max(worldH / 2 / Math.tan(MathUtils.degToRad(fov / 2)), 7.2);
      camera.position.y = 0.2;
      camera.updateProjectionMatrix();
      return;
    }
    camera.position.y = 0;
    const labelHalf = size.width < 480 ? 65 : 85; // half the widest label card, px
    const byWidth = (size.width / 2 - labelHalf - 12) / (SHELL * 1.04);
    const byHeight = (size.height / 2 - 12) / (SHELL * 0.94);
    const pxPerUnit = Math.max(Math.min(byWidth, byHeight), 24);
    const worldH = size.height / pxPerUnit;
    const fov = (camera as PerspectiveCamera).fov;
    camera.position.z = (worldH / 2 / Math.tan(MathUtils.degToRad(fov / 2))) * 0.85;
    camera.updateProjectionMatrix();
  }, [size.width, size.height, camera, isMobile]);
  return null;
}

/* ---------- Original core: mathematically uniform Fibonacci particle sphere & core ---------- */
function Core({
  glow,
  compact,
}: {
  glow: RefObject<ComponentRef<typeof MeshDistortMaterial> | null>;
  compact: boolean;
}) {
  const count = compact ? 1800 : 3200;
  const pts = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const th = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      // Uniform dense spherical shell with subtle organic depth
      const r = 2.18 + Math.sin(i * 0.43) * 0.04;
      a.set(
        [r * Math.cos(th) * Math.sin(phi), r * Math.sin(th) * Math.sin(phi), r * Math.cos(phi)],
        i * 3,
      );
    }
    return a;
  }, [count]);

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pts, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.026}
          color="#00C8FF"
          sizeAttenuation
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </points>
      <mesh>
        <icosahedronGeometry args={[1.75, 2]} />
        <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.14} />
      </mesh>
      <Float speed={1.8} floatIntensity={0.2}>
        <mesh>
          <sphereGeometry args={[1.22, compact ? 40 : 64, compact ? 32 : 48]} />
          <MeshDistortMaterial
            ref={glow}
            color="#005850"
            emissive="#00E5D4"
            emissiveIntensity={0.85}
            roughness={0.15}
            metalness={0.4}
            distort={0.06}
            speed={1.5}
          />
        </mesh>
      </Float>
    </>
  );
}

/* ---------- One skill node: dot, wire to the core, travelling pulse, label ---------- */
interface NodeProps {
  id: SkillId;
  st: "sel" | "rel" | "dim";
  pick: (id: SkillId) => void;
  hover: (id: SkillId | null) => void;
  labels: RefObject<Partial<Record<SkillId, HTMLDivElement>>>;
}

function Node({ id, st, pick, hover, labels }: NodeProps) {
  const pos = POS[id];
  const dot = useRef<Mesh>(null);
  const halo = useRef<Mesh>(null);
  const pulse = useRef<Mesh>(null);
  const v = useMemo(() => new Vector3(), []);
  const projected = useMemo(() => new Vector3(), []);
  const wire = useMemo(() => [pos.clone(), pos.clone().multiplyScalar(0.12)], [pos]);
  const sel = st === "sel";

  useFrame((s, dt) => {
    if (!dot.current || !halo.current || !pulse.current) return;
    const k = 1 - Math.exp(-dt * 8);
    const target = sel ? 2 : st === "rel" ? 1.3 : 1;
    const sc = dot.current.scale.x + (target - dot.current.scale.x) * k;
    dot.current.scale.setScalar(sc);

    const haloMat = halo.current.material as MeshBasicMaterial;
    if (haloMat) {
      haloMat.opacity += ((sel ? 0.3 : 0) - haloMat.opacity) * k;
    }
    halo.current.scale.setScalar(sel ? 1 + Math.sin(s.clock.elapsedTime * 3) * 0.12 : 1);

    const label = labels.current[id];
    if (label) {
      dot.current.getWorldPosition(v);
      const projection = projected.copy(v);
      projection.y += 0.35;
      projection.project(s.camera);

      // Facing check relative to camera position so it works when dragged/rotated in 3D
      const camDist = s.camera.position.distanceTo(v);
      const centerDist = s.camera.position.length();
      const facing = MathUtils.clamp((centerDist - camDist + 0.8) / 1.5, 0, 1);
      const inFrame = Math.abs(projection.x) <= 1.03 && Math.abs(projection.y) <= 1.03;
      label.style.visibility = inFrame && facing > 0.35 ? "visible" : "hidden";
      label.style.opacity = String(facing);
      label.style.transform = `translate3d(${((projection.x + 1) * s.size.width) / 2}px, ${((1 - projection.y) * s.size.height) / 2}px, 0) translate(-50%, -50%)`;
    }

    // Data pulse flowing from the node into the core
    const t = (s.clock.elapsedTime * 0.35 + ORDER.indexOf(id) * 0.13) % 1;
    pulse.current.position.copy(pos).multiplyScalar(1 - t * 0.86);
  });

  return (
    <>
      <Line
        points={wire}
        color={sel ? TEAL : "#6b665c"}
        lineWidth={sel ? 1.8 : 1}
        transparent
        opacity={sel ? 0.95 : 0.4}
      />
      <mesh ref={pulse}>
        <sphereGeometry args={[sel ? 0.07 : 0.048, 12, 12]} />
        <meshBasicMaterial color={sel ? "#00E5D4" : "#38bdf8"} />
      </mesh>
      <group position={pos}>
        {/* Invisible enlarged hit target for effortless clicking and hover */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            pick(id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            hover(id);
          }}
          onPointerOut={() => {
            hover(null);
          }}
          visible={false}
        >
          <sphereGeometry args={[0.38, 12, 12]} />
          <meshBasicMaterial />
        </mesh>
        <mesh
          ref={dot}
          onClick={(e) => {
            e.stopPropagation();
            pick(id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            hover(id);
          }}
          onPointerOut={() => {
            hover(null);
          }}
        >
          <sphereGeometry args={[0.115, 20, 20]} />
          <meshBasicMaterial color={sel ? TEAL : "#e0f2fe"} />
        </mesh>
        <mesh ref={halo}>
          <sphereGeometry args={[0.26, 20, 20]} />
          <meshBasicMaterial color={TEAL} transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </>
  );
}

interface SceneProps {
  sel: SkillId;
  active: SkillId;
  pick: (id: SkillId) => void;
  hover: (id: SkillId | null) => void;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  isMobile: boolean;
  labels: NodeProps["labels"];
}

const normalizeAngle = (a: number) => {
  return ((((a + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) - Math.PI;
};

function Scene({ sel, active, pick, hover, mx, my, isMobile, labels }: SceneProps) {
  const { gl } = useThree();
  const root = useRef<Group>(null);
  const inner = useRef<Group>(null);
  const shell = useRef<Group>(null);
  const glow = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const bump = useRef(0);

  // Direct orb rotation state (mouse drag + dynamic shortest-turn node alignment)
  const pointerDown = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const isDragging = useRef(false);
  const rotY = useRef(0);
  const rotX = useRef(0);
  const velY = useRef(0);
  const velX = useRef(0);
  const targetRotY = useRef(0);
  const targetRotX = useRef(0);
  const smoothMx = useRef(0.5);
  const smoothMy = useRef(0.5);

  // Smoothly rotate the orb so the selected node comes directly to the front (facing user)
  const alignToCurrentFront = useCallback((nodeId: SkillId) => {
    const p = POS[nodeId];
    if (!p) return;
    const nodeAngle = Math.atan2(p.x, p.z);
    // Find where the node currently points in world space
    const currentWorldAngle = normalizeAngle(nodeAngle + rotY.current);
    // Shortest angular turn to bring this node directly to facing front (angle 0)
    const turn = normalizeAngle(-currentWorldAngle);
    targetRotY.current = rotY.current + turn;
    targetRotX.current = 0; // level to user eye-line
    velY.current = 0;
    velX.current = 0;
  }, []);

  // Initial front alignment on mount
  useEffect(() => {
    const p = POS[sel];
    if (p) {
      const nodeAngle = Math.atan2(p.x, p.z);
      rotY.current = -nodeAngle;
      targetRotY.current = -nodeAngle;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When selection changes (click, auto-cycle, or UI tag click), smoothly bring node to front
  useEffect(() => {
    bump.current = 1;
    alignToCurrentFront(sel);
  }, [sel, alignToCurrentFront]);

  // Click handler for 3D sphere dots
  const handlePick = (id: SkillId) => {
    if (isDragging.current) return;
    alignToCurrentFront(id);
    pick(id);
  };

  // Direct mouse drag on the 3D structure with fluid physics & inertia
  useEffect(() => {
    const el = gl.domElement;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      pointerDown.current = true;
      lastX.current = e.clientX;
      lastY.current = e.clientY;
      isDragging.current = false;
      velY.current = 0;
      velX.current = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (!pointerDown.current) return;
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      lastX.current = e.clientX;
      lastY.current = e.clientY;

      if (Math.hypot(dx, dy) > 3) {
        isDragging.current = true;
      }

      const speed = isMobile ? 0.007 : 0.0055;
      rotY.current += dx * speed;
      rotX.current = MathUtils.clamp(rotX.current + dy * (speed * 0.75), -0.7, 0.7);
      targetRotY.current = rotY.current;
      targetRotX.current = rotX.current;
      velY.current = dx * speed;
      velX.current = dy * (speed * 0.75);
    };

    const onUp = () => {
      pointerDown.current = false;
      setTimeout(() => {
        isDragging.current = false;
      }, 100);
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [gl, isMobile]);

  useFrame((s, dt) => {
    if (!root.current || !inner.current || !shell.current) return;
    const rawMx = typeof mx?.get === "function" ? mx.get() : 0.5;
    const rawMy = typeof my?.get === "function" ? my.get() : 0.5;

    // Smoothly damp cursor parallax inputs to completely prevent snap jitter
    const damp = 1 - Math.exp(-dt * 4.5);
    smoothMx.current += (rawMx - smoothMx.current) * damp;
    smoothMy.current += (rawMy - smoothMy.current) * damp;
    const mxVal = smoothMx.current;
    const myVal = smoothMy.current;

    // Fluid drag inertia glide & smooth node alignment
    if (!pointerDown.current) {
      if (Math.abs(velY.current) > 0.0001 || Math.abs(velX.current) > 0.0001) {
        velY.current *= 0.93;
        velX.current *= 0.93;
        rotY.current += velY.current;
        rotX.current = MathUtils.clamp(rotX.current + velX.current, -0.7, 0.7);
        targetRotY.current = rotY.current;
        targetRotX.current = rotX.current;
      } else {
        rotY.current += (targetRotY.current - rotY.current) * (1 - Math.exp(-dt * 4));
        rotX.current += (targetRotX.current - rotX.current) * (1 - Math.exp(-dt * 4));
      }
    }

    // Cursor parallax tilt (smoothed)
    const tx = (myVal - 0.5) * 0.25;
    const ty = -(myVal - 0.5) * 0.15;
    root.current.rotation.x += (tx - root.current.rotation.x) * damp;
    root.current.position.y += (ty - root.current.position.y) * damp;

    // Apply rotation directly to shell (contains all orbiting nodes and rings)
    shell.current.rotation.y = rotY.current + (mxVal - 0.5) * 0.25;
    shell.current.rotation.x = rotX.current;
    shell.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.3) * 0.03;

    // Core continuous spin
    inner.current.rotation.y += dt * 0.12;
    inner.current.rotation.x = rotX.current * 0.5;

    // Core pulses with radiant emissive glow when selection changes
    bump.current *= 0.94;
    const dist = Math.hypot(mxVal - 0.5, myVal - 0.5);
    if (glow.current) {
      glow.current.distort = MathUtils.lerp(
        glow.current.distort,
        0.08 + dist * 0.04,
        0.08,
      );
      glow.current.emissiveIntensity = MathUtils.lerp(
        glow.current.emissiveIntensity,
        0.85 + bump.current * 0.6,
        0.1,
      );
    }
  });

  const linked = (id: SkillId) =>
    active === "infra" ||
    LINKS.some(([a, b]) => (a === active && b === id) || (b === active && a === id));
  const stOf = (id: SkillId): "sel" | "rel" | "dim" =>
    id === active ? "sel" : linked(id) ? "rel" : "dim";

  return (
    <group ref={root}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#00E5D4" />
      <group ref={inner} scale={0.92}>
        <Core glow={glow} compact={isMobile} />
      </group>
      <group ref={shell}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[SHELL, 0.006, 6, isMobile ? 64 : 120]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
        </mesh>
        <mesh rotation={[1.15, 0.5, 0]}>
          <torusGeometry args={[SHELL, 0.006, 6, isMobile ? 64 : 120]} />
          <meshBasicMaterial color="#00E5D4" transparent opacity={0.22} />
        </mesh>
        {ORDER.map((id) => (
          <Node key={id} id={id} st={stOf(id)} pick={handlePick} hover={hover} labels={labels} />
        ))}
      </group>
    </group>
  );
}

function Monitor({
  compact,
  onReady,
  onFailure,
}: {
  compact: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  const { gl } = useThree();
  const frames = useRef(0);
  const elapsed = useRef(0);
  const slowWindows = useRef(0);
  const ready = useRef(false);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);

  useFrame((_state, delta) => {
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
    if (!compact) return;
    if (delta > 0.25) {
      frames.current = 0;
      elapsed.current = 0;
      slowWindows.current = 0;
      return;
    }
    frames.current++;
    elapsed.current += delta;
    if (elapsed.current < 1.5) return;

    slowWindows.current = frames.current / elapsed.current < 24 ? slowWindows.current + 1 : 0;
    frames.current = 0;
    elapsed.current = 0;
    if (slowWindows.current >= 2) onFailure();
  });

  return null;
}

export default function SkillOrbScene({
  running,
  onReady,
  onFailure,
  ...scene
}: SceneProps & {
  running: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.2], fov: 44 }}
      dpr={scene.isMobile ? [1, 1.25] : [1, 1.75]}
      frameloop={running ? "always" : "never"}
      resize={{ offsetSize: true, scroll: false }}
      style={{
        width: "100%",
        height: "100%",
        overflow: scene.isMobile ? "hidden" : "visible",
        touchAction: "none",
      }}
    >
      <CameraFit isMobile={scene.isMobile} />
      <Scene {...scene} />
      <Monitor compact={scene.isMobile} onReady={onReady} onFailure={onFailure} />
    </Canvas>
  );
}
