"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduce ? 400 : 1500;

    const hide = () => {
      setFading(true);
      window.setTimeout(() => setVisible(false), reduce ? 0 : 600);
    };

    // Hide once the page is fully loaded, but never faster than minMs.
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      hide();
    };

    const timer = window.setTimeout(finish, minMs);

    if (document.readyState === "complete") {
      window.setTimeout(finish, minMs);
    } else {
      window.addEventListener("load", () => window.setTimeout(finish, 200), {
        once: true,
      });
    }

    // Safety net: never trap the user.
    const safety = window.setTimeout(finish, 4000);

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
