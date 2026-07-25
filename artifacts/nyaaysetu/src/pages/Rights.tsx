import { useListArticles } from "@workspace/api-client-react";
import { Link } from "wouter";
import { BookOpen, Clock, ChevronRight, Scale } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

const CATEGORY_ACCENTS: Record<string, { text: string; bg: string; bar: string }> = {
  "Constitutional Rights": { text: "text-accent",    bg: "bg-accent/10",    bar: "from-accent/60" },
  "Criminal Procedure":    { text: "text-blue-400",  bg: "bg-blue-500/10",  bar: "from-blue-400/60" },
  "Property Law":          { text: "text-emerald-400", bg: "bg-emerald-500/10", bar: "from-emerald-400/60" },
  "Family Law":            { text: "text-purple-400", bg: "bg-purple-500/10", bar: "from-purple-400/60" },
};

export default function Rights() {
  const { data: articles, isLoading } = useListArticles();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Constitutional Rights", "Criminal Procedure", "Property Law", "Family Law"];
  const filteredArticles = articles?.filter(art => activeCategory === "All" || art.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">

      {/* Header */}
      <div className="mb-8 pt-4 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
            <Scale className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold font-serif text-foreground mb-1.5">Know Your Rights</h1>
          <p className="text-muted-foreground text-sm">Plain-language explanations of Indian laws and constitutional rights.</p>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2.5 mb-7">
        {categories.map(cat => {
          const active = activeCategory === cat;
          const cfg = CATEGORY_ACCENTS[cat];
          return (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.93 }}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
                active
                  ? cat === "All"
                    ? "bg-white text-black"
                    : `${cfg?.bg} ${cfg?.text} border border-current/20`
                  : "bg-white/5 border border-white/8 text-foreground/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card p-6">
              <Skeleton className="h-4 w-1/3 mb-4 bg-white/8 rounded-full" />
              <Skeleton className="h-7 w-5/6 mb-3 bg-white/8 rounded-lg" />
              <Skeleton className="h-4 w-full mb-1.5 bg-white/5 rounded-lg" />
              <Skeleton className="h-4 w-2/3 bg-white/5 rounded-lg" />
            </div>
          ))
        ) : filteredArticles?.length === 0 ? (
          <div className="col-span-full py-24 text-center">
            <h3 className="text-xl font-bold text-foreground font-serif">No articles found</h3>
            <p className="text-muted-foreground text-sm mt-1">Try a different category.</p>
          </div>
        ) : (
          filteredArticles?.map((art, index) => {
            const cfg = CATEGORY_ACCENTS[art.category] || CATEGORY_ACCENTS["Constitutional Rights"];
            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -3 }}
              >
                <Link href={`/rights/${art.id}`} className="block h-full">
                  <div className="glass-card p-6 group cursor-pointer flex flex-col h-full relative overflow-hidden">
                    {/* Gradient top-left accent line */}
                    <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${cfg.bar} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${cfg.bar} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                    {/* Category badge */}
                    <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] ${cfg.text} ${cfg.bg} px-3 py-1.5 rounded-full self-start mb-4`}>
                      <BookOpen className="w-3 h-3" /> {art.category}
                    </div>

                    <h2 className="text-xl font-bold font-serif text-white mb-2.5 leading-snug group-hover:text-foreground transition-colors">{art.title}</h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-5 flex-1 leading-relaxed">{art.summary}</p>

                    <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-white/5">
                      <div className="text-muted-foreground/70 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {art.readTime} min read
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
