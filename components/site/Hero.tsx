import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { InstagramIcon } from "./InstagramIcon";

const { hero, brand } = site;
const secondLine = hero.headline[1].split(" ");

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__reticle" aria-hidden="true">
        <span className="hero__reticle-ring" />
        <span className="hero__reticle-cross hero__reticle-cross--x" />
        <span className="hero__reticle-cross hero__reticle-cross--y" />
        <span className="hero__reticle-dot" />
        <span className="hero__reticle-label hero__reticle-label--top">{hero.reticle.top}</span>
        <span className="hero__reticle-label hero__reticle-label--bottom">{hero.reticle.bottom}</span>
      </div>

      <div className="hero__rail" aria-hidden="true">
        <span>{brand.coordinates}</span>
        <span className="hero__rail-line" />
        <span>BODY AS ARCHITECTURE</span>
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow hero-anim">{hero.eyebrow}</p>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__line">
              <span>{hero.headline[0]}</span>
            </span>
            <span className="hero__line">
              <span>
                {secondLine[0]} {secondLine[1]}
                <span className="hero__star" aria-hidden="true">
                  ✳
                </span>
              </span>
            </span>
          </h1>

          <div className="hero__lede">
            <p className="hero__intro hero-anim">{hero.intro}</p>
            <div className="hero__actions hero-anim">
              <a
                className="btn btn--primary"
                href={brand.instagram}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="btn__index">01</span>
                {hero.primaryCta}
                <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a className="btn btn--ghost" href="#discipline">
                <span className="btn__index">02</span>
                {hero.secondaryCta}
                <ArrowDown size={15} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero__bottom hero-anim">
            <dl className="hero__meta">
              {hero.meta.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="hero__figure">
              <span className="mono steel">{hero.figure.study}</span>
              <span className="hero__figure-name">{hero.figure.name}</span>
              <span className="mono steel">{hero.figure.medium}</span>
            </div>

            <a className="hero__scroll" href="#philosophy">
              <span className="hero__scroll-track" aria-hidden="true">
                <span />
              </span>
              <span>{hero.scrollLabel}</span>
              <ArrowDown size={13} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <a
        className="hero__side-note"
        href={brand.instagram}
        target="_blank"
        rel="noreferrer noopener"
      >
        <InstagramIcon size={13} />
        {hero.sideNote}
      </a>
    </section>
  );
}
