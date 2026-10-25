"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { sceneState } from "@/lib/scene-state";
import { SceneErrorBoundary } from "./SceneErrorBoundary";
import { SceneFallback } from "./SceneFallback";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
  loading: () => null,
});

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function SceneMount() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    sceneState.reducedMotion = motionQuery.matches;
    sceneState.isCoarse = window.matchMedia("(pointer: coarse)").matches;
    // WebGL support can only be probed after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canUseWebGL());

    const onMotionChange = () => {
      sceneState.reducedMotion = motionQuery.matches;
    };
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className={`scene-layer ${ready ? "is-ready" : ""}`} aria-hidden="true">
      <SceneErrorBoundary fallback={<SceneFallback />}>
        <div className="scene-layer__fallback">
          <SceneFallback />
        </div>
        {supported ? <SceneCanvas onReady={() => setReady(true)} /> : null}
      </SceneErrorBoundary>
    </div>
  );
}
