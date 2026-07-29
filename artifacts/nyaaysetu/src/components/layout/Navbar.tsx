import { Link, useLocation } from "wouter";
import { Bell, ChevronDown, Scale, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import logoSrc from "@assets/nyaaysetu-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/dashboard" },
  { label: "AI Assistant", href: "/ai-chat" },
  { label: "Lawyers", href: "/lawyers" },
  { label: "Knowledge", href: "/rights" },
  { label: "Track Case", href: "/cases" },
];

export function Navbar() {
  const [location] = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14"
      style={{
        background: "rgba(5, 8, 18, 0.88)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 32px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.04)",
      }}
    >
      {/* Top tricolor accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] flex overflow-hidden pointer-events-none">
        <div style={{ flex: 1, background: "linear-gradient(90deg, transparent, rgba(255,153,51,0.6), transparent)" }} />
        <div style={{ flex: 0.3, background: "rgba(255,255,255,0.12)" }} />
        <div style={{ flex: 1, background: "linear-gradient(90deg, transparent, rgba(19,136,8,0.6), transparent)" }} />
      </div>

      <div className="h-full max-w-[1400px] mx-auto px-5 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(43,108,235,0.2) 100%)",
              border: "1px solid rgba(212,175,55,0.38)",
              boxShadow: "0 0 16px rgba(212,175,55,0.12)",
            }}
          >
            <Scale className="w-4 h-4 text-accent" />
          </motion.div>
          <div className="leading-none">
            <p className="text-sm font-bold text-white tracking-wide group-hover:text-accent transition-colors duration-200">NyaySetu</p>
            <p className="text-[9px] text-white/30 mt-0.5">Justice is now within everyone's reach</p>
          </div>
        </Link>

        {/* ── Center nav ── */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => {
            const active = link.href === "/" ? location === "/" : location.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href}>
                <motion.span
                  whileHover={{ color: "#ffffff" }}
                  className="relative px-3.5 py-2 text-sm font-medium rounded-lg cursor-pointer block select-none transition-all duration-200"
                  style={{ color: active ? "#ffffff" : "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: "linear-gradient(90deg, #FF9933 0%, #d4af37 50%, #138808 100%)" }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        {/* ── Right ── */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Search — desktop */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.35)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search…</span>
            <span className="ml-1 px-1.5 py-0.5 rounded text-[9px]" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}>⌘K</span>
          </motion.button>

          {/* Bell */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
          >
            <Bell className="w-[17px] h-[17px]" />
            <span
              className="absolute top-1 right-1 w-[7px] h-[7px] rounded-full bg-red-500"
              style={{ boxShadow: "0 0 7px rgba(239,68,68,0.9)", animation: "livePulse 2s ease-in-out infinite" }}
            />
          </motion.button>

          {/* User chip */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full cursor-pointer transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", boxShadow: "0 0 10px rgba(139,92,246,0.4)" }}
            >
              D
            </div>
            <span className="hidden sm:block text-sm font-medium text-white/72">
              Hi, Danish
            </span>
            <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-white/28" />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
