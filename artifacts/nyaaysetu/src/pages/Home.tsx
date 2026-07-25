import { Link } from "wouter";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Scale, Shield, FileText, Bot, Users, Landmark,
  ChevronRight, AlertTriangle, Sparkles, Star, Zap, Globe,
} from "lucide-react";
import { TricolorBar, IndiaFlagBg } from "@/components/ui/india-flag-bg";

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
    { title: "AI Legal Assistant", icon: Bot, desc: "Intelligent guidance on rights, IPC codes and legal procedures.", link: "/ai-chat", accent: "text-blue-400", bg: "bg-blue-500/10", border: "rgba(59,130,246,0.3)", glow: "rgba(59,130,246,0.15)" },
    { title: "Expert Directory", icon: Users, desc: "Consult verified Bar Council advocates across India.", link: "/lawyers", accent: "text-emerald-400", bg: "bg-emerald-500/10", border: "rgba(52,211,153,0.3)", glow: "rgba(52,211,153,0.12)" },
    { title: "Case Tracker", icon: Landmark, desc: "Monitor hearings, court orders and filing dates.", link: "/cases", accent: "text-amber-400", bg: "bg-amber-500/10", border: "rgba(251,191,36,0.3)", glow: "rgba(251,191,36,0.12)" },
    { title: "Document Vault", icon: FileText, desc: "Access standardized legal templates in multiple languages.", link: "/documents", accent: "text-purple-400", bg: "bg-purple-500/10", border: "rgba(167,139,250,0.3)", glow: "rgba(167,139,250,0.12)" },
    { title: "Know Your Rights", icon: Scale, desc: "Plain-language constitutional guides for every citizen.", link: "/rights", accent: "text-accent", bg: "bg-accent/10", border: "rgba(212,175,55,0.3)", glow: "rgba(212,175,55,0.12)" },
    { title: "Emergency Help", icon: Shield, desc: "Immediate access to national helplines and legal aid.", link: "/emergency", accent: "text-red-400", bg: "bg-red-500/10", border: "rgba(248,113,113,0.3)", glow: "rgba(248,113,113,0.12)" },
  ];

  const ticker = "⚖️ 50,000+ Citizens Served  •  🏛️ Bar Council Verified  •  🤖 AI-Powered Legal Guidance  •  📜 4 Indian Languages  •  🛡️ End-to-End Encrypted  •  📍 6 Metro Cities  •  🇮🇳 Justice For Every Citizen  •  ";

  return (
    <div className="w-full min-h-screen flex flex-col">

      {/* ── Live Ticker ─────────────────────────────── */}
      <div className="relative overflow-hidden border-b py-2.5" style={{
        background: "rgba(43,108,235,0.06)",
        borderColor: "rgba(43,108,235,0.12)",
      }}>
        {/* Tricolor edge accents */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] flex flex-col">
          <div style={{ flex: 1, background: "#FF9933" }} />
          <div style={{ flex: 1, background: "#F0F0F0" }} />
          <div style={{ flex: 1, background: "#138808" }} />
        </div>
        <div className="flex gap-0 whitespace-nowrap" style={{ animation: "ticker 32s linear infinite" }}>
          <span className="text-xs font-medium text-secondary/70 tracking-wide pl-4">{ticker}{ticker}</span>
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative flex-1 flex flex-col justify-center min-h-[90vh] pt-12 pb-24 overflow-hidden bg-transparent px-4 sm:px-6">

        {/* India flag — waving, very subtle, right side */}
        <div
          className="absolute right-0 top-[10%] pointer-events-none hidden lg:block"
          style={{ width: 160, height: 96, opacity: 0.06 }}
        >
          <IndiaFlagBg />
        </div>

        {/* Large India flag watermark — background */}
        <div
          className="absolute right-[-4%] top-[5%] pointer-events-none hidden xl:block"
          style={{ width: 320, height: 192, opacity: 0.035 }}
        >
          <IndiaFlagBg />
        </div>

        {/* Animated orbs — enhanced */}
        <motion.div
          animate={{ y: [0, -30, 0], scale: [1, 1.08, 1], opacity: [0.15, 0.22, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-18%] left-[-10%] w-[65%] h-[65%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(221 83% 58% / 0.5) 0%, transparent 65%)", filter: "blur(90px)" }}
        />
        <motion.div
          animate={{ y: [0, 24, 0], scale: [1, 1.06, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-12%] right-[-10%] w-[55%] h-[55%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(43 90% 55% / 0.4) 0%, transparent 65%)", filter: "blur(110px)" }}
        />
        {/* India saffron glow */}
        <motion.div
          animate={{ y: [0, -16, 0], x: [0, 12, 0], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[30%] right-[5%] w-[30%] h-[30%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,153,51,0.6) 0%, transparent 70%)", filter: "blur(70px)" }}
        />
        {/* India green glow */}
        <motion.div
          animate={{ y: [0, 18, 0], x: [0, -10, 0], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[5%] left-[10%] w-[25%] h-[25%] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(19,136,8,0.5) 0%, transparent 70%)", filter: "blur(80px)" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full">

            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm text-foreground/80 mb-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="font-medium">India's Most Advanced Legal Platform</span>
              <div className="flex items-center gap-0.5 ml-1">
                <div className="w-2 h-2 rounded-sm overflow-hidden flex flex-col">
                  <div style={{ flex: 1, background: "#FF9933" }} />
                  <div style={{ flex: 1, background: "#F0F0F0" }} />
                  <div style={{ flex: 1, background: "#138808" }} />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={itemVariants} className="font-serif text-6xl sm:text-8xl md:text-[9rem] font-extrabold tracking-tight leading-[0.95] mb-6">
              <span className="text-foreground">Nyay</span>
              <span
                style={{
                  background: "linear-gradient(135deg, #c9a227 0%, #f5d06b 35%, #d4af37 65%, #FF9933 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 40px rgba(212,175,55,0.3))",
                }}
              >
                Setu
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-foreground/60 mb-4 max-w-2xl mx-auto font-light leading-relaxed">
              Justice is no longer{" "}
              <em className="font-serif text-accent not-italic font-normal" style={{ filter: "drop-shadow(0 0 12px rgba(212,175,55,0.4))" }}>
                out of reach.
              </em>
            </motion.p>
            <motion.p variants={itemVariants} className="text-base md:text-lg text-foreground/40 mb-14 max-w-xl mx-auto font-light">
              Your world-class legal companion — AI-powered, always available, built for every Indian.
            </motion.p>

            {/* Tricolor decorative bar */}
            <motion.div variants={itemVariants} className="flex justify-center mb-10">
              <TricolorBar className="w-24" />
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="w-full text-lg h-14 px-10 text-white rounded-2xl relative overflow-hidden group border-0"
                    style={{
                      background: "linear-gradient(135deg, hsl(221 83% 55%) 0%, hsl(221 83% 42%) 100%)",
                      boxShadow: "0 0 40px rgba(43,108,235,0.45), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                    }}
                  >
                    {/* Shimmer sweep */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div
                        className="absolute inset-y-0 w-1/3"
                        style={{
                          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                          animation: "shimmerSweep 2.5s ease-in-out infinite",
                        }}
                      />
                    </div>
                    <span className="relative z-10 flex items-center font-semibold gap-2">
                      Enter Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/ai-chat" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-lg h-14 px-10 rounded-2xl text-foreground/80 hover:text-white transition-all"
                    style={{
                      background: "rgba(255,255,255,0.035)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
                    }}
                  >
                    <Bot className="w-5 h-5 mr-2 text-secondary" /> Ask AI Assistant
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Live status chips */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mt-10 flex-wrap">
              {[
                { dot: "bg-emerald-400", text: "AI Online" },
                { dot: "bg-secondary", text: "eCourts Live" },
                { dot: "bg-accent", text: "50K+ Served" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-foreground/40">
                  <div className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
                  {s.text}
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* Developer Credit - Mobile */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center lg:hidden">
          <div className="text-center">
            <p className="text-[9px] text-muted-foreground/40 uppercase tracking-widest mb-0.5">Developed by</p>
            <p className="text-[10px] font-bold tracking-[0.18em] text-accent/70">MD DANISH HUSSAIN</p>
          </div>
        </div>
      </section>

      {/* ── Stats Row ───────────────────────────────── */}
      <section className="py-12 border-y relative overflow-hidden" style={{
        background: "rgba(0,0,0,0.3)",
        borderColor: "rgba(255,255,255,0.05)",
      }}>
        {/* Background shimmer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-y-0 w-1/4"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent)",
              animation: "shimmerSweep 6s ease-in-out infinite",
            }}
          />
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 50000, label: "Citizens Served", suffix: "+", color: "text-accent", glow: "rgba(212,175,55,0.3)" },
              { value: 1200, label: "Verified Advocates", suffix: "+", color: "text-blue-400", glow: "rgba(96,165,250,0.25)" },
              { value: 6, label: "Metro Cities", suffix: "", color: "text-emerald-400", glow: "rgba(52,211,153,0.25)" },
              { value: 4, label: "Languages", suffix: "", color: "text-purple-400", glow: "rgba(167,139,250,0.25)" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${stat.glow} 0%, transparent 70%)`, filter: "blur(20px)" }}
                />
                <p className={`text-4xl md:text-5xl font-bold font-serif ${stat.color} relative`}
                  style={{ filter: `drop-shadow(0 0 16px ${stat.glow})` }}>
                  <AnimatedCounter to={stat.value} />{stat.suffix}
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-2 uppercase tracking-[0.15em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ───────────────────────────── */}
      <section className="py-24 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent mb-4">Platform Services</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-5">
              A unified legal infrastructure
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Everything you need to navigate India's legal system with clarity and confidence.
            </p>
            <div className="flex justify-center mt-6">
              <TricolorBar className="w-32" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 26 }}
                >
                  <Link href={service.link} className="block h-full">
                    <div
                      className="h-full cursor-pointer flex flex-col p-7 rounded-[22px] group transition-all duration-400"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = service.border;
                        el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.35), 0 0 40px ${service.glow}, inset 0 1px 0 rgba(255,255,255,0.07)`;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(255,255,255,0.06)";
                        el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)";
                      }}
                    >
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}
                        style={{ border: `1px solid ${service.border}`, boxShadow: `0 0 24px ${service.glow}` }}
                      >
                        <Icon className={`w-7 h-7 ${service.accent}`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-foreground mb-3 font-serif">{service.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed text-sm flex-1">{service.desc}</p>

                      {/* Footer */}
                      <div className="flex items-center text-sm font-semibold text-foreground/35 group-hover:text-white transition-colors">
                        <span className={`group-hover:${service.accent.replace("text-", "text-")} transition-colors`}>Explore</span>
                        <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-2 transition-transform" />
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
      <section className="py-24 border-t relative z-10" style={{
        background: "rgba(0,0,0,0.2)",
        borderColor: "rgba(255,255,255,0.05)",
      }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent mb-4">Our Promise</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground">Why NyaySetu?</h2>
            <div className="flex justify-center mt-6">
              <TricolorBar className="w-20" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Unwavering Trust", desc: "Bar Council verified advocates and end-to-end encrypted data sovereignty.", icon: Shield, color: "text-accent", bg: "bg-accent/10", glow: "rgba(212,175,55,0.15)", border: "rgba(212,175,55,0.2)" },
              { title: "Unmatched Speed", desc: "AI-driven responses and real-time eCourts integration for immediate clarity.", icon: Zap, color: "text-secondary", bg: "bg-secondary/10", glow: "rgba(43,108,235,0.15)", border: "rgba(43,108,235,0.2)" },
              { title: "Unequaled Expertise", desc: "Access the highest tier of legal professionals across every Indian state.", icon: Globe, color: "text-emerald-400", bg: "bg-emerald-500/10", glow: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.2)" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center text-center group p-8 rounded-3xl transition-all duration-400 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${f.border}`,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.03)`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${f.glow}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.03)`;
                  }}
                >
                  <div
                    className={`w-16 h-16 rounded-3xl ${f.bg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}
                    style={{ border: `1px solid ${f.border}`, boxShadow: `0 0 24px ${f.glow}` }}
                  >
                    <Icon className={`w-8 h-8 ${f.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-serif text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Emergency CTA ───────────────────────────── */}
      <section className="py-12 border-t relative z-10 overflow-hidden" style={{
        background: "rgba(220,38,38,0.05)",
        borderColor: "rgba(220,38,38,0.12)",
      }}>
        {/* Subtle pulse bg */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,38,38,0.15) 0%, transparent 70%)" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-5 text-center md:text-left"
          >
            <div className="flex items-center gap-3 text-destructive font-bold text-xl font-serif">
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                <AlertTriangle className="w-6 h-6" />
              </motion.div>
              Need immediate legal help?
            </div>
            <Link href="/emergency">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded-2xl px-8 font-bold relative overflow-hidden"
                  style={{
                    boxShadow: "0 0 30px rgba(220,38,38,0.4), 0 8px 24px rgba(0,0,0,0.4)",
                    background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div
                      className="absolute inset-y-0 w-1/3"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                        animation: "shimmerSweep 2s ease-in-out infinite",
                      }}
                    />
                  </div>
                  <span className="relative z-10">Access Emergency Services</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
