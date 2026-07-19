import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Scale, Home, Bot, Landmark, Menu, Users, FileText, BookOpen, AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "AI Chat", href: "/ai-chat", icon: <Bot className="w-5 h-5" /> },
    { name: "Cases", href: "/cases", icon: <Landmark className="w-5 h-5" /> },
  ];

  const moreItems = [
    { name: "Lawyers", href: "/lawyers", icon: <Users className="w-5 h-5" /> },
    { name: "Documents", href: "/documents", icon: <FileText className="w-5 h-5" /> },
    { name: "Rights", href: "/rights", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Emergency", href: "/emergency", icon: <AlertTriangle className="w-5 h-5 text-destructive" /> },
  ];

  return (
    <div className="min-h-[100dvh] flex bg-background selection:bg-secondary/20">
      {/* Desktop Sidebar (>= 1024px) */}
      <aside className="hidden lg:flex w-[260px] flex-col bg-sidebar border-r border-sidebar-border fixed top-0 bottom-0 left-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary shadow-sm">
            <Scale className="w-6 h-6" />
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight text-white">NyaySetu</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="block">
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location === item.href 
                  ? "bg-secondary text-white shadow-sm" 
                  : "text-sidebar-foreground hover:bg-white/5 hover:text-white"
              }`}>
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
          
          <div className="my-4 border-t border-sidebar-border" />
          <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resources</div>
          
          {moreItems.map((item) => (
            <Link key={item.name} href={item.href} className="block">
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location === item.href 
                  ? "bg-secondary text-white shadow-sm" 
                  : "text-sidebar-foreground hover:bg-white/5 hover:text-white"
              }`}>
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground mb-1">Developed by</p>
          <p className="text-sm font-bold tracking-widest text-accent uppercase">MD DANISH HUSSAIN</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-[260px] flex flex-col min-h-[100dvh] pb-[80px] lg:pb-0 relative overflow-hidden">
        {children}
      </main>

      {/* Mobile Bottom Tab Bar (< 1024px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[80px] bg-sidebar border-t border-sidebar-border z-50 flex items-center justify-around px-2 pb-safe">
        {navItems.map((item) => {
          const isActive = location === item.href || (location === "/" && item.href === "/dashboard");
          return (
            <Link key={item.name} href={item.href} className="flex-1">
              <div className="flex flex-col items-center justify-center w-full h-full gap-1">
                <div className={`p-1.5 rounded-full transition-colors ${isActive ? "text-accent" : "text-sidebar-foreground/70"}`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] font-medium ${isActive ? "text-accent" : "text-sidebar-foreground/70"}`}>
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
        
        {/* More Drawer Trigger */}
        <Drawer>
          <DrawerTrigger asChild>
            <div className="flex-1 flex flex-col items-center justify-center h-full gap-1 cursor-pointer">
              <div className="p-1.5 rounded-full text-sidebar-foreground/70">
                <Menu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-sidebar-foreground/70">
                More
              </span>
            </div>
          </DrawerTrigger>
          <DrawerContent className="bg-sidebar border-sidebar-border">
            <div className="mx-auto w-full max-w-sm px-4 pt-6 pb-12 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-xl font-bold text-white">Resources</h3>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <X className="w-5 h-5" />
                  </Button>
                </DrawerClose>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {moreItems.map((item) => (
                  <DrawerClose asChild key={item.name}>
                    <Link href={item.href} className="block">
                      <div className="flex flex-col items-center justify-center p-6 rounded-2xl glass-card gap-3 hover:bg-white/5 transition-all text-center">
                        <div className={item.name === "Emergency" ? "text-destructive" : "text-secondary"}>
                          {item.icon}
                        </div>
                        <span className="font-medium text-sm text-foreground">{item.name}</span>
                      </div>
                    </Link>
                  </DrawerClose>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
