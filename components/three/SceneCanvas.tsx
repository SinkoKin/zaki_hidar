"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { sceneState } from "@/lib/scene-state";
import { SceneComposition } from "./SceneComposition";

type Props = {
  onReady: () => void;
};

export default function SceneCanvas({ onReady }: Props) {
  const reduced = sceneState.reducedMotion;

  return (
    <Canvas
      className="webgl-canvas"
      aria-hidden="true"
      dpr={sceneState.isCoarse ? [1, 1.35] : [1, 1.75]}
      frameloop={reduced ? "demand" : "always"}
      camera={{ fov: 36, near: 0.1, far: 50, position: [0.4, 0.2, 8] }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.setClearColor(0x000000, 0);
        onReady();

        gl.domElement.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            console.warn("WebGL context lost. The static scene fallback remains available.");
          },
          { once: true },
        );
      }}
    >
      <Suspense fallback={null}>
        <SceneComposition />
      </Suspense>
    </Canvas>
  );
}
