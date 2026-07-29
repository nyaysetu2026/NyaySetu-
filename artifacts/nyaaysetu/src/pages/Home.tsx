import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Bot, FileText, Landmark, Users, BookOpen, Shield,
  ArrowRight, Bell, CheckCircle, AlertCircle, Clock,
  Star, MapPin, Percent, User, MessageSquare, Lock,
  ChevronRight, Phone,
} from "lucide-react";
import { IndiaFlagBg } from "@/components/ui/india-flag-bg";
import logoSrc from "@assets/nyaaysetu-logo.png";

/* ─────────────────────────────────────────────
   Hero Illustration – scale + flag + columns
───────────────────────────────────────────── */
function HeroIllustration() {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center overflow-hidden">

      {/* Indian flag – 5 % opacity, slow wave */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.055, animation: "silkFlagWave 9s ease-in-out infinite" }}
      >
        <IndiaFlagBg />
      </div>

      {/* Deep radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(43,108,235,0.18) 0%, rgba(99,102,241,0.06) 50%, transparent 75%)",
      }} />

      {/* Saffron corner glow */}
      <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(255,153,51,0.18) 0%, transparent 70%)",
        filter: "blur(30px)",
      }} />

      {/* Blueprint grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(rgba(43,108,235,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(43,108,235,0.9) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }} />

      {/* Architectural columns – silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center gap-2 pointer-events-none opacity-[0.22]">
        {[44, 64, 80, 96, 112, 96, 80, 64, 44].map((h, i) => (
          <div
            key={i}
            style={{
              width: 14, height: h,
              background: "linear-gradient(to bottom, rgba(212,175,55,0.9), rgba(120,90,20,0.6))",
              borderRadius: "3px 3px 0 0",
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[
        { x: "20%", y: "15%", s: 4, d: 0 },
        { x: "75%", y: "20%", s: 3, d: 1.2 },
        { x: "10%", y: "65%", s: 5, d: 2.1 },
        { x: "82%", y: "70%", s: 3, d: 0.7 },
        { x: "55%", y: "10%", s: 4, d: 1.8 },
        { x: "30%", y: "80%", s: 3, d: 3 },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x, top: p.y,
            width: p.s, height: p.s,
            background: i % 2 === 0 ? "rgba(212,175,55,0.7)" : "rgba(43,108,235,0.7)",
            animation: `particleFloat${(i % 4) + 1} ${10 + i * 1.5}s ease-in-out infinite ${p.d}s`,
            boxShadow: `0 0 ${p.s * 3}px ${i % 2 === 0 ? "rgba(212,175,55,0.5)" : "rgba(43,108,235,0.5)"}`,
          }}
        />
      ))}

      {/* ── Golden Scale SVG ── */}
      <div className="relative z-10">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 380, height: 380,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 65%)",
            filter: "blur(30px)",
            animation: "orbPulse 4s ease-in-out infinite",
          }}
        />

        <svg viewBox="0 0 340 300" width="320" height="282" fill="none">
          <defs>
            <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5d06b" />
              <stop offset="100%" stopColor="#b8921e" />
            </linearGradient>
            <linearGradient id="hg2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b8921e" />
              <stop offset="45%" stopColor="#f5d06b" />
              <stop offset="100%" stopColor="#b8921e" />
            </linearGradient>
            <radialGradient id="hpan" cx="50%" cy="25%" r="60%">
              <stop offset="0%" stopColor="#fce08a" />
              <stop offset="100%" stopColor="#9a6e10" />
            </radialGradient>
            <filter id="hglow">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          {/* Base */}
          <rect x="100" y="274" width="140" height="14" rx="7" fill="url(#hg2)" opacity="0.95" />
          <rect x="116" y="262" width="108" height="13" rx="6.5" fill="url(#hg2)" opacity="0.85" />

          {/* Pole */}
          <rect x="167" y="72" width="6" height="192" rx="3" fill="url(#hg1)" opacity="0.95" />

          {/* Apex */}
          <circle cx="170" cy="63" r="16" fill="url(#hg1)" opacity="0.95" filter="url(#hglow)" />
          <circle cx="170" cy="63" r="7" fill="rgba(255,255,255,0.38)" />
          <circle cx="170" cy="63" r="3.5" fill="url(#hg1)" />

          {/* Balance beam – animated */}
          <g style={{ transformOrigin: "170px 106px", animation: "scaleBalance 5s ease-in-out infinite" }}>
            <rect x="42" y="103" width="256" height="7" rx="3.5" fill="url(#hg2)" opacity="0.97" />

            {/* Left chains */}
            <line x1="64"  y1="110" x2="60"  y2="148" stroke="url(#hg1)" strokeWidth="2.5" opacity="0.72" />
            <line x1="60"  y1="148" x2="56"  y2="184" stroke="url(#hg1)" strokeWidth="2.5" opacity="0.72" />
            <line x1="56"  y1="184" x2="52"  y2="210" stroke="url(#hg1)" strokeWidth="2.5" opacity="0.72" />

            {/* Right chains */}
            <line x1="276" y1="110" x2="280" y2="148" stroke="url(#hg1)" strokeWidth="2.5" opacity="0.72" />
            <line x1="280" y1="148" x2="284" y2="184" stroke="url(#hg1)" strokeWidth="2.5" opacity="0.72" />
            <line x1="284" y1="184" x2="288" y2="210" stroke="url(#hg1)" strokeWidth="2.5" opacity="0.72" />

            {/* Left pan */}
            <g style={{ transformOrigin: "56px 210px", animation: "panSwingLeft 5s ease-in-out infinite" }}>
              <path d="M16 210 Q56 226 96 210" stroke="url(#hg2)" strokeWidth="3" fill="none" opacity="0.97" />
              <path d="M18 213 Q56 232 94 213 L94 222 Q56 242 18 222 Z" fill="url(#hpan)" opacity="0.55" />
              <ellipse cx="56" cy="226" rx="40" ry="6" fill="url(#hg2)" opacity="0.35" />
            </g>

            {/* Right pan */}
            <g style={{ transformOrigin: "284px 210px", animation: "panSwingRight 5s ease-in-out infinite" }}>
              <path d="M244 210 Q284 226 324 210" stroke="url(#hg2)" strokeWidth="3" fill="none" opacity="0.97" />
              <path d="M246 213 Q284 232 322 213 L322 222 Q284 242 246 222 Z" fill="url(#hpan)" opacity="0.55" />
              <ellipse cx="284" cy="226" rx="40" ry="6" fill="url(#hg2)" opacity="0.35" />
            </g>
          </g>

          {/* Glow under beam */}
          <ellipse cx="170" cy="106" rx="128" ry="10" fill="rgba(212,175,55,0.14)" filter="url(#hglow)" />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}
        >
          <div
            className="w-1 h-2 rounded-full bg-white/50"
            style={{ animation: "float 1.6s ease-in-out infinite" }}
          />
        </div>
        <p className="text-[9px] text-white/28 tracking-[0.22em] uppercase">Scroll to explore</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Feature cards
