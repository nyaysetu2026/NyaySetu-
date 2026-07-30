import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Bot, FileText, Landmark, Users, BookOpen, Shield,
  ArrowRight, Bell, CheckCircle, AlertCircle, Clock,
  Star, MapPin, Percent, User, MessageSquare, Lock,
  ChevronRight, Phone, BarChart2, Building2, FileSearch,
  Gavel, Brain, ScanLine, GraduationCap, ArrowUpCircle,
  LayoutDashboard, HeartHandshake, UserCheck, Wifi,
  Zap, Eye, Award, IndianRupee, Facebook, Twitter, Instagram, Youtube,
  TrendingUp, Scale, Mic, Sparkles, Code2, Heart,
} from "lucide-react";
import { IndiaFlagBg } from "@/components/ui/india-flag-bg";
import logoSrc from "@assets/nyaaysetu-logo.png";

/* ─────────────────────────────────────────────
   Count-Up Hook
───────────────────────────────────────────── */
function useCountUp(target: string, duration = 2000, startCounting = false) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!startCounting) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.,]/g, "");
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    const increment = numeric / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numeric) { current = numeric; clearInterval(timer); }
      const formatted = Number.isInteger(numeric) ? Math.floor(current).toLocaleString("en-IN") : current.toFixed(1);
      setDisplay(formatted + suffix);
    }, stepDuration);
    return () => clearInterval(timer);
  }, [startCounting, target, duration]);
  return display;
}

