import { useListArticles } from "@workspace/api-client-react";
import { Link } from "wouter";
import { BookOpen, Clock, ChevronRight, Scale, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

const CATEGORY_CFG: Record<string, { text: string; bg: string; border: string; glow: string; gradFrom: string }> = {
  "Constitutional Rights": { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20",   glow: "rgba(212,175,55,0.15)",  gradFrom: "#d4af37" },
  "Criminal Procedure":    { text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20",    glow: "rgba(59,130,246,0.15)",  gradFrom: "#3b82f6" },
  "Property Law":          { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "rgba(52,211,153,0.15)",  gradFrom: "#34d399" },
  "Family Law":            { text: "text-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/20",  glow: "rgba(168,85,247,0.15)",  gradFrom: "#a855f7" },
};

export default function Rights() {
  const { data: articles, isLoading } = useListArticles();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Constitutional Rights", "Criminal Procedure", "Property Law", "Family Law"];
  const filtered = articles?.filter(art => activeCategory === "All" || art.category === activeCategory);

  return (
    <div className="relative min-h-screen">
      {/* Ambient top glow */}
      <div className="absolute top-0 right-1/4 w-1/2 h-72 pointer-events-none" style={{
        background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)",
        filter: "blur(50px)",
      }} />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-10 pt-4 lg:pt-0">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}>
            <div
              className="w-14 h-14 rounded-3xl flex items-center justify-center mb-5"
              style={{
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.22)",
                boxShadow: "0 0 24px rgba(212,175,55,0.12)",
              }}
            >
              <Scale className="w-7 h-7 text-accent" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold font-serif text-white mb-2 tracking-tight">
              Know Your <span style={{ background:"linear-gradient(135deg,#d4af37,#f5d06b)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Rights</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">Plain-language explanations of Indian laws and constitutional rights — written for every citizen.</p>
            <TricolorBar className="w-16 mt-4" />
          </motion.div>
        </div>

        {/* ── Category tabs ────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 mb-8">
          {categories.map(cat => {
            const active = activeCategory === cat;
            const cfg = CATEGORY_CFG[cat];
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.93 }}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  active
                    ? cat === "All"
                      ? "text-black"
                      : `${cfg?.bg} ${cfg?.text} border ${cfg?.border}`
                    : "bg-white/5 border border-white/8 text-foreground/60 hover:bg-white/10 hover:text-white"
                }`}
                style={active && cat === "All" ? {
                  background: "#ffffff",
                  boxShadow: "0 4px 20px rgba(255,255,255,0.15)",
                } : active && cfg ? {
                  boxShadow: `0 4px 20px ${cfg.glow}`,
                } : {}}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Articles Grid ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-7 rounded-3xl" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Skeleton className="h-5 w-1/3 mb-5 bg-white/8 rounded-full" />
                  <Skeleton className="h-7 w-5/6 mb-3 bg-white/8 rounded-lg" />
                  <Skeleton className="h-4 w-full mb-2 bg-white/5 rounded-lg" />
                  <Skeleton className="h-4 w-2/3 bg-white/5 rounded-lg" />
                </div>
              ))
            ) : !filtered?.length ? (
              <div className="col-span-full py-28 text-center">
                <div className="w-16 h-16 rounded-3xl bg-white/4 border border-white/6 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white/15" />
                </div>
                <h3 className="text-xl font-bold font-serif mb-1">No articles found</h3>
                <p className="text-muted-foreground text-sm">Try a different category.</p>
              </div>
            ) : (
              filtered.map((art, index) => {
                const cfg = CATEGORY_CFG[art.category] || CATEGORY_CFG["Constitutional Rights"];
                return (
                  <motion.div
                    key={art.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/rights/${art.id}`} className="block h-full group">
                      <div
                        className="relative rounded-3xl p-7 flex flex-col h-full cursor-pointer overflow-hidden transition-all duration-350"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          backdropFilter: "blur(24px)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = `rgba(${cfg.gradFrom === "#d4af37" ? "212,175,55" : cfg.gradFrom === "#3b82f6" ? "59,130,246" : cfg.gradFrom === "#34d399" ? "52,211,153" : "168,85,247"},0.3)`;
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.35), 0 0 40px ${cfg.glow}`;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.22)";
                        }}
                      >
                        {/* Top gradient line */}
                        <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg,transparent,${cfg.gradFrom}70,transparent)` }} />
                        {/* Left glow bar */}
                        <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(to bottom, ${cfg.gradFrom}, transparent)`, boxShadow: `2px 0 12px ${cfg.glow}` }} />

                        {/* Category badge */}
                        <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full self-start mb-5 ${cfg.text} ${cfg.bg} border ${cfg.border}`}>
                          <BookOpen className="w-2.5 h-2.5" /> {art.category}
                        </div>

                        <h2 className="text-xl font-bold font-serif text-white mb-2.5 leading-snug group-hover:text-foreground transition-colors">{art.title}</h2>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1 leading-relaxed">{art.summary}</p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                            <Clock className="w-3.5 h-3.5" /> {art.readTime} min read
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.12, x: 2 }}
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-250"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                          >
                            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
                          </motion.div>
                        </div>
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
