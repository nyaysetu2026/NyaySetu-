import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  useListGeminiConversations,
  useCreateGeminiConversation,
  useDeleteGeminiConversation,
  useListGeminiMessages
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bot, Send, Trash2, Plus, MessageSquare, Menu, Sparkles,
  Download, Eraser, Mic, MicOff, ChevronRight, X, Copy, Check
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

interface Message { id?: number; role: string; content: string; }
type AIStatus = "online" | "thinking" | "ready";

/* ─── AI Status Badge ─────────────────────────────────────────── */
function AIStatusBadge({ status }: { status: AIStatus }) {
  const cfg = {
    online:   { color: "#34d399", glow: "rgba(52,211,153,0.9)",  text: "AI Online",     pulse: true  },
    thinking: { color: "#60a5fa", glow: "rgba(96,165,250,0.9)",  text: "Thinking...",   pulse: false },
    ready:    { color: "#d4af37", glow: "rgba(212,175,55,0.9)",  text: "Ready to Help", pulse: true  },
  }[status];

  return (
    <motion.div
      key={status}
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 3 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-1.5"
    >
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: cfg.color,
          boxShadow: `0 0 6px ${cfg.glow}`,
          animation: cfg.pulse ? "aiBreath 2s ease-in-out infinite" : "none",
        }}
      />
      <span className="text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: cfg.color }}>{cfg.text}</span>
    </motion.div>
  );
}

/* ─── Premium AI Orb ─────────────────────────────────────────── */
function AIOrb({ size = 80, active = false, className = "" }: { size?: number; active?: boolean; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
      {/* Outermost ring — only when active */}
      {active && (
        <div className="absolute rounded-full" style={{
          width: size * 2.2, height: size * 2.2,
          border: "1px solid rgba(43,108,235,0.08)",
          animation: "orbRing 3s ease-out infinite",
        }} />
      )}
      {/* Middle pulse ring */}
      <div className="absolute rounded-full" style={{
        width: size * 1.7, height: size * 1.7,
        border: `1px solid rgba(43,108,235,${active ? 0.18 : 0.08})`,
        animation: `orbRing 2.5s ease-out infinite ${active ? "" : "3s"}`,
      }} />
      {/* Inner glow ring */}
      <div className="absolute rounded-full" style={{
        width: size * 1.35, height: size * 1.35,
        background: `radial-gradient(circle, rgba(43,108,235,${active ? 0.28 : 0.14}) 0%, transparent 70%)`,
        filter: "blur(10px)",
        animation: `aiBreath ${active ? 2 : 4}s ease-in-out infinite`,
      }} />
      {/* Core orb */}
      <div className="relative rounded-full flex items-center justify-center overflow-hidden" style={{
        width: size, height: size,
        background: "linear-gradient(145deg, rgba(59,130,246,0.5) 0%, rgba(43,108,235,0.25) 40%, rgba(99,102,241,0.35) 100%)",
        border: "1px solid rgba(99,102,241,0.4)",
        boxShadow: active
          ? "0 0 60px rgba(43,108,235,0.55), 0 0 120px rgba(43,108,235,0.15), inset 0 1px 0 rgba(255,255,255,0.15)"
          : "0 0 30px rgba(43,108,235,0.22), inset 0 1px 0 rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        transition: "box-shadow 0.6s ease",
      }}>
        {/* Inner shimmer sweep */}
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 w-1/2" style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            animation: `shimmerSweep ${active ? 1.8 : 3}s ease-in-out infinite`,
          }} />
        </div>
        {/* Thinking dots when active */}
        {active ? (
          <div className="relative z-10 flex items-center gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" style={{
                animation: "typing-dot 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
                opacity: 0.9,
              }} />
            ))}
          </div>
        ) : (
          <Bot className="relative z-10 text-white drop-shadow-lg" style={{ width: size * 0.44, height: size * 0.44 }} />
        )}
      </div>
    </div>
  );
}

