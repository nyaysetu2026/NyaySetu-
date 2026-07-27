import { useGetDashboardStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import {
  Bot, Users, Landmark, FileText, ArrowRight, Activity,
  MessageSquare, Bell, Zap, TrendingUp, BookOpen,
  AlertTriangle, Scale, ChevronRight, Sparkles,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TricolorBar } from "@/components/ui/india-flag-bg";

/* ─── Animated Counter ──────────────────────────────────────── */
function AnimatedCounter({ value, loading }: { value?: number; loading: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === undefined || loading) return;
    let start: number | null = null;
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.floor(ease * value));
      if (p < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [value, loading]);
  return <>{display.toLocaleString()}</>;
}

/* ─── Progress Ring ─────────────────────────────────────────── */
function ProgressRing({ value = 0, max = 100, color, size = 72, stroke = 5 }: {
  value?: number; max?: number; color: string; size?: number; stroke?: number;
}) {
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref as any, { once: true });
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const [dash, setDash] = useState(circ);

  useEffect(() => {
    if (!inView) return;
    const target = circ - pct * circ;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1300, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDash(circ - ease * (circ - target));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, pct, circ]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      <circle
        ref={ref}
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={dash}
        style={{ filter: `drop-shadow(0 0 5px ${color}aa)` }}
      />
    </svg>
  );
}

