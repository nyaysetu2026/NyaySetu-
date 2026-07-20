import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Shield, FileText, Bot, Users, Landmark, ChevronRight, AlertTriangle, Sparkles, Star } from "lucide-react";

function AnimatedCounter({ to, duration = 2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Home() {
  const services = [
    { title: "AI Legal Assistant", icon: Bot, desc: "Intelligent guidance on rights, IPC codes and legal procedures.", link: "/ai-chat", accent: "text-blue-400", bg: "bg-blue-500/10", border: "rgba(59,130,246,0.3)" },
    { title: "Expert Directory", icon: Users, desc: "Consult verified Bar Council advocates across India.", link: "/lawyers", accent: "text-emerald-400", bg: "bg-emerald-500/10", border: "rgba(52,211,153,0.3)" },
    { title: "Case Tracker", icon: Landmark, desc: "Monitor hearings, court orders and filing dates.", link: "/cases", accent: "text-amber-400", bg: "bg-amber-500/10", border: "rgba(251,191,36,0.3)" },
    { title: "Document Vault", icon: FileText, desc: "Access standardized legal templates in multiple languages.", link: "/documents", accent: "text-purple-400", bg: "bg-purple-500/10", border: "rgba(167,139,250,0.3)" },
    { title: "Know Your Rights", icon: Scale, desc: "Plain-language constitutional guides for every citizen.", link: "/rights", accent: "text-accent", bg: "bg-accent/10", border: "rgba(212,175,55,0.3)" },
    { title: "Emergency Help", icon: Shield, desc: "Immediate access to national helplines and legal aid.", link: "/emergency", accent: "text-red-400", bg: "bg-red-500/10", border: "rgba(248,113,113,0.3)" },
  ];

  const ticker = "⚖️ 50,000+ Citizens Served  •  🏛️ Bar Council Verified  •  🤖 AI-Powered Legal Guidance  •  📜 4 Indian Languages  •  🛡️ End-to-End Encrypted  •  📍 6 Metro Cities  •  ";

  return (
    <div className="w-full min-h-screen flex flex-col">

      {/* ── Live Ticker ─────────────────────────────── */}
      <div className="relative overflow-hidden bg-secondary/8 border-b border-secondary/15 py-2.5">
        <div className="flex gap-0 whitespace-nowrap" style={{ animation: "ticker 28s linear infinite" }}>
          <span className="text-xs font-medium text-secondary/70 tracking-wide pr-0">{ticker}{ticker}</span>
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative flex-1 flex flex-col justify-center min-h-[88vh] pt-12 pb-24 overflow-hidden bg-background px-4 sm:px-6">

        {/* Animated orbs */}
        <motion.div
          animate={{ y: [0, -28, 0], scale: [1, 1.06, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-8%] w-[55%] h-[55%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(221 83% 58% / 0.4) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <motion.div
          animate={{ y: [0, 22, 0], scale: [1, 1.04, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-8%] w-[50%] h-[50%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(43 90% 55% / 0.35) 0%, transparent 70%)", filter: "blur(100px)" }}
        />
        <motion.div
          animate={{ y: [0, -14, 0], x: [0, 10, 0], opacity: [0.07, 0.12, 0.07] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[45%] right-[15%] w-[28%] h-[28%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(222 47% 40% / 0.5) 0%, transparent 70%)", filter: "blur(60px)" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full">

            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-white/12 bg-white/5 backdrop-blur-md text-sm text-foreground/75 mb-8 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="font-medium">India's Most Advanced Legal Platform</span>
              <Star className="w-3 h-3 text-accent fill-current" />
            </motion.div>

            {/* Title */}
            <motion.h1 variants={itemVariants} className="font-serif text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight leading-[1.0] mb-6 text-foreground">
              <span>Nyay</span><span className="text-gradient-gold">Setu</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-foreground/65 mb-4 max-w-2xl mx-auto font-light leading-relaxed">
              Justice is no longer{" "}
              <em className="font-serif text-accent not-italic font-normal">out of reach.</em>
            </motion.p>
            <motion.p variants={itemVariants} className="text-base md:text-lg text-foreground/45 mb-12 max-w-xl mx-auto font-light">
              Your world-class legal companion — AI-powered, always available.
            </motion.p>

            {/* CTA */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="w-full text-lg h-14 px-10 bg-secondary hover:bg-secondary/90 text-white rounded-2xl relative overflow-hidden group border-0"
                    style={{ boxShadow: "0 0 30px rgba(43,108,235,0.35), 0 4px 20px rgba(0,0,0,0.3)" }}>
                    <div className="absolute inset-0 w-full h-full shimmer-bg animate-shimmer opacity-20 group-hover:opacity-60 transition-opacity" />
                    <span className="relative z-10 flex items-center font-semibold gap-2">
                      Enter Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/ai-chat" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="w-full text-lg h-14 px-10 rounded-2xl border-white/12 bg-white/4 hover:bg-white/8 text-foreground/80 hover:text-white">
                    <Bot className="w-5 h-5 mr-2 text-secondary" /> Ask AI
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Developer Credit - Mobile */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center lg:hidden">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Developed by</p>
            <p className="text-xs font-bold tracking-[0.18em] text-accent">MD DANISH HUSSAIN</p>
          </div>
        </div>
      </section>

      {/* ── Stats Row ───────────────────────────────── */}
      <section className="py-10 border-y border-white/5 relative overflow-hidden" style={{ background: "rgba(0,0,0,0.25)" }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 50000, label: "Citizens Served", suffix: "+", color: "text-accent" },
              { value: 1200, label: "Verified Advocates", suffix: "+", color: "text-blue-400" },
              { value: 6, label: "Metro Cities", suffix: "", color: "text-emerald-400" },
              { value: 4, label: "Languages", suffix: "", color: "text-purple-400" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <p className={`text-3xl md:text-4xl font-bold font-serif ${stat.color}`}>
                  <AnimatedCounter to={stat.value} />{stat.suffix}
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-1 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ───────────────────────────── */}
      <section className="py-24 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Platform Services</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-5">A unified legal infrastructure</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">Everything you need to navigate India's legal system with clarity and confidence.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 28 }}
                >
                  <Link href={service.link} className="block h-full">
                    <div className="glass-card p-7 h-full cursor-pointer flex flex-col group">
                      <div className={`w-14 h-14 rounded-2xl ${service.bg} border border-white/8 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}
                        style={{ boxShadow: `0 0 20px ${service.border.replace(')', ', 0.15)')}` }}>
                        <Icon className={`w-7 h-7 ${service.accent}`} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 font-serif">{service.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed text-sm flex-1">{service.desc}</p>
                      <div className="flex items-center text-sm font-semibold text-foreground/40 group-hover:text-secondary transition-colors">
                        Explore <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why NyaySetu ────────────────────────────── */}
      <section className="py-24 border-t border-white/5 relative z-10" style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">Our Promise</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Why NyaySetu?</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Unwavering Trust", desc: "Bar Council verified advocates and end-to-end encrypted data sovereignty.", icon: Shield, color: "text-accent", bg: "bg-accent/10" },
              { title: "Unmatched Speed", desc: "AI-driven responses and real-time eCourts integration for immediate clarity.", icon: Bot, color: "text-secondary", bg: "bg-secondary/10" },
              { title: "Unequaled Expertise", desc: "Access the highest tier of legal professionals across every Indian state.", icon: Scale, color: "text-emerald-400", bg: "bg-emerald-500/10" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55 }}
                  className="flex flex-col items-center text-center group">
                  <div className={`w-16 h-16 rounded-3xl ${f.bg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`w-8 h-8 ${f.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-serif">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Emergency CTA ───────────────────────────── */}
      <section className="py-10 border-t border-destructive/15 relative z-10" style={{ background: "rgba(220,38,38,0.06)" }}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center justify-center gap-5 text-center md:text-left">
            <div className="flex items-center gap-3 text-destructive font-bold text-lg font-serif">
              <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <AlertTriangle className="w-6 h-6" />
              </motion.div>
              Need immediate legal help?
            </div>
            <Link href="/emergency">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button variant="destructive" size="lg" className="rounded-2xl px-8 font-semibold"
                  style={{ boxShadow: "0 0 20px rgba(220,38,38,0.3)" }}>
                  Access Emergency Services
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
