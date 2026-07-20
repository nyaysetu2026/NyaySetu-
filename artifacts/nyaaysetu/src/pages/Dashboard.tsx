import { useGetDashboardStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Bot, Users, Landmark, FileText, ArrowRight, Activity, Globe, MessageSquare, Bell, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

export default function Dashboard() {
  const { data: stats, isLoading } = useGetDashboardStats();

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { text: "Good Morning", emoji: "🌅" };
    if (h < 18) return { text: "Good Afternoon", emoji: "☀️" };
    return { text: "Good Evening", emoji: "🌙" };
  };
  const greeting = getGreeting();

  const statChips = [
    { title: "Active Cases", value: stats?.activeCases, icon: Activity, color: "text-secondary", bg: "bg-secondary/10", glow: "rgba(43,108,235,0.25)" },
    { title: "Total Cases", value: stats?.totalCases, icon: Landmark, color: "text-amber-400", bg: "bg-amber-500/10", glow: "rgba(251,191,36,0.2)" },
    { title: "Lawyers", value: stats?.totalLawyers, icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10", glow: "rgba(52,211,153,0.2)" },
    { title: "AI Chats", value: stats?.aiConversations, icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-500/10", glow: "rgba(167,139,250,0.2)" },
  ];

  const quickActions = [
    { title: "Find Lawyers", icon: Users, href: "/lawyers", color: "text-emerald-400", bg: "bg-emerald-500/10", hoverGlow: "rgba(52,211,153,0.2)" },
    { title: "Case Tracker", icon: Landmark, href: "/cases", color: "text-amber-400", bg: "bg-amber-500/10", hoverGlow: "rgba(251,191,36,0.2)" },
    { title: "Documents", icon: FileText, href: "/documents", color: "text-purple-400", bg: "bg-purple-500/10", hoverGlow: "rgba(167,139,250,0.2)" },
    { title: "Your Rights", icon: Globe, href: "/rights", color: "text-blue-400", bg: "bg-blue-500/10", hoverGlow: "rgba(96,165,250,0.2)" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">

      {/* ── Live Status Banner ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center gap-3 px-4 py-3 rounded-2xl border border-secondary/20"
        style={{ background: "rgba(43,108,235,0.07)" }}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-secondary status-live" />
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Zap className="w-3.5 h-3.5 text-secondary shrink-0" />
          <p className="text-xs font-semibold text-secondary/90 truncate">eCourts Integration: Live  •  AI Assistant: Online  •  Last sync: just now</p>
        </div>
        <Bell className="w-4 h-4 text-secondary/50 shrink-0" />
      </motion.div>

      {/* ── Header ──────────────────────────────────── */}
      <div className="mb-8 pt-1 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-serif tracking-tight mb-1.5">
            {greeting.emoji} {greeting.text}, Citizen
          </h1>
          <p className="text-muted-foreground text-sm">Your legal command center.</p>
          <div className="text-xs text-foreground/30 mt-1 font-mono">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </motion.div>
      </div>

      {/* ── Stats Scroll ────────────────────────────── */}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 + 0.1 }}
              className="glass-card min-w-[160px] p-5 flex flex-col justify-between shrink-0 snap-start"
              style={{ boxShadow: `0 4px 24px ${chip.glow}` }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 rounded-xl ${chip.bg}`}>
                  <Icon className={`h-4 w-4 ${chip.color}`} />
                </div>
                <span className="text-xs font-semibold text-muted-foreground truncate">{chip.title}</span>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-16 bg-white/10 rounded-lg" />
              ) : (
                <span className={`text-3xl font-bold font-serif ${chip.color}`}>
                  <AnimatedCounter value={chip.value} loading={isLoading} />
                </span>
              )}
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
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="glass-card overflow-hidden relative group cursor-pointer border border-secondary/25"
            style={{ boxShadow: "0 8px 40px rgba(43,108,235,0.15)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 via-transparent to-accent/5 opacity-80" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
            <div className="p-6 sm:p-8 flex items-center justify-between relative z-10 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs font-bold tracking-[0.18em] uppercase text-secondary">AI Legal Assistant</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">Ask a legal question</h2>
                <p className="text-sm text-foreground/60 max-w-md">Get instant clarity on constitutional rights, IPC codes, procedures and more.</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 rounded-2xl bg-secondary text-white flex items-center justify-center shrink-0"
                style={{ boxShadow: "0 0 24px rgba(43,108,235,0.5), 0 4px 12px rgba(0,0,0,0.3)" }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
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
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.3 }}
                  whileHover={{ y: -5, boxShadow: `0 16px 40px ${action.hoverGlow}` }}
                  whileTap={{ scale: 0.96 }}
                  className="glass-card p-5 flex flex-col items-center justify-center gap-3 cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${action.bg} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}>
                    <Icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-center leading-tight">{action.title}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* ── Recent Activity ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="glass-card p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-foreground font-serif">Recent System Updates</h3>
          <span className="text-xs text-muted-foreground bg-white/5 px-2.5 py-1 rounded-full">Live</span>
        </div>
        <div className="space-y-5">
          {[
            { dot: "bg-secondary", glow: "rgba(43,108,235,0.8)", text: "New Document Added: Rental Agreement Template now available in Marathi.", time: "2 hours ago" },
            { dot: "bg-accent", glow: "rgba(212,175,55,0.8)", text: "System Update: eCourts integration synced successfully for Maharashtra.", time: "1 day ago" },
            { dot: "bg-emerald-400", glow: "rgba(52,211,153,0.8)", text: "50 new verified advocates joined the platform this week.", time: "3 days ago" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }} className="flex gap-4">
              <div className="relative mt-1.5 shrink-0">
                <div className={`w-2 h-2 rounded-full ${item.dot}`} style={{ boxShadow: `0 0 8px ${item.glow}` }} />
                {i < 2 && <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-6 bg-white/8" />}
              </div>
              <div>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.text}</p>
                <span className="text-xs text-muted-foreground mt-1 block">{item.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
