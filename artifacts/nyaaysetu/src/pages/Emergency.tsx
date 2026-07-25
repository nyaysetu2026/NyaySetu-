import { useListEmergencyContacts } from "@workspace/api-client-react";
import { Phone, AlertTriangle, Shield, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

export default function Emergency() {
  const { data: contacts, isLoading } = useListEmergencyContacts();
  const categories = Array.from(new Set(contacts?.map(c => c.category) || []));

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pb-28">

      {/* Ambient red glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[50vh] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.15) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[20%] w-[60%] h-[40%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 pt-4 lg:pt-8">

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="rounded-3xl p-8 md:p-10 mb-10 flex flex-col items-center text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(220,38,38,0.16) 0%, rgba(185,28,28,0.08) 100%)",
            border: "1px solid rgba(220,38,38,0.28)",
            boxShadow: "0 0 80px rgba(220,38,38,0.1), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-destructive/50 to-transparent" />

          {/* Pulsing rings */}
          <div className="relative mb-6 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.12, 0, 0.12] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="absolute rounded-full bg-destructive/20"
              style={{ width: 100, height: 100 }}
            />
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.18, 0, 0.18] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}
              className="absolute rounded-full bg-destructive/25"
              style={{ width: 84, height: 84 }}
            />
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl flex items-center justify-center text-white"
              style={{
                width: 68,
                height: 68,
                background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
                boxShadow: "0 0 40px rgba(220,38,38,0.55), 0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              <AlertTriangle className="w-9 h-9" />
            </motion.div>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold font-serif text-white mb-3 tracking-tight">
            URGENT RESPONSE
          </h1>
          <p className="text-destructive-foreground/65 text-sm md:text-base max-w-md leading-relaxed mb-6">
            If you are in immediate physical danger, tap the button below to call National Emergency Dispatch.
          </p>

          {/* Tricolor divider */}
          <TricolorBar className="w-24 mb-6" />

          <motion.a
            href="tel:112"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="w-full max-w-xs flex items-center justify-center gap-3 text-white font-mono text-3xl font-bold py-5 rounded-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
              boxShadow: "0 0 40px rgba(220,38,38,0.5), 0 12px 32px rgba(0,0,0,0.5)",
            }}
          >
            {/* Shimmer */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div
                className="absolute inset-y-0 w-1/3"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  animation: "shimmerSweep 2s ease-in-out infinite",
                }}
              />
            </div>
            <Phone className="w-7 h-7 fill-current relative z-10" />
            <span className="relative z-10">112</span>
          </motion.a>

          <p className="mt-4 text-xs text-destructive-foreground/40 uppercase tracking-widest">
            National Emergency Number · 24/7 Available
          </p>
        </motion.div>

        {/* Contacts */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-5 flex items-center gap-4 rounded-[20px]"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex-1">
                  <Skeleton className="h-5 w-1/2 mb-2 bg-white/8 rounded-lg" />
                  <Skeleton className="h-4 w-3/4 bg-white/5 rounded-lg" />
                </div>
                <Skeleton className="h-12 w-12 rounded-2xl bg-white/8 shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((category, catIdx) => (
              <div key={category}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.2)" }}
                  >
                    <Shield className="w-3.5 h-3.5 text-destructive/70" />
                  </div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{category}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contacts?.filter(c => c.category === category).map((contact, idx) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ type: "spring", stiffness: 350, damping: 28, delay: idx * 0.06 + catIdx * 0.08 }}
                      whileHover={{ y: -3 }}
                      className="group relative overflow-hidden flex items-center justify-between p-5 rounded-[20px] transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(220,38,38,0.25)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.3), 0 0 24px rgba(220,38,38,0.08)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.2)";
                      }}
                    >
                      {/* Left accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[20px] opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "linear-gradient(to bottom, #dc2626, #991b1b)" }}
                      />

                      <div className="flex-1 pr-4 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-white truncate">{contact.name}</h3>
                          {contact.available247 && (
                            <div className="flex items-center gap-1 shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">24/7</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground/65 line-clamp-1">{contact.description}</p>
                      </div>

                      <motion.a
                        href={`tel:${contact.phone}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 relative overflow-hidden group/btn transition-all duration-200"
                        style={{
                          background: "rgba(220,38,38,0.12)",
                          border: "1px solid rgba(220,38,38,0.2)",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.85)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(220,38,38,0.4)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.12)";
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="w-5 h-5 text-destructive group-hover/btn:text-white transition-colors" />
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* Bottom note */}
            {categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-2xl text-center justify-center"
                style={{
                  background: "rgba(43,108,235,0.05)",
                  border: "1px solid rgba(43,108,235,0.12)",
                }}
              >
                <Zap className="w-4 h-4 text-secondary/60 shrink-0" />
                <p className="text-xs text-muted-foreground/60">
                  All helplines are government-verified. For general legal advice, use the AI Chat feature.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
