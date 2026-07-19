import { useListDocuments } from "@workspace/api-client-react";
import { Link } from "wouter";
import { FileText, Download, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Documents() {
  const { data: documents, isLoading } = useListDocuments();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Affidavits", "Agreements", "Petitions", "Notices"];

  const filteredDocs = documents?.filter(doc => activeCategory === "All" || doc.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl pt-safe-top">
      <div className="mb-8 pt-4 lg:pt-0">
        <h1 className="text-3xl lg:text-4xl font-bold font-serif text-foreground mb-2">Document Vault</h1>
        <p className="text-muted-foreground text-sm">Standardized, legally-sound templates.</p>
      </div>

      {/* Horizontal Tabs */}
      <div className="flex overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 mb-6">
        {categories.map(cat => (
          <div 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
              activeCategory === cat 
                ? "bg-secondary text-white shadow-[0_0_15px_rgba(43,108,235,0.3)]" 
                : "bg-white/5 border border-white/10 text-foreground hover:bg-white/10"
            }`}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-5"><Skeleton className="h-20 w-full bg-white/10" /></div>
          ))
        ) : filteredDocs?.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-white/20">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No documents found</h3>
          </div>
        ) : (
          filteredDocs?.map((doc) => (
            <Link key={doc.id} href={`/documents/${doc.id}`}>
              <div className="glass-card p-5 flex items-center gap-4 group cursor-pointer hover:border-secondary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 group-hover:border-secondary/30 transition-colors text-primary-foreground/50 group-hover:text-secondary">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white truncate mb-1">{doc.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {doc.language}</span>
                    <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {doc.downloadCount}</span>
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