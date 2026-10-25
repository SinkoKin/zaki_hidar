"use client";

import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

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
          <p className="eyebrow">System / Interrupted</p>
          <h1>
            Lost the
            <br />
            <span>line.</span>
          </h1>
          <p className="status-page__lede">
            Something broke mid-sequence. Retry the page, or return home. The work is still there.
          </p>
          <div className="status-page__actions">
            <button className="btn btn--primary" type="button" onClick={() => retry()}>
              <RefreshCw size={15} aria-hidden="true" />
              Try again
            </button>
            <Link className="btn btn--ghost" href="/">
              Back home
            </Link>
          </div>
          {error.digest ? (
            <p className="status-page__digest mono">Reference / {error.digest}</p>
          ) : null}
        </div>

        <div className="status-page__foot mono">
          <span>Only Zeko / Marrakech, Morocco</span>
          <span>Bodyweight / Skill / Control</span>
        </div>
      </div>
    </main>
  );
}
