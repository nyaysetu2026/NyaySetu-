import { useGetDashboardStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Bot, Users, Landmark, FileText, ArrowRight, Activity, Globe, MessageSquare, Bell, Zap, TrendingUp, Scale, BookOpen, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TricolorBar } from "@/components/ui/india-flag-bg";

function AnimatedCounter({ value, loading }: { value?: number; loading: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === undefined || loading) return;
    let start: number | null = null;
    const duration = 1400;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [value, loading]);

  return <>{display.toLocaleString()}</>;
}

/** Circular progress ring */
function ProgressRing({ value = 0, max = 100, color, size = 80, stroke = 6 }: {
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
      const p = Math.min((ts - start) / 1200, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDash(circ - ease * (circ - target));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, pct, circ]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={dash}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </svg>
  );
}

export default function Dashboard() {
  const { data: stats, isLoading } = useGetDashboardStats();

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { text: "Good Morning", sub: "नमस्ते — Start your legal day with confidence.", icon: "🌅" };
    if (h < 18) return { text: "Good Afternoon", sub: "आपका स्वागत है — Your legal command center.", icon: "☀️" };
    return { text: "Good Evening", sub: "शुभ संध्या — Review your active cases.", icon: "🌙" };
  };
  const greeting = getGreeting();

  const statChips = [
    { title: "Active Cases", value: stats?.activeCases, max: 50, icon: Activity, color: "#3b82f6", ringColor: "#3b82f6", bg: "bg-blue-500/10", glow: "rgba(59,130,246,0.2)" },
    { title: "Total Cases", value: stats?.totalCases, max: 100, icon: Landmark, color: "#f59e0b", ringColor: "#f59e0b", bg: "bg-amber-500/10", glow: "rgba(245,158,11,0.2)" },
    { title: "Lawyers", value: stats?.totalLawyers, max: 2000, icon: Users, color: "#34d399", ringColor: "#34d399", bg: "bg-emerald-500/10", glow: "rgba(52,211,153,0.2)" },
    { title: "AI Chats", value: stats?.aiConversations, max: 500, icon: MessageSquare, color: "#a78bfa", ringColor: "#a78bfa", bg: "bg-purple-500/10", glow: "rgba(167,139,250,0.2)" },
  ];

  const quickActions = [
    { title: "Find Lawyers", icon: Users, href: "/lawyers", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "rgba(52,211,153,0.2)", glow: "rgba(52,211,153,0.15)" },
    { title: "Case Tracker", icon: Landmark, href: "/cases", color: "text-amber-400", bg: "bg-amber-500/10", border: "rgba(245,158,11,0.2)", glow: "rgba(245,158,11,0.15)" },
    { title: "Documents", icon: FileText, href: "/documents", color: "text-purple-400", bg: "bg-purple-500/10", border: "rgba(167,139,250,0.2)", glow: "rgba(167,139,250,0.15)" },
    { title: "Your Rights", icon: BookOpen, href: "/rights", color: "text-blue-400", bg: "bg-blue-500/10", border: "rgba(96,165,250,0.2)", glow: "rgba(96,165,250,0.15)" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">

      {/* ── Live Status Banner ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex items-center gap-3 px-4 py-3 rounded-2xl relative overflow-hidden"
        style={{
          background: "rgba(43,108,235,0.06)",
          border: "1px solid rgba(43,108,235,0.15)",
          boxShadow: "0 4px 20px rgba(43,108,235,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Shimmer sweep */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div
            className="absolute inset-y-0 w-1/4"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(43,108,235,0.08), transparent)",
              animation: "shimmerSweep 4s ease-in-out infinite",
            }}
          />
        </div>
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-secondary status-live" />
          <div className="absolute w-4 h-4 rounded-full bg-secondary/20 animate-ping" />
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Zap className="w-3.5 h-3.5 text-secondary shrink-0" />
          <p className="text-xs font-semibold text-secondary/90 truncate">
            eCourts Integration: Live  •  AI Assistant: Online  •  Last sync: just now
          </p>
        </div>
        <Bell className="w-4 h-4 text-secondary/40 shrink-0" />
      </motion.div>

      {/* ── Header ──────────────────────────────────── */}
      <div className="mb-8 pt-1 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-serif tracking-tight mb-1">
                {greeting.icon} {greeting.text}, Citizen
              </h1>
              <p className="text-muted-foreground text-sm">{greeting.sub}</p>
            </div>
            {/* India flag badge */}
            <div className="flex flex-col rounded-md overflow-hidden shrink-0 mt-1" style={{ width: 28, height: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
              <div style={{ flex: 1, background: "#FF9933" }} />
              <div style={{ flex: 1, background: "#F0F0F0" }} />
              <div style={{ flex: 1, background: "#138808" }} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-foreground/30 font-mono">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </div>
            <TricolorBar className="w-16" />
          </div>
        </motion.div>
      </div>

      {/* ── Stats Cards ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex overflow-x-auto pb-5 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 no-scrollbar snap-x mb-6"
      >
        {statChips.map((chip, i) => {
          const Icon = chip.icon;
          return (
            <motion.div
              key={chip.title}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08 + 0.1, type: "spring", stiffness: 300, damping: 28 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="min-w-[175px] p-5 flex flex-col justify-between shrink-0 snap-start rounded-[22px] relative overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: `0 4px 24px ${chip.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
              }}
            >
              {/* Top shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{
                background: `linear-gradient(90deg, transparent, ${chip.color}40, transparent)`,
              }} />

              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-xl ${chip.bg}`}>
                  <Icon className="h-4 w-4" style={{ color: chip.color }} />
                </div>
                <ProgressRing
                  value={chip.value || 0}
                  max={chip.max}
                  color={chip.ringColor}
                  size={44}
                  stroke={4}
                />
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground block mb-1">{chip.title}</span>
                {isLoading ? (
                  <Skeleton className="h-8 w-16 bg-white/10 rounded-lg" />
                ) : (
                  <span className="text-3xl font-bold font-serif" style={{ color: chip.color, filter: `drop-shadow(0 0 8px ${chip.glow})` }}>
                    <AnimatedCounter value={chip.value} loading={isLoading} />
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Featured AI Card ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Link href="/ai-chat">
          <motion.div
            whileHover={{ scale: 1.01, y: -3 }}
            whileTap={{ scale: 0.99 }}
            className="overflow-hidden relative group cursor-pointer rounded-[22px]"
            style={{
              background: "linear-gradient(135deg, rgba(43,108,235,0.18) 0%, rgba(43,108,235,0.06) 60%, rgba(212,175,55,0.08) 100%)",
              border: "1px solid rgba(43,108,235,0.25)",
              boxShadow: "0 8px 48px rgba(43,108,235,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Animated top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />

            {/* Shimmer sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div
                className="absolute inset-y-0 w-1/3"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                  animation: "shimmerSweep 1.8s ease-in-out infinite",
                }}
              />
            </div>

            {/* AI Orb */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:block">
              <div className="relative w-16 h-16">
                {/* Rings */}
                <div className="absolute inset-0 rounded-full border border-secondary/30 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute inset-2 rounded-full border border-secondary/20 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.3s" }} />
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(43,108,235,0.4) 0%, rgba(43,108,235,0.2) 100%)",
                    border: "1px solid rgba(43,108,235,0.4)",
                    boxShadow: "0 0 30px rgba(43,108,235,0.5)",
                  }}
                >
                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex items-center justify-between relative z-10 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ boxShadow: "0 0 8px rgba(43,108,235,0.8)" }} />
                  <span className="text-xs font-bold tracking-[0.18em] uppercase text-secondary">AI Legal Assistant</span>
                  <span className="text-[10px] text-emerald-400/80 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full font-bold">LIVE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">Ask a legal question</h2>
                <p className="text-sm text-foreground/55 max-w-md leading-relaxed">
                  Get instant clarity on constitutional rights, IPC codes, procedures and more. Powered by Gemini AI.
                </p>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* ── Quick Actions ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground">Quick Actions</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.3 }}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-5 flex flex-col items-center justify-center gap-3 cursor-pointer group rounded-[20px] relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${action.border}`,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px rgba(0,0,0,0.3), 0 0 32px ${action.glow}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.2)";
                  }}
                >
                  {/* Top shimmer */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${action.glow.replace('0.15', '0.6')}, transparent)` }}
                  />
                  <div className={`w-12 h-12 rounded-2xl ${action.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
                    style={{ border: `1px solid ${action.border}` }}>
                    <Icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-center leading-tight text-foreground/80 group-hover:text-white transition-colors">{action.title}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* ── Insights Row ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8"
      >
        {/* Mini platform stats */}
        {[
          { label: "Case Resolution Rate", value: 87, unit: "%", color: "#34d399", desc: "Above national average" },
          { label: "Avg. Response Time", value: 1.2, unit: "s", color: "#3b82f6", desc: "AI assistant latency" },
          { label: "User Satisfaction", value: 96, unit: "%", color: "#f59e0b", desc: "Based on platform reviews" },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3 }}
            className="p-5 rounded-[20px] flex items-center gap-4 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              backdropFilter: "blur(20px)",
            }}
          >
            <ProgressRing value={item.value} max={100} color={item.color} size={56} stroke={5} />
            <div>
              <div className="text-xl font-bold font-serif" style={{ color: item.color }}>
                {item.value}{item.unit}
              </div>
              <div className="text-sm font-semibold text-foreground/70">{item.label}</div>
              <div className="text-xs text-muted-foreground/60 mt-0.5">{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Recent Activity ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="rounded-[22px] p-6 mb-8 relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <h3 className="text-base font-bold text-foreground font-serif">Recent System Updates</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Live</span>
          </div>
        </div>

        <div className="space-y-5">
          {[
            { dot: "#3b82f6", glow: "rgba(59,130,246,0.8)", text: "New Document Added: Rental Agreement Template now available in Marathi.", time: "2 hours ago", icon: FileText },
            { dot: "#d4af37", glow: "rgba(212,175,55,0.8)", text: "System Update: eCourts integration synced successfully for Maharashtra.", time: "1 day ago", icon: Zap },
            { dot: "#34d399", glow: "rgba(52,211,153,0.8)", text: "50 new verified advocates joined the platform this week.", time: "3 days ago", icon: Users },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-4 group"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${item.dot}15`,
                      border: `1px solid ${item.dot}30`,
                      boxShadow: `0 0 12px ${item.glow.replace('0.8', '0.15')}`,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: item.dot }} />
                  </div>
                  {i < 2 && (
                    <div className="flex-1 w-px my-1.5" style={{ background: "rgba(255,255,255,0.06)" }} />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-sm text-foreground/75 leading-relaxed group-hover:text-foreground/90 transition-colors">
                    {item.text}
                  </p>
                  <span className="text-xs text-muted-foreground/50 mt-1 block">{item.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Emergency quick access ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <Link href="/emergency">
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center justify-between p-5 rounded-[20px] relative overflow-hidden cursor-pointer group"
            style={{
              background: "rgba(220,38,38,0.06)",
              border: "1px solid rgba(220,38,38,0.2)",
              boxShadow: "0 4px 24px rgba(220,38,38,0.08)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-3 -left-3 w-16 h-16 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)" }}
            />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-destructive/15 border border-destructive/25 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-bold text-destructive">Emergency Legal Help</p>
                <p className="text-xs text-muted-foreground/60">National helplines & legal aid — available 24/7</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-destructive/50 group-hover:translate-x-1.5 transition-transform relative z-10" />
          </motion.div>
        </Link>
      </motion.div>

    </div>
  );
}
