"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { sceneState } from "@/lib/scene-state";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function SiteMotion() {
  useGSAP(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        touchMultiplier: 1.15,
        wheelMultiplier: 0.95,
      });

      const onLenisScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onLenisScroll);

      // Exposed for development tools; not used by the UI itself.
      window.__zekoLenis = lenis;

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const cleanups: Array<() => void> = [];

      // Section reveals — children stagger in with a soft blur lift.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        const targets = element.children.length
          ? Array.from(element.children)
          : [element];
        gsap.from(targets, {
          opacity: 0,
          y: 32,
          scale: 0.985,
          filter: "blur(8px)",
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true,
          },
        });
      });

      // Heading clip-reveal — type rises from a masked baseline.
      gsap.utils.toArray<HTMLElement>("section h2, .final__title").forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 22, clipPath: "inset(110% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      // Gallery parallax
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // The aperture scan line travels with the philosophy passage.
      gsap.fromTo(
        ".aperture__img",
        { yPercent: -6, scale: 1.06 },
        {
          yPercent: 6,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".philosophy",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.to(".aperture__scan", {
        yPercent: 620,
        ease: "none",
        scrollTrigger: {
          trigger: ".philosophy",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Magnetic buttons — subtle cursor pull on desktop pointers.
      if (!window.matchMedia("(pointer: coarse)").matches) {
        gsap.utils.toArray<HTMLElement>(".btn").forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
          const onMove = (event: PointerEvent) => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            xTo((event.clientX - cx) * 0.22);
            yTo((event.clientY - cy) * 0.22);
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
          btn.addEventListener("pointermove", onMove);
          btn.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            btn.removeEventListener("pointermove", onMove);
            btn.removeEventListener("pointerleave", onLeave);
            gsap.set(btn, { x: 0, y: 0 });
          });
        });
      }

      return () => {
        lenis.off("scroll", onLenisScroll);
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        delete window.__zekoLenis;
        lenis.destroy();
        cleanups.forEach((fn) => fn());
      };
    });

    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        document.documentElement.style.setProperty(
          "--page-progress",
          self.progress.toFixed(4),
        );
      },
    });

    return () => {
      progressTrigger.kill();
      media.revert();
    };
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      sceneState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const hero = document.querySelector<HTMLElement>(".hero");
    const philosophy = document.querySelector<HTMLElement>(".philosophy");
    const final = document.querySelector<HTMLElement>(".final");

    const updateScene = () => {
      if (!hero || !philosophy || !final) return;

      const viewport = window.innerHeight;
      const heroRect = hero.getBoundingClientRect();
      const philosophyRect = philosophy.getBoundingClientRect();
      const finalRect = final.getBoundingClientRect();

      sceneState.hero = clamp(-heroRect.top / Math.max(heroRect.height, 1));
      sceneState.philosophy = clamp(
        (viewport - philosophyRect.top) / Math.max(viewport + philosophyRect.height, 1),
      );
      sceneState.final = clamp((viewport - finalRect.top) / Math.max(viewport + finalRect.height, 1));

      const midpoint = viewport * 0.55;
      if (finalRect.top <= midpoint && finalRect.bottom >= midpoint) {
        sceneState.active = "final";
      } else if (philosophyRect.top <= midpoint && philosophyRect.bottom >= midpoint) {
        sceneState.active = "philosophy";
      } else {
        sceneState.active = "hero";
      }
    };

    updateScene();
    window.addEventListener("scroll", updateScene, { passive: true });
    window.addEventListener("resize", updateScene, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScene);
      window.removeEventListener("resize", updateScene);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return null;
}
