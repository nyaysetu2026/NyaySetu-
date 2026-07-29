import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Home, Bot, Landmark, Menu, Users, FileText, BookOpen, AlertTriangle, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "@assets/nyaaysetu-logo.png";
import { AnimatedBackground } from "@/components/ui/animated-bg";
import { TricolorBar } from "@/components/ui/india-flag-bg";
import { Navbar } from "./Navbar";

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const bottomNavItems = [
    { name: "Home", href: "/", icon: Home },
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
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-secondary/20">

      {/* Global animated background */}
      <AnimatedBackground />

      {/* ── Top Navbar ── */}
      <Navbar />

      {/* ── Main Content ── */}
      <main className="flex-1 relative z-10 pt-14 pb-[84px] md:pb-0 min-w-0 overflow-x-hidden">
        {children}
      </main>

      {/* ── Mobile Bottom Nav ── */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2"
        style={{
          height: "80px",
          background: "rgba(8, 12, 24, 0.94)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Tricolor top accent */}
        <div className="absolute top-0 left-0 right-0 flex h-[2px]">
          <div style={{ flex: 1, background: "rgba(255,153,51,0.45)" }} />
          <div style={{ flex: 1, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ flex: 1, background: "rgba(19,136,8,0.45)" }} />
        </div>

        {bottomNavItems.map((item) => {
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
                  className={`relative z-10 p-1.5 rounded-xl ${active ? "text-white" : "text-sidebar-foreground/45"}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className={`relative z-10 text-[10px] font-semibold tracking-wide ${active ? "text-white" : "text-sidebar-foreground/45"}`}>
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
              <div className="flex justify-between items-center mb-2 mt-2">
                <img src={logoSrc} alt="NyaySetu" className="h-9 w-auto" />
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full w-9 h-9 hover:bg-white/8">
                    <X className="w-4 h-4" />
                  </Button>
                </DrawerClose>
              </div>
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
                          <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center`}>
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
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 font-medium">
                  🇮🇳 NyaySetu · Justice For Every Citizen
                </p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