/* ─────────────────────────────────────────────
   Global Silk Flag Background (4-6% opacity)
───────────────────────────────────────────── */
function SilkFlagBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.048,
          animation: "premiumFlagWave 12s ease-in-out infinite",
          transformOrigin: "center center",
        }}
      >
        {/* Saffron */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "33.34%",
          background: "linear-gradient(180deg, #FF9933 0%, #e88a20 100%)",
        }} />
        {/* White with Chakra */}
        <div style={{
          position: "absolute", top: "33.34%", left: 0, right: 0,
          height: "33.32%",
          background: "#f5f5f5",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg viewBox="0 0 48 48" width="12%" height="90%" fill="none"
            style={{ animation: "chakraSpin 20s linear infinite", opacity: 0.7 }}>
            <circle cx="24" cy="24" r="10" stroke="#000080" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="2" fill="#000080" />
            {Array.from({ length: 24 }, (_, i) => {
              const ang = (i * 360) / 24;
              const rad = (ang * Math.PI) / 180;
              return (
                <line key={i}
                  x1={24 + 2.2 * Math.cos(rad)} y1={24 + 2.2 * Math.sin(rad)}
                  x2={24 + 10 * Math.cos(rad)} y2={24 + 10 * Math.sin(rad)}
                  stroke="#000080" strokeWidth="0.6"
                />
              );
            })}
          </svg>
        </div>
        {/* Green */}
        <div style={{
          position: "absolute", top: "66.66%", left: 0, right: 0,
          height: "33.34%",
          background: "linear-gradient(180deg, #138808 0%, #0e6f07 100%)",
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero Illustration — Cinematic Justice Scale
───────────────────────────────────────────── */
function HeroIllustration() {
  return (
    <div className="relative w-full h-full min-h-[520px] flex items-center justify-center overflow-hidden">

      {/* ── Deep dark backdrop ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(3,6,18,0.97) 0%, rgba(1,3,10,0.99) 100%)",
      }} />

      {/* ── Cinematic blue sweep ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 65% at 18% 12%, rgba(22,60,200,0.34) 0%, transparent 62%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 65% 55% at 72% 55%, rgba(12,40,160,0.22) 0%, transparent 58%)",
      }} />

      {/* ── Gold ambient glow ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 75% 85% at 80% 58%, rgba(212,175,55,0.09) 0%, transparent 58%)",
      }} />

      {/* ── Blueprint grid ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.038]" style={{
        backgroundImage: "linear-gradient(rgba(43,108,235,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(43,108,235,0.9) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* ── Waving Indian Flag — hero backdrop ── */}
      <div className="absolute pointer-events-none" style={{
        right: "-6%", top: "-8%",
        width: "90%", height: "116%",
        opacity: 0.28,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          animation: "premiumFlagWave 8s ease-in-out infinite",
          transformOrigin: "left center",
        }}>
          <div style={{ height: "33.34%", background: "linear-gradient(180deg, #FF9933 0%, #e88a20 100%)", boxShadow: "inset 0 -2px 10px rgba(0,0,0,0.18)" }} />
          <div style={{ height: "33.32%", background: "linear-gradient(180deg, #f9f9f9 0%, #eeeeee 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <svg viewBox="0 0 48 48" width="34%" height="88%" fill="none" style={{ animation: "chakraSpin 14s linear infinite" }}>
              <circle cx="24" cy="24" r="10" stroke="#000080" strokeWidth="1.8" />
              <circle cx="24" cy="24" r="2" fill="#000080" />
              {Array.from({ length: 24 }, (_, i) => {
                const ang = (i * 360) / 24;
                const rad = (ang * Math.PI) / 180;
                return <line key={i} x1={24 + 2 * Math.cos(rad)} y1={24 + 2 * Math.sin(rad)} x2={24 + 10 * Math.cos(rad)} y2={24 + 10 * Math.sin(rad)} stroke="#000080" strokeWidth="0.75" />;
              })}
            </svg>
          </div>
          <div style={{ height: "33.34%", background: "linear-gradient(180deg, #138808 0%, #0d6b07 100%)", boxShadow: "inset 0 2px 10px rgba(0,0,0,0.18)" }} />
        </div>
        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(3,6,18,0.98) 0%, rgba(3,6,18,0.62) 14%, rgba(3,6,18,0.22) 32%, transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 60%, rgba(3,6,18,0.45) 82%, rgba(3,6,18,0.88) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(3,6,18,0.72) 0%, transparent 18%, transparent 82%, rgba(3,6,18,0.72) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(12,38,150,0.42) 0%, rgba(8,28,110,0.18) 40%, transparent 68%)" }} />
      </div>

      {/* ── Supreme Court silhouette ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none flex items-end justify-center gap-[5px] opacity-[0.2]">
        {[36,48,56,66,76,90,104,114,104,90,76,66,56,48,36].map((h, i) => {
          const isCenter = i === 7;
          return (
            <div key={i} style={{
              width: isCenter ? 17 : i === 6 || i === 8 ? 14 : 10,
              height: h,
              background: isCenter
                ? "linear-gradient(to bottom, rgba(230,210,160,0.95), rgba(150,118,65,0.72))"
                : "linear-gradient(to bottom, rgba(188,168,128,0.82), rgba(118,92,45,0.58))",
              borderRadius: "4px 4px 0 0",
              boxShadow: isCenter ? "0 0 18px rgba(212,175,55,0.24)" : "none",
            }} />
          );
        })}
      </div>
      {/* Arch */}
      <div className="absolute bottom-0 pointer-events-none opacity-[0.1]" style={{ left: "12%", right: "12%" }}>
        <svg viewBox="0 0 500 60" preserveAspectRatio="none" width="100%" height="60" fill="none">
          <path d="M0 60 Q250 0 500 60" stroke="rgba(188,165,118,0.65)" strokeWidth="2" fill="rgba(148,118,65,0.1)" />
        </svg>
      </div>

      {/* ── Floating Particles ── */}
      {[
        { x: "15%", y: "10%", s: 4.5, d: 0,   g: "rgba(212,175,55,0.8)"  },
        { x: "80%", y: "16%", s: 3.5, d: 1.2,  g: "rgba(43,108,235,0.75)" },
        { x: "6%",  y: "60%", s: 5,   d: 2.1,  g: "rgba(212,175,55,0.65)" },
        { x: "88%", y: "65%", s: 3,   d: 0.7,  g: "rgba(43,108,235,0.7)"  },
        { x: "55%", y: "6%",  s: 4,   d: 1.8,  g: "rgba(255,153,51,0.65)" },
        { x: "30%", y: "84%", s: 3.5, d: 3,    g: "rgba(52,211,153,0.6)"  },
        { x: "70%", y: "40%", s: 2.5, d: 2.5,  g: "rgba(212,175,55,0.5)"  },
        { x: "42%", y: "75%", s: 3,   d: 1.5,  g: "rgba(43,108,235,0.55)" },
      ].map((p, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          left: p.x, top: p.y, width: p.s, height: p.s,
          background: p.g,
          animation: `particleFloat${(i % 4) + 1} ${11 + i * 1.4}s ease-in-out infinite ${p.d}s`,
          boxShadow: `0 0 ${p.s * 5}px ${p.g}`,
        }} />
      ))}

      {/* ── AI Glow Orb (top-left center) ── */}
      <div className="absolute pointer-events-none" style={{
        left: "10%", top: "18%",
        width: 120, height: 120,
        background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(43,108,235,0.18) 45%, transparent 70%)",
        filter: "blur(20px)",
        animation: "aiBreath 4s ease-in-out infinite",
      }} />

      {/* ── Light rays from scale center ── */}
      {[0,35,70,105,140,175,210,245].map((deg, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          left: "50%", top: "42%",
          width: 2,
          height: 180,
          background: `linear-gradient(to bottom, rgba(212,175,55,${0.12 - i * 0.012}), transparent)`,
          transformOrigin: "top center",
          transform: `translateX(-50%) rotate(${deg}deg)`,
          animation: `lightRayFade ${5 + i * 0.4}s ease-in-out infinite ${i * 0.5}s`,
        }} />
      ))}

      {/* ── MAIN JUSTICE SCALE ── */}
      <div className="relative z-10" style={{
        filter: "drop-shadow(0 0 45px rgba(212,175,55,0.5)) drop-shadow(0 4px 70px rgba(0,0,0,0.65))",
        animation: "scaleGlow 4s ease-in-out infinite",
        marginTop: "-24px",
      }}>
        {/* Radial glow orb */}
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 420, height: 420, top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(43,108,235,0.12) 42%, transparent 68%)",
          filter: "blur(32px)",
          animation: "orbPulse 4.5s ease-in-out infinite",
        }} />
        {/* Outer rings */}
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 340, height: 340, top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(212,175,55,0.12)",
          animation: "orbRing 5s ease-out infinite",
        }} />
        <div className="absolute rounded-full pointer-events-none" style={{
          width: 280, height: 280, top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(212,175,55,0.08)",
          animation: "orbRing 5s ease-out infinite 2.5s",
        }} />

        <svg viewBox="0 0 360 330" width="360" height="330" fill="none">
          <defs>
            <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fce08a" />
              <stop offset="45%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#7a5510" />
            </linearGradient>
            <linearGradient id="sg2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7a5510" />
              <stop offset="25%" stopColor="#c9921a" />
              <stop offset="50%" stopColor="#fce08a" />
              <stop offset="75%" stopColor="#c9921a" />
              <stop offset="100%" stopColor="#7a5510" />
            </linearGradient>
            <radialGradient id="span" cx="50%" cy="28%" r="60%">
              <stop offset="0%" stopColor="#fce08a" />
              <stop offset="100%" stopColor="#8b6108" />
            </radialGradient>
            <filter id="sglow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
            <filter id="sglow2" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="10" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect x="95" y="302" width="170" height="18" rx="9" fill="url(#sg2)" opacity="0.97" />
          <rect x="113" y="285" width="134" height="17" rx="8.5" fill="url(#sg2)" opacity="0.88" />
          <ellipse cx="180" cy="302" rx="85" ry="6" fill="rgba(212,175,55,0.18)" />
          <rect x="176" y="66" width="8" height="220" rx="4" fill="url(#sg1)" opacity="0.97" />
          <circle cx="180" cy="56" r="21" fill="url(#sg1)" opacity="0.97" filter="url(#sglow)" />
          <circle cx="180" cy="56" r="21" fill="url(#sg1)" opacity="0.5" filter="url(#sglow2)" />
          <circle cx="180" cy="56" r="9" fill="rgba(255,255,255,0.42)" />
          <circle cx="180" cy="56" r="4.5" fill="url(#sg1)" />
          <circle cx="180" cy="56" r="25" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" fill="none" />
          <g style={{ transformOrigin: "180px 112px", animation: "scaleBalance 6s ease-in-out infinite" }}>
            <rect x="34" y="108" width="292" height="9" rx="4.5" fill="url(#sg2)" opacity="0.97" />
            <rect x="34" y="108" width="292" height="9" rx="4.5" fill="url(#sg2)" opacity="0.4" filter="url(#sglow)" />
            <line x1="58" y1="117" x2="54" y2="158" stroke="url(#sg1)" strokeWidth="3" opacity="0.78" />
            <line x1="54" y1="158" x2="50" y2="198" stroke="url(#sg1)" strokeWidth="2.5" opacity="0.72" />
            <line x1="50" y1="198" x2="46" y2="228" stroke="url(#sg1)" strokeWidth="2.5" opacity="0.66" />
            <line x1="302" y1="117" x2="306" y2="158" stroke="url(#sg1)" strokeWidth="3" opacity="0.78" />
            <line x1="306" y1="158" x2="310" y2="198" stroke="url(#sg1)" strokeWidth="2.5" opacity="0.72" />
            <line x1="310" y1="198" x2="314" y2="228" stroke="url(#sg1)" strokeWidth="2.5" opacity="0.66" />
            <g style={{ transformOrigin: "46px 228px", animation: "panSwingLeft 6s ease-in-out infinite" }}>
              <path d="M8 228 Q46 246 84 228" stroke="url(#sg2)" strokeWidth="4" fill="none" opacity="0.97" />
              <path d="M10 232 Q46 252 82 232 L82 244 Q46 264 10 244 Z" fill="url(#span)" opacity="0.65" />
              <ellipse cx="46" cy="246" rx="38" ry="7.5" fill="url(#sg2)" opacity="0.42" />
              <ellipse cx="46" cy="246" rx="38" ry="7.5" fill="url(#sg2)" opacity="0.2" filter="url(#sglow)" />
            </g>
            <g style={{ transformOrigin: "314px 228px", animation: "panSwingRight 6s ease-in-out infinite" }}>
              <path d="M276 228 Q314 246 352 228" stroke="url(#sg2)" strokeWidth="4" fill="none" opacity="0.97" />
              <path d="M278 232 Q314 252 350 232 L350 244 Q314 264 278 244 Z" fill="url(#span)" opacity="0.65" />
              <ellipse cx="314" cy="246" rx="38" ry="7.5" fill="url(#sg2)" opacity="0.42" />
              <ellipse cx="314" cy="246" rx="38" ry="7.5" fill="url(#sg2)" opacity="0.2" filter="url(#sglow)" />
            </g>
          </g>
          <ellipse cx="180" cy="112" rx="146" ry="11" fill="rgba(212,175,55,0.16)" filter="url(#sglow)" />
        </svg>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 pointer-events-none">
        <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5" style={{ border: "1.5px solid rgba(255,255,255,0.16)" }}>
          <div className="w-1 h-2 rounded-full bg-white/40" style={{ animation: "float 1.6s ease-in-out infinite" }} />
        </div>
        <p className="text-[9px] text-white/24 tracking-[0.24em] uppercase">Scroll to explore</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   All 20 Feature cards data
