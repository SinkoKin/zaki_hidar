export function SceneFallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <div className="scene-fallback__halo" />
      <svg
        className="scene-fallback__svg"
        viewBox="0 0 900 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="steel-fallback" x1="300" y1="140" x2="650" y2="760" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D9DCD4" />
            <stop offset="0.26" stopColor="#747B75" />
            <stop offset="0.5" stopColor="#F2EFE6" />
            <stop offset="0.73" stopColor="#4D534E" />
            <stop offset="1" stopColor="#B6BBB3" />
          </linearGradient>
          <linearGradient id="stone-fallback" x1="300" y1="620" x2="600" y2="760" gradientUnits="userSpaceOnUse">
            <stop stopColor="#31342D" />
            <stop offset="1" stopColor="#151613" />
          </linearGradient>
          <radialGradient id="orange-fallback" cx="0" cy="0" r="1" gradientTransform="translate(450 390) rotate(90) scale(310)">
            <stop stopColor="#FF9A5C" stopOpacity="0.16" />
            <stop offset="1" stopColor="#FF9A5C" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="450" cy="410" r="330" fill="url(#orange-fallback)" />
        <ellipse cx="450" cy="410" rx="302" ry="304" stroke="#F2EFE6" strokeOpacity="0.12" />

        <rect x="210" y="130" width="9" height="520" rx="4.5" fill="url(#steel-fallback)" />
        <rect x="681" y="130" width="9" height="520" rx="4.5" fill="url(#steel-fallback)" />
        <rect x="210" y="130" width="480" height="9" rx="4.5" fill="url(#steel-fallback)" />

        {/* Hanging straps + rings */}
        <rect x="375" y="139" width="6" height="78" rx="3" fill="url(#steel-fallback)" fillOpacity="0.85" />
        <rect x="519" y="139" width="6" height="78" rx="3" fill="url(#steel-fallback)" fillOpacity="0.85" />
        <circle cx="378" cy="244" r="27" stroke="url(#steel-fallback)" strokeWidth="6" fill="none" />
        <circle cx="522" cy="244" r="27" stroke="url(#steel-fallback)" strokeWidth="6" fill="none" />

        {/* Barbell resting on the plinth */}
        <rect x="250" y="601" width="400" height="7" rx="3.5" fill="url(#steel-fallback)" />
        <rect x="292" y="568" width="20" height="70" rx="7" fill="url(#steel-fallback)" />
        <rect x="588" y="568" width="20" height="70" rx="7" fill="url(#steel-fallback)" />
        <rect x="320" y="584" width="11" height="54" rx="4" fill="#FF9A5C" fillOpacity="0.85" />
        <rect x="569" y="584" width="11" height="54" rx="4" fill="#FF9A5C" fillOpacity="0.85" />

        <rect x="290" y="638" width="320" height="38" rx="4" fill="url(#stone-fallback)" />
        <rect x="320" y="676" width="260" height="12" rx="3" fill="#FF9A5C" fillOpacity="0.22" />

        <g stroke="#F2EFE6" strokeOpacity="0.22">
          <path d="M90 410H165M735 410H810M450 66V126M450 694V754" />
          <path d="M104 380V440M796 380V440M420 80H480M420 740H480" />
        </g>

        <g fill="#8A8F8A" fontFamily="monospace" fontSize="10" letterSpacing="2">
          <text x="90" y="360">THE RIG / 01</text>
          <text x="90" y="465">RINGS / ACTIVE</text>
          <text x="712" y="360">LOAD / BODY + STEEL</text>
          <text x="712" y="465">MARRAKECH / MA</text>
        </g>
      </svg>
    </div>
  );
}
