import { Loader } from "@/components/site/Loader";
import { SceneMount } from "@/components/three/SceneMount";
import { Coaching } from "@/components/site/Coaching";
import { FinalCta } from "@/components/site/FinalCta";
import { Gallery } from "@/components/site/Gallery";
import { Hero } from "@/components/site/Hero";
import { Method } from "@/components/site/Method";
import { Philosophy } from "@/components/site/Philosophy";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteMotion } from "@/components/site/SiteMotion";
import { SkillIndex } from "@/components/site/SkillIndex";
import { Ticker } from "@/components/site/Ticker";

export default function HomePage() {
  return (
    <>
      <Loader />
      <SiteMotion />
      <SceneMount />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Ticker />
        <Philosophy />
        <SkillIndex />
        <Method />
        <Coaching />
        <Gallery />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
