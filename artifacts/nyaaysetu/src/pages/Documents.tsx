import { useListDocuments } from "@workspace/api-client-react";
import { Link } from "wouter";
import { FileText, Download, Globe, ChevronRight, Folder, Lock, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

const CATEGORY_CFG: Record<string, { text: string; bg: string; border: string; glow: string; icon: string; color: string }> = {
  "Affidavits":  { text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20",    glow: "rgba(59,130,246,0.2)",   icon: "📋", color: "#3b82f6" },
  "Agreements":  { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "rgba(52,211,153,0.2)",   icon: "🤝", color: "#34d399" },
  "Petitions":   { text: "text-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/20",  glow: "rgba(168,85,247,0.2)",   icon: "⚖️", color: "#a855f7" },
  "Notices":     { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20",   glow: "rgba(245,158,11,0.2)",   icon: "📣", color: "#f59e0b" },
};

export default function Documents() {
  const { data: documents, isLoading } = useListDocuments();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Affidavits", "Agreements", "Petitions", "Notices"];
  const filtered = documents?.filter(doc => activeCategory === "All" || doc.category === activeCategory);

  return (
    <div className="relative min-h-screen">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-1/3 h-64 pointer-events-none" style={{
        background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 70%)",
        filter: "blur(50px)",
      }} />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-10 pt-4 lg:pt-0">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-accent" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Legally Sound Templates</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold font-serif text-white mb-2 tracking-tight">
              Document <span style={{ background:"linear-gradient(135deg,#a855f7,#6366f1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Vault</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">Standardized, legally-sound templates in multiple Indian languages. Ready to use, court-approved.</p>
            <TricolorBar className="w-16 mt-4" />
          </motion.div>
        </div>

        {/* ── Stats row ──────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Templates", value: documents?.length || "–", icon: FileText },
            { label: "Languages", value: "8+", icon: Globe },
            { label: "Downloads", value: `${((documents?.reduce((a, d) => a + (d.downloadCount || 0), 0) || 0) / 1000).toFixed(1)}K`, icon: TrendingUp },
          ].map(({ label, value, icon: Icon }, i) => (
            <div key={i} className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Icon className="w-4 h-4 text-muted-foreground/50 mx-auto mb-1.5" />
              <div className="text-xl font-bold text-white font-serif">{value}</div>
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Category tabs ────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="flex overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 mb-7">
          {categories.map(cat => {
            const active = activeCategory === cat;
            const cfg = CATEGORY_CFG[cat];
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.93 }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  active
                    ? cat === "All"
                      ? "bg-white text-black"
                      : `${cfg?.bg} ${cfg?.text} border ${cfg?.border}`
                    : "bg-white/5 border border-white/8 text-foreground/60 hover:bg-white/10 hover:text-white"
                }`}
                style={active && cat === "All"
                  ? { boxShadow: "0 4px 20px rgba(255,255,255,0.12)" }
                  : active && cfg ? { boxShadow: `0 4px 20px ${cfg.glow}` }
                  : {}}
              >
                {cfg?.icon ? `${cfg.icon} ` : ""}{cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Grid ────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-5 rounded-3xl flex items-center gap-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Skeleton className="h-14 w-14 rounded-2xl bg-white/8 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4 bg-white/8 rounded-lg" />
                    <Skeleton className="h-4 w-1/2 bg-white/5 rounded-lg" />
                  </div>
                </div>
              ))
            ) : !filtered?.length ? (
              <div className="col-span-full py-24 text-center">
                <div className="w-20 h-20 rounded-3xl bg-white/4 border border-white/6 flex items-center justify-center mx-auto mb-5">
                  <FileText className="h-10 w-10 text-white/15" />
                </div>
                <h3 className="text-xl font-bold font-serif mb-1">No documents found</h3>
                <p className="text-muted-foreground text-sm">Try a different category.</p>
              </div>
            ) : (
              filtered.map((doc, index) => {
                const cfg = CATEGORY_CFG[doc.category];
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.38, delay: index * 0.04 }}
                    whileHover={{ y: -4 }}
                  >
                    <Link href={`/documents/${doc.id}`} className="block h-full group">
                      <div
                        className="relative rounded-3xl p-5 flex items-center gap-4 cursor-pointer overflow-hidden transition-all duration-300 h-full"
                        style={{
                          background: "rgba(255,255,255,0.028)",
                          backdropFilter: "blur(24px)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = cfg ? `${cfg.color}40` : "rgba(99,102,241,0.3)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px rgba(0,0,0,0.3), 0 0 30px ${cfg?.glow || "rgba(99,102,241,0.15)"}`;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
                        }}
                      >
                        {/* Top line on hover */}
                        <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: cfg ? `linear-gradient(90deg,transparent,${cfg.color}60,transparent)` : "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)" }} />

                        {/* Icon */}
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{
                            background: cfg ? `rgba(${cfg.color === "#3b82f6" ? "59,130,246" : cfg.color === "#34d399" ? "52,211,153" : cfg.color === "#a855f7" ? "168,85,247" : "245,158,11"},0.1)` : "rgba(99,102,241,0.1)",
                            border: `1px solid ${cfg?.color || "#6366f1"}25`,
                            boxShadow: `0 0 20px ${cfg?.glow || "rgba(99,102,241,0.1)"}`,
                          }}
                        >
                          {cfg?.icon
                            ? <span className="text-2xl">{cfg.icon}</span>
                            : <FileText className={`w-6 h-6 ${cfg?.text || "text-indigo-400"}`} />}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[15px] font-bold text-white truncate mb-1.5 group-hover:text-white transition-colors">{doc.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground/65">
                            <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {doc.language}</span>
                            <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {doc.downloadCount}</span>
                            <span className={`font-semibold ${cfg?.text || "text-indigo-400"}`}>{doc.category}</span>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
