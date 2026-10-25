"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Short splash: keep the brand moment but get the user scrolling fast.
    const minMs = reduce ? 150 : 700;

    const hide = () => {
      setFading(true);
      window.setTimeout(() => setVisible(false), reduce ? 0 : 320);
    };

    // Hide once the page is fully loaded, but never faster than minMs.
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      hide();
    };

    const timer = window.setTimeout(finish, minMs);

    // Safety net: never trap the user.
    const safety = window.setTimeout(finish, 3000);

    // Lock scroll while loading.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(safety);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`site-loader${fading ? " site-loader--fading" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="site-loader__inner">
        <span className="site-loader__eyebrow mono">Marrakech / MA</span>
        <h1 className="site-loader__wordmark">ONLY ZEKO</h1>
        <span className="site-loader__sub mono">Strength · Control · Discipline</span>
      </div>
      <div className="site-loader__bar" aria-hidden="true">
        <span className="site-loader__bar-fill" />
      </div>
    </div>
  );
}
