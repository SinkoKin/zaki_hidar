/**
 * Rasterises app/icon.svg into the platform PNG icons:
 *   app/apple-icon.png        (180 — picked up automatically by Next file conventions)
 *   public/icons/icon-192.png
 *   public/icons/icon-512.png (manifest icons)
 *
 * Run after editing the favicon SVG:  node scripts/generate-icons.mjs
 */
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = new URL("../app/icon.svg", import.meta.url);
const svg = readFileSync(source);

const p = (relative) => fileURLToPath(new URL(relative, import.meta.url));

const master = await sharp(svg, { density: 1200 }).resize(512, 512).png().toBuffer();

mkdirSync(p("../public/icons"), { recursive: true });
await sharp(master).resize(192, 192).png().toFile(p("../public/icons/icon-192.png"));
await sharp(master).png().toFile(p("../public/icons/icon-512.png"));
await sharp(master).resize(180, 180).png().toFile(p("../app/apple-icon.png"));

console.log("Icons generated: 192, 512, apple 180.");
