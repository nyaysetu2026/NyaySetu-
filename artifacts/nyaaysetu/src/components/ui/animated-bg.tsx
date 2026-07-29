/** Full-page animated premium background — silk Indian flag, light rays, mesh orbs, particles */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* ── Deep base aurora gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 110% 80% at 20% 20%, rgba(20,40,90,0.45) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 80%, rgba(30,20,60,0.35) 0%, transparent 55%), hsl(222, 47%, 7%)",
        }}
      />

      {/* ── Silk Indian Flag — cinematic global presence ── */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden lg:block"
        style={{ width: "44vw", opacity: 0.065 }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            animation: "silkFlagWave 9s ease-in-out infinite",
            transformOrigin: "left center",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "33.33%", background: "linear-gradient(180deg, #FF9933 0%, #E8831A 100%)" }} />
          <div style={{ position: "absolute", top: "33.33%", left: 0, right: 0, height: "33.33%", background: "linear-gradient(180deg, #F0F0F0 0%, #E0E0E0 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SilkChakra />
          </div>
          <div style={{ position: "absolute", top: "66.66%", left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, #138808 0%, #0d6806 100%)" }} />
        </div>
      </div>

      {/* ── Medium flag on mobile — smaller, even subtler ── */}
      <div
        className="absolute right-0 top-[10%] lg:hidden"
        style={{ width: "60vw", height: "40vw", opacity: 0.045 }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", animation: "silkFlagWave 9s ease-in-out infinite", transformOrigin: "left center" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "33.33%", background: "#FF9933" }} />
          <div style={{ position: "absolute", top: "33.33%", left: 0, right: 0, height: "33.33%", background: "#F0F0F0" }} />
          <div style={{ position: "absolute", top: "66.66%", left: 0, right: 0, bottom: 0, background: "#138808" }} />
        </div>
      </div>

      {/* ── Diagonal light rays ── */}
      {lightRays.map((ray, i) => (
        <div
          key={`ray-${i}`}
          className="absolute"
          style={{
            width: ray.width,
            height: "220%",
            left: ray.left,
            top: "-60%",
            background: `linear-gradient(to bottom, transparent 0%, ${ray.color} 40%, ${ray.color} 60%, transparent 100%)`,
            transform: `rotate(${ray.angle}deg)`,
            transformOrigin: "center center",
            animation: `lightRayFade ${ray.duration}s ease-in-out infinite ${ray.delay}s`,
            filter: "blur(12px)",
          }}
        />
      ))}

      {/* ── Mesh gradient orbs ── */}
      <div
        className="absolute rounded-full"
        style={{
          width: "68vw", height: "68vw",
          top: "-22%", left: "-12%",
          background: "radial-gradient(circle, rgba(43,108,235,0.18) 0%, rgba(43,108,235,0.06) 40%, transparent 70%)",
          filter: "blur(80px)",
          animation: "meshMove1 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "58vw", height: "58vw",
          bottom: "-18%", right: "-10%",
          background: "radial-gradient(circle, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.04) 40%, transparent 70%)",
          filter: "blur(100px)",
          animation: "meshMove2 22s ease-in-out infinite 3s",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "42vw", height: "42vw",
          top: "38%", left: "28%",
          background: "radial-gradient(circle, rgba(19,136,8,0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "meshMove3 16s ease-in-out infinite 6s",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "32vw", height: "32vw",
          top: "58%", left: "-6%",
          background: "radial-gradient(circle, rgba(100,160,255,0.09) 0%, transparent 70%)",
          filter: "blur(65px)",
          animation: "meshMove2 20s ease-in-out infinite 9s",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "24vw", height: "24vw",
          top: "18%", right: "18%",
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(55px)",
          animation: "meshMove1 25s ease-in-out infinite 14s",
        }}
      />

      {/* ── Moving golden highlight lines (horizontal) ── */}
      {goldenLines.map((line, i) => (
        <div
          key={`gline-${i}`}
          className="absolute left-0 right-0"
          style={{
            height: "1px",
            top: line.top,
            background: `linear-gradient(90deg, transparent 0%, ${line.color} 20%, ${line.color} 80%, transparent 100%)`,
            animation: `goldenLineGlow ${line.duration}s ease-in-out infinite ${line.delay}s`,
          }}
        />
      ))}

      {/* ── Animated glowing grid ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.018,
        }}
      />

      {/* ── Glowing grid accent lines (sparse, colored) ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(43,108,235,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)",
          backgroundSize: "432px 432px",
          opacity: 0.012,
          animation: "gridPulse 8s ease-in-out infinite",
        }}
      />

      {/* ── Floating particles ── */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            left: p.left, top: p.top,
            background: p.color,
            animation: `particleFloat${(i % 4) + 1} ${p.duration}s ease-in-out infinite ${p.delay}s`,
            opacity: p.opacity,
            filter: "blur(0.5px)",
            boxShadow: p.glow,
          }}
        />
      ))}

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}

