import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3100", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const before = await page.evaluate(() => ({
  anims: [...document.querySelectorAll(".hero-anim")].map((el) => ({
    cls: el.className,
    opacity: getComputedStyle(el).opacity,
    transform: getComputedStyle(el).transform,
    box: el.getBoundingClientRect().toJSON(),
  })),
  lines: [...document.querySelectorAll(".hero__line")].map((el) => ({
    box: el.getBoundingClientRect().toJSON(),
    spanTransform: getComputedStyle(el.querySelector("span")).transform,
    font: getComputedStyle(el).fontSize,
    lineHeight: getComputedStyle(el).lineHeight,
  })),
  h1: document.querySelector(".hero__title")?.getBoundingClientRect().toJSON(),
}));

const fps = await page.evaluate(
  () =>
    new Promise((resolve) => {
      let frames = 0;
      const start = performance.now();
      const tick = (now) => {
        frames++;
        if (now - start < 1500) requestAnimationFrame(tick);
        else resolve({ frames, ms: now - start, fps: (frames / (now - start)) * 1000 });
      };
      requestAnimationFrame(tick);
    }),
);

await page.waitForTimeout(8000);
const after = await page.evaluate(() => ({
  anims: [...document.querySelectorAll(".hero-anim")].map((el) => ({
    cls: el.className,
    opacity: getComputedStyle(el).opacity,
    box: el.getBoundingClientRect().toJSON(),
  })),
  lines: [...document.querySelectorAll(".hero__line")].map((el) => ({
    spanTransform: getComputedStyle(el.querySelector("span")).transform,
  })),
}));

await page.screenshot({ path: "test-results/visual/debug-hero-late.png" });
console.log(JSON.stringify({ before, fps, after }, null, 2));
await browser.close();
