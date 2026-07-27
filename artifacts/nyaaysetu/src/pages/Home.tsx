import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Scale, Shield, FileText, Bot, Users, Landmark,
  ChevronRight, AlertTriangle, Sparkles, Zap, Globe, Lock, CheckCircle,
} from "lucide-react";
import { TricolorBar, IndiaFlagBg } from "@/components/ui/india-flag-bg";
import logoSrc from "@assets/nyaaysetu-logo.png";

function AnimatedCounter({ to, duration = 2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function AnimatedJusticeScale() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 180, height: 164 }}>
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 220, height: 220,
          background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 65%)",
          filter: "blur(20px)",
          animation: "orbPulse 4s ease-in-out infinite",
        }}
      />
      <svg viewBox="0 0 220 200" width="180" height="164" fill="none">
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5d06b" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
          <linearGradient id="goldGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c9a227" />
            <stop offset="50%" stopColor="#f5d06b" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect x="70" y="185" width="80" height="8" rx="4" fill="url(#goldGrad2)" opacity="0.9" />
        <rect x="80" y="178" width="60" height="8" rx="3" fill="url(#goldGrad2)" opacity="0.8" />
        <rect x="108" y="60" width="4" height="120" rx="2" fill="url(#goldGrad)" opacity="0.9" />
        <circle cx="110" cy="55" r="8" fill="url(#goldGrad)" opacity="0.95" filter="url(#goldGlow)" />
        <circle cx="108" cy="53" r="2.5" fill="rgba(255,255,255,0.5)" />
        <g style={{ transformOrigin: "110px 80px", animation: "scaleBalance 5s ease-in-out infinite" }}>
          <rect x="30" y="77" width="160" height="5" rx="2.5" fill="url(#goldGrad2)" opacity="0.95" />
          <line x1="40" y1="82" x2="38" y2="108" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.7" />
          <line x1="38" y1="108" x2="36" y2="130" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.7" />
          <line x1="180" y1="82" x2="182" y2="108" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.7" />
          <line x1="182" y1="108" x2="184" y2="130" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.7" />
          <g style={{ transformOrigin: "40px 130px", animation: "panSwingLeft 5s ease-in-out infinite" }}>
            <path d="M12 130 Q40 140 68 130" stroke="url(#goldGrad2)" strokeWidth="2" fill="none" opacity="0.9" />
            <circle cx="25" cy="133" r="2" fill="rgba(212,175,55,0.6)" />
            <circle cx="40" cy="136" r="2.5" fill="rgba(212,175,55,0.7)" />
            <circle cx="55" cy="133" r="2" fill="rgba(212,175,55,0.6)" />
          </g>
          <g style={{ transformOrigin: "180px 130px", animation: "panSwingRight 5s ease-in-out infinite" }}>
            <path d="M152 130 Q180 140 208 130" stroke="url(#goldGrad2)" strokeWidth="2" fill="none" opacity="0.9" />
            <circle cx="165" cy="133" r="2" fill="rgba(212,175,55,0.6)" />
            <circle cx="180" cy="136" r="2.5" fill="rgba(212,175,55,0.7)" />
            <circle cx="195" cy="133" r="2" fill="rgba(212,175,55,0.6)" />
          </g>
        </g>
        <ellipse cx="110" cy="80" rx="80" ry="4" fill="rgba(212,175,55,0.15)" filter="url(#goldGlow)" />
      </svg>
    </div>
  );
}

