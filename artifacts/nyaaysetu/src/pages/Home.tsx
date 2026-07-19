import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Shield, FileText, Bot, Users, Landmark, ChevronRight, CheckCircle2 } from "lucide-react";

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
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary pt-24 pb-32 md:pt-32 md:pb-40 text-primary-foreground">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent mb-8 border border-accent/30 font-medium text-sm">
              <Shield className="w-4 h-4" />
              <span>The Official Digital Legal Bridge</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
              Justice is no longer <br className="hidden md:block" />
              <span className="text-accent italic">out of reach.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              NyaySetu connects every Indian citizen to world-class legal technology. From AI-assisted guidance to expert lawyers, file and track your legal journey with unwavering confidence.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-secondary hover:bg-secondary/90 text-white border-0">
                  Enter Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/ai-chat">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary border-primary-foreground/20">
                  Ask AI Assistant
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">Comprehensive Legal Infrastructure</h2>
            <p className="text-muted-foreground text-lg">A unified platform offering end-to-end solutions for citizens, advocates, and legal researchers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI Legal Assistant", icon: <Bot className="w-8 h-8"/>, desc: "24/7 intelligent guidance on constitutional rights, IPC codes, and general legal advice.", link: "/ai-chat" },
              { title: "Expert Directory", icon: <Users className="w-8 h-8"/>, desc: "Find and consult with verified Supreme Court and High Court advocates across India.", link: "/lawyers" },
              { title: "Case Tracker", icon: <Landmark className="w-8 h-8"/>, desc: "Monitor your active cases, next hearing dates, and court orders in real-time.", link: "/cases" },
              { title: "Document Vault", icon: <FileText className="w-8 h-8"/>, desc: "Access standard templates for affidavits, agreements, and official petitions.", link: "/documents" },
              { title: "Know Your Rights", icon: <Scale className="w-8 h-8"/>, desc: "Plain-language articles explaining fundamental rights and civic duties.", link: "/rights" },
              { title: "Emergency Help", icon: <Shield className="w-8 h-8"/>, desc: "Immediate access to national helplines, domestic abuse support, and urgent legal aid.", link: "/emergency" }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative bg-card p-8 rounded-2xl border border-card-border shadow-sm hover:shadow-md transition-all hover:border-secondary/50"
              >
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <Link href={service.link} className="inline-flex items-center text-secondary font-semibold hover:text-primary transition-colors">
                  Explore Module <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="py-20 bg-muted border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
            {[
              { label: "Registered Lawyers", value: "15,000+" },
              { label: "Cases Tracked", value: "2.4M+" },
              { label: "Cities Served", value: "450+" },
              { label: "AI Consultations", value: "1M+" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center space-y-2">
                <span className="font-serif text-5xl font-extrabold text-primary">{stat.value}</span>
                <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works / Trust Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="font-serif text-4xl font-bold text-primary mb-6">Government-Grade Security. Citizen-First Design.</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe that interacting with the law shouldn't require a law degree. NyaySetu translates complex bureaucratic processes into clear, actionable steps while maintaining absolute data sovereignty and attorney-client privilege.
              </p>
              <ul className="space-y-4">
                {[
                  "End-to-end encrypted document vault",
                  "Bar Council verified advocate network",
                  "Multi-lingual interface for all states",
                  "Direct integration with eCourts data"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-secondary" />
                    <span className="text-foreground font-medium text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                <img 
                  src="https://images.unsplash.com/photo-1505664173691-a28156db1524?q=80&w=1000&auto=format&fit=crop" 
                  alt="Indian Supreme Court Architecture" 
                  className="w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Ready to take control of your legal journey?</h2>
          <p className="text-xl text-primary-foreground/80 pb-4">
            Join thousands of citizens who have found clarity and justice through NyaySetu.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="h-16 px-10 text-lg bg-accent hover:bg-accent/90 text-primary font-bold">
              Access Dashboard Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
