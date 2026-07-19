import { useGetDashboardStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Bot, Users, Landmark, FileText, ArrowRight, Activity, Globe, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: stats, isLoading } = useGetDashboardStats();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl pt-safe-top">
      {/* Header */}
      <div className="mb-8 pt-4 lg:pt-0">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-serif tracking-tight mb-2">
          {getGreeting()}, Citizen
        </h1>
        <p className="text-muted-foreground text-base">Your legal command center.</p>
        <div className="text-xs text-foreground/40 mt-1 font-mono">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

      {/* Horizontal Stats Scroll (App Style) */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {}
        }}
        className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 no-scrollbar snap-x mb-6"
      >
        <StatChip title="Active Cases" value={stats?.activeCases} icon={<Activity className="h-4 w-4 text-secondary" />} loading={isLoading} />
        <StatChip title="Cases Tracked" value={stats?.totalCases} icon={<Landmark className="h-4 w-4 text-accent" />} loading={isLoading} />
        <StatChip title="Lawyers" value={stats?.totalLawyers} icon={<Users className="h-4 w-4 text-emerald-400" />} loading={isLoading} />
        <StatChip title="AI Chats" value={stats?.aiConversations} icon={<MessageSquare className="h-4 w-4 text-purple-400" />} loading={isLoading} />
      </motion.div>

      {/* Featured AI Card */}
      <Link href="/ai-chat">
        <div className="mb-8 glass-card overflow-hidden relative group cursor-pointer border border-secondary/30">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-50" />
          <div className="p-6 sm:p-8 flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-secondary" />
                <span className="text-sm font-semibold tracking-wider uppercase text-secondary">AI Legal Assistant</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">Ask a legal question</h2>
              <p className="text-sm text-foreground/70 max-w-md">Get instant clarity on constitutional rights, IPC codes, and procedures.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(43,108,235,0.4)] group-hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </div>
      </Link>

      {/* Quick Action Grid */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-foreground mb-4 px-1">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }} className="contents">
            <QuickActionCard
              title="Find Lawyers"
              icon={<Users className="h-6 w-6 text-emerald-400" />}
              href="/lawyers"
              bg="bg-emerald-500/10"
            />
            <QuickActionCard
              title="Case Tracker"
              icon={<Landmark className="h-6 w-6 text-amber-400" />}
              href="/cases"
              bg="bg-amber-500/10"
            />
            <QuickActionCard
              title="Documents"
              icon={<FileText className="h-6 w-6 text-purple-400" />}
              href="/documents"
              bg="bg-purple-500/10"
            />
            <QuickActionCard
              title="Your Rights"
              icon={<Globe className="h-6 w-6 text-blue-400" />}
              href="/rights"
              bg="bg-blue-500/10"
            />
          </motion.div>
        </div>
      </div>

      {/* Recent Activity (Minimalist) */}
      <div className="glass-card p-6 mb-8">
        <h3 className="text-lg font-bold text-foreground mb-4 font-serif">Recent System Updates</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0 shadow-[0_0_8px_rgba(43,108,235,0.8)]" />
            <div>
              <p className="text-sm text-foreground">New Document Added: Rental Agreement Template now available in Marathi.</p>
              <span className="text-xs text-muted-foreground mt-1 block">2 hours ago</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            <div>
              <p className="text-sm text-foreground">System Update: eCourts integration synced successfully for Maharashtra.</p>
              <span className="text-xs text-muted-foreground mt-1 block">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatChip({ title, value, icon, loading }: { title: string, value?: number, icon: React.ReactNode, loading: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === undefined || loading) return;
    
    let startTimestamp: number | null = null;
    const duration = 1500; // 1.5 seconds
    const startValue = 0;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, loading]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card min-w-[160px] p-4 flex flex-col justify-between shrink-0 snap-start"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-white/5 rounded-md">
          {icon}
        </div>
        <span className="text-xs font-medium text-muted-foreground truncate">{title}</span>
      </div>
      {loading ? (
        <Skeleton className="h-7 w-16 bg-white/10" />
      ) : (
        <span className="text-2xl font-bold font-serif">{displayValue.toLocaleString()}</span>
      )}
    </motion.div>
  );
}

function QuickActionCard({ title, icon, href, bg }: { title: string, icon: React.ReactNode, href: string, bg: string }) {
  return (
    <Link href={href}>
      <motion.div 
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        whileHover={{ scale: 1.03, y: -4, borderColor: "rgba(212,175,55,0.35)", boxShadow: "0 8px 40px rgba(212,175,55,0.12)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="glass-card p-5 flex flex-col items-center justify-center gap-3 h-full cursor-pointer hover:bg-white/5 transition-colors"
      >
        <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center mb-1`}>
          {icon}
        </div>
        <span className="text-sm font-semibold text-center leading-tight">{title}</span>
      </motion.div>
    </Link>
  );
}