import { useListLawyers } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Scale, Search, ShieldCheck, ChevronRight, Award, Briefcase } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

const SPEC_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  "Criminal Law":   { text: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/20" },
  "Civil Law":      { text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20" },
  "Family Law":     { text: "text-pink-400",    bg: "bg-pink-500/10",    border: "border-pink-500/20" },
  "Corporate Law":  { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20" },
};

export default function Lawyers() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [specialization, setSpecialization] = useState("all");

  const params = {
    ...(search && { search }),
    ...(city !== "all" && { city }),
    ...(specialization !== "all" && { specialization }),
  };

  const { data: lawyers, isLoading } = useListLawyers(params);
  const popularSpecs = ["Criminal Law", "Civil Law", "Family Law", "Corporate Law"];

  return (
    <div className="relative min-h-screen">
      {/* Page ambient glow */}
      <div className="absolute top-0 left-1/4 w-1/2 h-64 pointer-events-none" style={{
        background: "radial-gradient(ellipse, rgba(43,108,235,0.07) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-10 pt-4 lg:pt-0">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Bar Council Verified</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold font-serif text-white mb-2 tracking-tight">
              Advocate <span style={{ background:"linear-gradient(135deg,#d4af37,#f5d06b)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Directory</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">Find verified legal professionals across India. All advocates are Bar Council registered.</p>
            <TricolorBar className="w-16 mt-4" />
          </motion.div>
        </div>

        {/* ── Search + Filters ────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input
              placeholder="Search by name or specialization..."
              className="pl-12 h-14 rounded-2xl text-base focus-visible:ring-0 focus-visible:outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: search ? "1px solid rgba(43,108,235,0.35)" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: search ? "0 0 0 3px rgba(43,108,235,0.08), 0 0 20px rgba(43,108,235,0.1)" : "none",
              }}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-10 rounded-full border-white/10 shrink-0 w-auto min-w-[140px] text-sm" style={{ background: "rgba(255,255,255,0.05)" }}>
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent className="border-white/10" style={{ background: "hsl(222 47% 8%)", backdropFilter: "blur(24px)" }}>
                {["All Cities","New Delhi","Mumbai","Bengaluru","Chennai","Hyderabad","Kolkata"].map(c => (
                  <SelectItem key={c} value={c === "All Cities" ? "all" : c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {popularSpecs.map(spec => {
              const active = specialization === spec;
              const cfg = SPEC_COLORS[spec];
              return (
                <motion.button
                  key={spec}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setSpecialization(active ? "all" : spec)}
                  className={`h-10 flex items-center px-4 rounded-full border shrink-0 text-sm font-semibold cursor-pointer transition-all ${
                    active
                      ? `${cfg?.bg} ${cfg?.text} ${cfg?.border}`
                      : "bg-white/5 border-white/10 text-foreground/65 hover:bg-white/10 hover:text-white"
                  }`}
                  style={active ? { boxShadow: "0 4px 16px rgba(43,108,235,0.15)" } : {}}
                >
                  {spec}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex gap-4 mb-5">
                  <Skeleton className="h-20 w-20 rounded-2xl bg-white/8 shrink-0" />
                  <div className="flex-1 space-y-2.5 pt-1">
                    <Skeleton className="h-5 w-3/4 bg-white/8 rounded-lg" />
                    <Skeleton className="h-4 w-1/2 bg-white/5 rounded-lg" />
                    <Skeleton className="h-3.5 w-2/3 bg-white/4 rounded-lg" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full bg-white/5 rounded-2xl" />
              </div>
            ))
          ) : lawyers?.length === 0 ? (
            <div className="col-span-full text-center py-28">
              <div className="w-20 h-20 rounded-3xl bg-white/4 border border-white/6 flex items-center justify-center mx-auto mb-5">
                <Scale className="h-10 w-10 text-white/15" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-serif mb-1">No advocates found</h3>
              <p className="text-muted-foreground text-sm">Try adjusting your search or filters.</p>
            </div>
          ) : (
            lawyers?.map((lawyer, index) => {
              const specCfg = SPEC_COLORS[lawyer.specialization] || { text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" };
              return (
                <motion.div
                  key={lawyer.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22,1,0.36,1] }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/lawyers/${lawyer.id}`} className="block h-full group">
                    <div
                      className="relative rounded-3xl p-6 flex flex-col h-full cursor-pointer overflow-hidden transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.028)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.25)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.35), 0 0 40px rgba(212,175,55,0.06)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.22)";
                      }}
                    >
                      {/* Top accent line on hover */}
                      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }} />

                      {/* Inner shimmer */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden rounded-3xl pointer-events-none">
                        <div className="absolute inset-y-0 w-1/3" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.03),transparent)", animation: "shimmerSweep 2s ease-in-out infinite" }} />
                      </div>

                      {/* Avatar + info */}
                      <div className="flex gap-4 mb-5">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/8 relative" style={{ background: "rgba(255,255,255,0.04)" }}>
                          {lawyer.imageUrl ? (
                            <img src={lawyer.imageUrl} alt={lawyer.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl font-serif font-bold text-white/20">
                              {lawyer.name.charAt(0)}
                            </div>
                          )}
                          {/* Verified badge overlay */}
                          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-black/50 flex items-center justify-center">
                            <ShieldCheck className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <h3 className="text-[15px] font-bold font-serif text-white line-clamp-1">{lawyer.name}</h3>
                            <div className="flex items-center gap-1 text-accent text-xs font-bold bg-accent/12 border border-accent/22 px-2 py-0.5 rounded-full shrink-0">
                              <Star className="h-2.5 w-2.5 fill-current" /> {lawyer.rating}
                            </div>
                          </div>
                          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 ${specCfg.bg} ${specCfg.text} border ${specCfg.border}`}>
                            {lawyer.specialization}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/65">
                            <MapPin className="h-3 w-3" /> {lawyer.city}
                          </div>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="flex gap-3 mb-5">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                          <Briefcase className="h-3 w-3" />
                          <span>10+ yrs</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                          <Award className="h-3 w-3" />
                          <span>Bar Verified</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div>
                          <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wider mb-0.5">Consultation</div>
                          <div className="text-lg font-bold text-white">₹{lawyer.fee}</div>
                        </div>
                        <Button size="sm" className="rounded-2xl border-0 text-xs font-semibold px-4 h-9 gap-1 transition-all duration-300" style={{
                          background: "rgba(212,175,55,0.12)",
                          color: "#d4af37",
                          border: "1px solid rgba(212,175,55,0.22)",
                        }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.22)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(212,175,55,0.3)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.12)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                        >
                          View Profile <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