/* ─── Typing indicator ────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start">
      <AIOrb size={34} active />
      <div className="px-4 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5" style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(99,102,241,0.15)",
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} className="w-2 h-2 rounded-full bg-blue-400/80 block" style={{
            animation: "typing-dot 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Copy button for messages ────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <motion.button
      onClick={copy}
      whileTap={{ scale: 0.85 }}
      className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-1"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-white/40" />}
    </motion.button>
  );
}

const SUGGESTED = [
  { q: "What are my fundamental rights under the Indian Constitution?", tag: "Constitutional" },
  { q: "How do I file an FIR at a police station?",                     tag: "Criminal" },
  { q: "What is the process for consumer court complaints?",            tag: "Consumer" },
  { q: "Explain IPC Section 498A in simple terms.",                     tag: "IPC" },
];

/* ═══════════════════════════════════════════════════════════════ */
export default function AIChat() {
  const queryClient = useQueryClient();
  const { data: conversations, isLoading: loadingConvos } = useListGeminiConversations();
  const createConvo = useCreateGeminiConversation();
  const deleteConvo = useDeleteGeminiConversation();

  const [activeConvoId, setActiveConvoId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen]       = useState(false);
  const [pendingQ, setPendingQ]           = useState<string | null>(null);
  const [aiStatus, setAiStatus]           = useState<AIStatus>("online");
  const [micActive, setMicActive]         = useState(false);
  const [inputValue, setInputValue]       = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming]      = useState(false);
  const [isClearing, setIsClearing]       = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Auto-select first conversation */
  useEffect(() => {
    if (!activeConvoId && conversations?.length) setActiveConvoId(conversations[0].id);
  }, [conversations, activeConvoId]);

  const { data: messagesData, isLoading: loadingMessages } = useListGeminiMessages(
    activeConvoId as number,
    { query: { enabled: !!activeConvoId, queryKey: ["/api/gemini/conversations", activeConvoId, "messages"] } }
  );

  useEffect(() => { if (messagesData) setLocalMessages(messagesData); }, [messagesData, activeConvoId]);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [localMessages, isStreaming]);

  /* AI status cycling */
  useEffect(() => {
    if (isStreaming) { setAiStatus("thinking"); return; }
    setAiStatus("online");
    const t = setInterval(() => setAiStatus(p => p === "online" ? "ready" : "online"), 6000);
    return () => clearInterval(t);
  }, [isStreaming]);

  /* Send message */
  const sendMessage = useCallback(async (convId: number, text: string) => {
    setLocalMessages(prev => [...prev, { role: "user", content: text }]);
    setIsStreaming(true);
    setLocalMessages(prev => [...prev, { role: "assistant", content: "" }]);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/gemini/conversations/${convId}/messages`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      const reader = res.body!.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = dec.decode(value).split("\n").filter(l => l.startsWith("data: "));
        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) break;
            setLocalMessages(prev => {
              const m = [...prev];
              const last = m[m.length - 1];
              if (last.role === "assistant") last.content += data.content;
              return m;
            });
          } catch { /* ignore partial */ }
        }
      }
    } catch {
      setLocalMessages(prev => {
        const m = [...prev];
        const last = m[m.length - 1];
        last.content = "Connection error. Please try again.";
        return m;
      });
    } finally {
      setIsStreaming(false);
      setAiStatus("ready");
      setTimeout(() => setAiStatus("online"), 2500);
      queryClient.invalidateQueries({ queryKey: ["/api/gemini/conversations", convId, "messages"] });
    }
  }, [queryClient]);

  useEffect(() => {
    if (pendingQ && activeConvoId && !isStreaming) {
      const q = pendingQ; setPendingQ(null); sendMessage(activeConvoId, q);
    }
  }, [pendingQ, activeConvoId, isStreaming, sendMessage]);

  const handleCreateNew = (prefillQ?: string) => {
    const title = prefillQ ? prefillQ.slice(0, 50) + (prefillQ.length > 50 ? "…" : "") : "New Legal Inquiry";
    createConvo.mutate({ data: { title } }, {
      onSuccess: (data: { id: number }) => {
        queryClient.invalidateQueries({ queryKey: ["/api/gemini/conversations"] });
        setLocalMessages([]); setActiveConvoId(data.id); setDrawerOpen(false);
        if (prefillQ) setPendingQ(prefillQ);
      }
    });
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConvo.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/gemini/conversations"] });
        if (activeConvoId === id) { setActiveConvoId(null); setLocalMessages([]); }
      }
    });
  };

  const handleClearMessages = async () => {
    if (!activeConvoId || isStreaming || isClearing) return;
    setIsClearing(true); setShowClearConfirm(false);
    try {
      await fetch(`${import.meta.env.BASE_URL}api/gemini/conversations/${activeConvoId}/messages`, { method: "DELETE" });
      setLocalMessages([]);
      queryClient.invalidateQueries({ queryKey: ["/api/gemini/conversations", activeConvoId, "messages"] });
    } finally { setIsClearing(false); }
  };

  const handleSaveChat = () => {
    if (!localMessages.length) return;
    const conv = conversations?.find((c: { id: number; title: string }) => c.id === activeConvoId);
    const title = conv?.title || "NyaySetu Chat";
    const date = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const text = [
      `╔══════════════════════════════════════════════════════╗`,
      `  NyaySetu AI Legal Assistant`,
      `  Conversation: ${title}`,
      `  Exported: ${date}`,
      `╚══════════════════════════════════════════════════════╝`,
      "",
      ...localMessages.map(m => `${m.role === "user" ? "🧑 YOU" : "🤖 NYAAYSETU AI"}\n${m.content}\n`),
      `──────────────────────────────────────────────────────`,
      `⚠ This conversation is for general legal information only.`,
      `  Consult a licensed advocate for specific legal advice.`,
      `  NyaySetu • Justice For Every Citizen • www.nyaaysetu.in`,
    ].join("\n");
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" })),
      download: `nyaaysetu-${Date.now()}.txt`,
    });
    a.click(); URL.revokeObjectURL(a.href);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;
    const msg = inputValue.trim(); setInputValue("");
    if (!activeConvoId) { handleCreateNew(msg); return; }
    sendMessage(activeConvoId, msg);
  };

  const activeTitle = conversations?.find((c: { id: number; title: string }) => c.id === activeConvoId)?.title;
  const hasMessages = localMessages.length > 0;

  /* ── Conversation Sidebar ───────────────────────────────────── */
  const ConvoSidebar = () => (
    <div className="flex flex-col h-full" style={{
      background: "rgba(7,10,22,0.97)",
      backdropFilter: "blur(32px)",
      borderRight: "1px solid rgba(255,255,255,0.05)",
    }}>
      {/* Sidebar header */}
      <div className="p-5 border-b border-white/5 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="flex items-center gap-3 mb-4">
          <AIOrb size={36} active={isStreaming} />
          <div>
            <p className="text-sm font-bold text-white font-serif">NyaySetu AI</p>
            <AnimatePresence mode="wait"><AIStatusBadge status={aiStatus} /></AnimatePresence>
          </div>
        </div>
        <motion.button
          onClick={() => handleCreateNew()}
          whileTap={{ scale: 0.96 }}
          disabled={createConvo.isPending}
          className="w-full h-11 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2 relative overflow-hidden border-0"
          style={{
            background: "linear-gradient(135deg, hsl(221 83% 55%) 0%, hsl(240 60% 50%) 100%)",
            boxShadow: "0 4px 24px rgba(43,108,235,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <div className="absolute inset-0"><div className="absolute inset-y-0 w-1/3" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)", animation: "shimmerSweep 2.5s ease-in-out infinite" }} /></div>
          <Plus className="h-4 w-4 relative z-10" />
          <span className="relative z-10">New Conversation</span>
        </motion.button>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 no-scrollbar">
        {loadingConvos ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-[60px] rounded-2xl bg-white/5" />)
        ) : !conversations?.length ? (
          <div className="text-center py-12">
            <AIOrb size={52} />
            <p className="text-sm text-muted-foreground mt-4 font-medium">No conversations yet</p>
            <p className="text-xs text-muted-foreground/50 mt-1">Start a new legal inquiry above</p>
          </div>
        ) : (
          conversations.map((conv: { id: number; title: string }) => {
            const isActive = activeConvoId === conv.id;
            return (
              <motion.div
                key={conv.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setActiveConvoId(conv.id); setDrawerOpen(false); }}
                className="group flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all relative overflow-hidden"
                style={isActive ? {
                  background: "rgba(43,108,235,0.14)",
                  border: "1px solid rgba(43,108,235,0.28)",
                  boxShadow: "0 4px 20px rgba(43,108,235,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
                } : {
                  background: "transparent",
                  border: "1px solid transparent",
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-blue-400" style={{ boxShadow: "0 0 8px rgba(96,165,250,0.8)" }} />}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isActive ? "bg-blue-500/20" : "bg-white/5"}`}>
                  <MessageSquare className={`h-3.5 w-3.5 ${isActive ? "text-blue-400" : "text-muted-foreground"}`} />
                </div>
                <span className="text-sm font-medium truncate flex-1">{conv.title}</span>
                <button
                  onClick={(e) => handleDelete(conv.id, e)}
                  className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg flex items-center justify-center text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-all shrink-0"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Sidebar footer */}
      <div className="p-4 border-t border-white/5">
        <TricolorBar className="mb-3" />
        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground/40 uppercase tracking-wider">
          <div className="w-1 h-1 rounded-full bg-emerald-400/60" />
          End-to-end encrypted · Gemini AI
        </div>
      </div>
    </div>
  );

  /* ═══════════════════════════════════ MAIN RENDER ═══════════════════════════ */
  return (
    <div className="flex h-full min-h-[100dvh] lg:min-h-0 relative overflow-hidden">

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-[290px] flex-col h-full shrink-0">
        <ConvoSidebar />
      </div>

      {/* Chat main area */}
      <div className="flex-1 flex flex-col relative min-w-0 h-[100dvh] lg:h-auto">

        {/* ── Top Chat Header ───────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 lg:px-6 border-b border-white/5 shrink-0"
          style={{
            height: 64,
            background: "rgba(7,10,22,0.92)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Mobile menu + AI info */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <button className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-foreground/60 hover:text-white hover:bg-white/6 transition-all">
                  <Menu className="h-5 w-5" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="h-[82vh] border-white/6 px-0" style={{ background: "rgba(7,10,22,0.98)", backdropFilter: "blur(40px)" }}>
                <ConvoSidebar />
              </DrawerContent>
            </Drawer>

            <AIOrb size={36} active={isStreaming} className="hidden sm:flex" />
            <div>
              <p className="text-sm font-bold text-white font-serif truncate max-w-[180px] lg:max-w-xs">
                {activeTitle || "NyaySetu AI Assistant"}
              </p>
              <AnimatePresence mode="wait"><AIStatusBadge status={aiStatus} /></AnimatePresence>
            </div>
          </div>

          {/* Action buttons — always visible when there are messages */}
          <AnimatePresence>
            {hasMessages && (
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                className="flex items-center gap-2"
              >
                {/* Save Chat */}
                <motion.button
                  onClick={handleSaveChat}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex items-center gap-1.5 px-3 h-8 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: "rgba(52,211,153,0.1)",
                    border: "1px solid rgba(52,211,153,0.2)",
                    color: "#34d399",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(52,211,153,0.18)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(52,211,153,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(52,211,153,0.1)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Save Chat</span>
                </motion.button>

                {/* Clear Messages */}
                {!showClearConfirm ? (
                  <motion.button
                    onClick={() => setShowClearConfirm(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                    className="flex items-center gap-1.5 px-3 h-8 rounded-xl text-xs font-semibold transition-all"
                    style={{
                      background: "rgba(220,38,38,0.08)",
                      border: "1px solid rgba(220,38,38,0.18)",
                      color: "#f87171",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.15)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(220,38,38,0.15)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    <Eraser className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Clear</span>
                  </motion.button>
                ) : (
                  <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="flex items-center gap-1.5">
                    <button
                      onClick={handleClearMessages}
                      disabled={isClearing}
                      className="px-3 h-8 rounded-xl text-xs font-bold text-white transition-all"
                      style={{ background: "rgba(220,38,38,0.85)", boxShadow: "0 0 16px rgba(220,38,38,0.4)" }}
                    >
                      {isClearing ? "Clearing…" : "Confirm"}
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="px-3 h-8 rounded-xl text-xs font-semibold text-muted-foreground hover:text-white hover:bg-white/8 transition-all"
                    >
                      Cancel
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Empty State ────────────────────────────────────────── */}
        {!activeConvoId ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            {/* Background aurora */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(43,108,235,0.12) 0%, rgba(99,102,241,0.06) 40%, transparent 70%)",
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              opacity: 0.018,
            }} />

            {/* Giant AI orb */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-10 relative z-10"
            >
              <AIOrb size={140} />
            </motion.div>

            {/* Heading */}
            <div className="relative z-10 mb-4">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold font-serif text-white mb-2"
              >
                NyaySetu <span style={{ background: "linear-gradient(135deg,#60a5fa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>AI</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                Your intelligent legal companion for Indian law. Ask about fundamental rights, IPC codes, court procedures, and more.
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-3 flex justify-center">
                <AnimatePresence mode="wait"><AIStatusBadge status={aiStatus} /></AnimatePresence>
              </motion.div>
            </div>

            {/* Trust chips */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex gap-2 flex-wrap justify-center mb-8 relative z-10">
              {["Gemini AI", "Encrypted", "Free to Use", "India Legal"].map((tag, i) => (
                <span key={i} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{
                  background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8",
                }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Suggested questions */}
            <div className="w-full max-w-lg relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/50 mb-3 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent" /> Try asking
              </p>
              <div className="grid grid-cols-1 gap-2">
                {SUGGESTED.map((item, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    whileHover={{ scale: 1.015, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCreateNew(item.q)}
                    disabled={createConvo.isPending}
                    className="w-full text-left px-4 py-3.5 rounded-2xl text-sm transition-all group flex items-center gap-3 disabled:opacity-50"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.07)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.1)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md shrink-0" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>{item.tag}</span>
                    <span className="text-foreground/65 group-hover:text-white transition-colors flex-1 text-left">{item.q}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

        ) : (
          <>
            {/* ── Messages ────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto pb-36 lg:pb-32" ref={scrollRef}>
              <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 space-y-5">
                {loadingMessages && !localMessages.length ? (
                  <div className="space-y-5">
                    <Skeleton className="h-14 w-2/3 ml-auto rounded-2xl bg-white/5" />
                    <Skeleton className="h-24 w-3/4 rounded-2xl bg-white/5" />
                    <Skeleton className="h-14 w-1/2 ml-auto rounded-2xl bg-white/5" />
                  </div>
                ) : !localMessages.length ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <AIOrb size={60} />
                    <p className="text-sm text-muted-foreground mt-5">Conversation cleared. Ask your next legal question below.</p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {localMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className={`flex gap-3 group ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {/* AI avatar */}
                        {msg.role === "assistant" && (
                          <AIOrb size={34} active={isStreaming && i === localMessages.length - 1} className="mt-0.5" />
                        )}

                        {/* Bubble */}
                        <div className={`relative max-w-[80%] lg:max-w-[72%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                          <div
                            className={`px-5 py-3.5 rounded-2xl text-[14.5px] leading-relaxed whitespace-pre-wrap ${
                              msg.role === "user" ? "rounded-tr-md text-white font-medium" : "rounded-tl-md text-foreground/90"
                            }`}
                            style={msg.role === "user" ? {
                              background: "linear-gradient(145deg, hsl(221 83% 54%) 0%, hsl(237 60% 50%) 100%)",
                              boxShadow: "0 4px 28px rgba(43,108,235,0.4), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
                            } : {
                              background: "rgba(255,255,255,0.045)",
                              backdropFilter: "blur(20px)",
                              border: "1px solid rgba(99,102,241,0.12)",
                              boxShadow: "0 4px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04)",
                            }}
                          >
                            {msg.content}
                          </div>
                          {/* Copy for assistant messages */}
                          {msg.role === "assistant" && msg.content && (
                            <CopyButton text={msg.content} />
                          )}
                        </div>

                        {/* User avatar */}
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold" style={{
                            background: "rgba(99,102,241,0.2)",
                            border: "1px solid rgba(99,102,241,0.3)",
                            color: "#818cf8",
                          }}>
                            U
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isStreaming && localMessages[localMessages.length - 1]?.role === "assistant" && !localMessages[localMessages.length - 1]?.content && (
                      <TypingIndicator />
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* ── Input Area ──────────────────────────────────────── */}
            <div
              className="absolute bottom-0 left-0 right-0 px-4 pb-6 lg:pb-5 pt-3"
              style={{
                background: "linear-gradient(to top, rgba(7,10,22,1) 55%, rgba(7,10,22,0.95) 75%, transparent 100%)",
              }}
            >
              <form onSubmit={handleSend} className="max-w-3xl mx-auto">
                {/* Input wrapper with gradient border */}
                <div
                  className="relative rounded-3xl transition-all"
                  style={{
                    background: inputValue
                      ? "linear-gradient(135deg, rgba(43,108,235,0.25) 0%, rgba(99,102,241,0.25) 100%)"
                      : "rgba(255,255,255,0.04)",
                    padding: "1px",
                    boxShadow: inputValue
                      ? "0 0 0 3px rgba(99,102,241,0.1), 0 8px 32px rgba(43,108,235,0.2)"
                      : "none",
                  }}
                >
                  <div className="relative flex items-center rounded-3xl overflow-hidden" style={{
                    background: "rgba(10,14,28,0.95)",
                    backdropFilter: "blur(24px)",
                  }}>
                    {/* Mic button */}
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.88 }}
                      onClick={() => setMicActive(v => !v)}
                      className="ml-3 w-9 h-9 rounded-2xl flex items-center justify-center transition-all shrink-0"
                      style={{
                        background: micActive ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.04)",
                        border: micActive ? "1px solid rgba(52,211,153,0.35)" : "1px solid rgba(255,255,255,0.06)",
                        boxShadow: micActive ? "0 0 14px rgba(52,211,153,0.25)" : "none",
                      }}
                    >
                      {micActive
                        ? <MicOff className="h-3.5 w-3.5 text-emerald-400" />
                        : <Mic className="h-3.5 w-3.5 text-white/35" />}
                    </motion.button>

                    {/* Text input */}
                    <Input
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      placeholder="Ask a legal question..."
                      className="flex-1 min-h-[54px] px-4 text-[15px] bg-transparent border-0 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:outline-none"
                      disabled={isStreaming}
                      autoComplete="off"
                      onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(e as any); }}}
                    />

                    {/* Send button */}
                    <motion.div whileTap={{ scale: 0.86 }} className="mr-2">
                      <Button
                        type="submit"
                        size="icon"
                        disabled={!inputValue.trim() || isStreaming}
                        className="rounded-2xl w-10 h-10 text-white border-0 transition-all shrink-0"
                        style={{
                          background: inputValue.trim()
                            ? "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)"
                            : "rgba(255,255,255,0.05)",
                          boxShadow: inputValue.trim() ? "0 4px 20px rgba(99,102,241,0.55)" : "none",
                          transition: "all 0.25s ease",
                        }}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-center mt-2.5 text-[9px] text-muted-foreground/30 uppercase tracking-widest">
                  AI can make mistakes · Always verify with a licensed advocate · NyaySetu AI
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
