"use client";

import { Environment, Grid, Lightformer, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { sceneState } from "@/lib/scene-state";

const steel = {
  color: "#b9beb7",
  metalness: 1,
  roughness: 0.24,
  envMapIntensity: 1.35,
};

const darkSteel = {
  color: "#4b504a",
  metalness: 0.9,
  roughness: 0.42,
  envMapIntensity: 0.85,
};

const orangeBasic = {
  color: "#ff9a5c",
  toneMapped: false,
};

const orangeStandard = {
  color: "#ff9a5c",
  emissive: "#ff9a5c",
  emissiveIntensity: 1.6,
  metalness: 0.4,
  roughness: 0.3,
};

const cameraTargets = {
  hero: { x: -2.05, y: 0.05, z: 8.6 },
  philosophy: { x: -1.68, y: -0.02, z: 7.35 },
  final: { x: 0, y: -0.16, z: 5.95 },
} as const;

function CameraRig() {
  useFrame(({ camera }, delta) => {
    const step = Math.min(delta, 0.05);
    const target = cameraTargets[sceneState.active];
    const pointer = sceneState.reducedMotion ? 0 : 1;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      target.x + sceneState.pointerX * 0.2 * pointer,
      1.7,
      step,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      target.y - sceneState.pointerY * 0.13 * pointer - sceneState.hero * 0.28,
      1.7,
      step,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      target.z + sceneState.hero * 0.85,
      2.2,
      step,
    );
    camera.rotation.x = THREE.MathUtils.damp(
      camera.rotation.x,
      sceneState.pointerY * 0.012 * pointer,
      1.9,
      step,
    );
    camera.rotation.y = THREE.MathUtils.damp(
      camera.rotation.y,
      sceneState.pointerX * 0.02 * pointer,
      1.9,
      step,
    );
  });

  return null;
}