───────────────────────────────────────────── */
const ALL_FEATURES = [
  { title: "AI Legal Assistant",      desc: "Get instant answers to your legal questions.",             icon: Bot,             link: "/ai-chat",    ic: "#60a5fa", ib: "rgba(59,130,246,0.14)",   ibr: "rgba(59,130,246,0.35)",   coming: false },
  { title: "File a Complaint",        desc: "Raise your voice. We'll take it forward.",                icon: FileText,        link: "/cases",      ic: "#f472b6", ib: "rgba(244,114,182,0.14)",  ibr: "rgba(244,114,182,0.35)",  coming: false },
  { title: "Case Tracker",            desc: "Track your complaint in real-time.",                      icon: Landmark,        link: "/cases",      ic: "#fbbf24", ib: "rgba(251,191,36,0.14)",   ibr: "rgba(251,191,36,0.35)",   coming: false },
  { title: "Find a Lawyer",           desc: "Connect with verified legal experts.",                    icon: Users,           link: "/lawyers",    ic: "#34d399", ib: "rgba(52,211,153,0.14)",   ibr: "rgba(52,211,153,0.35)",   coming: false },
  { title: "Legal Documents",         desc: "Access templates and documents.",                         icon: BookOpen,        link: "/documents",  ic: "#a78bfa", ib: "rgba(167,139,250,0.14)",  ibr: "rgba(167,139,250,0.35)",  coming: false },
  { title: "Know Your Rights",        desc: "Learn about your fundamental legal rights.",              icon: Shield,          link: "/rights",     ic: "#2dd4bf", ib: "rgba(45,212,191,0.14)",   ibr: "rgba(45,212,191,0.35)",   coming: false },
  { title: "Nyay Meter",              desc: "Measure justice progress on your case.",                  icon: BarChart2,       link: "#",           ic: "#fb923c", ib: "rgba(251,146,60,0.14)",   ibr: "rgba(251,146,60,0.35)",   coming: true  },
  { title: "Emergency Help",          desc: "24×7 urgent legal assistance at your fingertips.",        icon: Phone,           link: "/emergency",  ic: "#f87171", ib: "rgba(248,113,113,0.14)",  ibr: "rgba(248,113,113,0.35)",  coming: false },
  { title: "Government Schemes",      desc: "Discover welfare schemes you are entitled to.",           icon: Building2,       link: "#",           ic: "#818cf8", ib: "rgba(129,140,248,0.14)",  ibr: "rgba(129,140,248,0.35)",  coming: true  },
  { title: "RTI Assistant",           desc: "File RTI applications step by step.",                     icon: FileSearch,      link: "#",           ic: "#fcd34d", ib: "rgba(252,211,77,0.14)",   ibr: "rgba(252,211,77,0.35)",   coming: true  },
  { title: "Court Updates",           desc: "Stay updated with live court proceedings.",               icon: Gavel,           link: "#",           ic: "#6366f1", ib: "rgba(99,102,241,0.14)",   ibr: "rgba(99,102,241,0.35)",   coming: true  },
  { title: "AI Case Prediction",      desc: "Predict case outcomes with AI analysis.",                 icon: Brain,           link: "#",           ic: "#c084fc", ib: "rgba(192,132,252,0.14)",  ibr: "rgba(192,132,252,0.35)",  coming: true  },
  { title: "AI Document Scanner",     desc: "Scan and analyse legal documents instantly.",             icon: ScanLine,        link: "#",           ic: "#22d3ee", ib: "rgba(34,211,238,0.14)",   ibr: "rgba(34,211,238,0.35)",   coming: true  },
  { title: "Legal Learning Center",   desc: "Educate yourself with curated legal content.",            icon: GraduationCap,   link: "#",           ic: "#86efac", ib: "rgba(134,239,172,0.14)",  ibr: "rgba(134,239,172,0.35)",  coming: true  },
  { title: "Complaint Escalation",    desc: "Escalate unresolved complaints to authorities.",          icon: ArrowUpCircle,   link: "#",           ic: "#fb7185", ib: "rgba(251,113,133,0.14)",  ibr: "rgba(251,113,133,0.35)",  coming: true  },
  { title: "Citizen Dashboard",       desc: "Your personal legal activity at a glance.",               icon: LayoutDashboard, link: "/dashboard",  ic: "#38bdf8", ib: "rgba(56,189,248,0.14)",   ibr: "rgba(56,189,248,0.35)",   coming: false },
  { title: "Police Help",             desc: "Connect with nearest police station easily.",             icon: Shield,          link: "#",           ic: "#94a3b8", ib: "rgba(148,163,184,0.14)",  ibr: "rgba(148,163,184,0.35)",  coming: true  },
  { title: "Women Safety",            desc: "Dedicated legal protection resources for women.",         icon: HeartHandshake,  link: "#",           ic: "#f9a8d4", ib: "rgba(249,168,212,0.14)",  ibr: "rgba(249,168,212,0.35)",  coming: true  },
  { title: "Senior Citizen Help",     desc: "Tailored legal support for senior citizens.",             icon: UserCheck,       link: "#",           ic: "#fde68a", ib: "rgba(253,230,138,0.14)",  ibr: "rgba(253,230,138,0.35)",  coming: true  },
  { title: "Cyber Crime Help",        desc: "Report and get help for cybercrime incidents.",           icon: Wifi,            link: "#",           ic: "#67e8f9", ib: "rgba(103,232,249,0.14)",  ibr: "rgba(103,232,249,0.35)",  coming: true  },
];

const STATS = [
  { icon: User,    value: "50,000+", label: "Citizens Served",     c: "#60a5fa" },
  { icon: MapPin,  value: "6",       label: "Metro Cities",         c: "#34d399" },
  { icon: Percent, value: "98%",     label: "Complaint Response",   c: "#a78bfa" },
  { icon: Star,    value: "4.8/5",   label: "User Rating",          c: "#fbbf24" },
];

