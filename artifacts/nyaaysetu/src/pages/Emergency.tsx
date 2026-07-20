import { useListEmergencyContacts } from "@workspace/api-client-react";
import { Phone, AlertTriangle, Clock, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Emergency() {
  const { data: contacts, isLoading } = useListEmergencyContacts();
  const categories = Array.from(new Set(contacts?.map(c => c.category) || []));

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-28">

      {/* Ambient glow */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.12) 0%, transparent 70%)" }} />
      <div className="absolute top-[-10%] left-[20%] w-[60%] h-[40%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 pt-4 lg:pt-8">

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="rounded-3xl p-8 md:p-10 mb-10 flex flex-col items-center text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(220,38,38,0.18) 0%, rgba(220,38,38,0.08) 100%)",
            border: "1px solid rgba(220,38,38,0.3)",
            boxShadow: "0 0 60px rgba(220,38,38,0.12), inset 0 1px 0 rgba(255,255,255,0.05)"
          }}
        >
          {/* Pulsing rings */}
          <div className="relative mb-6 flex items-center justify-center">
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0, 0.15] }} transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-24 h-24 rounded-full bg-destructive/20" />
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              className="absolute w-20 h-20 rounded-full bg-destructive/25" />
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-16 h-16 bg-destructive rounded-2xl flex items-center justify-center text-white"
              style={{ boxShadow: "0 0 30px rgba(220,38,38,0.5), 0 8px 24px rgba(0,0,0,0.4)" }}
            >
              <AlertTriangle className="w-8 h-8" />
            </motion.div>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold font-serif text-white mb-3 tracking-tight">URGENT RESPONSE</h1>
          <p className="text-destructive-foreground/70 text-sm md:text-base max-w-md leading-relaxed mb-8">
            If you are in immediate physical danger, tap the button below to call National Emergency Dispatch.
          </p>

          <motion.a
            href="tel:112"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full max-w-xs flex items-center justify-center gap-3 text-white font-mono text-3xl font-bold py-5 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
              boxShadow: "0 0 30px rgba(220,38,38,0.45), 0 8px 24px rgba(0,0,0,0.4)"
            }}
          >
            <Phone className="w-7 h-7 fill-current" /> 112
          </motion.a>

          <p className="mt-4 text-xs text-destructive-foreground/40 uppercase tracking-widest">National Emergency Number</p>
        </motion.div>

        {/* Contacts */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card p-5 flex items-center gap-4">
                <div className="flex-1"><Skeleton className="h-5 w-1/2 mb-2 bg-white/8 rounded-lg" /><Skeleton className="h-4 w-3/4 bg-white/5 rounded-lg" /></div>
                <Skeleton className="h-12 w-12 rounded-2xl bg-white/8 shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((category, catIdx) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-3.5 h-3.5 text-muted-foreground/60" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground/60">{category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contacts?.filter(c => c.category === category).map((contact, idx) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ type: "spring", stiffness: 350, damping: 28, delay: idx * 0.06 + catIdx * 0.08 }}
                      whileHover={{ y: -2 }}
                      className="glass-card p-5 flex items-center justify-between group"
                    >
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
                        <p className="text-xs text-muted-foreground/70 line-clamp-1">{contact.description}</p>
                      </div>

                      <motion.a
                        href={`tel:${contact.phone}`}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-12 h-12 rounded-2xl bg-white/8 flex items-center justify-center text-white hover:bg-destructive transition-colors shrink-0 border border-white/8 hover:border-destructive/50"
                        style={{}}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone className="w-5 h-5" />
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