───────────────────────────────────────────── */
const FEATURES = [
  {
    title: "AI Legal Assistant",
    desc: "Get instant answers to your legal questions.",
    icon: Bot, link: "/ai-chat",
    ic: "#60a5fa", ib: "rgba(59,130,246,0.14)", ibr: "rgba(59,130,246,0.3)",
  },
  {
    title: "File a Complaint",
    desc: "Raise your voice. We'll take it forward.",
    icon: FileText, link: "/cases",
    ic: "#f472b6", ib: "rgba(244,114,182,0.14)", ibr: "rgba(244,114,182,0.3)",
  },
  {
    title: "Case Tracker",
    desc: "Track your complaint in real-time.",
    icon: Landmark, link: "/cases",
    ic: "#fbbf24", ib: "rgba(251,191,36,0.14)", ibr: "rgba(251,191,36,0.3)",
  },
  {
    title: "Find a Lawyer",
    desc: "Connect with verified legal experts.",
    icon: Users, link: "/lawyers",
    ic: "#34d399", ib: "rgba(52,211,153,0.14)", ibr: "rgba(52,211,153,0.3)",
  },
  {
    title: "Legal Documents",
    desc: "Access templates and documents.",
    icon: FileText, link: "/documents",
    ic: "#a78bfa", ib: "rgba(167,139,250,0.14)", ibr: "rgba(167,139,250,0.3)",
  },
  {
    title: "Know Your Rights",
    desc: "Learn about your legal rights.",
    icon: Shield, link: "/rights",
    ic: "#2dd4bf", ib: "rgba(45,212,191,0.14)", ibr: "rgba(45,212,191,0.3)",
  },
];

