import { useGetLawyer } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Scale, ShieldCheck, Mail, Phone, Calendar, ArrowLeft, Award, FileText, Briefcase, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

const SPEC_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  "Criminal Law":   { text: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20" },
  "Civil Law":      { text: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/20" },
  "Family Law":     { text: "text-pink-400",   bg: "bg-pink-500/10",   border: "border-pink-500/20" },
  "Corporate Law":  { text: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20" },
};

function LoadingSkeleton() {
  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-5xl">
      <div className="flex items-center gap-2 mb-8">
        <Skeleton className="h-4 w-4 rounded-full bg-white/8" />
        <Skeleton className="h-4 w-32 bg-white/8 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-[400px] rounded-3xl bg-white/5" />
        <div className="md:col-span-2 space-y-5">
          <Skeleton className="h-8 w-48 bg-white/8 rounded-xl" />
          <Skeleton className="h-14 w-3/4 bg-white/8 rounded-2xl" />
          <Skeleton className="h-5 w-56 bg-white/5 rounded-lg" />
          <Skeleton className="h-32 w-full bg-white/5 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default function LawyerDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: lawyer, isLoading, isError } = useGetLawyer(Number(id), {
    query: { enabled: !!id, queryKey: ['/api/lawyers', Number(id)] }
  });

  if (isLoading) return <LoadingSkeleton />;

  if (isError || !lawyer) {
    return (
      <div className="mx-auto px-4 py-20 text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Scale className="h-10 w-10 text-white/20" />
        </div>
        <h2 className="text-2xl font-bold font-serif text-foreground mb-2">Advocate Not Found</h2>
        <p className="text-muted-foreground text-sm mb-6">This profile may have been removed or the link is invalid.</p>
        <Link href="/lawyers">
          <Button className="rounded-2xl" style={{ background: "rgba(43,108,235,0.15)", border: "1px solid rgba(43,108,235,0.3)", color: "#60a5fa" }}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const specCfg = SPEC_COLORS[lawyer.specialization] || { text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" };

  return (
    <div className="relative min-h-screen">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-1/2 h-64 pointer-events-none" style={{
        background: "radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 70%)",
        filter: "blur(50px)",
      }} />

      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-5xl relative z-10">

        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link href="/lawyers">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-white transition-colors mb-8 group cursor-pointer">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all group-hover:bg-white/8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="font-medium">Back to Directory</span>
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ── Left Column ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Photo card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              <div className="aspect-[4/5] bg-white/4 relative">
                {lawyer.imageUrl ? (
                  <img
                    src={lawyer.imageUrl}
                    alt={lawyer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(43,108,235,0.12) 0%, rgba(212,175,55,0.08) 100%)" }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <span className="font-serif text-3xl font-bold text-white/30">{lawyer.name.charAt(0)}</span>
                    </div>
                    <Scale className="h-8 w-8 text-accent/30" />
                  </div>
                )}

                {/* Rating overlay */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(212,175,55,0.25)",
                    boxShadow: "0 0 12px rgba(212,175,55,0.15)",
                  }}
                >
                  <Star className="h-3.5 w-3.5 text-accent fill-current" />
                  <span className="text-sm font-bold text-accent">{lawyer.rating}</span>
                  <span className="text-[10px] text-white/50">({lawyer.reviewCount})</span>
                </div>

                {/* Verified badge */}
                <div
                  className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(52,211,153,0.12)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(52,211,153,0.25)",
                  }}
                >
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Verified</span>
                </div>
              </div>
            </div>

            {/* Fee & Actions card */}
            <div
              className="p-5 rounded-3xl relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

              <div className="text-center pb-4 mb-4 border-b border-white/6">
                <div className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1">Consultation Fee</div>
                <div className="text-3xl font-bold font-serif text-white">₹{lawyer.fee}</div>
                <div className="text-xs text-muted-foreground/50 mt-0.5">per session</div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="w-full h-12 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 mb-3 relative overflow-hidden border-0"
                style={{
                  background: "linear-gradient(135deg, hsl(221 83% 55%) 0%, hsl(221 83% 42%) 100%)",
                  boxShadow: "0 4px 24px rgba(43,108,235,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute inset-y-0 w-1/3" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)", animation: "shimmerSweep 2.5s ease-in-out infinite" }} />
                </div>
                <Calendar className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Book Appointment</span>
              </motion.button>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Phone, label: "Call" },
                  { icon: Mail, label: "Message" },
                ].map(({ icon: Icon, label }) => (
                  <motion.button
                    key={label}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="h-10 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold text-foreground/70 hover:text-white transition-colors"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                    }}
                  >
                    <Icon className="h-3.5 w-3.5" /> {label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right Column ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 space-y-5"
          >
            {/* Header */}
            <div
              className="p-6 rounded-3xl relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

              {/* Verification */}
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4"
                style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#34d399" }}>
                <ShieldCheck className="h-3 w-3" />
                Bar Council: {lawyer.barCouncilId}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold font-serif text-white mb-1.5 tracking-tight">{lawyer.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${specCfg.bg} ${specCfg.text} border ${specCfg.border}`}>
                  <Scale className="h-2.5 w-2.5" /> {lawyer.specialization}
                </span>
              </div>

              <TricolorBar className="w-12 mb-4" />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: MapPin,    label: "Location",   value: `${lawyer.city}, ${lawyer.state}` },
                  { icon: Award,     label: "Experience", value: `${lawyer.experience} Years` },
                  { icon: Globe,     label: "Languages",  value: lawyer.languages.join(", ") },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="p-3 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="h-3 w-3 text-accent/60" />
                      <span className="text-[9px] text-muted-foreground/50 uppercase tracking-wider font-bold">{label}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground/80 leading-snug block">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Biography */}
            <div
              className="p-6 rounded-3xl relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-accent" />
                </div>
                <h2 className="text-lg font-bold font-serif text-white">Professional Biography</h2>
              </div>

              <div className="space-y-3">
                {lawyer.bio.split('\n').filter(Boolean).map((para: string, i: number) => (
                  <p key={i} className="text-sm text-foreground/65 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            {/* Practice Areas */}
            <div
              className="p-6 rounded-3xl relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-secondary" />
                </div>
                <h2 className="text-lg font-bold font-serif text-white">Practice Areas</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[lawyer.specialization, "High Court Litigation", "Legal Drafting", "Mediation"].map(area => (
                  <motion.span
                    key={area}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full cursor-default ${specCfg.bg} ${specCfg.text} border ${specCfg.border}`}
                    style={{ transition: "all 0.2s ease" }}
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
