import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <main className="status-page">
      <div className="status-page__grid" aria-hidden="true" />
      <div className="container status-page__inner">
        <Link className="brand" href="/" aria-label="Only Zeko home">
          <span className="brand__mark" aria-hidden="true">
            OZ
          </span>
          <span className="brand__type">
            <span className="brand__word">ONLY ZEKO</span>
            <span className="brand__sub">Calisthenics / MA</span>
          </span>
        </Link>

        <div className="status-page__body">
          <p className="eyebrow">Error / 404</p>
          <h1>
            Off the
            <br />
            <span>line.</span>
          </h1>
          <p className="status-page__lede">
            This page is not part of the sequence. Return to the beginning, or find the work on
            Instagram.
          </p>
          <div className="status-page__actions">
            <Link className="btn btn--primary" href="/">
              <ArrowLeft size={15} aria-hidden="true" />
              Back to the site
            </Link>
            <a
              className="btn btn--ghost"
              href={site.brand.instagram}
              target="_blank"
              rel="noreferrer noopener"
            >
              {site.brand.handle}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="status-page__foot mono">
          <span>Only Zeko / Marrakech, Morocco</span>
          <span>Bodyweight / Skill / Control</span>
        </div>
      </div>
    </main>
  );
}
