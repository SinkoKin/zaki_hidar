import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { InstagramIcon } from "./InstagramIcon";

const [firstLine, secondLine] = site.finalCta.heading;

export function FinalCta() {
  return (
    <section className="final" id="start" aria-labelledby="final-title">
      <div className="final__wash" aria-hidden="true" />
      <div className="final__inner container" data-reveal>
        <p className="eyebrow eyebrow--plain final__eyebrow">{site.finalCta.eyebrow}</p>

        <h2 className="final__title" id="final-title">
          <span>{firstLine}</span>
          <span>
            {secondLine.replace(".", "")}
            <span className="final__dot">.</span>
          </span>
        </h2>

        <p className="final__body">{site.finalCta.body}</p>

        <div className="final__actions">
          <a
            className="btn btn--primary"
            href={site.brand.instagram}
            target="_blank"
            rel="noreferrer noopener"
          >
            <InstagramIcon size={15} />
            {site.finalCta.primaryCta}
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a
            className="btn btn--ghost"
            href={site.brand.instagram}
            target="_blank"
            rel="noreferrer noopener"
          >
            {site.finalCta.secondaryCta}
            <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>

        <p className="final__meta mono">{site.finalCta.meta}</p>
      </div>

      <div className="final__edge final__edge--left mono" aria-hidden="true">
        <span>END / 07</span>
        <span>MARRAKECH</span>
      </div>
      <div className="final__edge final__edge--right mono" aria-hidden="true">
        <span>ONLY ZEKO</span>
        <span>EST. BODYWEIGHT</span>
      </div>
    </section>
  );
}
