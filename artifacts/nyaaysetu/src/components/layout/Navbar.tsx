import { Link, useLocation } from "wouter";
import { Bell, ChevronDown, Scale } from "lucide-react";
import { motion } from "framer-motion";
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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14"
      style={{
        background: "rgba(6, 10, 20, 0.82)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 1px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div className="h-full max-w-[1400px] mx-auto px-5 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(43,108,235,0.18) 100%)",
              border: "1px solid rgba(212,175,55,0.32)",
            }}
          >
            <Scale className="w-4 h-4 text-accent" />
          </div>
          <div className="leading-none">
            <p className="text-sm font-bold text-white tracking-wide">NyaySetu</p>
            <p className="text-[9px] text-white/35 mt-0.5">Justice is now within everyone's reach</p>
          </div>
        </Link>

        {/* ── Center nav ── */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? location === "/"
                : location.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href}>
                <span
                  className="relative px-3.5 py-2 text-sm font-medium rounded-lg cursor-pointer block transition-colors duration-150 select-none"
                  style={{ color: active ? "#ffffff" : "rgba(255,255,255,0.48)" }}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #FF9933 0%, #d4af37 50%, #138808 100%)",
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ── Right ── */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Bell */}
          <button
            className="relative p-2 rounded-full transition-colors hover:bg-white/8"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <Bell className="w-[18px] h-[18px]" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"
              style={{ boxShadow: "0 0 6px rgba(239,68,68,0.9)" }}
            />
          </button>

          {/* User chip */}
          <div
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full cursor-pointer transition-all hover:bg-white/10"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            >
              D
            </div>
            <span className="hidden sm:block text-sm font-medium text-white/75">
              Hi, Danish
            </span>
            <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-white/30" />
          </div>
        </div>
      </div>
    </header>
  );
}
