import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Home, Bot, Landmark, Menu, Users, FileText, BookOpen, AlertTriangle, X, Shield } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "@assets/logo_1784444903511.png";

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

      {/* ── Desktop Sidebar ──────────────────────────── */}
      <aside className="hidden lg:flex w-[270px] flex-col fixed top-0 bottom-0 left-0 z-40"
        style={{ background: "hsl(222 50% 7.5%)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>

        {/* Brand */}
        <div className="px-6 py-5 flex items-center gap-3 border-b border-white/5">
          <img src={logoSrc} alt="NyaySetu" className="h-10 w-auto" />
          <div className="w-px h-6 bg-white/10" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/80">Legal Platform</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const active = isActiveNav(item.href);
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className="block">
                <div className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                  active
                    ? "bg-secondary/15 text-white"
                    : "text-sidebar-foreground/60 hover:bg-white/5 hover:text-white"
                }`}>
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-secondary"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <div className={`p-1.5 rounded-xl transition-colors ${active ? "bg-secondary/20" : "bg-transparent group-hover:bg-white/5"}`}>
                    <Icon className={`w-4 h-4 ${active ? "text-secondary" : ""}`} />
                  </div>
                  <span className="font-semibold text-sm">{item.name}</span>
                  {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary" />}
                </div>
              </Link>
            );
          })}

          <div className="my-4 px-4">
            <div className="h-px bg-white/5" />
          </div>
          <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">Resources</p>

          {moreItems.map((item) => {
            const active = location === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href} className="block">
                <div className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                  active
                    ? "bg-secondary/15 text-white"
                    : "text-sidebar-foreground/60 hover:bg-white/5 hover:text-white"
                }`}>
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-secondary"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <div className={`p-1.5 rounded-xl ${active ? "bg-secondary/20" : "bg-transparent group-hover:bg-white/5"}`}>
                    <Icon className={`w-4 h-4 ${item.name === "Emergency" ? "text-destructive" : active ? "text-secondary" : ""}`} />
                  </div>
                  <span className="font-semibold text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-3 h-3 text-accent/60" />
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Developed by</p>
          </div>
          <p className="text-xs font-bold tracking-[0.18em] text-accent">MD DANISH HUSSAIN</p>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────── */}
      <main className="flex-1 lg:ml-[270px] flex flex-col min-h-[100dvh] pb-[84px] lg:pb-0 relative overflow-hidden">
        {children}
      </main>

      {/* ── Mobile Bottom Nav ────────────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2"
        style={{
          height: "84px",
          background: "hsl(222 50% 7% / 0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {navItems.map((item) => {
          const active = isActiveNav(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.88 }}
                className="relative flex flex-col items-center justify-center w-full h-full gap-1 pt-1"
              >
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="bottom-nav-pill"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full bg-accent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  animate={active ? { scale: 1.05 } : { scale: 1 }}
                  className={`p-1.5 rounded-xl transition-colors ${active ? "text-accent" : "text-sidebar-foreground/50"}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className={`text-[10px] font-semibold tracking-wide ${active ? "text-accent" : "text-sidebar-foreground/50"}`}>
                  {item.name}
                </span>
              </motion.div>
            </Link>
          );
        })}

        {/* More Drawer */}
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <motion.div whileTap={{ scale: 0.88 }} className="flex-1 flex flex-col items-center justify-center h-full gap-1 pt-1 cursor-pointer">
              <div className="p-1.5 rounded-xl text-sidebar-foreground/50">
                <Menu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold tracking-wide text-sidebar-foreground/50">More</span>
            </motion.div>
          </DrawerTrigger>

          <DrawerContent
            className="border-white/8"
            style={{ background: "hsl(222 50% 8%)" }}
          >
            <div className="mx-auto w-full max-w-sm px-4 pt-2 pb-10">
              {/* Handle */}
              <div className="flex justify-between items-center mb-6 mt-2">
                <div className="flex items-center gap-2">
                  <img src={logoSrc} alt="NyaySetu" className="h-9 w-auto" />
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full w-9 h-9 hover:bg-white/8">
                    <X className="w-4 h-4" />
                  </Button>
                </DrawerClose>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DrawerClose asChild key={item.name}>
                      <Link href={item.href} className="block">
                        <motion.div
                          whileTap={{ scale: 0.95 }}
                          className="glass-card flex flex-col items-center justify-center p-6 gap-3 text-center cursor-pointer hover:bg-white/5"
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
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50 font-medium">NyaySetu · Justice For Every Citizen</p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
