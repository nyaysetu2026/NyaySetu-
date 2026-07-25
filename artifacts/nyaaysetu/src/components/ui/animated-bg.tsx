import { motion } from "framer-motion";

/** Full-page animated mesh gradient + aurora + floating particles */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* ── Mesh gradient orbs ─────────────────────────── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "70vw",
          height: "70vw",
          top: "-20%",
          left: "-15%",
          background: "radial-gradient(circle, rgba(43,108,235,0.16) 0%, rgba(43,108,235,0.06) 40%, transparent 70%)",
          filter: "blur(80px)",
          animation: "meshMove1 18s ease-in-out infinite",
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "60vw",
          height: "60vw",
          bottom: "-15%",
          right: "-10%",
          background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 40%, transparent 70%)",
          filter: "blur(100px)",
          animation: "meshMove2 22s ease-in-out infinite 3s",
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "40vw",
          height: "40vw",
          top: "40%",
          left: "30%",
          background: "radial-gradient(circle, rgba(19,136,8,0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
          animation: "meshMove3 16s ease-in-out infinite 6s",
        }}
      />
      {/* Deep blue accent */}
      <div
        className="absolute rounded-full"
        style={{
          width: "35vw",
          height: "35vw",
          top: "60%",
          left: "-8%",
          background: "radial-gradient(circle, rgba(100,160,255,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "meshMove2 20s ease-in-out infinite 9s",
        }}
      />
      {/* Saffron accent */}
      <div
        className="absolute rounded-full"
        style={{
          width: "28vw",
          height: "28vw",
          top: "5%",
          right: "10%",
          background: "radial-gradient(circle, rgba(255,153,51,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "meshMove1 24s ease-in-out infinite 12s",
        }}
      />

      {/* ── Floating particles ─────────────────────────── */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: p.color,
            animation: `particleFloat${(i % 4) + 1} ${p.duration}s ease-in-out infinite ${p.delay}s`,
            opacity: p.opacity,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* ── Grid overlay ─────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Noise texture ─────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}

const particles = [
  { size: "4px",  left: "12%",  top: "20%",  color: "rgba(212,175,55,0.8)",   opacity: 0.4, duration: 12, delay: 0 },
  { size: "3px",  left: "25%",  top: "55%",  color: "rgba(43,108,235,0.9)",   opacity: 0.35, duration: 15, delay: 2 },
  { size: "5px",  left: "75%",  top: "15%",  color: "rgba(255,153,51,0.8)",   opacity: 0.3, duration: 10, delay: 4 },
  { size: "3px",  left: "88%",  top: "65%",  color: "rgba(212,175,55,0.9)",   opacity: 0.4, duration: 13, delay: 1 },
  { size: "4px",  left: "55%",  top: "80%",  color: "rgba(19,136,8,0.8)",     opacity: 0.25, duration: 8, delay: 3 },
  { size: "2px",  left: "40%",  top: "30%",  color: "rgba(255,255,255,0.9)",  opacity: 0.2, duration: 14, delay: 5 },
  { size: "3px",  left: "65%",  top: "45%",  color: "rgba(43,108,235,0.9)",   opacity: 0.3, duration: 11, delay: 6 },
  { size: "4px",  left: "18%",  top: "75%",  color: "rgba(212,175,55,0.8)",   opacity: 0.35, duration: 16, delay: 2 },
  { size: "2px",  left: "82%",  top: "35%",  color: "rgba(255,153,51,0.7)",   opacity: 0.25, duration: 9, delay: 7 },
  { size: "3px",  left: "48%",  top: "60%",  color: "rgba(255,255,255,0.8)",  opacity: 0.15, duration: 12, delay: 4 },
  { size: "5px",  left: "92%",  top: "82%",  color: "rgba(212,175,55,0.7)",   opacity: 0.3, duration: 17, delay: 0 },
  { size: "2px",  left: "33%",  top: "88%",  color: "rgba(43,108,235,0.8)",   opacity: 0.2, duration: 10, delay: 8 },
];
