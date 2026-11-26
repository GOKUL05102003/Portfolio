import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { MathUtils, type Group, type Mesh, type PerspectiveCamera } from "three";

// Automatically fits the camera to the container dimensions so the orb is
// always large, centered, constant in size, and never clips any boundary.
function CoreFit({ paddingFactor = 1.1 }: { paddingFactor?: number }) {
  const { size, camera } = useThree();
  useEffect(() => {
    if (!size.width || !size.height) return;
    const aspect = size.width / size.height;
    const fov = (camera as PerspectiveCamera).fov;
    const halfTan = Math.tan(MathUtils.degToRad(fov / 2));
    const visualRadius = 1.9;
    const distH = visualRadius / halfTan;
    const distW = visualRadius / (halfTan * aspect);
    camera.position.z = Math.max(distH, distW) * paddingFactor;
    camera.updateProjectionMatrix();
  }, [size.width, size.height, camera, paddingFactor]);
  return null;
}

function FirstFrameSignal({ onReady }: { onReady?: () => void }) {
  const fired = useRef(false);
  useFrame(() => {
    if (!fired.current) {
      fired.current = true;
      onReady?.();
    }
  });
  return null;
}

function NeuralCore({ interactive = true }: { interactive?: boolean }) {
  const group = useRef<Group>(null);
  const ring1 = useRef<Mesh>(null);
  const ring2 = useRef<Mesh>(null);
  const N = 2000;

  const pts = useMemo(() => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const th = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = 1.68 + Math.sin(i * 0.45) * 0.04;
      a.set(
        [r * Math.cos(th) * Math.sin(phi), r * Math.sin(th) * Math.sin(phi), r * Math.cos(phi)],
        i * 3,
      );
    }
    return a;
  }, [N]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;

    // Fluid auto rotation with optional gentle pointer tilt
    g.rotation.y += dt * 0.28;
    if (interactive) {
      g.rotation.x = MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.25, 0.05);
      g.position.x = MathUtils.lerp(g.position.x, state.pointer.x * 0.08, 0.05);
      g.position.y = MathUtils.lerp(g.position.y, state.pointer.y * 0.08, 0.05);
    }

    if (ring1.current) ring1.current.rotation.z += dt * 0.3;
    if (ring2.current) ring2.current.rotation.x += dt * 0.24;
  });

  return (
    <group ref={group}>
      {/* Particle Sphere Cloud (Portfolio Cyan/Electric Blue only) */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pts, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#00C8FF"
          sizeAttenuation
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </points>

      {/* Wireframe Geometry */}
      <mesh>
        <icosahedronGeometry args={[1.38, 2]} />
        <meshBasicMaterial wireframe color="#00E5D4" transparent opacity={0.18} />
      </mesh>

      {/* Orbiting Tech Rings in Portfolio Cyan & Electric Blue */}
      <mesh ref={ring1} rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[1.82, 0.008, 6, 96]} />
        <meshBasicMaterial color="#00E5D4" transparent opacity={0.34} />
      </mesh>
      <mesh ref={ring2} rotation={[0.4, 1.2, 0]}>
        <torusGeometry args={[1.82, 0.008, 6, 96]} />
        <meshBasicMaterial color="#00C8FF" transparent opacity={0.28} />
      </mesh>

      {/* Pulsing Core */}
      <Float speed={2.2} floatIntensity={0.2}>
        <mesh>
          <sphereGeometry args={[0.96, 56, 56]} />
          <MeshDistortMaterial
            color="#003D37"
            emissive="#00E5D4"
            emissiveIntensity={0.85}
            roughness={0.16}
            metalness={0.45}
            distort={0.08}
            speed={2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function ChatbotNeuralCore({
  className = "min-h-[300px]",
  paddingFactor = 1.1,
  interactive = true,
  onFirstFrame,
}: {
  className?: string;
  paddingFactor?: number;
  interactive?: boolean;
  onFirstFrame?: () => void;
} = {}) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 44 }}
          dpr={[1, 1.75]}
          resize={{ offsetSize: true, scroll: false }}
          style={{ width: "100%", height: "100%", pointerEvents: interactive ? "auto" : "none" }}
        >
          <CoreFit paddingFactor={paddingFactor} />
          <ambientLight intensity={0.65} />
          <pointLight position={[3, 3, 3]} intensity={28} color="#00E5D4" />
          <pointLight position={[-3, -3, -3]} intensity={20} color="#00C8FF" />
          <NeuralCore interactive={interactive} />
          <FirstFrameSignal onReady={onFirstFrame} />
        </Canvas>
      </div>
    </div>
  );
}
