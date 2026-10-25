/**
 * OZ monogram — the Only Zeko brand mark.
 *
 * One source of truth for the mark everywhere it appears: the favicon
 * (app/icon.svg mirrors this exact geometry), the header, the footer and the
 * status pages. The outer frame is provided by the surrounding `.brand__mark`
 * border; this component draws the inner accent frame and the two glyphs.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" className={className}>
      <rect className="logo-mark__frame" x="6" y="6" width="52" height="52" />
      <circle className="logo-mark__glyph" cx="22" cy="32" r="8.2" />
      <path className="logo-mark__glyph logo-mark__glyph--accent" d="M35 21.6H50.4L35 42.4H50.4" />
    </svg>
  );
}