/* ─────────────────────────────────────────────
   Panel Card Components
───────────────────────────────────────────── */
function PanelCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(255,255,255,0.028)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.04)",
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
        <span className="text-[10px] font-semibold text-white/32 hover:text-white/60 cursor-pointer transition-colors duration-200 flex items-center gap-0.5">
          {action} <ChevronRight className="w-3 h-3" />
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Animated Stat Item
───────────────────────────────────────────── */
function StatItem({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const displayValue = useCountUp(stat.value, 1800, isInView);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group"
    >
      <motion.div
        whileHover={{ scale: 1.12, rotate: 5 }}
        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${stat.c}24, ${stat.c}10)`,
          border: `1px solid ${stat.c}35`,
          boxShadow: `0 0 20px ${stat.c}22`,
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{
          background: `radial-gradient(circle, ${stat.c}18 0%, transparent 70%)`,
        }} />
        <Icon className="w-5 h-5 relative z-10" style={{ color: stat.c }} />
      </motion.div>
      <div className="text-center sm:text-left">
        <motion.p
          className="text-2xl font-bold leading-tight"
          style={{ color: stat.c, textShadow: `0 0 24px ${stat.c}55` }}
        >
          {isInView ? displayValue : "0"}
        </motion.p>
        <p className="text-[11px] text-white/42 mt-0.5 font-medium">{stat.label}</p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Home Page
───────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="w-full min-h-screen relative">

      {/* ── Silk Indian Flag Background (4-6% opacity) ── */}
      <SilkFlagBackground />

      {/* ── Blueprint grid overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(43,108,235,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(43,108,235,0.32) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          opacity: 0.018,
          animation: "gridPulse 10s ease-in-out infinite",
        }}
      />

      {/* ── Animated aurora mesh background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div style={{
          position: "absolute",
          width: "70%", height: "70%",
          top: "-10%", left: "-5%",
          background: "radial-gradient(ellipse, rgba(43,108,235,0.16) 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "auroraMove 22s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          width: "60%", height: "60%",
          bottom: "-10%", right: "-5%",
          background: "radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 65%)",
          filter: "blur(55px)",
          animation: "auroraMove 28s ease-in-out infinite reverse",
        }} />
        <div style={{
          position: "absolute",
          width: "50%", height: "50%",
          top: "30%", right: "20%",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%)",
          filter: "blur(48px)",
          animation: "meshMove3 18s ease-in-out infinite",
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid xl:grid-cols-[1fr_276px]">

          {/* ══════════════════════════════════
              LEFT — main content
          ══════════════════════════════════ */}
          <div className="min-w-0 xl:pr-6">

            {/* ════════════════════════════════
                HERO SECTION
            ════════════════════════════════ */}
            <section className="py-8 lg:py-10">
              <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 items-center min-h-[540px]">

                {/* Hero Text */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                  className="space-y-6"
                >
                  {/* Eyebrow badge */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{
                      background: "rgba(212,175,55,0.08)",
                      border: "1px solid rgba(212,175,55,0.22)",
                      backdropFilter: "blur(16px)",
                    }}>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.9)", animation: "livePulse 2s ease-in-out infinite" }} />
                        <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">AI Online</span>
                      </div>
                      <div className="w-px h-3.5" style={{ background: "rgba(255,255,255,0.12)" }} />
                      <span className="text-[10.5px] font-semibold text-white/55">India's Premier Legal AI Platform</span>
                    </div>
                  </motion.div>

                  {/* Headline */}
                  <motion.h1
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22,1,0.36,1] } } }}
                    className="font-serif leading-[1.04] tracking-tight"
                    style={{ fontSize: "clamp(2.4rem, 5vw, 3.75rem)", fontWeight: 800 }}
                  >
                    <span className="text-white">Justice,</span>
                    <br />
                    <span className="text-white">Simplified.</span>
                    <br />
                    <span style={{
                      background: "linear-gradient(125deg, #c9a227 0%, #f5d575 32%, #FF9933 65%, #d4af37 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 28px rgba(212,175,55,0.38))",
                    }}>Empowered</span>
                    <span className="text-white"> by AI.</span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22,1,0.36,1] } } }}
                    className="text-white/52 leading-relaxed max-w-[340px]"
                    style={{ fontSize: "0.96rem" }}
                  >
                    Your intelligent legal assistant for complaints, guidance, documents and rights. Anytime, anywhere.
                  </motion.p>

                  {/* Trust badges */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22,1,0.36,1] } } }}
                    className="flex flex-wrap gap-2"
                  >
                    {[
                      { label: "AI Powered",         clr: "#a78bfa", bg: "rgba(139,92,246,0.1)",   br: "rgba(139,92,246,0.24)", prefix: "✦" },
                      { label: "Secure & Encrypted",  clr: "#34d399", bg: "rgba(52,211,153,0.09)",  br: "rgba(52,211,153,0.2)",  prefix: "🔒" },
                      { label: "Made for India",      clr: "#fb923c", bg: "rgba(251,146,60,0.09)",  br: "rgba(251,146,60,0.2)",  prefix: "🇮🇳" },
                    ].map((b) => (
                      <span key={b.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ color: b.clr, background: b.bg, border: `1px solid ${b.br}`, backdropFilter: "blur(12px)" }}>
                        <span>{b.prefix}</span>{b.label}
                      </span>
                    ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22,1,0.36,1] } } }}
                    className="flex flex-wrap gap-3"
                  >
                    <Link href="/ai-chat">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-white relative overflow-hidden btn-premium"
                        style={{
                          background: "rgba(255,255,255,0.052)",
                          border: "1px solid rgba(212,175,55,0.44)",
                          boxShadow: "0 0 28px rgba(212,175,55,0.18), 0 4px 22px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
                        }}
                      >
                        {/* Stripe shimmer */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.12) 50%, transparent 100%)",
                            animation: "stripeShimmer 3s ease-in-out infinite",
                          }} />
                        </div>
                        <span className="relative z-10 text-accent text-base leading-none">✦</span>
                        <span className="relative z-10">Ask AI Legal Assistant</span>
                        <ArrowRight className="relative z-10 w-3.5 h-3.5 text-accent/80" />
                      </motion.button>
                    </Link>
                    <Link href="/cases">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold text-white/65 relative overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.038)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          backdropFilter: "blur(16px)",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        File a Complaint
                        <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                      </motion.button>
                    </Link>
                  </motion.div>

                  {/* Social proof */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } } }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex -space-x-2.5">
                      {["#3b82f6","#8b5cf6","#ec4899","#f59e0b","#10b981"].map((c, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{
                          background: `linear-gradient(135deg, ${c}, ${c}99)`,
                          borderColor: "rgba(3,6,18,0.95)",
                          boxShadow: `0 0 8px ${c}55`,
                          zIndex: 5 - i,
                        }}>
                          {["A","P","R","S","M"][i]}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />)}
                        <span className="text-[10px] font-bold text-yellow-400 ml-1">4.8/5</span>
                      </div>
                      <p className="text-[10.5px] text-white/42">Trusted by 50,000+ citizens across India</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Hero Illustration */}
                <div className="hidden lg:block">
                  <HeroIllustration />
                </div>
              </div>
            </section>

            {/* ════════════════════════════════
                FEATURES SECTION — 20 cards
            ════════════════════════════════ */}
            <section className="py-6" id="features">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center relative overflow-hidden" style={{
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.26)",
                  }}>
                    <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 35% 35%, rgba(212,175,55,0.2), transparent)", animation: "aiBreath 3s ease-in-out infinite" }} />
                    <Scale className="w-4 h-4 text-accent relative z-10" />
                  </div>
                  <div>
                    <h2 className="text-[1.1rem] font-bold text-white leading-tight">Everything You Need, In One Platform</h2>
                    <p className="text-[10px] text-white/35 mt-0.5">20 powerful legal tools at your fingertips</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.2)", color: "#d4af37" }}>
                  ✦ 20 Features
                </span>
              </motion.div>

              {/* ── First 6 core features ── */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
                {ALL_FEATURES.slice(0, 6).map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 28, scale: 0.93 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22,1,0.36,1] }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="relative group"
                    >
                      <Link href={f.link} className="block h-full">
                        <div
                          className="p-4 rounded-[20px] h-full flex flex-col cursor-pointer transition-all duration-350 relative overflow-hidden"
                          style={{
                            background: "rgba(255,255,255,0.028)",
                            border: "1px solid rgba(255,255,255,0.075)",
                            backdropFilter: "blur(28px)",
                            WebkitBackdropFilter: "blur(28px)",
                            boxShadow: "0 4px 28px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.04)",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = `${f.ic}58`;
                            el.style.background = f.ib;
                            el.style.boxShadow = `0 14px 44px rgba(0,0,0,0.38), 0 0 32px ${f.ic}22, inset 0 1px 0 rgba(255,255,255,0.07)`;
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "rgba(255,255,255,0.075)";
                            el.style.background = "rgba(255,255,255,0.028)";
                            el.style.boxShadow = "0 4px 28px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.04)";
                          }}
                        >
                          {/* Shimmer sweep on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                            background: `linear-gradient(135deg, transparent 20%, ${f.ic}0a 50%, transparent 80%)`,
                          }} />
                          {/* Top highlight */}
                          <div className="absolute top-0 left-0 right-0 h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                            background: `linear-gradient(90deg, transparent, ${f.ic}50, transparent)`,
                          }} />

                          {/* Icon */}
                          <div className="relative mb-3 z-10">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative overflow-hidden"
                              style={{
                                background: `radial-gradient(circle at 32% 32%, ${f.ic}2c, ${f.ic}10)`,
                                border: `1px solid ${f.ic}42`,
                                boxShadow: `0 0 22px ${f.ic}24, 0 4px 14px rgba(0,0,0,0.22)`,
                              }}
                            >
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                                background: `radial-gradient(circle, ${f.ic}20 0%, transparent 70%)`,
                              }} />
                              <Icon className="w-5 h-5 relative z-10 transition-all duration-300" style={{ color: f.ic }} />
                            </div>
                            {/* Glow behind icon on hover */}
                            <div className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{
                              background: `radial-gradient(circle, ${f.ic}1a 0%, transparent 70%)`,
                              filter: "blur(10px)",
                              transform: "scale(1.5)",
                            }} />
                          </div>

                          <h3 className="text-[12px] font-bold text-white mb-1 leading-tight relative z-10">{f.title}</h3>
                          <p className="text-[10px] text-white/38 leading-relaxed flex-1 relative z-10">{f.desc}</p>

                          <div className="mt-3 flex items-center justify-between relative z-10">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.22)" }}>
                              <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" style={{ animation: "livePulse 2s ease-in-out infinite" }} />
                              Available
                            </span>
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:translate-x-1" style={{ background: `${f.ic}14` }}>
                              <ArrowRight className="w-3 h-3" style={{ color: f.ic }} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── Remaining 14 features ── */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2.5">
                {ALL_FEATURES.slice(6).map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ delay: i * 0.035, duration: 0.42, ease: [0.22,1,0.36,1] }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative group"
                    >
                      <Link href={f.link} className="block h-full">
                        <div
                          className="p-3.5 rounded-[16px] h-full flex flex-col cursor-pointer transition-all duration-300 relative overflow-hidden"
                          style={{
                            background: "rgba(255,255,255,0.022)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = f.ibr;
                            el.style.background = f.ib;
                            el.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3), 0 0 18px ${f.ic}16`;
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "rgba(255,255,255,0.06)";
                            el.style.background = "rgba(255,255,255,0.022)";
                            el.style.boxShadow = "none";
                          }}
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{
                            background: `linear-gradient(135deg, transparent 30%, ${f.ic}07 50%, transparent 70%)`,
                          }} />

                          <div className="w-9 h-9 rounded-full flex items-center justify-center mb-2.5 relative z-10 transition-all duration-300 group-hover:scale-110" style={{
                            background: `radial-gradient(circle at 32% 32%, ${f.ic}22, ${f.ic}0b)`,
                            border: `1px solid ${f.ic}35`,
                            boxShadow: `0 0 14px ${f.ic}18`,
                          }}>
                            <Icon className="w-4 h-4" style={{ color: f.ic }} />
                          </div>

                          <h3 className="text-[11px] font-bold text-white mb-1 leading-tight relative z-10">{f.title}</h3>
                          <p className="text-[9.5px] text-white/36 leading-relaxed flex-1 relative z-10">{f.desc}</p>

                          <div className="mt-2.5 flex items-center justify-between relative z-10">
                            {f.coming ? (
                              <div className="tooltip-container">
                                <span className="coming-soon-badge">Coming Soon</span>
                                <span className="tooltip-text">Available in future updates</span>
                              </div>
                            ) : (
                              <span className="text-[8.5px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1" style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                                Live
                              </span>
                            )}
                            <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" style={{ color: f.ic }} />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* ════════════════════════════════
                STATS SECTION
            ════════════════════════════════ */}
            <section className="py-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-8 py-7 rounded-2xl relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.022)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  boxShadow: "0 8px 52px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Gold radial glow */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "radial-gradient(ellipse 80% 120% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 68%)",
                }} />
                {/* Tricolor top accent */}
                <div className="absolute top-0 left-10 right-10 h-[1.5px] pointer-events-none" style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,153,51,0.55), rgba(212,175,55,0.65), rgba(19,136,8,0.4), transparent)",
                }} />
                {/* Stripe shimmer effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.04) 50%, transparent 100%)",
                    animation: "stripeShimmer 6s ease-in-out infinite",
                    transform: "skewX(-15deg)",
                  }} />
                </div>
                {/* Dividers */}
                {[1,2,3].map(i => (
                  <div key={i} className="absolute hidden sm:block top-4 bottom-4 w-px pointer-events-none" style={{
                    left: `${i * 25}%`,
                    background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)",
                  }} />
                ))}
                {STATS.map((s, i) => (
                  <StatItem key={i} stat={s} index={i} />
                ))}
              </motion.div>
            </section>

          </div>

          {/* ══════════════════════════════════
              RIGHT — sticky panel
          ══════════════════════════════════ */}
          <div className="hidden xl:block">
            <div
              className="sticky top-14 max-h-[calc(100vh-56px)] overflow-y-auto no-scrollbar space-y-3 pl-4 pt-8 pb-6"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}
            >

              {/* ── AI Legal Assistant Panel ── */}
              <PanelCard style={{ background: "rgba(43,108,235,0.04)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-white">AI Legal Assistant</p>
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52,211,153,1)", animation: "livePulse 2s ease-in-out infinite" }} />
                    Online
                  </motion.span>
                </div>

                {/* Premium AI Orb */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    {/* Deep ambient glow */}
                    <div className="absolute rounded-full pointer-events-none" style={{
                      inset: "-28px",
                      background: "radial-gradient(circle, rgba(43,108,235,0.22) 0%, rgba(99,102,241,0.1) 45%, transparent 70%)",
                      filter: "blur(18px)",
                      animation: "orbDeepGlow 3s ease-in-out infinite",
                    }} />
                    {/* Outer pulsing rings */}
                    <div className="absolute inset-0 rounded-full" style={{ transform: "scale(1.7)", border: "1px solid rgba(99,102,241,0.15)", animation: "orbRing 3.2s ease-out infinite" }} />
                    <div className="absolute inset-0 rounded-full" style={{ transform: "scale(1.35)", border: "1px solid rgba(99,102,241,0.1)", animation: "orbRing 3.2s ease-out infinite 1.6s" }} />
                    {/* Main orb */}
                    <div
                      className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
                      style={{
                        background: "linear-gradient(145deg, rgba(59,130,246,0.42) 0%, rgba(43,108,235,0.28) 38%, rgba(99,102,241,0.42) 100%)",
                        border: "1.5px solid rgba(99,102,241,0.5)",
                        animation: "aiBreath 3s ease-in-out infinite",
                        boxShadow: "0 0 36px rgba(43,108,235,0.55), 0 0 80px rgba(43,108,235,0.2), inset 0 1px 0 rgba(255,255,255,0.18)",
                      }}
                    >
                      {/* Shimmer sweep */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                          animation: "shimmerSweep 2.5s ease-in-out infinite",
                        }} />
                      </div>
                      {/* Specular */}
                      <div className="absolute rounded-full pointer-events-none" style={{
                        width: "40%", height: "26%", top: "10%", left: "14%",
                        background: "radial-gradient(ellipse, rgba(255,255,255,0.28) 0%, transparent 70%)",
                        filter: "blur(2px)",
                      }} />
                      <Bot className="w-7 h-7 text-blue-200 relative z-10 drop-shadow-lg" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }} />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-white/46 leading-relaxed text-center mb-3 px-1">Ask any legal question in natural language and get instant clarity.</p>

                {/* Waveform */}
                <div className="flex items-center gap-[3px] mb-4 justify-center h-7">
                  {[3,5,8,12,9,15,11,7,13,10,6,9,14,5,3,7,11,8,4,10].map((h, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: 2.5,
                        height: h,
                        background: `hsl(${218 + i * 5}, 80%, 62%)`,
                        animation: `waveBar ${0.55 + i * 0.06}s ease-in-out infinite`,
                        animationDelay: `${i * 0.04}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Typing indicator */}
                <div className="flex items-center gap-2 justify-center mb-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{
                    background: "rgba(255,255,255,0.038)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    <div className="flex gap-[3px] items-center">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400/70 animate-typing-dot" style={{ animationDelay: `${delay}s` }} />
                      ))}
                    </div>
                    <span className="text-[10px] text-white/36 ml-1">AI thinking…</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Link href="/ai-chat" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(99,102,241,0.55)" }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 relative overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                        boxShadow: "0 4px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.14)",
                      }}
                    >
                      <div className="absolute inset-0 overflow-hidden">
                        <div style={{
                          position: "absolute", inset: 0,
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                          animation: "shimmerSweep 2.8s ease-in-out infinite",
                        }} />
                      </div>
                      <MessageSquare className="w-3.5 h-3.5 relative z-10" />
                      <span className="relative z-10">Start Conversation</span>
                    </motion.button>
                  </Link>
                  {/* Voice button */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(52,211,153,0.1)",
                      border: "1px solid rgba(52,211,153,0.3)",
                      boxShadow: "0 0 16px rgba(52,211,153,0.15)",
                    }}
                    title="Voice Input"
                  >
                    <Mic className="w-4 h-4 text-emerald-400 relative z-10" />
                    <span className="absolute inset-0 rounded-xl" style={{ border: "1px solid rgba(52,211,153,0.2)", animation: "micPulse 2s ease-in-out infinite" }} />
                  </motion.button>
                </div>
              </PanelCard>

              {/* ── Quick Actions ── */}
              <PanelCard>
                <PanelHeader title="Quick Actions" action="View All" />
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "File\nComplaint",  icon: FileText,  c: "#f87171", bg: "rgba(248,113,113,0.1)",  href: "/cases" },
                    { label: "Track\nComplaint", icon: Landmark,  c: "#60a5fa", bg: "rgba(59,130,246,0.1)",   href: "/cases" },
                    { label: "Find\nLawyer",     icon: Users,     c: "#34d399", bg: "rgba(52,211,153,0.1)",   href: "/lawyers" },
                    { label: "Legal\nDocs",      icon: BookOpen,  c: "#a78bfa", bg: "rgba(139,92,246,0.1)",   href: "/documents" },
                  ].map((a, i) => {
                    const Icon = a.icon;
                    return (
                      <Link href={a.href} key={i}>
                        <motion.div
                          whileHover={{ scale: 1.08, y: -2 }}
                          whileTap={{ scale: 0.93 }}
                          className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl cursor-pointer transition-all duration-200 relative overflow-hidden"
                          style={{ background: a.bg, border: `1px solid ${a.c}22` }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 18px ${a.c}22`; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                        >
                          <Icon className="w-4 h-4" style={{ color: a.c }} />
                          <span className="text-[8.5px] font-semibold text-center leading-tight text-white/62" style={{ whiteSpace: "pre-line" }}>{a.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </PanelCard>

              {/* ── My Activity ── */}
              <PanelCard>
                <PanelHeader title="My Activity" action="View All" />
                <div className="flex items-center justify-between p-3 rounded-xl transition-all duration-200" style={{
                  background: "rgba(255,255,255,0.028)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(251,191,36,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <div>
                    <p className="text-xs font-bold text-white">Complaint #23456</p>
                    <p className="text-[10px] text-white/36 mt-0.5">Municipal Corporation</p>
                    <p className="text-[10px] text-white/24 mt-0.5">2 days ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.24)" }}>
                      Under Review
                    </span>
                    <FileText className="w-3.5 h-3.5 text-white/26" />
                  </div>
                </div>
              </PanelCard>

              {/* ── Justice Journey ── */}
              <PanelCard>
                <PanelHeader title="Justice Journey" action="View Details" />
                <div className="flex items-start gap-0.5">
                  {[
                    { num: 1, label: "Complaint\nSubmitted",  c: "#34d399", bg: "rgba(52,211,153,0.14)",  icon: CheckCircle, active: true  },
                    { num: 2, label: "Under\nReview\nBy Dept", c: "#60a5fa", bg: "rgba(59,130,246,0.14)",  icon: Clock,       active: true  },
                    { num: 3, label: "In\nProgress\nAction",   c: "#fbbf24", bg: "rgba(251,191,36,0.12)",  icon: AlertCircle, active: false },
                    { num: 4, label: "Escalated\nIf No\nAction", c: "#f97316", bg: "rgba(249,115,22,0.12)", icon: Bell,       active: false },
                    { num: 5, label: "Resolved\nJustice\nDelivered", c: "#a78bfa", bg: "rgba(167,139,250,0.12)", icon: Award, active: false },
                  ].map((step, i, arr) => {
                    const Icon = step.icon;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 relative">
                        {i < arr.length - 1 && (
                          <div className="absolute top-[14px] left-1/2 w-full h-px pointer-events-none" style={{
                            background: step.active ? `${step.c}40` : "rgba(255,255,255,0.05)",
                          }} />
                        )}
                        <motion.div
                          whileHover={{ scale: 1.12 }}
                          className="w-[28px] h-[28px] rounded-full flex items-center justify-center relative z-10 transition-all duration-300"
                          style={{
                            background: step.active ? step.bg : "rgba(255,255,255,0.038)",
                            border: `1.5px solid ${step.active ? step.c + "55" : "rgba(255,255,255,0.07)"}`,
                            boxShadow: step.active ? `0 0 14px ${step.c}32` : "none",
                          }}
                        >
                          {step.active && (
                            <div className="absolute inset-[-4px] rounded-full" style={{ border: `1px solid ${step.c}25`, animation: "pulseRing 2s ease-out infinite" }} />
                          )}
                          <Icon className="w-3 h-3 relative z-10" style={{ color: step.active ? step.c : "rgba(255,255,255,0.2)" }} />
                        </motion.div>
                        <p className="text-center leading-tight text-white/32 mt-0.5" style={{ fontSize: 7, whiteSpace: "pre-line" }}>
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
                <div className="space-y-2.5">
                  {[
                    { icon: AlertCircle, c: "#f87171", text: "Complaint #23456 escalated to District Officer", time: "2 min ago"   },
                    { icon: Landmark,    c: "#60a5fa", text: "New response from Municipal Corporation",         time: "10 min ago" },
                    { icon: CheckCircle, c: "#34d399", text: "Your document has been verified successfully",    time: "1 hour ago" },
                  ].map((u, i) => {
                    const Icon = u.icon;
                    return (
                      <motion.div key={i} whileHover={{ x: 2 }} className="flex gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${u.c}16`, border: `1px solid ${u.c}26` }}>
                          <Icon className="w-3 h-3" style={{ color: u.c }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10.5px] text-white/58 leading-relaxed">{u.text}</p>
                          <p className="text-[9px] text-white/24 mt-0.5 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {u.time}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </PanelCard>

              {/* ── Safety First ── */}
              <PanelCard style={{
                background: "linear-gradient(135deg, rgba(220,38,38,0.16) 0%, rgba(185,28,28,0.08) 100%)",
                border: "1px solid rgba(239,68,68,0.26)",
              }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-red-400">Safety First</p>
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center relative overflow-hidden" style={{
                    background: "rgba(220,38,38,0.15)",
                    border: "1px solid rgba(220,38,38,0.3)",
                  }}>
                    <div className="absolute inset-0" style={{ animation: "aiBreath 2.5s ease-in-out infinite", background: "rgba(220,38,38,0.1)" }} />
                    <Phone className="w-3.5 h-3.5 text-red-400 relative z-10" />
                  </div>
                </div>
                <p className="text-[10.5px] text-white/42 mb-3 leading-relaxed">In case of emergency or urgent legal help</p>
                <Link href="/emergency" className="block">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 28px rgba(220,38,38,0.55)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                      boxShadow: "0 4px 20px rgba(220,38,38,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
                    }}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                        animation: "stripeShimmer 3s ease-in-out infinite",
                      }} />
                    </div>
                    <span className="relative z-10">🆘 Emergency Help</span>
                  </motion.button>
                </Link>
                <p className="text-[9px] text-white/26 text-center mt-2">📞 Available 24/7</p>
              </PanelCard>

            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════
          FULL-WIDTH SECTIONS
      ════════════════════════════════════════════ */}

      {/* ── Justice Journey — Full Width ── */}
      <section className="relative z-10 py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 85% 60% at 50% 50%, rgba(43,108,235,0.07) 0%, transparent 68%)",
        }} />
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex items-center justify-between mb-12"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden" style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.26)" }}>
                <div className="absolute inset-0" style={{ animation: "aiBreath 4s ease-in-out infinite", background: "rgba(212,175,55,0.08)" }} />
                <TrendingUp className="w-4.5 h-4.5 w-[18px] h-[18px] text-accent relative z-10" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Justice Journey</h2>
                <p className="text-[11px] text-white/36 mt-0.5">Track your case progress step by step</p>
              </div>
            </div>
            <span className="text-xs text-white/30 hover:text-white/55 cursor-pointer transition-colors hidden sm:flex items-center gap-1">
              View Details <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute top-10 left-[10%] right-[10%] h-0.5 hidden sm:block" style={{
              background: "linear-gradient(90deg, rgba(52,211,153,0.65) 0%, rgba(59,130,246,0.6) 25%, rgba(251,191,36,0.42) 50%, rgba(249,115,22,0.3) 75%, rgba(52,211,153,0.18) 100%)",
            }} />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-3">
              {[
                { num: "1", label: "Complaint Submitted",   sub: "Filed Successfully",      c: "#34d399", bg: "rgba(52,211,153,0.14)",  br: "rgba(52,211,153,0.35)",  icon: CheckCircle,  active: true,  glow: "rgba(52,211,153,0.32)"  },
                { num: "2", label: "Under Review",          sub: "By Department",           c: "#60a5fa", bg: "rgba(59,130,246,0.14)",  br: "rgba(59,130,246,0.35)",  icon: Clock,        active: true,  glow: "rgba(59,130,246,0.32)"  },
                { num: "3", label: "In Progress",           sub: "Action in Progress",      c: "#fbbf24", bg: "rgba(251,191,36,0.12)",  br: "rgba(251,191,36,0.3)",   icon: AlertCircle,  active: false, glow: "rgba(251,191,36,0.26)" },
                { num: "4", label: "Escalated",             sub: "If No Action",            c: "#f97316", bg: "rgba(249,115,22,0.12)",  br: "rgba(249,115,22,0.3)",   icon: Bell,         active: false, glow: "rgba(249,115,22,0.26)" },
                { num: "5", label: "Justice Delivered",     sub: "Case Resolved",           c: "#a78bfa", bg: "rgba(167,139,250,0.12)", br: "rgba(167,139,250,0.3)",  icon: Award,        active: false, glow: "rgba(167,139,250,0.26)" },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22,1,0.36,1] }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center relative z-10 mb-4 transition-all duration-400"
                      style={{
                        background: step.active ? step.bg : "rgba(255,255,255,0.038)",
                        border: `2px solid ${step.active ? step.br : "rgba(255,255,255,0.07)"}`,
                        boxShadow: step.active ? `0 0 32px ${step.glow}, 0 0 64px ${step.glow}50` : "none",
                        animation: step.active ? "borderGlow 3s ease-in-out infinite" : "none",
                      }}
                      whileHover={{ boxShadow: `0 0 44px ${step.glow}, 0 0 88px ${step.glow}60` }}
                    >
                      {step.active && (
                        <div className="absolute inset-[-7px] rounded-full opacity-20" style={{
                          border: `1px solid ${step.c}`,
                          animation: "pulseRing 2.5s ease-out infinite",
                        }} />
                      )}
                      <Icon className="w-8 h-8 transition-all duration-300 group-hover:scale-110" style={{ color: step.active ? step.c : "rgba(255,255,255,0.2)" }} />
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{
                        background: step.active ? step.c : "rgba(255,255,255,0.1)",
                        color: step.active ? "#060b1a" : "rgba(255,255,255,0.3)",
                        boxShadow: step.active ? `0 0 10px ${step.c}60` : "none",
                      }}>
                        {step.num}
                      </div>
                    </motion.div>
                    <p className="text-sm font-bold mb-1 group-hover:text-accent transition-colors duration-300" style={{ color: step.active ? "white" : "rgba(255,255,255,0.42)" }}>
                      {step.label}
                    </p>
                    <p className="text-[10.5px]" style={{ color: step.active ? step.c : "rgba(255,255,255,0.24)" }}>{step.sub}</p>
                    {step.active && (
                      <div className="mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold" style={{
                        background: `${step.c}14`, color: step.c, border: `1px solid ${step.c}28`,
                      }}>
                        Current Stage
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Updates + Emergency ── */}
      <section className="relative z-10 py-12 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_360px] gap-6">

            {/* Live Updates */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 10px rgba(52,211,153,0.85)", animation: "livePulse 2s ease-in-out infinite" }} />
                  <h2 className="text-xl font-bold text-white">Live Updates</h2>
                </div>
                <span className="text-xs text-white/30 hover:text-white/55 cursor-pointer transition-colors flex items-center gap-1">
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </motion.div>

              <div className="space-y-3">
                {[
                  { icon: AlertCircle,   c: "#f87171", bg: "rgba(248,113,113,0.1)", title: "Complaint Escalated",   text: "Complaint #23456 has been escalated to District Officer",          time: "2 min ago",   badge: "Escalated",  bc: "#f87171" },
                  { icon: Gavel,         c: "#60a5fa", bg: "rgba(59,130,246,0.1)",  title: "Court Update",          text: "Hearing scheduled for Municipal Corporation case on Dec 15",         time: "15 min ago",  badge: "Scheduled",  bc: "#60a5fa" },
                  { icon: CheckCircle,   c: "#34d399", bg: "rgba(52,211,153,0.1)",  title: "Document Verified",     text: "Your identity document has been successfully verified",               time: "1 hour ago",  badge: "Verified",   bc: "#34d399" },
                  { icon: Users,         c: "#a78bfa", bg: "rgba(167,139,250,0.1)", title: "New Advocate Joined",   text: "Advocate Priya Sharma joined NyaySetu with 8 years experience",       time: "3 hours ago", badge: "New",        bc: "#a78bfa" },
                  { icon: FileSearch,    c: "#fbbf24", bg: "rgba(251,191,36,0.1)",  title: "RTI Process Started",   text: "RTI application #RTI-2024-447 has been filed and acknowledged",        time: "5 hours ago", badge: "Filed",      bc: "#fbbf24" },
                ].map((update, i) => {
                  const Icon = update.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22,1,0.36,1] }}
                      whileHover={{ x: 4, scale: 1.005 }}
                      className="flex gap-4 p-4 rounded-2xl cursor-pointer group transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.065)",
                        backdropFilter: "blur(20px)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = `${update.c}38`;
                        el.style.background = update.bg;
                        el.style.boxShadow = `0 4px 20px rgba(0,0,0,0.2), 0 0 24px ${update.c}0e`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(255,255,255,0.065)";
                        el.style.background = "rgba(255,255,255,0.025)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      {/* Stripe shimmer on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                        <div style={{
                          position: "absolute", inset: 0,
                          background: `linear-gradient(90deg, transparent, ${update.c}06, transparent)`,
                          animation: "stripeShimmer 4s ease-in-out infinite",
                          transform: "skewX(-15deg)",
                        }} />
                      </div>

                      {/* Icon */}
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                          style={{ background: update.bg, border: `1px solid ${update.c}28` }}
                        >
                          <Icon className="w-[18px] h-[18px]" style={{ color: update.c }} />
                        </motion.div>
                        {i < 4 && <div className="w-px flex-1 min-h-[12px]" style={{ background: `linear-gradient(to bottom, ${update.c}22, transparent)` }} />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="text-sm font-bold text-white">{update.title}</p>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${update.bc}16`, color: update.bc, border: `1px solid ${update.bc}22` }}>
                            {update.badge}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-white/48 leading-relaxed">{update.text}</p>
                        <p className="text-[10px] text-white/26 mt-1.5 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {update.time}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Emergency Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
              className="relative overflow-hidden rounded-3xl flex flex-col"
              style={{
                background: "linear-gradient(135deg, rgba(220,38,38,0.18) 0%, rgba(153,27,27,0.12) 50%, rgba(127,29,29,0.07) 100%)",
                border: "1px solid rgba(239,68,68,0.28)",
                boxShadow: "0 0 60px rgba(220,38,38,0.14), 0 20px 60px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 28%, rgba(220,38,38,0.16) 0%, transparent 58%)",
                animation: "orbPulse 3s ease-in-out infinite",
              }} />
              <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none" style={{
                background: "radial-gradient(circle at 100% 0%, rgba(239,68,68,0.28) 0%, transparent 58%)",
              }} />

              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-red-400" style={{ boxShadow: "0 0 8px rgba(248,113,113,0.9)", animation: "livePulse 2s ease-in-out infinite" }} />
                      <span className="text-[10px] font-bold text-red-400 tracking-widest uppercase">24×7 Active</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">Emergency<br />Legal Help</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden" style={{
                    background: "rgba(220,38,38,0.2)",
                    border: "1px solid rgba(239,68,68,0.38)",
                    boxShadow: "0 0 32px rgba(220,38,38,0.32)",
                    animation: "aiBreath 2.5s ease-in-out infinite",
                  }}>
                    <Phone className="w-6 h-6 text-red-400 relative z-10" />
                  </div>
                </div>

                <div className="mb-6 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(239,68,68,0.14)" }}>
                  <p className="text-[10px] text-red-300/65 font-semibold tracking-wider uppercase mb-1">National Helpline</p>
                  <p className="text-3xl font-bold text-white" style={{ fontVariantNumeric: "tabular-nums" }}>1800-XXX-XXXX</p>
                  <p className="text-[11px] text-white/38 mt-1">Toll-free • Available Round The Clock</p>
                </div>

                <div className="space-y-2.5 mb-8 flex-1">
                  {[
                    "Immediate legal consultation",
                    "Emergency court representation",
                    "Domestic violence support",
                    "Police complaint assistance",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(248,113,113,0.14)", border: "1px solid rgba(248,113,113,0.28)" }}>
                        <CheckCircle className="w-2.5 h-2.5 text-red-400" />
                      </div>
                      <span className="text-[11.5px] text-white/52">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/emergency" className="block">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 44px rgba(220,38,38,0.65)" }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 relative overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                      boxShadow: "0 4px 32px rgba(220,38,38,0.48), inset 0 1px 0 rgba(255,255,255,0.14)",
                    }}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                        animation: "stripeShimmer 3s ease-in-out infinite",
                      }} />
                    </div>
                    <div className="relative z-10 flex items-center gap-2">
                      <span className="text-base">🆘</span>
                      <span>Emergency Help</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.button>
                </Link>
                <p className="text-[10px] text-white/28 text-center mt-3">📞 Available 24/7 · Free Service · Confidential</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Why NyaySetu ── */}
      <section className="relative z-10 py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 62%)",
        }} />

        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{ background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.18)" }}>
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-accent text-[10.5px] font-bold tracking-wider uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Why NyaySetu?</h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">Built with every Indian citizen in mind — transparent, powerful, and always accessible.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Award,       label: "Trusted",        sub: "By 50,000+ citizens",   c: "#fbbf24", bg: "rgba(251,191,36,0.09)",  br: "rgba(251,191,36,0.22)"  },
              { icon: Brain,       label: "AI Powered",     sub: "Gemini-driven insights", c: "#a78bfa", bg: "rgba(167,139,250,0.09)", br: "rgba(167,139,250,0.22)" },
              { icon: Lock,        label: "Secure",         sub: "End-to-end encrypted",   c: "#34d399", bg: "rgba(52,211,153,0.09)",  br: "rgba(52,211,153,0.22)"  },
              { icon: Zap,         label: "Fast",           sub: "Real-time updates",      c: "#60a5fa", bg: "rgba(59,130,246,0.09)",  br: "rgba(59,130,246,0.22)"  },
              { icon: IndianRupee, label: "Made for India", sub: "Vernacular support",     c: "#fb923c", bg: "rgba(251,146,60,0.09)",  br: "rgba(251,146,60,0.22)"  },
              { icon: Eye,         label: "Transparent",    sub: "Full case visibility",   c: "#2dd4bf", bg: "rgba(45,212,191,0.09)",  br: "rgba(45,212,191,0.22)"  },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22,1,0.36,1] }}
                  whileHover={{ y: -8, scale: 1.04 }}
                  className="group relative overflow-hidden"
                >
                  <div
                    className="p-5 rounded-2xl text-center cursor-pointer h-full flex flex-col items-center transition-all duration-400 relative"
                    style={{
                      background: card.bg,
                      border: `1px solid ${card.br}`,
                      backdropFilter: "blur(24px)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = `0 16px 44px rgba(0,0,0,0.32), 0 0 32px ${card.c}22`;
                      el.style.borderColor = card.c + "48";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.boxShadow = "none";
                      el.style.borderColor = card.br;
                    }}
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{
                      background: `linear-gradient(135deg, ${card.c}07 0%, transparent 50%, ${card.c}04 100%)`,
                    }} />
                    {/* Top highlight */}
                    <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{
                      background: `linear-gradient(90deg, transparent, ${card.c}50, transparent)`,
                    }} />

                    <motion.div
                      whileHover={{ scale: 1.16, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 280 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative z-10 mx-auto"
                      style={{
                        background: `radial-gradient(circle at 32% 32%, ${card.c}1e, ${card.c}0c)`,
                        border: `1px solid ${card.c}32`,
                        boxShadow: `0 0 22px ${card.c}1e`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: card.c }} />
                    </motion.div>

                    <h3 className="text-sm font-bold text-white mb-1 relative z-10 group-hover:text-accent transition-colors duration-300">{card.label}</h3>
                    <p className="text-[10.5px] text-white/38 relative z-10 leading-relaxed">{card.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Premium Footer ── */}
      <footer className="relative z-10 mt-8">
        <div className="h-px w-full" style={{
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.45), rgba(43,108,235,0.38), rgba(19,136,8,0.28), rgba(212,175,55,0.22), transparent)",
        }} />

        <div style={{
          background: "linear-gradient(to bottom, rgba(2,4,14,0.4) 0%, rgba(2,4,14,0.62) 100%)",
          backdropFilter: "blur(28px)",
        }}>
          <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

              {/* Logo + desc */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <img src={logoSrc} alt="NyaySetu" className="h-9 w-auto opacity-88" />
                </div>
                <p className="text-[11.5px] text-white/38 leading-relaxed mb-5">
                  India's most trusted AI-powered legal platform. Justice is now within everyone's reach.
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { Icon: Facebook,  label: "Facebook"  },
                    { Icon: Twitter,   label: "Twitter"   },
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: Youtube,   label: "YouTube"   },
                  ].map(({ Icon, label }, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.14, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.38)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 14px rgba(212,175,55,0.12)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                      title={label}
                    >
                      <Icon className="w-3.5 h-3.5 text-white/48" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: "AI Legal Assistant", href: "/ai-chat" },
                    { label: "File a Complaint",   href: "/cases" },
                    { label: "Find a Lawyer",      href: "/lawyers" },
                    { label: "Legal Documents",    href: "/documents" },
                    { label: "Know Your Rights",   href: "/rights" },
                    { label: "Dashboard",          href: "/dashboard" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>
                        <span className="text-[11.5px] text-white/36 hover:text-white/68 cursor-pointer transition-colors duration-200 flex items-center gap-1.5 group">
                          <ChevronRight className="w-2.5 h-2.5 text-accent/45 group-hover:text-accent transition-colors" />
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Legal</h4>
                <ul className="space-y-2.5">
                  {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer", "Refund Policy", "Grievance Officer"].map((item) => (
                    <li key={item}>
                      <span className="text-[11.5px] text-white/36 hover:text-white/68 cursor-pointer transition-colors duration-200 flex items-center gap-1.5 group">
                        <ChevronRight className="w-2.5 h-2.5 text-accent/45 group-hover:text-accent transition-colors" />
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Contact</h4>
                <div className="space-y-3">
                  {[
                    { icon: MessageSquare, c: "#60a5fa", bg: "rgba(59,130,246,0.14)", label: "Support", value: "support@nyaaysetu.in" },
                    { icon: Phone,         c: "#f87171", bg: "rgba(248,113,113,0.14)", label: "Emergency", value: "1800-XXX-XXXX (24/7)" },
                    { icon: MapPin,        c: "#34d399", bg: "rgba(52,211,153,0.14)", label: "Headquarters", value: "New Delhi, India 110001" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: item.bg }}>
                          <Icon className="w-3 h-3" style={{ color: item.c }} />
                        </div>
                        <div>
                          <p className="text-[10px] text-white/28 uppercase tracking-wider">{item.label}</p>
                          <p className="text-[11.5px] text-white/52">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

            {/* Founder badge */}
            <div className="flex justify-center mb-5">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(43,108,235,0.05) 50%, rgba(212,175,55,0.04) 100%)",
                  border: "1px solid rgba(212,175,55,0.16)",
                  boxShadow: "0 0 24px rgba(212,175,55,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-3 h-3" style={{ color: "rgba(212,175,55,0.55)" }} />
                  <span className="text-[10.5px] text-white/32">Developer & Founder</span>
                </div>
                <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.09)" }} />
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span
                    className="text-[11px] font-bold tracking-wider"
                    style={{
                      background: "linear-gradient(90deg, #d4af37 0%, #f5d06b 40%, #FF9933 70%, #d4af37 100%)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "founderShimmer 4s linear infinite",
                    }}
                  >
                    MD DANISH HUSSAIN
                  </span>
                </div>
                <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.09)" }} />
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-400" style={{ animation: "livePulse 2s ease-in-out infinite" }} />
                  <span className="text-[10px] text-white/26">Made in India 🇮🇳</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
              <p className="text-[10.5px] text-white/26 order-3 sm:order-1">
                © 2025 NyaySetu. All rights reserved. Designed &amp; Built by <span className="text-white/42 font-semibold">MD Danish Hussain</span>.
              </p>
              <div className="flex items-center gap-3 flex-wrap justify-center order-1 sm:order-2">
                {[
                  { icon: Lock, label: "End-to-End Encrypted", c: "#60a5fa", emoji: null },
                  { icon: Bot,  label: "AI Powered Platform",  c: "#a78bfa", emoji: null },
                  { icon: null, label: "Made in India",         c: "#fb923c", emoji: "🇮🇳" },
                  { icon: null, label: "Secure",                c: "#34d399", emoji: "🔒" },
                ].map((b, i) => {
                  const Icon = (b as any).icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold cursor-default"
                      style={{ color: b.c, background: `${b.c}0e`, border: `1px solid ${b.c}20` }}
                    >
                      {b.emoji ? <span>{b.emoji}</span> : <Icon className="w-2.5 h-2.5" />}
                      <span>{b.label}</span>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 order-2 sm:order-3">
                {["Privacy Policy", "Terms", "Contact Us", "Support"].map((l) => (
                  <span key={l} className="text-[10.5px] text-white/26 hover:text-white/58 cursor-pointer transition-colors duration-200">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
