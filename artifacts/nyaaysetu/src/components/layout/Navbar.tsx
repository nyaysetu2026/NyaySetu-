import { Link, useLocation } from "wouter";
import { Scale, Menu, X, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/ai-chat", label: "AI Assistant" },
    { href: "/lawyers", label: "Lawyers" },
    { href: "/documents", label: "Documents" },
    { href: "/rights", label: "Know Your Rights" },
    { href: "/cases", label: "Case Tracker" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Scale className="h-6 w-6" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-primary">
            NyaySetu
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                location.startsWith(link.href)
                  ? "text-secondary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <Link href="/emergency">
            <Button variant="destructive" className="gap-2 font-semibold shadow-sm hover:shadow-md transition-all">
              <ShieldAlert className="h-4 w-4" />
              Emergency
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 -mr-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-base font-medium ${
                  location.startsWith(link.href)
                    ? "text-secondary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/emergency" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="destructive" className="w-full gap-2">
                  <ShieldAlert className="h-4 w-4" />
                  Emergency Helpline
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