function SilkChakra() {
  return (
    <svg
      viewBox="0 0 40 40"
      style={{ width: "55%", height: "55%", animation: "chakraSpin 14s linear infinite" }}
      fill="none"
    >
      <circle cx="20" cy="20" r="9" stroke="#000080" strokeWidth="1" opacity="0.7" />
      <circle cx="20" cy="20" r="1.5" fill="#000080" opacity="0.7" />
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 360) / 24;
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={20 + 1.5 * Math.cos(rad)} y1={20 + 1.5 * Math.sin(rad)}
            x2={20 + 9 * Math.cos(rad)} y2={20 + 9 * Math.sin(rad)}
            stroke="#000080" strokeWidth="0.7" opacity="0.6"
          />
        );
      })}
    </svg>
  );
}

const lightRays = [
  { left: "8%",  width: "70px",  angle: 22,  color: "rgba(212,175,55,0.12)",  duration: 9,  delay: 0 },
  { left: "32%", width: "45px",  angle: -18, color: "rgba(43,108,235,0.10)", duration: 13, delay: 3 },
  { left: "62%", width: "90px",  angle: 18,  color: "rgba(255,153,51,0.09)",  duration: 11, delay: 6 },
  { left: "84%", width: "55px",  angle: -28, color: "rgba(212,175,55,0.10)", duration: 15, delay: 1 },
];

const goldenLines = [
  { top: "14%", color: "rgba(212,175,55,0.18)",  duration: 7,  delay: 0 },
  { top: "42%", color: "rgba(43,108,235,0.12)",  duration: 11, delay: 4 },
  { top: "71%", color: "rgba(19,136,8,0.14)",    duration: 9,  delay: 7 },
];

const particles = [
  { size: "4px",  left: "12%",  top: "20%",  color: "rgba(212,175,55,0.95)",  opacity: 0.45, duration: 12, delay: 0,  glow: "0 0 8px rgba(212,175,55,0.7)" },
  { size: "3px",  left: "25%",  top: "55%",  color: "rgba(43,108,235,0.95)",  opacity: 0.40, duration: 15, delay: 2,  glow: "0 0 5px rgba(43,108,235,0.7)" },
  { size: "5px",  left: "75%",  top: "15%",  color: "rgba(255,153,51,0.85)",  opacity: 0.35, duration: 10, delay: 4,  glow: "0 0 10px rgba(255,153,51,0.6)" },
  { size: "3px",  left: "88%",  top: "65%",  color: "rgba(212,175,55,0.95)",  opacity: 0.40, duration: 13, delay: 1,  glow: "0 0 6px rgba(212,175,55,0.7)" },
  { size: "4px",  left: "55%",  top: "80%",  color: "rgba(19,136,8,0.85)",    opacity: 0.30, duration: 8,  delay: 3,  glow: "0 0 7px rgba(19,136,8,0.6)" },
  { size: "2px",  left: "40%",  top: "30%",  color: "rgba(255,255,255,0.95)", opacity: 0.22, duration: 14, delay: 5,  glow: undefined },
  { size: "3px",  left: "65%",  top: "45%",  color: "rgba(43,108,235,0.95)",  opacity: 0.32, duration: 11, delay: 6,  glow: "0 0 5px rgba(43,108,235,0.6)" },
  { size: "4px",  left: "18%",  top: "75%",  color: "rgba(212,175,55,0.85)",  opacity: 0.38, duration: 16, delay: 2,  glow: "0 0 7px rgba(212,175,55,0.6)" },
  { size: "2px",  left: "82%",  top: "35%",  color: "rgba(255,153,51,0.75)",  opacity: 0.28, duration: 9,  delay: 7,  glow: undefined },
  { size: "3px",  left: "48%",  top: "60%",  color: "rgba(255,255,255,0.85)", opacity: 0.18, duration: 12, delay: 4,  glow: undefined },
  { size: "5px",  left: "92%",  top: "82%",  color: "rgba(212,175,55,0.75)",  opacity: 0.32, duration: 17, delay: 0,  glow: "0 0 9px rgba(212,175,55,0.5)" },
  { size: "2px",  left: "33%",  top: "88%",  color: "rgba(43,108,235,0.85)",  opacity: 0.22, duration: 10, delay: 8,  glow: undefined },
  { size: "3px",  left: "5%",   top: "48%",  color: "rgba(139,92,246,0.85)",  opacity: 0.26, duration: 13, delay: 5,  glow: "0 0 5px rgba(139,92,246,0.6)" },
  { size: "4px",  left: "70%",  top: "90%",  color: "rgba(212,175,55,0.85)",  opacity: 0.30, duration: 11, delay: 9,  glow: "0 0 7px rgba(212,175,55,0.5)" },
  { size: "2px",  left: "95%",  top: "10%",  color: "rgba(43,108,235,0.95)",  opacity: 0.35, duration: 8,  delay: 3,  glow: "0 0 4px rgba(43,108,235,0.7)" },
  { size: "3px",  left: "50%",  top: "5%",   color: "rgba(212,175,55,0.85)",  opacity: 0.28, duration: 14, delay: 11, glow: "0 0 5px rgba(212,175,55,0.5)" },
];
