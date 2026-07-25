import { useListDocuments } from "@workspace/api-client-react";
import { Link } from "wouter";
import { FileText, Download, Globe, ChevronRight, Folder } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

const CATEGORY_COLORS: Record<string, { icon: string; bg: string; border: string }> = {
  "Affidavits":  { icon: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20" },
  "Agreements":  { icon: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  "Petitions":   { icon: "text-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/20" },
  "Notices":     { icon: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20" },
};

export default function Documents() {
  const { data: documents, isLoading } = useListDocuments();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Affidavits", "Agreements", "Petitions", "Notices"];
  const filteredDocs = documents?.filter(doc => activeCategory === "All" || doc.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">

      {/* Header */}
      <div className="mb-8 pt-4 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-2">
            <Folder className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Legal Templates</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold font-serif text-foreground mb-1.5">Document Vault</h1>
          <p className="text-muted-foreground text-sm">Standardized, legally-sound templates in multiple languages.</p>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2.5 mb-7">
        {categories.map(cat => {
          const active = activeCategory === cat;
          const cfg = CATEGORY_COLORS[cat];
          return (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.93 }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap cursor-pointer transition-all ${
                active
                  ? cat === "All"
                    ? "bg-secondary text-white border border-secondary"
                    : `${cfg?.bg} ${cfg?.icon} border ${cfg?.border}`
                  : "bg-white/5 border border-white/8 text-foreground/60 hover:bg-white/10 hover:text-white"
              }`}
              style={active && cat !== "All" ? {} : active ? { boxShadow: "0 4px 16px rgba(43,108,235,0.25)" } : {}}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-5 flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-2xl bg-white/8 shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4 bg-white/8 rounded-lg" />
                <Skeleton className="h-4 w-1/2 bg-white/5 rounded-lg" />
              </div>
            </div>
          ))
        ) : filteredDocs?.length === 0 ? (
          <div className="col-span-full py-24 text-center">
            <div className="w-20 h-20 rounded-3xl bg-white/4 flex items-center justify-center mx-auto mb-5 text-white/15">
              <FileText className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-foreground font-serif mb-1">No documents found</h3>
            <p className="text-muted-foreground text-sm">Try a different category.</p>
          </div>
        ) : (
          filteredDocs?.map((doc, index) => {
            const cfg = CATEGORY_COLORS[doc.category];
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -3 }}
              >
                <Link href={`/documents/${doc.id}`} className="block h-full">
                  <div className="glass-card p-5 flex items-center gap-4 group cursor-pointer h-full">
                    <div className={`w-14 h-14 rounded-2xl ${cfg?.bg || "bg-white/5"} border ${cfg?.border || "border-white/8"} flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105`}>
                      <FileText className={`w-7 h-7 ${cfg?.icon || "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white truncate mb-1.5">{doc.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
                        <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {doc.language}</span>
                        <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {doc.downloadCount}</span>
                        <span className="font-medium text-muted-foreground/50">{doc.category}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-secondary group-hover:translate-x-1 transition-all shrink-0" />
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
