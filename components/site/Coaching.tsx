import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function Coaching() {
  return (
    <section className="coaching section" id="coaching" aria-labelledby="coaching-title">
      <div className="container">
        <div className="coaching__head">
          <div data-reveal>
            <p className="eyebrow">{site.coaching.eyebrow}</p>
            <h2 id="coaching-title">{site.coaching.heading}</h2>
          </div>
          <div className="coaching__aside" data-reveal>
            <p>{site.coaching.intro}</p>
            <a
              className="btn btn--primary"
              href={site.brand.instagram}
              target="_blank"
              rel="noreferrer noopener"
            >
              {site.coaching.primaryLinkLabel}
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="coaching__options">
          {site.coaching.options.map((option) => (
            <article
              className={`coaching__option ${option.featured ? "is-featured" : ""}`}
              key={option.number}
            >
              <span className="coaching__number mono">{option.number}</span>

              <div className="coaching__title">
                <h3>{option.title}</h3>
                <span className="mono">{option.meta}</span>
              </div>

              <div className="coaching__body">
                <p>{option.body}</p>
                <ul className="coaching__points">
                  {option.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div className="coaching__action">
                <span className="mono steel">{option.availability}</span>
                <a
                  className="coaching__link"
                  href={site.brand.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Enquire on Instagram about ${option.title}`}
                >
                  <span>Enquire</span>
                  <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="coaching__note">
          <span className="mono steel">Booking note</span>
          {site.coaching.note}
        </p>
      </div>
    </section>
  );
}
