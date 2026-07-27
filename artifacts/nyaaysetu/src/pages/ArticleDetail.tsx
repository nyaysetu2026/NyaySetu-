import { useGetArticle } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, BookOpen, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

const CATEGORY_CFG: Record<string, { text: string; bg: string; border: string; glow: string; color: string }> = {
  "Constitutional Rights": { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20",   glow: "rgba(212,175,55,0.15)",  color: "#d4af37" },
  "Criminal Procedure":    { text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20",    glow: "rgba(59,130,246,0.15)",  color: "#3b82f6" },
  "Property Law":          { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "rgba(52,211,153,0.15)",  color: "#34d399" },
  "Family Law":            { text: "text-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/20",  glow: "rgba(168,85,247,0.15)",  color: "#a855f7" },
};

function LoadingSkeleton() {
  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-3xl">
      <Skeleton className="h-4 w-40 mb-8 bg-white/8 rounded-lg" />
      <Skeleton className="h-7 w-28 mb-5 bg-white/8 rounded-full" />
      <Skeleton className="h-12 w-full mb-3 bg-white/8 rounded-2xl" />
      <Skeleton className="h-6 w-3/4 mb-6 bg-white/5 rounded-xl" />
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-5 w-24 bg-white/5 rounded-lg" />
        <Skeleton className="h-5 w-24 bg-white/5 rounded-lg" />
      </div>
      <Skeleton className="h-[45vh] w-full bg-white/5 rounded-3xl" />
    </div>
  );
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, isError } = useGetArticle(Number(id), {
    query: { enabled: !!id, queryKey: ['/api/articles', Number(id)] }
  });

  if (isLoading) return <LoadingSkeleton />;

  if (isError || !article) return (
    <div className="mx-auto px-4 py-20 text-center max-w-md">
      <div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <BookOpen className="h-10 w-10 text-white/20" />
      </div>
      <h2 className="text-2xl font-bold font-serif text-white mb-2">Article Not Found</h2>
      <p className="text-muted-foreground text-sm mb-6">This article may have been removed or the link is invalid.</p>
      <Link href="/rights">
        <motion.div
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold cursor-pointer"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Knowledge Base
        </motion.div>
      </Link>
    </div>
  );

  const cfg = CATEGORY_CFG[article.category] || CATEGORY_CFG["Constitutional Rights"];

  return (
    <div className="relative min-h-screen">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-1/2 h-72 pointer-events-none" style={{
        background: `radial-gradient(ellipse, ${cfg.glow} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }} />

      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-3xl relative z-10">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/rights">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-white transition-colors mb-8 group cursor-pointer">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="font-medium">Back to Knowledge Base</span>
            </div>
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden mb-4"
          style={{
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Category color top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, ${cfg.color}, ${cfg.color}80, ${cfg.color}30)` }}
          />

          {/* Left accent bar */}
          <div
            className="absolute left-0 top-8 bottom-8 w-[3px] rounded-r-full"
            style={{ background: `linear-gradient(to bottom, ${cfg.color}, ${cfg.color}40)`, boxShadow: `2px 0 12px ${cfg.glow}` }}
          />

          {/* Header */}
          <header className="px-8 md:px-12 pt-10 pb-7 text-center border-b border-white/5">
            {/* Category badge */}
            <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-5 ${cfg.text} ${cfg.bg} border ${cfg.border}`}>
              <BookOpen className="w-2.5 h-2.5" /> {article.category}
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif text-white leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-base text-muted-foreground/70 leading-relaxed max-w-xl mx-auto mb-5">
              {article.summary}
            </p>

            <TricolorBar className="w-14 mx-auto mb-5" />

            <div className="flex items-center justify-center gap-5 text-xs text-muted-foreground/55 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(article.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime} min read
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                {article.viewCount?.toLocaleString() || "0"} views
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="px-8 md:px-12 py-8">
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              {article.content.split('\n').map((paragraph: string, i: number) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-xl font-bold font-serif text-white mt-8 mb-3 flex items-center gap-2">
                      <div className="w-1 h-5 rounded-full shrink-0" style={{ background: cfg.color }} />
                      {paragraph.replace('## ', '').trim()}
                    </h2>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={i} className="ml-4 list-none flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: cfg.color }} />
                      <span className="text-sm leading-relaxed">{paragraph.replace('- ', '').trim()}</span>
                    </li>
                  );
                }
                if (!paragraph.trim()) return null;
                return <p key={i} className="text-sm leading-relaxed">{paragraph}</p>;
              })}
            </div>

            {/* Tags + Actions */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold text-muted-foreground/60 px-2.5 py-1 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                {[
                  { icon: Share2, label: "Share" },
                  { icon: Bookmark, label: "Save" },
                ].map(({ icon: Icon, label }) => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex items-center gap-1.5 px-3.5 h-8 rounded-xl text-xs font-semibold text-foreground/60 hover:text-white transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: "rgba(43,108,235,0.05)", border: "1px solid rgba(43,108,235,0.1)" }}
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-400/60 shrink-0" />
          <p className="text-xs text-muted-foreground/55">This article is for general awareness. Consult a licensed advocate for legal advice specific to your situation.</p>
        </motion.div>
      </div>
    </div>
  );
}