const STATS = [
  { icon: User, value: "50,000+", label: "Citizens Served", c: "#60a5fa" },
  { icon: MapPin, value: "6", label: "Metro Cities", c: "#34d399" },
  { icon: Percent, value: "98%", label: "Complaint Response", c: "#a78bfa" },
  { icon: Star, value: "4.8/5", label: "User Rating", c: "#fbbf24" },
];

/* ─────────────────────────────────────────────
   Right panel sub-components
───────────────────────────────────────────── */
function PanelCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(255,255,255,0.032)",
        border: "1px solid rgba(255,255,255,0.08)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function PanelHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-bold text-white">{title}</p>
      {action && (
        <span className="text-xs text-white/32 hover:text-white/60 cursor-pointer transition-colors">{action}</span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="w-full min-h-screen">

      {/* Blueprint grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.016]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-5">
        <div className="grid xl:grid-cols-[1fr_272px]">

          {/* ══════════════════════════════════
              LEFT — main content
          ══════════════════════════════════ */}
          <div className="min-w-0 xl:pr-5">

            {/* ── Hero ── */}
            <section className="py-8">
              <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 items-center min-h-[450px]">

                {/* Hero text */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.09 } } }}
                  className="space-y-5"
                >
                  {/* Heading */}
                  <motion.h1
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] } } }}
                    className="font-serif text-[2.5rem] sm:text-[3.1rem] xl:text-[3.5rem] font-bold leading-[1.06] tracking-tight"
                  >
                    <span className="text-white">Justice, Simplified.</span>
                    <br />
                    <span
                      style={{
                        background: "linear-gradient(135deg, #d4af37 0%, #f5d06b 40%, #FF9933 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 24px rgba(212,175,55,0.35))",
                      }}
                    >
                      Empowered
                    </span>
                    <span className="text-white"> by AI.</span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } }}
                    className="text-white/52 text-[0.95rem] leading-relaxed max-w-[320px]"
                  >
                    Your intelligent legal assistant for complaints, guidance, documents and rights.
                    Anytime, anywhere.
                  </motion.p>

                  {/* Badges */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } } }}
                    className="flex flex-wrap gap-2"
                  >
                    {[
                      { label: "AI Powered",        clr: "#a78bfa", bg: "rgba(139,92,246,0.12)",  br: "rgba(139,92,246,0.26)", prefix: "✦" },
                      { label: "Secure & Encrypted", clr: "#34d399", bg: "rgba(52,211,153,0.1)",   br: "rgba(52,211,153,0.22)", prefix: "🔒" },
                      { label: "Made for India",     clr: "#fb923c", bg: "rgba(251,146,60,0.1)",   br: "rgba(251,146,60,0.22)", prefix: "🇮🇳" },
                    ].map((b) => (
                      <span
                        key={b.label}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{ color: b.clr, background: b.bg, border: `1px solid ${b.br}` }}
                      >
                        <span>{b.prefix}</span>{b.label}
                      </span>
                    ))}
                  </motion.div>

                  {/* CTA buttons */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } } }}
                    className="flex flex-wrap gap-3"
                  >
                    <Link href="/ai-chat">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-[11px] rounded-xl text-sm font-semibold text-white relative overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.055)",
                          border: "1px solid rgba(212,175,55,0.42)",
                          boxShadow: "0 0 22px rgba(212,175,55,0.16), 0 4px 18px rgba(0,0,0,0.32)",
                        }}
                      >
                        <span className="text-accent text-base leading-none">✦</span>
                        Ask AI Legal Assistant
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </Link>
                    <Link href="/cases">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-[11px] rounded-xl text-sm font-semibold text-white/65"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        File a Complaint
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </Link>
                  </motion.div>

                  {/* Trust row */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex -space-x-2">
                      {["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#10b981"].map((c, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: `linear-gradient(135deg, ${c}, ${c}99)`, zIndex: 5 - i }}
                        >
                          {["A","P","R","S","M"][i]}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[11px] text-white/48">Trusted by 50,000+ citizens across India</p>
                      <p className="text-sm font-bold text-white/75 mt-0.5">50K+</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Hero illustration */}
                <div className="hidden lg:block">
                  <HeroIllustration />
                </div>
              </div>
            </section>

            {/* ── Features section ── */}
            <section className="py-5">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.22)" }}
                >
                  <ArrowRight className="w-3 h-3 text-accent" />
                </div>
                <h2 className="text-base font-bold text-white">Everything You Need, In One Platform</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 22 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ delay: i * 0.07, duration: 0.48, ease: [0.22,1,0.36,1] }}
                      whileHover={{ y: -5 }}
                    >
                      <Link href={f.link} className="block h-full">
                        <div
                          className="p-4 rounded-[18px] h-full flex flex-col cursor-pointer transition-all duration-300"
                          style={{
                            background: "rgba(255,255,255,0.026)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = f.ibr;
                            el.style.background = "rgba(255,255,255,0.042)";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "rgba(255,255,255,0.07)";
                            el.style.background = "rgba(255,255,255,0.026)";
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                            style={{ background: f.ib, border: `1px solid ${f.ibr}` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: f.ic }} />
                          </div>
                          <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                          <p className="text-[11px] text-white/42 leading-relaxed flex-1">{f.desc}</p>
                          <div className="mt-3">
                            <ChevronRight className="w-4 h-4" style={{ color: f.ic }} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ── Stats row ── */}
            <section className="py-5">
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {STATS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.45 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${s.c}1a`, border: `1px solid ${s.c}32` }}
                      >
                        <Icon className="w-[18px] h-[18px]" style={{ color: s.c }} />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white leading-tight">{s.value}</p>
                        <p className="text-[10px] text-white/38 mt-0.5">{s.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ══════════════════════════════════
              RIGHT — sticky panel column
          ══════════════════════════════════ */}
          <div className="hidden xl:block">
            <div
              className="sticky top-14 max-h-[calc(100vh-56px)] overflow-y-auto no-scrollbar space-y-3 pl-4 pt-8 pb-6"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
            >

              {/* ── AI Legal Assistant ── */}
              <PanelCard>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-white">AI Legal Assistant</p>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                      style={{ boxShadow: "0 0 6px rgba(52,211,153,0.9)" }}
                    />
                    Online
                  </span>
                </div>

                <div className="flex gap-3 mb-3 items-start">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(59,130,246,0.28), rgba(139,92,246,0.28))",
                      border: "1px solid rgba(139,92,246,0.3)",
                      animation: "aiBreath 3s ease-in-out infinite",
                    }}
                  >
                    <Bot className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-[11px] text-white/48 leading-relaxed pt-0.5">
                    Ask any legal question in natural language and get instant clarity.
                  </p>
                </div>

                {/* Sound wave */}
                <div className="flex items-center gap-[2px] mb-3 justify-center h-5">
                  {[2,4,6,8,6,10,7,5,9,6,4,8,5,3,6,8,4].map((h, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: 2,
                        height: h * 2,
                        background: `hsl(${210 + i * 5}, 80%, 65%)`,
                        opacity: 0.65,
                        animation: `typing-dot ${0.55 + i * 0.07}s ease-in-out infinite alternate`,
                      }}
                    />
                  ))}
                </div>

                <Link href="/ai-chat" className="block">
                  <button
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                      boxShadow: "0 4px 18px rgba(124,58,237,0.38)",
                    }}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Start Conversation
                  </button>
                </Link>
              </PanelCard>

              {/* ── Quick Actions ── */}
              <PanelCard>
                <PanelHeader title="Quick Actions" action="View All" />
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "File\nComplaint",  icon: FileText,  c: "#f87171", bg: "rgba(239,68,68,0.12)",   href: "/cases" },
                    { label: "Track\nComplaint", icon: Landmark,  c: "#60a5fa", bg: "rgba(59,130,246,0.12)",  href: "/cases" },
                    { label: "Find\nLawyer",     icon: Users,     c: "#34d399", bg: "rgba(52,211,153,0.12)",  href: "/lawyers" },
                    { label: "Legal\nDocuments", icon: BookOpen,  c: "#a78bfa", bg: "rgba(139,92,246,0.12)",  href: "/documents" },
                  ].map((a, i) => {
                    const Icon = a.icon;
                    return (
                      <Link href={a.href} key={i}>
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.93 }}
                          className="flex flex-col items-center gap-1.5 p-2 rounded-xl cursor-pointer"
                          style={{ background: a.bg }}
                        >
                          <Icon className="w-4 h-4" style={{ color: a.c }} />
                          <span
                            className="text-[8.5px] font-semibold text-center leading-tight text-white/65"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {a.label}
                          </span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </PanelCard>

              {/* ── My Activity ── */}
              <PanelCard>
                <PanelHeader title="My Activity" action="View All" />
                <div
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div>
                    <p className="text-xs font-bold text-white">Complaint #23456</p>
                    <p className="text-[10px] text-white/38 mt-0.5">Municipal Corporation</p>
                    <p className="text-[10px] text-white/26 mt-0.5">2 days ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{
                        background: "rgba(251,191,36,0.12)",
                        color: "#fbbf24",
                        border: "1px solid rgba(251,191,36,0.26)",
                      }}
                    >
                      Under Review
                    </span>
                    <FileText className="w-3.5 h-3.5 text-white/28" />
                  </div>
                </div>
              </PanelCard>

              {/* ── Justice Journey ── */}
              <PanelCard>
                <PanelHeader title="Justice Journey" action="View Details" />
                <div className="flex items-start gap-1">
                  {[
                    { num: 1, label: "Complaint\nSubmitted",      c: "#34d399", bg: "rgba(52,211,153,0.14)",  icon: CheckCircle, active: true  },
                    { num: 2, label: "Under\nReview",             c: "#60a5fa", bg: "rgba(59,130,246,0.14)",  icon: Clock,       active: true  },
                    { num: 3, label: "In\nProgress",              c: "#fbbf24", bg: "rgba(251,191,36,0.12)",  icon: AlertCircle, active: false },
                    { num: 4, label: "Escalated",                 c: "#f97316", bg: "rgba(249,115,22,0.12)",  icon: Bell,        active: false },
                    { num: 5, label: "Resolved",                  c: "#34d399", bg: "rgba(52,211,153,0.08)",  icon: CheckCircle, active: false },
                  ].map((step, i, arr) => {
                    const Icon = step.icon;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 relative">
                        {i < arr.length - 1 && (
                          <div
                            className="absolute top-[15px] left-1/2 w-full h-px pointer-events-none"
                            style={{ background: step.active ? `${step.c}45` : "rgba(255,255,255,0.06)" }}
                          />
                        )}
                        <div
                          className="w-[30px] h-[30px] rounded-full flex items-center justify-center relative z-10"
                          style={{
                            background: step.active ? step.bg : "rgba(255,255,255,0.04)",
                            border: `1.5px solid ${step.active ? step.c + "55" : "rgba(255,255,255,0.07)"}`,
                          }}
                        >
                          <Icon
                            className="w-3 h-3"
                            style={{ color: step.active ? step.c : "rgba(255,255,255,0.2)" }}
                          />
                        </div>
                        <p
                          className="text-center leading-tight text-white/38 mt-0.5"
                          style={{ fontSize: 7.5, whiteSpace: "pre-line" }}
                        >
                          {step.num} {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </PanelCard>

              {/* ── Live Updates ── */}
              <PanelCard>
                <PanelHeader title="Live Updates" action="View All" />
                <div className="space-y-3">
                  {[
                    { icon: AlertCircle, c: "#f87171", text: "Complaint #23456 has been escalated to District Officer", time: "2 min ago"   },
                    { icon: Landmark,    c: "#60a5fa", text: "New response from Municipal Corporation",                  time: "10 min ago" },
                    { icon: CheckCircle, c: "#34d399", text: "Your document has been verified successfully",             time: "1 hour ago" },
                  ].map((u, i) => {
                    const Icon = u.icon;
                    return (
                      <div key={i} className="flex gap-2.5">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: `${u.c}18` }}
                        >
                          <Icon className="w-3 h-3" style={{ color: u.c }} />
                        </div>
                        <div>
                          <p className="text-[11px] text-white/62 leading-relaxed">{u.text}</p>
                          <p className="text-[9.5px] text-white/28 mt-0.5">{u.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </PanelCard>

              {/* ── Safety First ── */}
              <PanelCard
                style={{
                  background: "linear-gradient(135deg, rgba(239,68,68,0.13) 0%, rgba(220,38,38,0.05) 100%)",
                  border: "1px solid rgba(239,68,68,0.22)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-red-400">Safety First</p>
                  <Phone className="w-4 h-4 text-red-400" />
                </div>
                <p className="text-[11px] text-white/48 mb-3 leading-relaxed">
                  In case of emergency or urgent legal help
                </p>
                <Link href="/emergency" className="block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5"
                    style={{
                      background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                      boxShadow: "0 4px 18px rgba(220,38,38,0.38)",
                    }}
                  >
                    🆘 Emergency Help
                  </motion.button>
                </Link>
                <p className="text-[9.5px] text-white/32 text-center mt-2">📞 Available 24/7</p>
              </PanelCard>

            </div>
          </div>

        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        className="relative z-10 mt-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.22)" }}
      >
        <div className="max-w-[1400px] mx-auto px-5 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">

            {/* Logo + copyright */}
            <div className="flex items-center gap-3">
              <img src={logoSrc} alt="NyaySetu" className="h-7 w-auto opacity-65" />
              <p className="text-[10.5px] text-white/28">© 2025 NyaySetu. All rights reserved.</p>
            </div>

            {/* Center trust badges */}
            <div className="flex items-center gap-5">
              {[
                { icon: Lock,     label: "End-to-End Encrypted", c: "#60a5fa" },
                { icon: Bot,      label: "AI Powered Platform",  c: "#a78bfa" },
                { flag: true,     label: "Made in India",        c: "#fb923c" },
              ].map((b, i) => {
                const Icon = (b as any).icon;
                return (
                  <div key={i} className="flex items-center gap-1.5 text-[10.5px] font-semibold" style={{ color: b.c }}>
                    {b.flag ? (
                      <span>🇮🇳</span>
                    ) : (
                      <Icon className="w-3 h-3" />
                    )}
                    <span className="hidden sm:inline">{b.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Links + social */}
            <div className="flex items-center gap-5 flex-wrap">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map((l) => (
                <span key={l} className="text-[10.5px] text-white/28 hover:text-white/55 cursor-pointer transition-colors">
                  {l}
                </span>
              ))}
              <div className="flex items-center gap-3">
                {["f", "𝕏", "ig", "▶"].map((icon, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-white/28 hover:text-white/55 cursor-pointer transition-colors font-bold"
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
