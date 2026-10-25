"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { InstagramIcon } from "./InstagramIcon";
import { LogoMark } from "./LogoMark";

const focusableSelector =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    let queuedY = -1;

    const apply = () => {
      raf = 0;
      const y = queuedY;
      queuedY = -1;
      setScrolled(y > 28);
      const delta = y - lastScrollY.current;
      if (y > 120 && delta > 6) setHidden(true);
      else if (delta < -4) setHidden(false);
      lastScrollY.current = y;
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y === queuedY) return;
      queuedY = y;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) {
      window.setTimeout(() => toggleRef.current?.focus(), 40);
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Lenis owns window scrolling on desktop: pause it while the overlay is up
    // so wheel input inside the menu behaves natively.
    window.__zekoLenis?.stop();
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab" || !overlayRef.current) return;

      const nodes = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((node) => node.offsetParent !== null);

      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.__zekoLenis?.start();
    };
  }, [open, closeMenu]);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${hidden && !open ? "is-hidden" : ""}`} data-header>
        <div className="site-header__inner">
          <a className="brand" href="#top" aria-label="Only Zeko — back to top">
            <span className="brand__mark" aria-hidden="true">
              <LogoMark />
            </span>
            <span className="brand__type">
              <span className="brand__word">ONLY ZEKO</span>
              <span className="brand__sub">Calisthenics / MA</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            {site.nav.map((item) => (
              <a key={item.href} href={item.href}>
                <span className="site-nav__index">{item.index}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <a
              className="site-header__ig"
              href={site.brand.instagram}
              target="_blank"
              rel="noreferrer noopener"
            >
              <InstagramIcon size={14} />
              <span>@only_zeko</span>
              <ArrowUpRight size={12} strokeWidth={1.8} aria-hidden="true" />
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              ref={toggleRef}
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              <span>{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
        <div className="site-header__progress" aria-hidden="true">
          <span />
        </div>
      </header>

      <div
        className={`menu-overlay ${open ? "is-open" : ""}`}
        id="site-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        data-lenis-prevent
      >
        <div className="menu-overlay__grid">
          <div className="menu-overlay__top">
            <span className="mono steel">Navigation / 2026</span>
            <button
              className="menu-overlay__close"
              type="button"
              onClick={() => closeMenu(true)}
              ref={closeRef}
              tabIndex={open ? 0 : -1}
            >
              <X size={16} aria-hidden="true" />
              Close
            </button>
          </div>

          <nav className="menu-overlay__nav" aria-label="Mobile primary">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => closeMenu(false)}
                tabIndex={open ? 0 : -1}
              >
                <span className="menu-overlay__index">{item.index}</span>
                <span>{item.label}</span>
                <ArrowUpRight className="menu-overlay__arrow" size={22} aria-hidden="true" />
              </a>
            ))}
          </nav>

          <div className="menu-overlay__bottom">
            <div>
              <span className="mono steel">Base</span>
              <p>{site.brand.location}</p>
            </div>
            <div>
              <span className="mono steel">Contact</span>
              <a
                className="text-link"
                href={site.brand.instagram}
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={open ? 0 : -1}
              >
                {site.brand.handle}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </div>
            <p className="menu-overlay__note">
              {site.brand.associationFull}
              <br />
              Marrakech, Morocco
            </p>
          </div>
        </div>
        <span className="menu-overlay__ghost" aria-hidden="true">
          ZEKO
        </span>
      </div>
    </>
  );
}