function FloatingLegalIcon({
  icon: Icon, x, y, delay, color, bg, size = 36
}: {
  icon: any; x: string; y: string; delay: number; color: string; bg: string; size?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden xl:flex items-center justify-center rounded-2xl"
      style={{
        left: x, top: y, width: size, height: size,
        background: bg,
        border: `1px solid ${color}40`,
        boxShadow: `0 0 20px ${color}25, 0 4px 12px rgba(0,0,0,0.3)`,
        backdropFilter: "blur(12px)",
      }}
      animate={{
        y: [0, -12, 4, -8, 0],
        rotate: [0, 3, -2, 1, 0],
        opacity: [0.7, 0.9, 0.75, 0.85, 0.7],
      }}
      transition={{
        duration: 7 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Icon style={{ width: size * 0.45, height: size * 0.45, color }} />
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Home() {
  const services = [
    {
      title: "AI Legal Assistant", icon: Bot,
      desc: "Intelligent guidance on rights, IPC codes and legal procedures.",
      link: "/ai-chat", accent: "text-blue-400", bg: "bg-blue-500/10",
      border: "rgba(59,130,246,0.35)", glow: "rgba(59,130,246,0.18)",
      topLine: "rgba(59,130,246,0.6)",
      badge: "AI Powered",
    },
    {
      title: "Expert Directory", icon: Users,
      desc: "Consult verified Bar Council advocates across India.",
      link: "/lawyers", accent: "text-emerald-400", bg: "bg-emerald-500/10",
      border: "rgba(52,211,153,0.35)", glow: "rgba(52,211,153,0.15)",
      topLine: "rgba(52,211,153,0.6)",
      badge: "Verified",
    },
    {
      title: "Case Tracker", icon: Landmark,
      desc: "Monitor hearings, court orders and filing dates.",
      link: "/cases", accent: "text-amber-400", bg: "bg-amber-500/10",
      border: "rgba(251,191,36,0.35)", glow: "rgba(251,191,36,0.15)",
      topLine: "rgba(251,191,36,0.6)",
      badge: "Live",
    },
    {
      title: "Document Vault", icon: FileText,
      desc: "Access standardized legal templates in multiple languages.",
      link: "/documents", accent: "text-purple-400", bg: "bg-purple-500/10",
      border: "rgba(167,139,250,0.35)", glow: "rgba(167,139,250,0.15)",
      topLine: "rgba(167,139,250,0.6)",
      badge: "4 Languages",
    },
    {
      title: "Know Your Rights", icon: Scale,
      desc: "Plain-language constitutional guides for every citizen.",
      link: "/rights", accent: "text-accent", bg: "bg-accent/10",
      border: "rgba(212,175,55,0.35)", glow: "rgba(212,175,55,0.15)",
      topLine: "rgba(212,175,55,0.6)",
      badge: "Constitution",
    },
    {
      title: "Emergency Help", icon: Shield,
      desc: "Immediate access to national helplines and legal aid.",
      link: "/emergency", accent: "text-red-400", bg: "bg-red-500/10",
      border: "rgba(248,113,113,0.35)", glow: "rgba(248,113,113,0.15)",
      topLine: "rgba(248,113,113,0.6)",
      badge: "24/7",
    },
  ];

  const ticker = "⚖️ 50,000+ Citizens Served  •  🏛️ Bar Council Verified  •  🤖 AI-Powered Legal Guidance  •  📜 4 Indian Languages  •  🛡️ End-to-End Encrypted  •  📍 6 Metro Cities  •  🇮🇳 Justice For Every Citizen  •  ";

  return (
    <div className="w-full min-h-screen flex flex-col">

      {/* ── Live Ticker ── */}
      <div className="relative overflow-hidden border-b py-2.5 shrink-0" style={{
        background: "rgba(43,108,235,0.05)",
        borderColor: "rgba(43,108,235,0.1)",
      }}>
        <div className="absolute left-0 top-0 bottom-0 w-[3px] flex flex-col">
          <div style={{ flex: 1, background: "#FF9933" }} />
          <div style={{ flex: 1, background: "#F0F0F0" }} />
          <div style={{ flex: 1, background: "#138808" }} />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-[3px] flex flex-col">
          <div style={{ flex: 1, background: "#FF9933" }} />
          <div style={{ flex: 1, background: "#F0F0F0" }} />
          <div style={{ flex: 1, background: "#138808" }} />
        </div>
        <div className="flex gap-0 whitespace-nowrap" style={{ animation: "ticker 32s linear infinite" }}>
          <span className="text-xs font-medium text-secondary/70 tracking-wide pl-4">{ticker}{ticker}</span>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative flex flex-col justify-center min-h-[88vh] pt-10 pb-16 overflow-hidden bg-transparent px-4 sm:px-6">

        {/* India flag — right side, very subtle */}
        <div className="absolute right-0 top-[10%] pointer-events-none hidden lg:block" style={{ width: 180, height: 108, opacity: 0.05 }}>
          <IndiaFlagBg />
        </div>

        {/* Floating legal icons — desktop only */}
        <FloatingLegalIcon icon={Bot}      x="5%"  y="18%" delay={0}   color="#3b82f6" bg="rgba(59,130,246,0.12)"   size={42} />
        <FloatingLegalIcon icon={Shield}   x="6%"  y="62%" delay={1.5} color="#34d399" bg="rgba(52,211,153,0.12)"   size={36} />
        <FloatingLegalIcon icon={FileText} x="83%" y="22%" delay={0.8} color="#a78bfa" bg="rgba(167,139,250,0.12)"  size={38} />
        <FloatingLegalIcon icon={Users}    x="85%" y="64%" delay={2.2} color="#34d399" bg="rgba(52,211,153,0.10)"   size={34} />
        <FloatingLegalIcon icon={Landmark} x="3%"  y="40%" delay={3}   color="#f59e0b" bg="rgba(245,158,11,0.10)"   size={32} />
        <FloatingLegalIcon icon={Scale}    x="87%" y="43%" delay={1.2} color="#d4af37" bg="rgba(212,175,55,0.12)"   size={40} />

        {/* Animated orbs */}
        <motion.div
          animate={{ y: [0, -28, 0], scale: [1, 1.08, 1], opacity: [0.14, 0.20, 0.14] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-18%] left-[-10%] w-[65%] h-[65%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(221 83% 58% / 0.5) 0%, transparent 65%)", filter: "blur(90px)" }}
        />
        <motion.div
          animate={{ y: [0, 22, 0], scale: [1, 1.06, 1], opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-12%] right-[-10%] w-[55%] h-[55%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(43 90% 55% / 0.4) 0%, transparent 65%)", filter: "blur(110px)" }}
        />
        <motion.div
          animate={{ y: [0, -14, 0], x: [0, 10, 0], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[30%] right-[5%] w-[28%] h-[28%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,153,51,0.55) 0%, transparent 70%)", filter: "blur(70px)" }}
        />
        <motion.div
          animate={{ y: [0, 16, 0], x: [0, -8, 0], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[5%] left-[10%] w-[22%] h-[22%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(19,136,8,0.5) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        {/* Gradient diagonal lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute" style={{
            width: "2px", height: "60%", left: "20%", top: "20%",
            background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.2), transparent)",
            transform: "rotate(25deg)",
            animation: "lightRayFade 8s ease-in-out infinite",
          }} />
          <div className="absolute" style={{
            width: "1px", height: "50%", left: "75%", top: "10%",
            background: "linear-gradient(to bottom, transparent, rgba(43,108,235,0.18), transparent)",
            transform: "rotate(-20deg)",
            animation: "lightRayFade 11s ease-in-out infinite 3s",
          }} />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center text-center px-4">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full">

            {/* Logo */}
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative"
              >
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
                    filter: "blur(16px)",
                    transform: "scale(1.6)",
                    animation: "orbPulse 3.5s ease-in-out infinite",
                  }}
                />
                <img
                  src={logoSrc}
                  alt="NyaySetu"
                  className="relative z-10 drop-shadow-2xl"
                  style={{
                    height: 80,
                    width: "auto",
                    filter: "drop-shadow(0 0 24px rgba(212,175,55,0.35)) drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-sm text-foreground/80 mb-6"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="font-medium">India's Most Advanced Legal Platform</span>
              <div className="flex items-center gap-0.5 ml-1">
                <div className="w-2 h-2 rounded-sm overflow-hidden flex flex-col">
                  <div style={{ flex: 1, background: "#FF9933" }} />
                  <div style={{ flex: 1, background: "#F0F0F0" }} />
                  <div style={{ flex: 1, background: "#138808" }} />
                </div>
              </div>
            </motion.div>

            {/* Animated Justice Scale — centered above title on desktop */}
            <motion.div
              variants={itemVariants}
              className="hidden lg:flex justify-center mb-4"
            >
              <AnimatedJusticeScale />
            </motion.div>

            {/* Title */}
            <motion.h1 variants={itemVariants} className="font-serif text-5xl sm:text-7xl lg:text-[7.5rem] xl:text-[8.5rem] font-extrabold tracking-tight leading-[0.92] mb-5">
              <span className="text-foreground">Nyay</span>
              <span
                style={{
                  background: "linear-gradient(135deg, #c9a227 0%, #f5d06b 35%, #d4af37 65%, #FF9933 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 40px rgba(212,175,55,0.3))",
                }}
              >
                Setu
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-2xl text-foreground/60 mb-3 max-w-xl mx-auto font-light leading-relaxed">
              Justice is no longer{" "}
              <em className="font-serif text-accent not-italic font-normal" style={{ filter: "drop-shadow(0 0 12px rgba(212,175,55,0.4))" }}>
                out of reach.
              </em>
            </motion.p>
            <motion.p variants={itemVariants} className="text-sm md:text-base text-foreground/40 mb-10 max-w-md mx-auto font-light">
              Your world-class legal companion — AI-powered, always available, built for every Indian.
            </motion.p>

            {/* Tricolor bar */}
            <motion.div variants={itemVariants} className="flex justify-center mb-8">
              <TricolorBar className="w-20" />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-4 sm:px-0">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="w-full text-base h-13 px-9 text-white rounded-2xl relative overflow-hidden group border-0"
                    style={{
                      height: 52,
                      background: "linear-gradient(135deg, hsl(221 83% 55%) 0%, hsl(221 83% 42%) 100%)",
                      boxShadow: "0 0 40px rgba(43,108,235,0.5), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                    }}
                  >
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div
                        className="absolute inset-y-0 w-1/3"
                        style={{
                          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                          animation: "shimmerSweep 2.5s ease-in-out infinite",
                        }}
                      />
                    </div>
                    <span className="relative z-10 flex items-center font-semibold gap-2">
                      Enter Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/ai-chat" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-base h-13 px-9 rounded-2xl text-foreground/80 hover:text-white transition-all relative overflow-hidden group"
                    style={{
                      height: 52,
                      background: "rgba(255,255,255,0.035)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)" }} />
                    </div>
                    <Bot className="w-4 h-4 mr-2 text-secondary" /> Ask AI Assistant
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mt-7 flex-wrap">
              {[
                { icon: CheckCircle, text: "AI Powered", color: "text-blue-400", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
                { icon: Lock, text: "Encrypted", color: "text-emerald-400", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)" },
                { icon: Shield, text: "Verified", color: "text-accent", bg: "rgba(212,175,55,0.08)", border: "rgba(212,175,55,0.2)" },
                { icon: Globe, text: "India Ready", color: "text-purple-400", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)" },
              ].map((badge, i) => {
                const BadgeIcon = badge.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: badge.bg,
                      border: `1px solid ${badge.border}`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <BadgeIcon className={`w-3 h-3 ${badge.color}`} />
                    <span className={badge.color}>{badge.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Live status */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mt-4 flex-wrap">
              {[
                { dot: "bg-emerald-400", text: "AI Online", glow: "rgba(52,211,153,0.8)" },
                { dot: "bg-secondary", text: "eCourts Live", glow: "rgba(43,108,235,0.8)" },
                { dot: "bg-accent", text: "50K+ Served", glow: "rgba(212,175,55,0.8)" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-foreground/40">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`}
                    style={{ boxShadow: `0 0 6px ${s.glow}` }}
                  />
                  {s.text}
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* Developer Credit - Mobile */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center lg:hidden">
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground/40 uppercase tracking-widest mb-0.5">Developed by</p>
            <p className="text-[10px] font-bold tracking-[0.18em] text-accent/70">MD DANISH HUSSAIN</p>
          </div>
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section className="py-12 border-y relative overflow-hidden" style={{
        background: "rgba(0,0,0,0.3)",
        borderColor: "rgba(255,255,255,0.05)",
      }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-y-0 w-1/4"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent)",
              animation: "shimmerSweep 6s ease-in-out infinite",
            }}
          />
        </div>
        <div className="mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 50000, label: "Citizens Served", suffix: "+", color: "text-accent", glow: "rgba(212,175,55,0.35)" },
              { value: 1200, label: "Verified Advocates", suffix: "+", color: "text-blue-400", glow: "rgba(96,165,250,0.28)" },
              { value: 6, label: "Metro Cities", suffix: "", color: "text-emerald-400", glow: "rgba(52,211,153,0.28)" },
              { value: 4, label: "Languages", suffix: "", color: "text-purple-400", glow: "rgba(167,139,250,0.28)" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-default"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${stat.glow} 0%, transparent 70%)`, filter: "blur(20px)" }}
                />
                <p className={`text-4xl md:text-5xl font-bold font-serif ${stat.color} relative`}
                  style={{ filter: `drop-shadow(0 0 18px ${stat.glow})` }}>
                  <AnimatedCounter to={stat.value} />{stat.suffix}
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-2 uppercase tracking-[0.15em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-16 lg:py-24 relative z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent mb-3">Platform Services</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              A unified legal infrastructure
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Everything you need to navigate India's legal system with clarity and confidence.
            </p>
            <div className="flex justify-center mt-5">
              <TricolorBar className="w-28" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 26 }}
                >
                  <Link href={service.link} className="block h-full">
                    <div
                      className="h-full cursor-pointer flex flex-col p-6 rounded-[22px] group relative overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = service.border;
                        el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.35), 0 0 40px ${service.glow}, inset 0 1px 0 rgba(255,255,255,0.07)`;
                        el.style.background = "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(255,255,255,0.06)";
                        el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)";
                        el.style.background = "rgba(255,255,255,0.025)";
                      }}
                    >
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                        style={{ background: `linear-gradient(90deg, transparent, ${service.topLine}, transparent)` }}
                      />

                      {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${service.accent}`}
                          style={{ background: service.bg, border: `1px solid ${service.border}` }}
                        >
                          {service.badge}
                        </span>
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-2xl ${service.bg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}
                        style={{
                          border: `1px solid ${service.border}`,
                          boxShadow: `0 0 24px ${service.glow}`,
                        }}
                      >
                        <Icon className={`w-6 h-6 ${service.accent}`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-bold text-foreground mb-2 font-serif">{service.title}</h3>
                      <p className="text-muted-foreground mb-5 leading-relaxed text-sm flex-1">{service.desc}</p>

                      {/* Footer */}
                      <div className={`flex items-center text-sm font-semibold ${service.accent} opacity-60 group-hover:opacity-100 transition-all`}>
                        <span>Explore</span>
                        <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why NyaySetu ── */}
      <section className="py-16 lg:py-20 border-t relative z-10" style={{
        background: "rgba(0,0,0,0.2)",
        borderColor: "rgba(255,255,255,0.05)",
      }}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent mb-3">Our Promise</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Why NyaySetu?</h2>
            <div className="flex justify-center mt-5">
              <TricolorBar className="w-20" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Unwavering Trust", desc: "Bar Council verified advocates and end-to-end encrypted data sovereignty.", icon: Shield, color: "text-accent", bg: "bg-accent/10", glow: "rgba(212,175,55,0.18)", border: "rgba(212,175,55,0.25)" },
              { title: "Unmatched Speed", desc: "AI-driven responses and real-time eCourts integration for immediate clarity.", icon: Zap, color: "text-secondary", bg: "bg-secondary/10", glow: "rgba(43,108,235,0.18)", border: "rgba(43,108,235,0.25)" },
              { title: "Unequaled Expertise", desc: "Access the highest tier of legal professionals across every Indian state.", icon: Globe, color: "text-emerald-400", bg: "bg-emerald-500/10", glow: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.25)" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center text-center group p-7 rounded-3xl cursor-default relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid ${f.border}`,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.2)`,
                    backdropFilter: "blur(16px)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 64px rgba(0,0,0,0.35), 0 0 48px ${f.glow}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.2)`;
                  }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}
                    style={{ border: `1px solid ${f.border}`, boxShadow: `0 0 28px ${f.glow}` }}
                  >
                    <Icon className={`w-7 h-7 ${f.color}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-serif text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Emergency CTA ── */}
      <section className="py-10 border-t relative z-10 overflow-hidden" style={{
        background: "rgba(220,38,38,0.05)",
        borderColor: "rgba(220,38,38,0.12)",
      }}>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,38,38,0.15) 0%, transparent 70%)" }}
        />
        <div className="mx-auto px-4 max-w-[1400px] relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left"
          >
            <div className="flex items-center gap-3 text-destructive font-bold text-lg font-serif">
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                <AlertTriangle className="w-5 h-5" />
              </motion.div>
              Need immediate legal help?
            </div>
            <Link href="/emergency">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded-2xl px-8 font-bold relative overflow-hidden"
                  style={{
                    boxShadow: "0 0 30px rgba(220,38,38,0.45), 0 8px 24px rgba(0,0,0,0.4)",
                    background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div
                      className="absolute inset-y-0 w-1/3"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                        animation: "shimmerSweep 2s ease-in-out infinite",
                      }}
                    />
                  </div>
                  <span className="relative z-10">Access Emergency Services</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