function TrainingRig() {
  const rig = useRef<THREE.Group>(null);
  const gimbal = useRef<THREE.Group>(null);
  const ringLeft = useRef<THREE.Group>(null);
  const ringRight = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const step = Math.min(delta, 0.05);
    const motion = sceneState.reducedMotion ? 0 : 1;
    const time = clock.elapsedTime;
    const scrollSwing = sceneState.hero * -0.12;

    // Gentle pendulum sway; rings swing back as the page scrolls away.
    if (ringLeft.current) {
      ringLeft.current.rotation.z = Math.sin(time * 0.55) * 0.045 * motion + scrollSwing;
      ringLeft.current.rotation.x = Math.cos(time * 0.4) * 0.016 * motion;
    }
    if (ringRight.current) {
      ringRight.current.rotation.z =
        Math.sin(time * 0.55 + 0.85) * 0.045 * motion + scrollSwing;
      ringRight.current.rotation.x = Math.cos(time * 0.4 + 0.7) * 0.016 * motion;
    }

    // Only the hanging assembly leans toward the pointer; the frame,
    // barbell and plinth stay planted.
    if (gimbal.current) {
      gimbal.current.rotation.x = THREE.MathUtils.damp(
        gimbal.current.rotation.x,
        sceneState.pointerY * 0.05 * motion,
        1.3,
        step,
      );
      gimbal.current.rotation.y = THREE.MathUtils.damp(
        gimbal.current.rotation.y,
        sceneState.pointerX * 0.09 * motion,
        1.3,
        step,
      );
    }

    if (!rig.current) return;

    // The rig only drifts with scroll, never with the pointer.
    const yBase = sceneState.reducedMotion ? -0.14 : -0.14 - sceneState.hero * 0.18;
    rig.current.position.y = THREE.MathUtils.damp(rig.current.position.y, yBase, 2.0, step);

    const targetScale = sceneState.active === "final" ? 1.08 : 1;
    const scale = THREE.MathUtils.damp(rig.current.scale.x, targetScale, 2.2, step);
    rig.current.scale.setScalar(scale);
  });

  return (
    <group ref={rig} position={[0, -0.14, 0]} rotation={[0.02, -0.32, 0.05]}>
      {/* Planted structure */}
      <group>
        {/* Uprights */}
        {[-2.16, 2.16].map((x) => (
          <group key={x}>
            <mesh position={[x, 0.42, 0]}>
              <cylinderGeometry args={[0.032, 0.032, 5.1, 18]} />
              <meshStandardMaterial {...steel} />
            </mesh>
            <mesh position={[x, -2.1, 0]}>
              <cylinderGeometry args={[0.085, 0.11, 0.2, 20]} />
              <meshStandardMaterial {...darkSteel} />
            </mesh>
            <mesh position={[x, 2.18, 0]}>
              <boxGeometry args={[0.14, 0.02, 0.02]} />
              <meshBasicMaterial {...orangeBasic} />
            </mesh>
          </group>
        ))}

        {/* Top beam — the pull-up bar */}
        <mesh position={[0, 2.68, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 4.32, 18]} />
          <meshStandardMaterial {...steel} />
        </mesh>

        {/* Orange grip collars + end caps on the beam */}
        {[-0.6, 0, 0.6].map((x) => (
          <mesh key={x} position={[x, 2.68, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.1, 12]} />
            <meshStandardMaterial {...orangeStandard} />
          </mesh>
        ))}
        {[-2.16, 2.16].map((x) => (
          <mesh key={x} position={[x, 2.68, 0]}>
            <sphereGeometry args={[0.05, 12, 8]} />
            <meshStandardMaterial {...darkSteel} />
          </mesh>
        ))}

        {/* Low cross-brace */}
        <mesh position={[0, -1.42, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 4.28, 14]} />
          <meshStandardMaterial {...darkSteel} />
        </mesh>

        {/* Barbell — the iron half of the discipline */}
        <group position={[0, -2.09, 0.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.028, 0.028, 3.3, 16]} />
            <meshStandardMaterial {...steel} />
          </mesh>
          {[-1.1, 1.1].map((x) => (
            <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.3, 0.3, 0.07, 40]} />
              <meshStandardMaterial {...darkSteel} />
            </mesh>
          ))}
          {[-0.85, 0.85].map((x) => (
            <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.17, 0.17, 0.05, 32]} />
              <meshStandardMaterial {...orangeStandard} />
            </mesh>
          ))}
          {[-1.32, 1.32].map((x) => (
            <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.042, 0.042, 0.06, 14]} />
              <meshStandardMaterial {...darkSteel} />
            </mesh>
          ))}
        </group>

        {/* Plinth */}
        <group position={[0, -2.46, 0]}>
          <mesh>
            <cylinderGeometry args={[2.34, 2.5, 0.14, 72]} />
            <meshStandardMaterial color="#171914" metalness={0.5} roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.085, 0]}>
            <cylinderGeometry args={[2.16, 2.16, 0.02, 72]} />
            <meshBasicMaterial color="#ff9a5c" transparent opacity={0.16} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[2.62, 2.72, 0.09, 72]} />
            <meshStandardMaterial color="#0d0e0c" metalness={0.3} roughness={0.7} />
          </mesh>
        </group>

        {/* Floor line */}
        <mesh position={[0, -2.38, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.3, 0.012]} />
          <meshBasicMaterial color="#ff9a5c" transparent opacity={0.42} toneMapped={false} />
        </mesh>
      </group>

      {/* Hanging rings — pivot on the top beam */}
      <group ref={gimbal} position={[0, 2.66, 0]}>
        <group ref={ringLeft} position={[-0.95, 0, 0]}>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[0.05, 1.0, 0.016]} />
            <meshStandardMaterial color="#ded9cb" roughness={0.75} metalness={0.08} />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[0.085, 0.05, 0.05]} />
            <meshStandardMaterial {...darkSteel} />
          </mesh>
          <mesh position={[0, -1.28, 0]}>
            <torusGeometry args={[0.3, 0.03, 18, 64]} />
            <meshStandardMaterial color="#e6e2d6" roughness={0.42} metalness={0.12} envMapIntensity={1.05} />
          </mesh>
        </group>
        <group ref={ringRight} position={[0.95, 0, 0]}>
          <mesh position={[0, -0.5, 0]}>
            <boxGeometry args={[0.05, 1.0, 0.016]} />
            <meshStandardMaterial color="#ded9cb" roughness={0.75} metalness={0.08} />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[0.085, 0.05, 0.05]} />
            <meshStandardMaterial {...darkSteel} />
          </mesh>
          <mesh position={[0, -1.28, 0]}>
            <torusGeometry args={[0.3, 0.03, 18, 64]} />
            <meshStandardMaterial color="#e6e2d6" roughness={0.42} metalness={0.12} envMapIntensity={1.05} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Atmosphere() {
  return (
    <>
      <ambientLight intensity={0.32} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} color="#f2efe6" />
      <pointLight position={[-3, 0.5, 2]} intensity={5} color="#ff9a5c" distance={9} decay={2} />
      <pointLight position={[3, -2, -3]} intensity={2.4} color="#8a8f8a" distance={12} decay={2} />

      <Environment resolution={64}>
        <group rotation={[-Math.PI / 3.2, 0, 0]}>
          <Lightformer
            form="rect"
            intensity={5}
            position={[0, 5, -8]}
            scale={[12, 8, 1]}
            color="#f2efe6"
          />
          <Lightformer
            form="rect"
            intensity={3.5}
            position={[5, 1, 2]}
            scale={[5, 3, 1]}
            color="#ff9a5c"
          />
          <Lightformer
            form="ring"
            intensity={2.6}
            position={[-6, 2, 1]}
            scale={[4, 4, 1]}
            color="#8a8f8a"
          />
          <Lightformer
            form="rect"
            intensity={1.8}
            position={[0, -5, 3]}
            scale={[8, 2, 1]}
            color="#3e4a2b"
          />
        </group>
      </Environment>

      <Sparkles
        count={sceneState.isCoarse ? 12 : 26}
        scale={[10, 7, 2.2]}
        position={[0, 0.4, 0]}
        size={0.9}
        speed={sceneState.reducedMotion ? 0 : 0.2}
        opacity={0.28}
        color="#ff9a5c"
        noise={0.4}
      />
      <Sparkles
        count={sceneState.isCoarse ? 8 : 16}
        scale={[12, 8, 2.2]}
        position={[0, 0, -1]}
        size={0.65}
        speed={sceneState.reducedMotion ? 0 : 0.12}
        opacity={0.2}
        color="#f2efe6"
        noise={0.7}
      />

      <Grid
        position={[0, -2.56, 0]}
        args={[14, 14]}
        cellSize={0.48}
        cellThickness={0.5}
        cellColor="#2b2f27"
        sectionSize={2.4}
        sectionThickness={0.9}
        sectionColor="#414736"
        fadeDistance={13}
        fadeStrength={2.1}
        infiniteGrid
        followCamera={false}
      />
    </>
  );
}

export function SceneComposition() {
  return (
    <>
      <CameraRig />
      <Atmosphere />
      <TrainingRig />
    </>
  );
}
