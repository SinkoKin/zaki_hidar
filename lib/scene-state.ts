export type SceneSection = "hero" | "philosophy" | "final";

/**
 * Tiny mutable bridge between ScrollTrigger/DOM events and the WebGL frame loop.
 * It deliberately avoids React state so scrolling never re-renders the scene tree.
 */
export const sceneState = {
  active: "hero" as SceneSection,
  hero: 0,
  philosophy: 0,
  final: 0,
  pointerX: 0,
  pointerY: 0,
  reducedMotion: false,
  isCoarse: false,
};

export function setSceneSection(section: SceneSection) {
  sceneState.active = section;
}
