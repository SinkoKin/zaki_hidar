"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { site, type Skill } from "@/data/site";
import { SkillGlyph } from "./SkillGlyph";

export function SkillIndex() {
  const [activeId, setActiveId] = useState(site.skills.items[0].id);
  const active = (site.skills.items.find((item) => item.id === activeId) ?? site.skills.items[0]) as Skill;

  return (
    <section className="skills section" id="discipline" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-head">
          <div data-reveal>
            <p className="eyebrow">{site.skills.eyebrow}</p>
            <h2 id="skills-title">{site.skills.heading}</h2>
          </div>
          <div className="section-head__aside" data-reveal>
            <p>{site.skills.intro}</p>
            <p className="mono">{site.skills.instruction} - 01 / 04</p>
          </div>
        </div>

        <div className="skills__layout">
          <div className="skills__list" data-reveal>
            {site.skills.items.map((item) => {
              const isActive = item.id === active.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`skills__row ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={isActive}
                  aria-controls="skill-panel"
                >
                  <span className="skills__index mono">{item.number}</span>
                  <span className="skills__name">{item.name}</span>
                  <span className="skills__category mono">{item.category}</span>
                  <SkillGlyph className="skills__glyph" glyph={item.glyph} />
                  <ArrowUpRight className="skills__arrow" size={17} strokeWidth={1.5} aria-hidden="true" />
                </button>
              );
            })}
            <p className="skills__caption mono">{site.skills.caption}</p>
          </div>

          <div className="skills__figure" data-reveal>
            <figure id="skill-panel">
              <div className="skills__frame" key={active.id}>
                <div className="skills__media">
                  <Image
                    src={active.image.src}
                    alt={active.image.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    className="skills__image"
                    style={{ objectPosition: active.image.position ?? "center" }}
                  />
                  {active.secondaryImage ? (
                    <div className="skills__secondary">
                      <Image
                        src={active.secondaryImage.src}
                        alt={active.secondaryImage.alt}
                        fill
                        sizes="120px"
                        className="skills__secondary-image"
                      />
                    </div>
                  ) : null}
                  <span className="skills__frame-index" aria-hidden="true">
                    {active.number}
                  </span>
                  <span className="skills__frame-line" aria-hidden="true" />
                  <span className="skills__frame-corner skills__frame-corner--tl" aria-hidden="true" />
                  <span className="skills__frame-corner skills__frame-corner--br" aria-hidden="true" />
                </div>
              </div>

              <figcaption className="skills__meta">
                <div className="skills__meta-top">
                  <span className="mono">
                    {active.number} / {active.category}
                  </span>
                  {active.image.sourceUrl ? (
                    <a
                      className="text-link"
                      href={active.image.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Source
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
                <h3>{active.name}</h3>
                <p>{active.description}</p>
                <span className="skills__credit mono">Public training frame / {active.image.label}</span>
              </figcaption>
            </figure>

            <p className="sr-only" aria-live="polite">
              Showing {active.name}, {active.category}. {active.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
