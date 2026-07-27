import { useListEmergencyContacts } from "@workspace/api-client-react";
import { Phone, AlertTriangle, Shield, Zap, Radio } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

export default function Emergency() {
  const { data: contacts, isLoading } = useListEmergencyContacts();
  const categories = Array.from(new Set(contacts?.map((c: { category: string }) => c.category) || []));

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-32">

      {/* ── Background ambient glows ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[60vh]" style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(220,38,38,0.13) 0%, transparent 70%)" }} />
        <motion.div
          animate={{ scale: [1,1.15,1], opacity: [0.07,0.14,0.07] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[15%] w-[70%] h-[45%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)", filter: "blur(70px)" }}
        />
        {/* Pulsing grid lines for drama */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(220,38,38,1) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 pt-4 lg:pt-8">

        {/* ── Emergency Hero ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="rounded-[28px] mb-10 overflow-hidden relative"
          style={{
            background: "linear-gradient(140deg, rgba(220,38,38,0.16) 0%, rgba(153,27,27,0.1) 60%, rgba(8,12,26,0.6) 100%)",
            border: "1px solid rgba(220,38,38,0.3)",
            boxShadow: "0 0 100px rgba(220,38,38,0.12), 0 24px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
            backdropFilter: "blur(32px)",
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.7), transparent)" }} />

          {/* Live indicator */}
          <div className="flex justify-end px-6 pt-5">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)" }}>
              <motion.div animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">LIVE · 24/7</span>
            </div>
          </div>

          <div className="px-8 pb-10 flex flex-col items-center text-center">
            {/* Pulsing alert icon */}
            <div className="relative mb-7 flex items-center justify-center">
              <motion.div animate={{ scale: [1,1.7,1], opacity: [0.1,0,0.1] }} transition={{ duration: 2.4, repeat: Infinity }} className="absolute w-32 h-32 rounded-full bg-red-500/20" />
              <motion.div animate={{ scale: [1,1.45,1], opacity: [0.16,0,0.16] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }} className="absolute w-24 h-24 rounded-full bg-red-500/25" />
              <motion.div animate={{ scale: [1,1.06,1] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="relative rounded-3xl flex items-center justify-center text-white z-10" style={{
                width: 76, height: 76,
                background: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
                boxShadow: "0 0 50px rgba(220,38,38,0.6), 0 12px 40px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}>
                <AlertTriangle className="w-9 h-9" />
              </motion.div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold font-serif text-white mb-3 tracking-tight">
              URGENT <span style={{ color: "#f87171" }}>RESPONSE</span>
            </h1>
            <p className="text-white/55 text-sm md:text-base max-w-sm leading-relaxed mb-6">
              Immediate physical danger? Tap the button below to connect to National Emergency Dispatch instantly.
            </p>

            <TricolorBar className="w-24 mb-7" />

            {/* 112 button */}
            <motion.a
              href="tel:112"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-full max-w-xs flex items-center justify-center gap-4 text-white py-6 rounded-3xl overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 60%, #7f1d1d 100%)",
                boxShadow: "0 0 50px rgba(220,38,38,0.55), 0 16px 48px rgba(0,0,0,0.55)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute inset-y-0 w-1/3" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)", animation: "shimmerSweep 1.8s ease-in-out infinite" }} />
              </div>
              {/* Hover glow ring */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: "inset 0 0 30px rgba(255,100,100,0.15)" }} />
              <Phone className="w-8 h-8 fill-current relative z-10" />
              <span className="font-mono text-4xl font-black tracking-wider relative z-10">112</span>
            </motion.a>

            <p className="mt-4 text-[10px] text-white/35 uppercase tracking-[0.18em]">National Emergency · Free Call · 24/7 Available</p>
          </div>
        </motion.div>

        {/* ── Contact Directory ─────────────────────────────────── */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Radio className="w-4 h-4 text-red-400/60" />
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground/60">Verified Helplines</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-5 flex items-center gap-4 rounded-3xl" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex-1"><Skeleton className="h-5 w-1/2 mb-2 bg-white/8 rounded-lg" /><Skeleton className="h-4 w-3/4 bg-white/5 rounded-lg" /></div>
                <Skeleton className="h-12 w-12 rounded-2xl bg-white/8 shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((category, catIdx) => (
              <div key={category}>
                {/* Category heading */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)" }}>
                    <Shield className="w-3.5 h-3.5 text-red-400/80" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/55">{category}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contacts?.filter((c: { category: string }) => c.category === category).map((contact: {
                    id: number; name: string; description: string; phone: string; available247?: boolean;
                  }, idx: number) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ type: "spring", stiffness: 320, damping: 28, delay: idx * 0.06 + catIdx * 0.08 }}
                      whileHover={{ y: -3 }}
                      className="group relative overflow-hidden flex items-center justify-between p-5 rounded-[22px] transition-all duration-300 cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.28)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 50px rgba(0,0,0,0.32), 0 0 30px rgba(220,38,38,0.08)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                      }}
                    >
                      {/* Left accent bar */}
                      <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(to bottom, #dc2626, #991b1b)", boxShadow: "2px 0 10px rgba(220,38,38,0.4)" }} />
                      {/* Top shimmer */}
                      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(90deg,transparent,rgba(220,38,38,0.4),transparent)" }} />

                      <div className="flex-1 pr-4 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[15px] font-bold text-white truncate">{contact.name}</h3>
                          {contact.available247 && (
                            <div className="flex items-center gap-1 shrink-0">
                              <motion.div animate={{ opacity: [1,0.4,1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">24/7</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground/60 line-clamp-1">{contact.description}</p>
                      </div>

                      {/* Call button */}
                      <motion.a
                        href={`tel:${contact.phone}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-13 h-13 w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-white shrink-0 transition-all duration-200 relative overflow-hidden"
                        style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)" }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = "#dc2626";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(220,38,38,0.5)";
                          (e.currentTarget as HTMLElement).style.borderColor = "#dc2626";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.1)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.2)";
                        }}
                      >
                        <Phone className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" />
                        <span className="sr-only">Call {contact.name}</span>
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* Bottom legal note */}
            {categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: "rgba(43,108,235,0.05)", border: "1px solid rgba(43,108,235,0.12)" }}
              >
                <Zap className="w-4 h-4 text-blue-400/60 shrink-0" />
                <p className="text-xs text-muted-foreground/55">All helplines are government-verified and active. For general legal queries, use the AI Chat feature.</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
