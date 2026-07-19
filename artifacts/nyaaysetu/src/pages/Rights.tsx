import { useListArticles } from "@workspace/api-client-react";
import { Link } from "wouter";
import { BookOpen, Clock, ChevronRight, Scale } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Rights() {
  const { data: articles, isLoading } = useListArticles();
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Constitutional Rights", "Criminal Procedure", "Property Law", "Family Law"];

  const filteredArticles = articles?.filter(art => activeCategory === "All" || art.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl pt-safe-top">
      <div className="mb-8 pt-4 lg:pt-0">
        <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent flex items-center justify-center mb-4">
          <Scale className="w-6 h-6" />
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold font-serif text-foreground mb-2">Know Your Rights</h1>
        <p className="text-muted-foreground text-sm">Clear explanations of Indian laws.</p>
      </div>

      <div className="flex overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 mb-6">
        {categories.map(cat => (
          <div 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeCategory === cat 
                ? "bg-white text-black" 
                : "bg-white/5 border border-white/10 text-foreground hover:bg-white/10"
            }`}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card p-6"><Skeleton className="h-24 w-full bg-white/10" /></div>
          ))
        ) : filteredArticles?.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <h3 className="text-lg font-bold text-foreground">No articles found</h3>
          </div>
        ) : (
          filteredArticles?.map((art) => (
            <Link key={art.id} href={`/rights/${art.id}`}>
              <div className="glass-card p-6 group cursor-pointer hover:border-white/20 transition-all flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-secondary mb-3">
                  <BookOpen className="w-3 h-3" /> {art.category}
                </div>
                <h2 className="text-xl font-bold font-serif text-white mb-2 leading-snug">
                  {art.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {art.summary}
                </p>
                <div className="flex items-center justify-between text-xs mt-auto pt-4 border-t border-white/5">
                  <div className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {art.readTime} min read
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-white transition-colors group-hover:text-black">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}