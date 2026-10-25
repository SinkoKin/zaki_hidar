import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { site } from "@/data/site";

export function Gallery() {
  return (
    <section className="gallery section" id="work" aria-labelledby="gallery-title">
      <div className="container container--wide">
        <div className="section-head gallery__head">
          <div data-reveal>
            <p className="eyebrow">{site.gallery.eyebrow}</p>
            <h2 id="gallery-title">{site.gallery.heading}</h2>
          </div>
          <div className="section-head__aside" data-reveal>
            <p>{site.gallery.intro}</p>
            <p className="mono">{site.gallery.credit}</p>
          </div>
        </div>

        <div className="gallery__grid">
          {site.gallery.items.map((item, index) => (
            <figure
              className={`gallery__item gallery__item--${index + 1}`}
              key={item.src}
              data-reveal
            >
              <div className="gallery__media">
                <div className="gallery__parallax" data-parallax>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 45vw"
                    className="gallery__img"
                    style={{ objectPosition: item.position ?? "center" }}
                  />
                </div>
                <span className="gallery__index mono" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="gallery__cross" aria-hidden="true" />
                <span className="gallery__label mono">{item.label}</span>
              </div>

              <figcaption className="gallery__caption">
                <span className="mono">
                  {String(index + 1).padStart(2, "0")} / Field note
                </span>
                {item.sourceUrl ? (
                  <a
                    className="text-link"
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Open the original Instagram post for ${item.label}`}
                  >
                    Original
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="gallery__foot" data-reveal>
          <p>{site.gallery.credit}</p>
          <a
            className="text-link"
            href={site.brand.instagram}
            target="_blank"
            rel="noreferrer noopener"
          >
            {site.brand.instagramDisplay}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
