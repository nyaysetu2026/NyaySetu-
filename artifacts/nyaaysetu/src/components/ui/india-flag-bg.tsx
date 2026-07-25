/**
 * Subtle waving India flag background element.
 * Rendered at very low opacity — purely decorative / patriotic premium feel.
 */
export function IndiaFlagBg({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity: 0.07 }}
    >
      {/* Flag pole */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
          borderRadius: "2px",
        }}
      />

      {/* Flag body with wave animation */}
      <div
        style={{
          position: "absolute",
          left: "3px",
          top: "0",
          width: "100%",
          height: "100%",
          animation: "flagWave 4s ease-in-out infinite",
          transformOrigin: "left center",
          overflow: "hidden",
          borderRadius: "0 4px 4px 0",
        }}
      >
        {/* Saffron stripe */}
        <div style={{ height: "33.33%", background: "#FF9933" }} />
        {/* White stripe with Ashoka Chakra */}
        <div
          style={{
            height: "33.33%",
            background: "#F5F5F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChakraSVG />
        </div>
        {/* Green stripe */}
        <div style={{ height: "33.33%", background: "#138808" }} />
      </div>
    </div>
  );
}

function ChakraSVG() {
  return (
    <svg
      viewBox="0 0 40 40"
      style={{
        width: "60%",
        height: "60%",
        animation: "chakraSpin 8s linear infinite",
      }}
      fill="none"
    >
      <circle cx="20" cy="20" r="9" stroke="#000080" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="1.5" fill="#000080" />
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 360) / 24;
        const rad = (angle * Math.PI) / 180;
        const x1 = 20 + 1.5 * Math.cos(rad);
        const y1 = 20 + 1.5 * Math.sin(rad);
        const x2 = 20 + 9 * Math.cos(rad);
        const y2 = 20 + 9 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#000080"
            strokeWidth="0.8"
          />
        );
      })}
    </svg>
  );
}

/** Tricolor horizontal stripe bar — used as a decorative accent */
export function TricolorBar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-1 rounded-full overflow-hidden ${className}`}>
      <div className="flex-1" style={{ background: "#FF9933" }} />
      <div className="flex-1" style={{ background: "#ffffff22" }} />
      <div className="flex-1" style={{ background: "#138808" }} />
    </div>
  );
}

/** Small inline chakra icon */
export function ChakraIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 360) / 24;
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={20 + 1.5 * Math.cos(rad)}
            y1={20 + 1.5 * Math.sin(rad)}
            x2={20 + 9 * Math.cos(rad)}
            y2={20 + 9 * Math.sin(rad)}
            stroke="currentColor"
            strokeWidth="0.8"
          />
        );
      })}
    </svg>
  );
}
