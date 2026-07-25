import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Home, Bot, Landmark, Menu, Users, FileText, BookOpen, AlertTriangle, X, Shield } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "@assets/logo_1784444903511.png";
import { AnimatedBackground } from "@/components/ui/animated-bg";
import { TricolorBar } from "@/components/ui/india-flag-bg";

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "AI Chat", href: "/ai-chat", icon: Bot },
    { name: "Cases", href: "/cases", icon: Landmark },
  ];

  const moreItems = [
    { name: "Lawyers", href: "/lawyers", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/15" },
    { name: "Documents", href: "/documents", icon: FileText, color: "text-purple-400", bg: "bg-purple-500/15" },
    { name: "Rights", href: "/rights", icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/15" },
    { name: "Emergency", href: "/emergency", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/15" },
  ];

  const isActiveNav = (href: string) =>
    location === href || (location === "/" && href === "/dashboard");

  return (
    <div className="min-h-[100dvh] flex bg-background selection:bg-secondary/20">

      {/* Global animated background */}
      <AnimatedBackground />

      {/* ── Desktop Sidebar ──────────────────────────── */}
      <aside
        className="hidden lg:flex w-[270px] flex-col fixed top-0 bottom-0 left-0 z-40"
        style={{
          background: "rgba(10, 14, 28, 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Brand */}
        <div className="px-6 py-5 flex items-center gap-3 relative overflow-hidden">
          {/* Top highlight line */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <img src={logoSrc} alt="NyaySetu" className="h-10 w-auto drop-shadow-lg" />
          </motion.div>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80">Legal Platform</p>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-emerald-400/70 font-medium uppercase tracking-wider">Live</span>
            </div>
          </div>
        </div>

        {/* India flag tricolor bar below brand */}
        <div className="mx-6 mb-1">
          <TricolorBar />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
          <p className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground/40 mb-1">Navigation</p>

          {navItems.map((item) => {
            const active = isActiveNav(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className="block">
                <motion.div
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group cursor-pointer ${
                    active
                      ? "text-white"
                      : "text-sidebar-foreground/55 hover:text-white"
                  }`}
                  style={active ? {
                    background: "linear-gradient(135deg, rgba(43,108,235,0.18) 0%, rgba(43,108,235,0.08) 100%)",
                    border: "1px solid rgba(43,108,235,0.2)",
                    boxShadow: "0 4px 16px rgba(43,108,235,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                  } : {
                    border: "1px solid transparent",
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-secondary"
                      style={{ boxShadow: "0 0 8px rgba(43,108,235,0.8)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                    active ? "bg-secondary/20" : "bg-transparent group-hover:bg-white/6"
                  }`}>
                    <Icon className={`w-4 h-4 ${active ? "text-secondary" : ""}`} />
                  </div>
                  <span className="font-semibold text-sm">{item.name}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary"
                      style={{ boxShadow: "0 0 6px rgba(43,108,235,0.8)" }} />
                  )}
                </motion.div>
              </Link>
            );
          })}

          <div className="my-4 px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          </div>
          <p className="px-4 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground/40">Resources</p>

          {moreItems.map((item) => {
            const active = location === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className="block">
                <motion.div
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group cursor-pointer ${
                    active
                      ? "text-white"
                      : "text-sidebar-foreground/55 hover:text-white"
                  }`}
                  style={active ? {
                    background: "linear-gradient(135deg, rgba(43,108,235,0.18) 0%, rgba(43,108,235,0.08) 100%)",
                    border: "1px solid rgba(43,108,235,0.2)",
                    boxShadow: "0 4px 16px rgba(43,108,235,0.12), inset 0 1px 0 rgba(255,255,255,0.05)",
                  } : {
                    border: "1px solid transparent",
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-secondary"
                      style={{ boxShadow: "0 0 8px rgba(43,108,235,0.8)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                    active ? "bg-secondary/20" : "bg-transparent group-hover:bg-white/6"
                  }`}>
                    <Icon className={`w-4 h-4 ${item.name === "Emergency" ? "text-destructive" : active ? "text-secondary" : item.color}`} />
                  </div>
                  <span className="font-semibold text-sm">{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 relative">
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
          {/* India flag mini */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex flex-col rounded-sm overflow-hidden" style={{ width: 22, height: 14 }}>
              <div style={{ flex: 1, background: "#FF9933" }} />
              <div style={{ flex: 1, background: "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", border: "0.6px solid #000080" }} />
              </div>
              <div style={{ flex: 1, background: "#138808" }} />
            </div>
            <p className="text-[9px] text-muted-foreground/50 uppercase tracking-wider font-medium">Justice For Every Citizen</p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-accent/50" />
            <p className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">Developed by</p>
          </div>
          <p className="text-xs font-bold tracking-[0.18em] text-accent mt-0.5">MD DANISH HUSSAIN</p>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────── */}
      <main className="flex-1 lg:ml-[270px] flex flex-col min-h-[100dvh] pb-[84px] lg:pb-0 relative z-10">
        {children}
      </main>

      {/* ── Mobile Bottom Nav ────────────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2"
        style={{
          height: "80px",
          background: "rgba(8, 12, 24, 0.92)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Tricolor top accent */}
        <div className="absolute top-0 left-0 right-0 flex h-[2px]">
          <div style={{ flex: 1, background: "rgba(255,153,51,0.4)" }} />
          <div style={{ flex: 1, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ flex: 1, background: "rgba(19,136,8,0.4)" }} />
        </div>

        {navItems.map((item) => {
          const active = isActiveNav(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="relative flex flex-col items-center justify-center w-full h-full gap-1 pt-1"
              >
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="bottom-nav-pill"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full"
                      style={{ background: "linear-gradient(90deg, #FF9933, #f5d06b, #138808)" }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>

                {active && (
                  <motion.div
                    layoutId="bottom-nav-bg"
                    className="absolute inset-1 rounded-2xl"
                    style={{ background: "rgba(43,108,235,0.12)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <motion.div
                  animate={active ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`relative z-10 p-1.5 rounded-xl transition-colors ${
                    active ? "text-white" : "text-sidebar-foreground/45"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className={`relative z-10 text-[10px] font-semibold tracking-wide transition-colors ${
                  active ? "text-white" : "text-sidebar-foreground/45"
                }`}>
                  {item.name}
                </span>
              </motion.div>
            </Link>
          );
        })}

        {/* More Drawer */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <motion.div
              whileTap={{ scale: 0.85 }}
              className="flex-1 flex flex-col items-center justify-center h-full gap-1 pt-1 cursor-pointer"
            >
              <div className="p-1.5 rounded-xl text-sidebar-foreground/45">
                <Menu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold tracking-wide text-sidebar-foreground/45">More</span>
            </motion.div>
          </DrawerTrigger>

          <DrawerContent
            className="border-white/8"
            style={{
              background: "rgba(8,12,26,0.97)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
            }}
          >
            <div className="mx-auto w-full max-w-sm px-4 pt-2 pb-10">
              {/* Header */}
              <div className="flex justify-between items-center mb-2 mt-2">
                <div className="flex items-center gap-2">
                  <img src={logoSrc} alt="NyaySetu" className="h-9 w-auto" />
                </div>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground rounded-full w-9 h-9 hover:bg-white/8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </DrawerClose>
              </div>

              {/* Tricolor divider */}
              <TricolorBar className="mb-5" />

              <div className="grid grid-cols-2 gap-3">
                {moreItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <DrawerClose asChild key={item.name}>
                      <Link href={item.href} className="block">
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          whileTap={{ scale: 0.95 }}
                          className="glass-card flex flex-col items-center justify-center p-6 gap-3 text-center cursor-pointer hover:bg-white/5 group"
                        >
                          <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
                            style={{ boxShadow: item.name === "Emergency" ? "0 0 16px rgba(220,38,38,0.2)" : "0 0 16px rgba(43,108,235,0.1)" }}>
                            <Icon className={`w-5 h-5 ${item.color}`} />
                          </div>
                          <span className="font-semibold text-sm text-foreground">{item.name}</span>
                        </motion.div>
                      </Link>
                    </DrawerClose>
                  );
                })}
              </div>

              <div className="mt-6 pt-5 border-t border-white/5 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {/* Mini India flag */}
                  <div className="flex flex-col rounded-sm overflow-hidden" style={{ width: 16, height: 10 }}>
                    <div style={{ flex: 1, background: "#FF9933" }} />
                    <div style={{ flex: 1, background: "#F0F0F0" }} />
                    <div style={{ flex: 1, background: "#138808" }} />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 font-medium">
                    NyaySetu · Justice For Every Citizen
                  </p>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
