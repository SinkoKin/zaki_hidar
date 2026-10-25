/**
 * Device matrix check — phones & tablets (portrait + landscape).
 * Visits every profile, verifies no horizontal overflow, no console errors,
 * all sections present, menu open/close, skill switching, and captures
 * screenshots of hero + footer for the key device classes.
 *
 * Usage: node scripts/device-check.mjs   (expects dev server on :3100)
 */
import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const base = process.env.BASE_URL ?? "http://localhost:3100";
const outDir = "test-results/devices";
await mkdir(outDir, { recursive: true });

const profiles = [
  // Phones
  ["galaxy-s8",      devices["Galaxy S8"],            true],
  ["galaxy-s24",     devices["Galaxy S24"],           true],
  ["galaxy-fold6c",  devices["Galaxy Z Fold 6 Cover"], true],
  ["iphone-se",      devices["iPhone SE"],            true],
  ["pixel7",         devices["Pixel 7"],              true],
  ["pixel7a",        devices["Pixel 7a"],             true],

  // Custom dims: Redmi Note-class (393x851), iPhone Pro Max-class (430x932)
  ["redmi-note",     { viewport: { width: 393, height: 851 }, isMobile: true, hasTouch: true, ua: devices["Pixel 7"].userAgent }, true],
  ["iphone-promax",  { viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true, ua: devices["iPhone SE"].userAgent }, true],

  // Landscape phones
  ["landscape-s8",   devices["Galaxy S8 landscape"],    false],
  ["landscape-se",   devices["iPhone SE landscape"],    false],

  // Tablets
  ["ipad-mini",      devices["iPad Mini"],             false],
  ["ipad-pro11",     devices["iPad Pro 11"],           false],
];

const browser = await chromium.launch({ headless: true });
const report = [];

for (const [name, options, shoot] of profiles) {
  const context = await browser.newContext({
    viewport: options.viewport,
    isMobile: options.isMobile,
    hasTouch: options.hasTouch,
    userAgent: options.ua,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 160)); });
  page.on("pageerror", (e) => errors.push(`PAGEERROR: ${e.message.slice(0, 160)}`));

  try {
    await page.goto(base, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(2600);

    const audit = await page.evaluate(() => {
      const de = document.documentElement;
      const overflowX = Math.max(de.scrollWidth, document.body.scrollWidth) - de.clientWidth;
      const sections = [".hero", ".philosophy", "#discipline", "#method", "#coaching", "#work", "#start", ".site-footer"]
        .map((s) => `${s}:${Boolean(document.querySelector(s))}`);
      const mark = document.querySelector(".brand__mark svg");
      const markBox = mark ? mark.getBoundingClientRect().width : 0;
      return {
        overflowX,
        sections: sections.join(" "),
        hasLoaderRemoved: !document.querySelector(".site-loader"),
        brandMarkW: Math.round(markBox),
        scrollHeight: de.scrollHeight,
      };
    });

    // Menu interaction (mobile menu at <=1080px width)
    let menuResult = "n/a";
    if (options.viewport.width <= 1080) {
      await page.getByRole("button", { name: /Open menu/i }).tap();
      await page.waitForTimeout(700);
      const opened = await page.evaluate(() => document.querySelector(".menu-overlay").classList.contains("is-open"));
      await page.locator('.menu-overlay__nav a[href="#method"]').tap();
      await page.waitForTimeout(1300);
      const after = await page.evaluate(() => ({
        closed: !document.querySelector(".menu-overlay").classList.contains("is-open"),
        y: Math.round(window.scrollY),
      }));
      menuResult = opened && after.closed && after.y > 500 ? "ok" : `broken opened=${opened} closed=${after.closed} y=${after.y}`;
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    // Skill row switch
    await page.locator("#discipline").scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await page.getByRole("button", { name: /Full planche/i }).tap();
    await page.waitForTimeout(800);
    const skillSwitch = await page.evaluate(() => {
      const h3 = document.querySelector("#skill-panel h3");
      return h3?.textContent ?? "missing";
    });

    if (shoot) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${outDir}/${name}-hero.png` });
      await page.evaluate(() => {
        const footer = document.querySelector(".site-footer");
        const y = footer.getBoundingClientRect().top + window.scrollY - window.innerHeight + footer.offsetHeight;
        window.scrollTo(0, Math.max(0, y));
      });
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${outDir}/${name}-footer.png` });
    }

    report.push({
      device: name,
      ...audit,
      menuResult,
      skillSwitch: skillSwitch.toLowerCase().includes("planche") ? "ok" : skillSwitch,
      errors,
    });
  } catch (error) {
    report.push({ device: name, error: String(error).slice(0, 200) });
  }
  await context.close();
}

await browser.close();
for (const row of report) console.log(JSON.stringify(row));