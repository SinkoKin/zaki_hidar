import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { site } from "@/data/site";

const { philosophy, brand } = site;
const { aperture } = philosophy;

export function Philosophy() {
  return (
    <section className="philosophy section" id="philosophy" aria-labelledby="philosophy-title">
      <div className="container philosophy__grid">
        <div className="philosophy__copy" data-reveal>
          <p className="eyebrow">{philosophy.eyebrow}</p>
          <h2 id="philosophy-title">{philosophy.heading}</h2>

          <div className="philosophy__body">
            {philosophy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="philosophy__facts">
            {philosophy.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="philosophy__note">
            <span className="mono steel">Field note / 001</span>
            {philosophy.note}
          </p>
        </div>

        <div className="philosophy__visual" data-reveal>
          <figure className="aperture">
            <Image
              src={aperture.image.src}
              alt={aperture.image.alt}
              fill
              loading="eager"
              sizes="(max-width: 720px) 100vw, (max-width: 1440px) 44vw, 34rem"
              className="aperture__img"
              style={{ objectPosition: aperture.image.position ?? "center" }}
            />

            <div className="aperture__frame" aria-hidden="true" />
            <span className="aperture__label aperture__label--tl" aria-hidden="true">
              {aperture.index} / {aperture.title}
            </span>
            <span className="aperture__label aperture__label--tr" aria-hidden="true">
              {brand.coordinates}
            </span>
            <span className="aperture__label aperture__label--bl" aria-hidden="true">
              Training frame / 01
            </span>
            <span className="aperture__label aperture__label--br" aria-hidden="true">
              Body / steel
            </span>
            <span className="aperture__scan" aria-hidden="true" />
            <span className="aperture__dot" aria-hidden="true" />

            <figcaption className="aperture__caption">
              <span className="aperture__caption-title">
                {aperture.index} {aperture.title}
              </span>
              <span className="aperture__caption-meta">
                {aperture.meta.map((item) => (
                  <span key={item}>{item}</span>
                ))}
                {aperture.image.sourceUrl ? (
                  <a
                    className="text-link"
                    href={aperture.image.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Open the original Instagram reel for this frame"
                  >
                    Source
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                ) : null}
              </span>
            </figcaption>
          </figure>

          <div className="philosophy__thesis">
            <span className="mono steel">Working principle / site thesis</span>
            <p>{philosophy.pullQuote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
