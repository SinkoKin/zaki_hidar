import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Only Zeko — Calisthenics Athlete & Coach",
    short_name: "Only Zeko",
    description: site.hero.intro,
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    categories: ["sports", "fitness", "health"],
    lang: "en",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
