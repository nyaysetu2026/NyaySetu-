import { useGetDocument } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { FileText, ArrowLeft, Download, Copy, Check, Globe, Lock, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { motion } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";
import { useToast } from "@/hooks/use-toast";

const CATEGORY_CFG: Record<string, { text: string; bg: string; border: string; glow: string; icon: string; color: string }> = {
  "Affidavits":  { text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20",    glow: "rgba(59,130,246,0.15)",  icon: "📋", color: "#3b82f6" },
  "Agreements":  { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "rgba(52,211,153,0.15)",  icon: "🤝", color: "#34d399" },
  "Petitions":   { text: "text-purple-400",  bg: "bg-purple-500/10",  border: "border-purple-500/20",  glow: "rgba(168,85,247,0.15)",  icon: "⚖️", color: "#a855f7" },
  "Notices":     { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20",   glow: "rgba(245,158,11,0.15)",  icon: "📣", color: "#f59e0b" },
};

function LoadingSkeleton() {
  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
      <Skeleton className="h-4 w-36 mb-8 bg-white/8 rounded-lg" />
      <Skeleton className="h-8 w-24 mb-4 bg-white/8 rounded-full" />
      <Skeleton className="h-10 w-2/3 mb-3 bg-white/8 rounded-2xl" />
      <Skeleton className="h-5 w-1/2 mb-8 bg-white/5 rounded-lg" />
      <Skeleton className="h-[50vh] w-full bg-white/5 rounded-3xl" />
    </div>
  );
}

export default function DocumentDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: doc, isLoading, isError } = useGetDocument(Number(id), {
    query: { enabled: !!id, queryKey: ['/api/documents', Number(id)] }
  });
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (isLoading) return <LoadingSkeleton />;

  if (isError || !doc) return (
    <div className="mx-auto px-4 py-20 text-center max-w-md">
      <div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <FileText className="h-10 w-10 text-white/20" />
      </div>
      <h2 className="text-2xl font-bold font-serif text-foreground mb-2">Document Not Found</h2>
      <p className="text-muted-foreground text-sm mb-6">This document may have been removed or the link is invalid.</p>
      <Link href="/documents">
        <motion.div
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold cursor-pointer"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Vault
        </motion.div>
      </Link>
    </div>
  );

  const cfg = CATEGORY_CFG[doc.category];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(doc.content);
    setCopied(true);
    toast({ title: "Copied to clipboard", description: "You can now paste the template." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([doc.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    toast({ title: "Downloading...", description: "Template is saving to your device." });
  };

  return (
    <div className="relative min-h-screen">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-1/3 h-64 pointer-events-none" style={{
        background: `radial-gradient(ellipse, ${cfg?.glow || "rgba(99,102,241,0.08)"} 0%, transparent 70%)`,
        filter: "blur(50px)",
      }} />

      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl relative z-10">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/documents">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-white transition-colors mb-8 group cursor-pointer">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="font-medium">Back to Vault</span>
            </div>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {cfg ? (
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                <span>{cfg.icon}</span> {doc.category}
              </span>
            ) : (
              <span className="inline-flex text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/6 text-white/60 border border-white/10">
                {doc.category}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <Globe className="w-3.5 h-3.5" /> {doc.language}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <TrendingUp className="w-3.5 h-3.5" /> {doc.downloadCount} downloads
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif text-white mb-3 tracking-tight">{doc.title}</h1>
          <p className="text-base text-muted-foreground/70 leading-relaxed mb-4">{doc.description}</p>
          <TricolorBar className="w-14" />
        </motion.div>

        {/* Document viewer */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Top colored line */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: cfg ? `linear-gradient(90deg, ${cfg.color}, ${cfg.color}80, ${cfg.color}40)` : "rgba(99,102,241,0.6)" }}
          />

          {/* Toolbar */}
          <div
            className="flex items-center justify-between px-5 py-3.5 border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${cfg?.bg || "bg-white/6"}`} style={{ border: `1px solid ${cfg?.color || "#6366f1"}25` }}>
                {cfg?.icon
                  ? <span className="text-base">{cfg.icon}</span>
                  : <FileText className={`w-4 h-4 ${cfg?.text || "text-indigo-400"}`} />}
              </div>
              <span className="text-xs font-semibold text-muted-foreground/70">Template Preview</span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Lock className="w-2.5 h-2.5 text-emerald-400/70" />
                <span className="text-[9px] text-emerald-400/70 font-bold uppercase tracking-wider">Secure</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={copyToClipboard}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-1.5 px-3.5 h-8 rounded-xl text-xs font-semibold transition-all"
                style={{
                  background: copied ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.05)",
                  border: copied ? "1px solid rgba(52,211,153,0.25)" : "1px solid rgba(255,255,255,0.09)",
                  color: copied ? "#34d399" : "rgba(255,255,255,0.65)",
                }}
                onMouseEnter={e => {
                  if (!copied) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                  }
                }}
                onMouseLeave={e => {
                  if (!copied) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                  }
                }}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
              </motion.button>

              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.94 }}
                className="flex items-center gap-1.5 px-3.5 h-8 rounded-xl text-xs font-semibold text-white transition-all relative overflow-hidden border-0"
                style={{
                  background: cfg ? `linear-gradient(135deg, ${cfg.color}88, ${cfg.color}55)` : "linear-gradient(135deg, rgba(99,102,241,0.55), rgba(99,102,241,0.35))",
                  boxShadow: cfg ? `0 4px 16px ${cfg.color}25` : "0 4px 16px rgba(99,102,241,0.2)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = cfg ? `0 6px 24px ${cfg.color}40` : "0 6px 24px rgba(99,102,241,0.35)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = cfg ? `0 4px 16px ${cfg.color}25` : "0 4px 16px rgba(99,102,241,0.2)";
                }}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10 overflow-auto max-h-[60vh]">
            <div className="font-mono text-sm text-foreground/75 whitespace-pre-wrap leading-relaxed">
              {doc.content}
            </div>
          </div>
        </motion.div>

        {/* Info note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: "rgba(43,108,235,0.05)", border: "1px solid rgba(43,108,235,0.1)" }}
        >
          <Lock className="w-3.5 h-3.5 text-blue-400/60 shrink-0" />
          <p className="text-xs text-muted-foreground/55">This template is for informational purposes. Consult a licensed advocate before use in legal proceedings.</p>
        </motion.div>
      </div>
    </div>
  );
}
