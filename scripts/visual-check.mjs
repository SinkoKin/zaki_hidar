import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const base = process.env.BASE_URL ?? "http://localhost:3100";
const outDir = "test-results/visual";
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});

const contexts = [];

async function newContext(viewport, options = {}) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: options.deviceScaleFactor ?? 1,
    isMobile: options.isMobile ?? false,
    hasTouch: options.hasTouch ?? false,
    reducedMotion: options.reducedMotion ?? "no-preference",
  });
  contexts.push(context);
  return context;
}

async function shootSection(page, file, selector, offset = -84) {
  const target = await page.evaluate(
    ({ selector, offset }) => {
      const node = document.querySelector(selector);
      if (!node) return null;
      const absolute = node.getBoundingClientRect().top + window.scrollY;
      const scrollTo = Math.max(0, Math.round(absolute) + offset);
      const lenis = window.__zekoLenis;
      if (lenis) lenis.scrollTo(scrollTo, { immediate: true, force: true });
      else window.scrollTo(0, scrollTo);
      return scrollTo;
    },
    { selector, offset },
  );
  if (target === null) throw new Error(`Missing selector: ${selector}`);
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${outDir}/${file}.png` });
}

// ---------- Desktop ----------
const desktop = await newContext({ width: 1440, height: 900 });
const page = await desktop.newPage();
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (error) => errors.push(`PAGEERROR: ${error.message}`));

await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(3500);
await page.screenshot({ path: `${outDir}/desktop-hero.png` });

const sections = [
  ["desktop-philosophy", ".philosophy"],
  ["desktop-discipline", "#discipline"],
  ["desktop-discipline-active", "#discipline"],
  ["desktop-method", "#method"],
  ["desktop-method-end", "#method"],
  ["desktop-coaching", "#coaching"],
  ["desktop-coaching-end", "#coaching"],
  ["desktop-work", "#work"],
  ["desktop-work-mid", "#work"],
  ["desktop-work-end", "#work"],
  ["desktop-start", "#start"],
  ["desktop-footer", ".site-footer"],
];

for (const [name, selector] of sections) {
  if (name.endsWith("end") || name.includes("mid") || name.includes("active")) continue;
  await shootSection(page, name, selector);
}

await shootSection(page, "desktop-discipline-active", "#discipline", 220);
await page.getByRole("button", { name: /Full planche/i }).click();
await page.waitForTimeout(900);
await page.screenshot({ path: `${outDir}/desktop-skill-planche.png` });

await shootSection(page, "desktop-method-end", "#method", 260);
await shootSection(page, "desktop-coaching-end", "#coaching", 320);
await shootSection(page, "desktop-work-mid", "#work", 700);
await shootSection(page, "desktop-work-end", "#work", 1600);

await shootSection(page, "desktop-start", "#start");
await shootSection(page, "desktop-footer", ".site-footer", 0);

const desktopLinks = await page.evaluate(() =>
  [...document.querySelectorAll("a[href^='https://www.instagram.com/']")].map((a) => ({
    href: a.getAttribute("href"),
    text: (a.textContent ?? "").trim().slice(0, 40),
  })),
);
const anchorTargets = await page.evaluate(() =>
  ["#discipline", "#method", "#coaching", "#work", "#top", "#philosophy"].map((hash) => ({
    hash,
    exists: Boolean(document.querySelector(hash)),
  })),
);

console.log("INSTAGRAM_LINKS", JSON.stringify(desktopLinks, null, 2));
console.log("ANCHOR_TARGETS", JSON.stringify(anchorTargets, null, 2));
await desktop.close();

// ---------- Tablet ----------
const tablet = await newContext({ width: 834, height: 1112 });
const tabletPage = await tablet.newPage();
await tabletPage.goto(base, { waitUntil: "networkidle" });
await tabletPage.waitForTimeout(2500);
await tabletPage.screenshot({ path: `${outDir}/tablet-hero.png` });
for (const [name, selector] of [
  ["tablet-philosophy", ".philosophy"],
  ["tablet-discipline", "#discipline"],
  ["tablet-coaching", "#coaching"],
  ["tablet-work", "#work"],
  ["tablet-footer", ".site-footer"],
]) {
  await shootSection(tabletPage, name, selector, -90);
}
await tablet.close();

// ---------- Mobile + menu ----------
const mobile = await newContext({ width: 390, height: 844 }, { isMobile: true, hasTouch: true });
const mobilePage = await mobile.newPage();
await mobilePage.goto(base, { waitUntil: "networkidle" });
await mobilePage.waitForTimeout(2500);
await mobilePage.screenshot({ path: `${outDir}/mobile-hero.png` });
for (const [name, selector] of [
  ["mobile-philosophy", ".philosophy"],
  ["mobile-discipline", "#discipline"],
  ["mobile-discipline-active", "#discipline"],
  ["mobile-method", "#method"],
  ["mobile-coaching", "#coaching"],
  ["mobile-work", "#work"],
  ["mobile-start", "#start"],
  ["mobile-footer", ".site-footer"],
]) {
  if (name.includes("active")) continue;
  await shootSection(mobilePage, name, selector, -84);
}

await mobilePage.getByRole("button", { name: /Full planche/i }).click();
await mobilePage.waitForTimeout(700);
const planchePos = await mobilePage.evaluate(() => window.scrollY);
console.log("MOBILE_PLANCH_scrollY", planchePos);
await mobilePage.screenshot({ path: `${outDir}/mobile-skill-planche.png` });

await mobilePage.evaluate(() => window.scrollTo(0, 0));
await mobilePage.waitForTimeout(900);
await mobilePage.getByRole("button", { name: /Open menu/i }).click();
await mobilePage.waitForTimeout(900);
await mobilePage.screenshot({ path: `${outDir}/mobile-menu.png` });

await mobilePage.keyboard.press("Escape");
await mobilePage.waitForTimeout(600);
const menuClosed = await mobilePage.evaluate(
  () => !document.querySelector(".menu-overlay").classList.contains("is-open"),
);
await mobilePage.screenshot({ path: `${outDir}/mobile-menu-closed.png` });
await mobile.close();

console.log("MENU_CLOSED_ON_ESCAPE", menuClosed);
console.log("CONSOLE_ERRORS", JSON.stringify(errors, null, 2));

// ---------- Reduced motion ----------
const reduced = await newContext({ width: 1440, height: 900 }, { reducedMotion: "reduce" });
const reducedPage = await reduced.newPage();
await reducedPage.goto(base, { waitUntil: "networkidle" });
await reducedPage.waitForTimeout(1800);
await reducedPage.screenshot({ path: `${outDir}/reduced-hero.png` });

const reducedState = await reducedPage.evaluate(() => {
  const eyebrow = document.querySelector(".eyebrow.hero-anim");
  const intro = document.querySelector(".hero__intro");
  const style = document.documentElement.style.getPropertyValue("--header-h");
  return {
    eyebrowOpacity: eyebrow ? getComputedStyle(eyebrow).opacity : null,
    introOpacity: intro ? getComputedStyle(intro).opacity : null,
    lenisClass: document.documentElement.classList.contains("lenis"),
    headerHeight: style,
  };
});
await reduced.close();
console.log("REDUCED_STATE", JSON.stringify(reducedState, null, 2));

// ---------- WebGL unavailable ----------
const webglOff = await newContext({ width: 1440, height: 900 });
const webglPage = await webglOff.newPage();
await webglPage.addInitScript(() => {
  HTMLCanvasElement.prototype.getContext = new Proxy(HTMLCanvasElement.prototype.getContext, {
    apply(target, thisArg, args) {
      if (args?.[0] === "webgl2" || args?.[0] === "webgl") return null;
      return Reflect.apply(target, thisArg, args);
    },
  });
});
const webglErrors = [];
webglPage.on("console", (msg) => {
  if (msg.type() === "error") webglErrors.push(msg.text());
});
await webglPage.goto(base, { waitUntil: "networkidle" });
await webglPage.waitForTimeout(2200);
await webglPage.screenshot({ path: `${outDir}/webgl-off-hero.png` });
const fallbackVisible = await webglPage.evaluate(() => {
  const fallback = document.querySelector(".scene-fallback");
  const canvas = document.querySelector("canvas");
  return {
    fallback: Boolean(fallback),
    canvas: Boolean(canvas),
    layerReady: document.querySelector(".scene-layer")?.classList.contains("is-ready") ?? null,
  };
});
await webglOff.close();
console.log("WEBGL_FALLBACK_STATE", JSON.stringify(fallbackVisible, null, 2));
console.log("WEBGL_OFF_ERRORS", JSON.stringify(webglErrors, null, 2));

await browser.close();
