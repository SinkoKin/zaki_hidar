import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { InstagramIcon } from "./InstagramIcon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__identity">
            <a className="brand brand--footer" href="#top" aria-label="Only Zeko — back to top">
              <span className="brand__mark" aria-hidden="true">
                OZ
              </span>
              <span className="brand__type">
                <span className="brand__word">ONLY ZEKO</span>
                <span className="brand__sub">Calisthenics / MA</span>
              </span>
            </a>
            <p className="footer__statement">{site.footer.statement}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <span className="mono steel">Index</span>
            {site.nav.map((item) => (
              <a key={item.href} href={item.href}>
                <span className="mono">{item.index}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer__contact">
            <span className="mono steel">Direct</span>
            <a
              className="footer__ig"
              href={site.brand.instagram}
              target="_blank"
              rel="noreferrer noopener"
            >
              <InstagramIcon size={15} />
              @only_zeko
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <p>{site.brand.location}</p>
            <p>{site.brand.associationFull}</p>
            <p className="footer__coords mono">{site.brand.coordinates}</p>
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          ONLY ZEKO
        </div>

        <div className="footer__bottom">
          <span className="mono">{site.footer.rights}</span>
          <span className="mono footer__credit">{site.footer.credit}</span>
          <span className="mono">{site.footer.note}</span>
          <a className="footer__top-link mono" href="#top">
            Back to top
            <ArrowUp size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