/* ─── Mini AI Orb (for dashboard card) ─────────────────────── */
function MiniOrb({ size = 48, pulse = true }: { size?: number; pulse?: boolean }) {
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      {pulse && (
        <div className="absolute rounded-full border border-blue-400/20"
          style={{ width: size * 1.6, height: size * 1.6, animation: "orbRing 2.5s ease-out infinite" }} />
      )}
      <div className="absolute rounded-full"
        style={{ width: size * 1.3, height: size * 1.3, background: "radial-gradient(circle,rgba(43,108,235,0.22) 0%,transparent 70%)", filter: "blur(8px)", animation: "aiBreath 3.5s ease-in-out infinite" }} />
      <div className="relative rounded-full flex items-center justify-center" style={{
        width: size, height: size,
        background: "linear-gradient(145deg,rgba(59,130,246,0.45) 0%,rgba(43,108,235,0.2) 50%,rgba(99,102,241,0.3) 100%)",
        border: "1px solid rgba(99,102,241,0.35)",
        boxShadow: "0 0 24px rgba(43,108,235,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
      }}>
        <Bot className="text-white" style={{ width: size * 0.45, height: size * 0.45 }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const { data: stats, isLoading } = useGetDashboardStats();

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { text: "Good Morning", sub: "नमस्ते — Start your legal day with confidence.", emoji: "🌅" };
    if (h < 18) return { text: "Good Afternoon", sub: "आपका स्वागत है — Your legal command center.", emoji: "☀️" };
    return { text: "Good Evening", sub: "शुभ संध्या — Review your active cases.", emoji: "🌙" };
  };
  const greeting = getGreeting();

  const statCards = [
    { title: "Active Cases",  value: stats?.activeCases,     max: 50,   icon: Activity,      color: "#3b82f6", glow: "rgba(59,130,246,0.18)"  },
    { title: "Total Cases",   value: stats?.totalCases,      max: 100,  icon: Landmark,      color: "#f59e0b", glow: "rgba(245,158,11,0.18)"  },
    { title: "Advocates",     value: stats?.totalLawyers,    max: 2000, icon: Users,         color: "#34d399", glow: "rgba(52,211,153,0.18)"  },
    { title: "AI Chats",      value: stats?.aiConversations, max: 500,  icon: MessageSquare, color: "#a78bfa", glow: "rgba(167,139,250,0.18)" },
  ];

  const quickActions = [
    { title: "Find Lawyers",  icon: Users,      href: "/lawyers",   color: "#34d399", bg: "rgba(52,211,153,0.1)",   border: "rgba(52,211,153,0.2)"  },
    { title: "Case Tracker",  icon: Landmark,   href: "/cases",     color: "#f59e0b", bg: "rgba(245,158,11,0.1)",   border: "rgba(245,158,11,0.2)"  },
    { title: "Documents",     icon: FileText,   href: "/documents", color: "#a78bfa", bg: "rgba(167,139,250,0.1)",  border: "rgba(167,139,250,0.2)" },
    { title: "Your Rights",   icon: BookOpen,   href: "/rights",    color: "#60a5fa", bg: "rgba(96,165,250,0.1)",   border: "rgba(96,165,250,0.2)"  },
  ];

  const insights = [
    { label: "Case Resolution",  value: 87,  unit: "%", color: "#34d399", desc: "Above national average" },
    { label: "AI Response Time", value: 1.2, unit: "s", color: "#3b82f6", desc: "Average latency" },
    { label: "User Satisfaction",value: 96,  unit: "%", color: "#f59e0b", desc: "Platform reviews" },
  ];

  const activity = [
    { color: "#3b82f6", icon: FileText, text: "New Document: Rental Agreement Template now available in Marathi.", time: "2 hours ago" },
    { color: "#d4af37", icon: Zap,      text: "System Update: eCourts integration synced for Maharashtra.", time: "1 day ago" },
    { color: "#34d399", icon: Users,    text: "50 new verified advocates joined the platform this week.", time: "3 days ago" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Page ambient glow */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(43,108,235,0.08) 0%, transparent 70%)",
      }} />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* ── Live Status Banner ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 flex items-center gap-3 px-4 py-3 rounded-2xl relative overflow-hidden"
          style={{
            background: "rgba(43,108,235,0.06)",
            border: "1px solid rgba(43,108,235,0.14)",
            boxShadow: "0 4px 20px rgba(43,108,235,0.07), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute inset-y-0 w-1/4" style={{ background: "linear-gradient(90deg,transparent,rgba(43,108,235,0.06),transparent)", animation: "shimmerSweep 4s ease-in-out infinite" }} />
          </div>
          <div className="relative flex items-center">
            <div className="w-2 h-2 rounded-full bg-secondary" style={{ boxShadow: "0 0 8px rgba(43,108,235,0.9)" }} />
            <div className="absolute w-4 h-4 rounded-full bg-secondary/15 animate-ping" />
          </div>
          <Zap className="w-3.5 h-3.5 text-secondary shrink-0 relative z-10" />
          <p className="text-xs font-semibold text-secondary/85 truncate relative z-10">
            eCourts Integration: Live &nbsp;·&nbsp; AI Assistant: Online &nbsp;·&nbsp; Last sync: just now
          </p>
          <Bell className="w-4 h-4 text-secondary/35 shrink-0 relative z-10" />
        </motion.div>

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="mb-9 pt-1 lg:pt-0">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl lg:text-5xl font-bold font-serif text-white tracking-tight mb-1.5">
                  {greeting.emoji} {greeting.text},
                  <span style={{ background: "linear-gradient(135deg,#d4af37,#f5d06b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}> Citizen</span>
                </h1>
                <p className="text-muted-foreground text-sm">{greeting.sub}</p>
              </div>
              {/* India mini flag */}
              <div className="flex flex-col rounded-lg overflow-hidden shrink-0 mt-2" style={{ width: 30, height: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.45)" }}>
                <div style={{ flex: 1, background: "#FF9933" }} />
                <div style={{ flex: 1, background: "#F0F0F0" }} />
                <div style={{ flex: 1, background: "#138808" }} />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-xs text-foreground/30 font-mono">
                {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </span>
              <TricolorBar className="w-14" />
            </div>
          </motion.div>
        </div>

        {/* ── Stat Cards ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex overflow-x-auto pb-5 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 no-scrollbar snap-x mb-7"
        >
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.07 + 0.12, type: "spring", stiffness: 280, damping: 26 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="min-w-[182px] p-5 flex flex-col shrink-0 snap-start rounded-3xl relative overflow-hidden cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: `0 4px 28px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${card.color}30`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${card.glow.replace("0.18","0.3")}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 28px ${card.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`;
                }}
              >
                {/* Colored top shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${card.color}50,transparent)` }} />
                {/* Ambient inner glow */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${card.color}08 0%, transparent 60%)` }} />

                {/* Header row */}
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}>
                    <Icon className="h-4 w-4" style={{ color: card.color }} />
                  </div>
                  <ProgressRing value={card.value || 0} max={card.max} color={card.color} size={44} stroke={4} />
                </div>

                {/* Value */}
                <div className="relative z-10">
                  <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider block mb-1">{card.title}</span>
                  {isLoading ? (
                    <Skeleton className="h-9 w-16 bg-white/10 rounded-xl" />
                  ) : (
                    <span className="text-4xl font-black font-serif" style={{ color: card.color, filter: `drop-shadow(0 0 10px ${card.color}60)` }}>
                      <AnimatedCounter value={card.value} loading={isLoading} />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── AI Chat Feature Card ──────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-7">
          <Link href="/ai-chat">
            <motion.div
              whileHover={{ scale: 1.008, y: -4 }}
              whileTap={{ scale: 0.995 }}
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
              style={{
                background: "linear-gradient(135deg, rgba(43,108,235,0.18) 0%, rgba(43,108,235,0.07) 55%, rgba(99,102,241,0.1) 100%)",
                border: "1px solid rgba(43,108,235,0.28)",
                boxShadow: "0 8px 56px rgba(43,108,235,0.16), inset 0 1px 0 rgba(255,255,255,0.06)",
                backdropFilter: "blur(28px)",
              }}
            >
              {/* Animated top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
              {/* Shimmer on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-y-0 w-1/3" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)", animation: "shimmerSweep 1.8s ease-in-out infinite" }} />
              </div>

              <div className="p-7 lg:p-10 flex items-center gap-6 relative z-10">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" style={{ boxShadow: "0 0 8px rgba(96,165,250,0.9)", animation: "aiBreath 2s ease-in-out infinite" }} />
                    <span className="text-xs font-bold tracking-[0.18em] uppercase text-blue-400">AI Legal Assistant</span>
                    <span className="text-[9px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">LIVE</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-2 tracking-tight">
                    Ask a Legal Question
                  </h2>
                  <p className="text-sm text-foreground/55 max-w-lg leading-relaxed">
                    Get instant answers on constitutional rights, IPC codes, court procedures, and more. Powered by Gemini AI — free for every citizen.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all">
                    <Sparkles className="w-4 h-4" />
                    Start a conversation
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Right — animated AI orb */}
                <div className="shrink-0 hidden sm:block">
                  <MiniOrb size={80} pulse />
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* ── Quick Actions ─────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-7">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground/60">Quick Access</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link key={action.href} href={action.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 + 0.28 }}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.94 }}
                    className="relative p-5 flex flex-col items-center justify-center gap-3 cursor-pointer group rounded-3xl overflow-hidden text-center"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      backdropFilter: "blur(24px)",
                      border: `1px solid ${action.border}`,
                      boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.32), 0 0 40px ${action.bg.replace("0.1","0.25")}`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${action.color}40`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.2)";
                      (e.currentTarget as HTMLElement).style.borderColor = action.border;
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg,transparent,${action.color}60,transparent)` }} />
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ background: action.bg, border: `1px solid ${action.border}`, boxShadow: `0 0 20px ${action.bg.replace("0.1","0.2")}` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: action.color }} />
                    </div>
                    <span className="text-sm font-semibold text-foreground/75 group-hover:text-white transition-colors leading-tight">{action.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity -mt-1" style={{ color: action.color }} />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* ── Insights Row ──────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-7">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-muted-foreground/50" />
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground/60">Platform Insights</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {insights.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="p-5 rounded-3xl flex items-center gap-4 relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${item.color}25`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px rgba(0,0,0,0.28), 0 0 24px ${item.color}15`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${item.color}35,transparent)` }} />
                <ProgressRing value={item.value} max={100} color={item.color} size={60} stroke={5} />
                <div>
                  <div className="text-2xl font-black font-serif" style={{ color: item.color, filter: `drop-shadow(0 0 8px ${item.color}60)` }}>
                    {item.value}{item.unit}
                  </div>
                  <div className="text-sm font-semibold text-foreground/75 leading-snug">{item.label}</div>
                  <div className="text-xs text-muted-foreground/50 mt-0.5">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Recent Activity ───────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-7">
          <div
            className="rounded-3xl p-6 lg:p-7 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              backdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 4px 28px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-base font-bold font-serif">Recent Activity</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" style={{ boxShadow: "0 0 6px rgba(96,165,250,0.9)" }} />
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider">Live Feed</span>
              </div>
            </div>

            <div className="space-y-5">
              {activity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.42 + i * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{
                        background: `${item.color}12`,
                        border: `1px solid ${item.color}25`,
                        boxShadow: `0 0 12px ${item.color}15`,
                      }}>
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      {i < activity.length - 1 && (
                        <div className="flex-1 w-px my-1.5" style={{ background: "rgba(255,255,255,0.05)" }} />
                      )}
                    </div>
                    <div className="pb-2 flex-1">
                      <p className="text-sm text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors">{item.text}</p>
                      <span className="text-xs text-muted-foreground/45 mt-1.5 block">{item.time}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Emergency Quick Access ────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-4">
          <Link href="/emergency">
            <motion.div
              whileHover={{ scale: 1.01, y: -3 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-center justify-between p-5 rounded-3xl relative overflow-hidden cursor-pointer group"
              style={{
                background: "rgba(220,38,38,0.06)",
                border: "1px solid rgba(220,38,38,0.18)",
                boxShadow: "0 4px 24px rgba(220,38,38,0.07)",
                backdropFilter: "blur(20px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.28), 0 0 40px rgba(220,38,38,0.1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.18)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(220,38,38,0.07)";
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(220,38,38,0.4),transparent)" }} />
              <motion.div
                animate={{ scale: [1,1.12,1], opacity: [0.12,0.2,0.12] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -top-4 -left-4 w-20 h-20 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(220,38,38,0.25) 0%, transparent 70%)" }}
              />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.25)", boxShadow: "0 0 20px rgba(220,38,38,0.15)" }}>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-red-400 mb-0.5">Emergency Legal Help</p>
                  <p className="text-xs text-muted-foreground/55">National helplines & legal aid — available 24/7</p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <span className="text-xs font-bold text-red-400/60 hidden sm:block">Open</span>
                <ArrowRight className="w-4 h-4 text-red-400/50 group-hover:translate-x-1.5 group-hover:text-red-400 transition-all" />
              </div>
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
