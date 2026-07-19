import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Shield, FileText, Bot, Users, Landmark, ChevronRight, AlertTriangle } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Hero Section with Gradient Mesh */}
      <section className="relative flex-1 flex flex-col justify-center min-h-[90vh] lg:min-h-screen pt-12 pb-24 overflow-hidden bg-background px-4 sm:px-6">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-primary/20 blur-[80px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-foreground/80 mb-8">
              <Scale className="w-4 h-4 text-accent" />
              <span>Premium Legal Services</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-serif text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground drop-shadow-sm">
              NyaySetu
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-foreground/70 mb-10 max-w-2xl mx-auto font-medium leading-relaxed font-sans">
              Justice is no longer <span className="font-serif italic text-accent font-normal">out of reach.</span> Your world-class legal companion.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-lg h-14 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-2xl relative overflow-hidden group shadow-[0_0_20px_rgba(43,108,235,0.3)]">
                  <div className="absolute inset-0 w-full h-full shimmer-bg animate-shimmer opacity-30 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center font-semibold">
                    Enter Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Developer Credit for Mobile Hero */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center lg:hidden">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Developed by</p>
            <p className="text-xs font-bold tracking-[0.2em] text-accent">MD DANISH HUSSAIN</p>
          </div>
        </div>
      </section>

      {/* Hero Stat Row */}
      <section className="py-8 bg-black/20 border-y border-white/5 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-center text-sm md:text-base font-medium text-foreground/80">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span> 50,000+ Citizens Served</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span> 6 Cities</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent"></span> 4 Languages</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> AI-Powered</span>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">A unified legal infrastructure</h2>
            <p className="text-muted-foreground text-lg">Everything you need to navigate the legal system with confidence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "AI Legal Assistant", icon: <Bot className="w-8 h-8"/>, desc: "Intelligent guidance on rights and IPC.", link: "/ai-chat" },
              { title: "Expert Directory", icon: <Users className="w-8 h-8"/>, desc: "Consult verified advocates.", link: "/lawyers" },
              { title: "Case Tracker", icon: <Landmark className="w-8 h-8"/>, desc: "Monitor hearings and court orders.", link: "/cases" },
              { title: "Document Vault", icon: <FileText className="w-8 h-8"/>, desc: "Access standard legal templates.", link: "/documents" },
              { title: "Know Your Rights", icon: <Scale className="w-8 h-8"/>, desc: "Plain-language constitutional guides.", link: "/rights" },
              { title: "Emergency Help", icon: <Shield className="w-8 h-8"/>, desc: "Immediate access to national helplines.", link: "/emergency" }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative block"
              >
                <Link href={service.link}>
                  <div className="glass-card p-8 h-full cursor-pointer flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 font-serif tracking-wide">{service.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                        {service.desc}
                      </p>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-foreground/50 group-hover:text-secondary transition-colors mt-auto">
                      Explore <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why NyaySetu Section */}
      <section className="py-24 bg-black/20 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Why NyaySetu?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Unwavering Trust", desc: "Bar Council verified advocates and end-to-end encrypted data sovereignty.", icon: <Shield className="w-10 h-10 text-accent mb-4" /> },
              { title: "Unmatched Speed", desc: "AI-driven responses and real-time eCourts integration for immediate clarity.", icon: <Bot className="w-10 h-10 text-secondary mb-4" /> },
              { title: "Unequaled Expertise", desc: "Access the highest tier of legal professionals across India.", icon: <Scale className="w-10 h-10 text-primary-foreground mb-4" /> }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                {f.icon}
                <h3 className="text-xl font-bold mb-2 font-serif">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA Strip */}
      <section className="py-12 bg-destructive/10 border-t border-destructive/20 relative z-10">
        <div className="container mx-auto px-4 text-center flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3 text-destructive font-bold text-xl font-serif">
            <AlertTriangle className="w-6 h-6" /> Need immediate help?
          </div>
          <Link href="/emergency">
            <Button variant="destructive" size="lg" className="rounded-full px-8 shadow-lg shadow-destructive/20">
              Access Emergency Services
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}