"use client"

export default function AnimatedLogo({
  className = "",
  size = 64,
  showText = true,
}: {
  className?: string
  size?: number
  showText?: boolean
}) {
  const logoHeight = showText ? size * 1.8 : size

  return (
    <div className={`animated-logo ${className}`} style={{ width: size, height: logoHeight }}>
      <svg width={size} height={logoHeight} viewBox="0 0 100 180" className="logo-svg">
        {/* Invisible orbit path for plane animation */}
        <defs>
          <path id="orbit" d="M50,15 A35,35 0 1,1 49.9,15" fill="none" stroke="none" />
        </defs>

        {/* Passport backgrounds (stacked effect) */}
        <rect
          x="18"
          y="23"
          width="45"
          height="55"
          rx="4"
          fill="none"
          stroke="#E8A87C"
          strokeWidth="2.5"
          opacity="0.6"
        />
        <rect x="20" y="25" width="45" height="55" rx="4" fill="none" stroke="#E8A87C" strokeWidth="2.5" />

        {/* Inner passport area */}
        <rect x="22" y="27" width="41" height="51" rx="3" fill="white" />

        {/* Central stamp circles */}
        <circle cx="42.5" cy="52.5" r="18" fill="none" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="42.5" cy="52.5" r="14" fill="none" stroke="#D4AF37" strokeWidth="1.5" />

        {/* Globe in center */}
        <g stroke="#D4AF37" strokeWidth="1" fill="none">
          <circle cx="42.5" cy="52.5" r="8" />
          {/* Vertical line */}
          <line x1="42.5" y1="44.5" x2="42.5" y2="60.5" />
          {/* Horizontal line */}
          <line x1="34.5" y1="52.5" x2="50.5" y2="52.5" />
          {/* Curved lines for globe */}
          <path d="M37,47 Q42.5,44 48,47" />
          <path d="M37,58 Q42.5,61 48,58" />
          <path d="M38,44.5 Q42.5,49 47,44.5" />
          <path d="M38,60.5 Q42.5,56 47,60.5" />
        </g>

        {/* STAMPED text around the circle */}
        <path id="textcircle" d="M 42.5,34.5 A 18,18 0 0,1 42.5,70.5" fill="none" stroke="none" />
        <text fontSize="6" fill="#D4AF37" fontWeight="600" letterSpacing="1" fontFamily="Rajdhani, sans-serif">
          <textPath href="#textcircle" startOffset="0%">
            STAMPED
          </textPath>
        </text>

        {/* Decorative swoosh */}
        <path d="M25,45 Q35,35 45,45 Q55,55 65,45" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.7" />

        {/* Animated airplane */}
        <g id="plane" className="plane">
          <path d="M0,-3 L6,0 L0,3 L-2,2 L-4,2 L-2,0 L-4,-2 Z" fill="#D4AF37" transform="scale(1.5)" />
        </g>

        {/* Company name text (if showText is true) */}
        {showText && (
          <g>
            {/* "Stamped in Style" script text */}
            <text
              x="50"
              y="110"
              textAnchor="middle"
              fontSize="16"
              fill="#E8A87C"
              fontFamily="Dancing Script, cursive"
              fontWeight="500"
            >
              <tspan x="50" dy="0">
                Stamped
              </tspan>
              <tspan x="50" dy="18">
                in Style
              </tspan>
            </text>

            {/* "TRAVEL CO." text */}
            <text
              x="50"
              y="160"
              textAnchor="middle"
              fontSize="8"
              fill="#D4AF37"
              fontFamily="Rajdhani, sans-serif"
              fontWeight="600"
              letterSpacing="2"
            >
              TRAVEL CO.
            </text>
          </g>
        )}
      </svg>

      <style jsx>{`
        .animated-logo {
          cursor: pointer;
          display: inline-block;
        }
        
        .logo-svg {
          transition: transform 0.3s ease;
        }
        
        .plane {
          offset-path: path('M50,15 A35,35 0 1,1 49.9,15');
          offset-rotate: auto;
          offset-distance: 0%;
          transition: offset-distance 2.5s ease-in-out;
          transform-origin: center;
        }
        
        .animated-logo:hover .plane {
          offset-distance: 100%;
        }
        
        .animated-logo:hover .logo-svg {
          transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
          .logo-svg text {
            font-size: 12px;
          }
          .logo-svg text:last-child {
            font-size: 6px;
          }
        }
      `}</style>
    </div>
  )
}
