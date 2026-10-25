import type { Skill } from "@/data/site";

type Props = {
  glyph: Skill["glyph"];
  className?: string;
};

/**
 * Bespoke technical line diagrams. Decorative — skill names are announced by
 * the parent button, so the SVG never carries meaning on its own.
 */
export function SkillGlyph({ glyph, className }: Props) {
  const common = {
    viewBox: "0 0 120 120",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
    focusable: "false" as const,
    className,
  };

  if (glyph === "handstand") {
    return (
      <svg {...common}>
        <path d="M14 102h92" stroke="currentColor" strokeOpacity=".35" />
        <circle cx="60" cy="20" r="5" stroke="currentColor" />
        <path d="M60 25v37M60 62l-9-16M60 62l9-16M60 62v28" stroke="currentColor" />
        <path d="M51 90l-9 12M69 90l9 12" stroke="currentColor" />
        <path d="M37 102h18M65 102h18" stroke="var(--accent)" />
        <path d="M76 20h22M76 26h14" stroke="currentColor" strokeOpacity=".3" />
        <path d="M60 8v6" stroke="var(--accent)" />
      </svg>
    );
  }

  if (glyph === "single-arm") {
    return (
      <svg {...common}>
        <path d="M10 104h100" stroke="currentColor" strokeOpacity=".35" />
        <circle cx="78" cy="26" r="5" stroke="currentColor" />
        <path d="M78 31 57 68" stroke="currentColor" />
        <path d="M57 68 38 92M57 68l24 2M57 68l-3 22" stroke="currentColor" />
        <path d="M38 92l-4 12" stroke="var(--accent)" />
        <path d="M30 104h16" stroke="var(--accent)" />
        <path d="M88 34l14-10M88 34l18 4" stroke="currentColor" strokeOpacity=".3" />
        <circle cx="38" cy="92" r="2.6" fill="var(--accent)" />
      </svg>
    );
  }

  if (glyph === "planche") {
    return (
      <svg {...common}>
        <path d="M8 96h104" stroke="currentColor" strokeOpacity=".35" />
        <circle cx="26" cy="48" r="5" stroke="currentColor" />
        <path d="M31 50h54" stroke="currentColor" />
        <path d="M85 50l12-6M85 50l12 6" stroke="currentColor" />
        <path d="M46 50v22M70 50v22" stroke="currentColor" />
        <path d="M44 72h10M68 72h10" stroke="var(--accent)" />
        <path d="M36 84h48" stroke="currentColor" strokeOpacity=".25" />
        <path d="M18 34h20M18 40h12" stroke="currentColor" strokeOpacity=".3" />
        <path d="M56 38h34" stroke="var(--accent)" strokeDasharray="2 5" />
      </svg>
    );
  }

  if (glyph === "transition") {
    return (
      <svg {...common}>
        <path d="M16 96h88" stroke="currentColor" strokeOpacity=".35" />
        <circle cx="38" cy="28" r="4" stroke="currentColor" />
        <path d="M38 32v26M38 58l-9 20M38 58l9 20M29 78h-7M47 78h7" stroke="currentColor" />
        <circle cx="90" cy="38" r="4" stroke="currentColor" />
        <path d="M90 42v20M90 62l-10 14M90 62l10 14M80 76h-7M100 76h7" stroke="currentColor" />
        <path
          d="M50 46c12-18 28-18 36-2"
          stroke="var(--accent)"
          strokeDasharray="3 4"
          markerEnd="url(#arrow)"
        />
        <defs>
          <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 8 4 0 8" fill="var(--accent)" />
          </marker>
        </defs>
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="60" cy="60" r="38" stroke="currentColor" strokeOpacity=".3" />
      <circle cx="60" cy="60" r="24" stroke="currentColor" strokeOpacity=".55" strokeDasharray="2 4" />
      <circle cx="60" cy="60" r="11" stroke="var(--accent)" />
      <path d="M60 6v20M60 94v20M6 60h20M94 60h20" stroke="currentColor" strokeOpacity=".45" />
      <path d="M16 24l12 12M104 24 92 36M16 96l12-12M104 96 92 84" stroke="currentColor" strokeOpacity=".2" />
      <circle cx="60" cy="60" r="2.6" fill="var(--accent)" />
    </svg>
  );
}
