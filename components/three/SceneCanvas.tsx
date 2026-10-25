"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { sceneState } from "@/lib/scene-state";
import { SceneComposition } from "./SceneComposition";

type Props = {
  onReady: () => void;
};

// Full-screen canvas under an 11k-px page is the dominant scroll cost; DSP cap
// and no AA on coarse pointers keep the per-frame raster affordable.
const DPR_MAX = 1.5;

export default function SceneCanvas({ onReady }: Props) {
  const reduced = sceneState.reducedMotion;

  return (
    <Canvas
      className="webgl-canvas"
      aria-hidden="true"
      dpr={[1, DPR_MAX]}
      frameloop={reduced ? "demand" : "always"}
      camera={{ fov: 36, near: 0.1, far: 50, position: [0.4, 0.2, 8] }}
      gl={{
        alpha: true,
        antialias: !sceneState.isCoarse,
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
