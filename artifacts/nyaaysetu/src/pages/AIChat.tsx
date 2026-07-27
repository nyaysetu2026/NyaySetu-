import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  useListGeminiConversations,
  useCreateGeminiConversation,
  useDeleteGeminiConversation,
  useListGeminiMessages
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Trash2, Plus, MessageSquare, Menu, Sparkles, Download, Eraser, MoreVertical, Mic } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id?: number;
  role: string;
  content: string;
}

type AIStatus = "online" | "thinking" | "ready";

/** Animated AI status label — cycles between states */
function AIStatusBadge({ status }: { status: AIStatus }) {
  const config = {
    online:   { dot: "bg-emerald-400", glow: "rgba(52,211,153,0.8)",   text: "AI Online",      textColor: "text-emerald-400" },
    thinking: { dot: "bg-blue-400",    glow: "rgba(96,165,250,0.8)",   text: "Thinking...",    textColor: "text-blue-400" },
    ready:    { dot: "bg-accent",      glow: "rgba(212,175,55,0.8)",   text: "Ready to Help",  textColor: "text-amber-400" },
  }[status];

  return (
    <motion.div
      key={status}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-1.5"
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`}
        style={{ boxShadow: `0 0 6px ${config.glow}` }}
      />
      <span className={`text-[10px] font-semibold uppercase tracking-wider ${config.textColor}`}>{config.text}</span>
    </motion.div>
  );
}

/** Animated AI orb with breathing glow */
function AIOrb({ size = 80, active = false }: { size?: number; active?: boolean }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer breathing rings when active */}
      {active && (
        <>
          <div
            className="absolute rounded-full border border-secondary/20"
            style={{ width: size * 1.8, height: size * 1.8, animation: "orbRing 2s ease-out infinite" }}
          />
          <div
            className="absolute rounded-full border border-secondary/15"
            style={{ width: size * 1.5, height: size * 1.5, animation: "orbRing 2s ease-out infinite 0.5s" }}
          />
        </>
      )}
      {/* Glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 1.3,
          height: size * 1.3,
          background: `radial-gradient(circle, rgba(43,108,235,0.22) 0%, transparent 70%)`,
          filter: "blur(10px)",
          animation: active ? "aiBreath 2.5s ease-in-out infinite" : "aiBreath 4s ease-in-out infinite",
        }}
      />
      {/* Core orb */}
      <div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: "linear-gradient(135deg, rgba(43,108,235,0.4) 0%, rgba(43,108,235,0.18) 50%, rgba(43,108,235,0.3) 100%)",
          border: "1px solid rgba(43,108,235,0.45)",
          boxShadow: active
            ? "0 0 50px rgba(43,108,235,0.5), 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)"
            : "0 0 30px rgba(43,108,235,0.25), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
          transition: "box-shadow 0.5s ease",
        }}
      >
        {/* Inner shimmer */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 w-1/2"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              animation: active ? "shimmerSweep 1.8s ease-in-out infinite" : "shimmerSweep 3s ease-in-out infinite",
            }}
          />
        </div>
        <Bot className="relative z-10 text-white" style={{ width: size * 0.45, height: size * 0.45 }} />
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="shrink-0 mt-1">
        <AIOrb size={32} active />
      </div>
      <div
        className="px-5 py-4 rounded-2xl rounded-tl-sm flex items-center gap-2"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-2 h-2 rounded-full block"
            style={{
              background: "rgba(43,108,235,0.9)",
              animation: "typing-dot 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const suggestedQuestions = [
  "What are my fundamental rights under the Indian Constitution?",
  "How do I file an FIR at a police station?",
  "What is the process for consumer court complaints?",
  "Explain IPC Section 498A in simple terms.",
];

export default function AIChat() {
  const queryClient = useQueryClient();
  const { data: conversations, isLoading: loadingConvos } = useListGeminiConversations();
  const createConvo = useCreateGeminiConversation();
  const deleteConvo = useDeleteGeminiConversation();

  const [activeConvoId, setActiveConvoId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const [aiStatus, setAiStatus] = useState<AIStatus>("online");
  const [micActive, setMicActive] = useState(false);

  useEffect(() => {
    if (!activeConvoId && conversations && conversations.length > 0) {
      setActiveConvoId(conversations[0].id);
    }
  }, [conversations, activeConvoId]);

  const { data: messagesData, isLoading: loadingMessages } = useListGeminiMessages(
    activeConvoId as number,
    { query: { enabled: !!activeConvoId, queryKey: ["/api/gemini/conversations", activeConvoId, "messages"] } }
  );

  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesData) setLocalMessages(messagesData);
  }, [messagesData, activeConvoId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localMessages, isStreaming]);

  // Cycle AI status when not streaming
  useEffect(() => {
    if (isStreaming) {
      setAiStatus("thinking");
      return;
    }
    const cycle = () => {
      setAiStatus(prev => prev === "online" ? "ready" : "online");
    };
    const timer = setInterval(cycle, 5000);
    setAiStatus("online");
    return () => clearInterval(timer);
  }, [isStreaming]);

  const sendMessage = useCallback(async (convId: number, text: string) => {
    setLocalMessages(prev => [...prev, { role: "user", content: text }]);
    setIsStreaming(true);
    setAiStatus("thinking");
    setLocalMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/gemini/conversations/${convId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text })
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter(l => l.startsWith("data: "));
        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) break;
            setLocalMessages(prev => {
              const newMsgs = [...prev];
              const last = newMsgs[newMsgs.length - 1];
              if (last.role === "assistant") last.content += data.content;
              return newMsgs;
            });
          } catch {
            // partial JSON chunk, ignore
          }
        }
      }
    } catch {
      setLocalMessages(prev => {
        const newMsgs = [...prev];
        const last = newMsgs[newMsgs.length - 1];
        last.content = "Connection error. Please try again.";
        return newMsgs;
      });
    } finally {
      setIsStreaming(false);
      setAiStatus("ready");
      setTimeout(() => setAiStatus("online"), 2000);
      queryClient.invalidateQueries({ queryKey: ["/api/gemini/conversations", convId, "messages"] });
    }
  }, [queryClient]);

  useEffect(() => {
    if (pendingQuestion && activeConvoId && !isStreaming) {
      const q = pendingQuestion;
      setPendingQuestion(null);
      sendMessage(activeConvoId, q);
    }
  }, [pendingQuestion, activeConvoId, isStreaming, sendMessage]);

  const handleCreateNew = (prefillQuestion?: string) => {
    const title = prefillQuestion
      ? prefillQuestion.slice(0, 50) + (prefillQuestion.length > 50 ? "…" : "")
      : "New Legal Inquiry";

    createConvo.mutate({ data: { title } }, {
      onSuccess: (data: { id: number }) => {
        queryClient.invalidateQueries({ queryKey: ["/api/gemini/conversations"] });
        setLocalMessages([]);
        setActiveConvoId(data.id);
        setDrawerOpen(false);
        if (prefillQuestion) setPendingQuestion(prefillQuestion);
      }
    });
  };

  const handleSuggestedQuestion = (q: string) => {
    setInputValue("");
    handleCreateNew(q);
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConvo.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/gemini/conversations"] });
        if (activeConvoId === id) {
          setActiveConvoId(null);
          setLocalMessages([]);
        }
      }
    });
  };

  const handleClearMessages = async () => {
    if (!activeConvoId || isStreaming || isClearing) return;
    setIsClearing(true);
    try {
      await fetch(`${import.meta.env.BASE_URL}api/gemini/conversations/${activeConvoId}/messages`, {
        method: "DELETE",
      });
      setLocalMessages([]);
      queryClient.invalidateQueries({ queryKey: ["/api/gemini/conversations", activeConvoId, "messages"] });
    } finally {
      setIsClearing(false);
    }
  };

  const handleSaveChat = () => {
    if (!localMessages.length) return;
    const conv = conversations?.find((c: { id: number; title: string }) => c.id === activeConvoId);
    const title = conv?.title || "NyaySetu Chat";
    const date = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

    const text = [
      `NyaySetu AI — ${title}`,
      `Exported on: ${date}`,
      `${"─".repeat(50)}`,
      "",
      ...localMessages.map(m =>
        `${m.role === "user" ? "YOU" : "NYAAYSETU AI"}\n${m.content}\n`
      ),
      `${"─".repeat(50)}`,
      "This conversation is for general legal information only.",
      "Please consult a licensed advocate for specific legal advice.",
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nyaaysetu-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isStreaming) return;
    const userMsg = inputValue.trim();
    setInputValue("");
    if (!activeConvoId) {
      handleCreateNew(userMsg);
      return;
    }
    sendMessage(activeConvoId, userMsg);
  };

  const ConversationList = () => (
    <div
      className="flex flex-col h-full"
      style={{
        background: "rgba(8,12,26,0.95)",
        backdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <AIOrb size={24} active={isStreaming} />
          <div>
            <p className="text-xs font-bold text-foreground">NyaySetu AI</p>
            <AnimatePresence mode="wait">
              <AIStatusBadge status={aiStatus} />
            </AnimatePresence>
          </div>
        </div>
        <motion.div whileTap={{ scale: 0.97 }}>
          <Button
            onClick={() => handleCreateNew()}
            className="w-full gap-2 text-white rounded-2xl h-12 font-semibold border-0 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(221 83% 55%) 0%, hsl(221 83% 42%) 100%)",
              boxShadow: "0 4px 20px rgba(43,108,235,0.4)",
            }}
            disabled={createConvo.isPending}
          >
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div
                className="absolute inset-y-0 w-1/3"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                  animation: "shimmerSweep 2.5s ease-in-out infinite",
                }}
              />
            </div>
            <span className="relative z-10 flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Chat
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 no-scrollbar">
        {loadingConvos ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-2xl bg-white/5" />)
        ) : conversations?.length === 0 ? (
          <div className="text-center p-6 text-sm text-muted-foreground">
            <AIOrb size={48} />
            <p className="mt-3">No conversations yet.</p>
          </div>
        ) : (
          conversations?.map((conv) => (
            <motion.div
              key={conv.id}
              whileTap={{ scale: 0.97 }}
              className={`group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${
                activeConvoId === conv.id
                  ? "border"
                  : "hover:bg-white/4 border border-transparent"
              }`}
              style={activeConvoId === conv.id ? {
                background: "rgba(43,108,235,0.12)",
                border: "1px solid rgba(43,108,235,0.25)",
                boxShadow: "0 4px 16px rgba(43,108,235,0.12)",
              } : {}}
              onClick={() => { setActiveConvoId(conv.id); setDrawerOpen(false); }}
            >
              <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 ${activeConvoId === conv.id ? "bg-secondary/20" : "bg-white/5"}`}>
                  <MessageSquare className={`h-3.5 w-3.5 ${activeConvoId === conv.id ? "text-secondary" : "text-muted-foreground"}`} />
                </div>
                <span className="text-sm font-medium truncate">{conv.title}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 shrink-0 ml-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleDelete(conv.id, e)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </motion.div>
          ))
        )}
      </div>

      {/* Sidebar footer trust note */}
      <div className="px-4 py-3 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground/40 uppercase tracking-wider">
          <div className="w-1 h-1 rounded-full bg-emerald-400/60" />
          End-to-end encrypted
        </div>
      </div>
    </div>
  );

  const hasMessages = localMessages.length > 0;

  return (
    <div className="flex h-full min-h-[100dvh] lg:min-h-0 relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[280px] flex-col h-full absolute lg:relative z-10 left-0 top-0 bottom-0">
        <ConversationList />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative w-full h-[100dvh] lg:h-auto">

        {/* Mobile Header */}
        <div
          className="md:hidden flex items-center justify-between px-4 h-16 border-b border-white/5 sticky top-0 z-20"
          style={{
            background: "rgba(8,12,26,0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div className="flex items-center gap-3">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground -ml-2 rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh] border-white/5 px-0" style={{ background: "rgba(8,12,26,0.97)", backdropFilter: "blur(40px)" }}>
                <ConversationList />
              </DrawerContent>
            </Drawer>
            <div className="flex items-center gap-2.5">
              <AIOrb size={28} active={isStreaming} />
              <div>
                <span className="font-serif font-bold text-base leading-none">AI Assistant</span>
                <div className="mt-0.5">
                  <AnimatePresence mode="wait">
                    <AIStatusBadge status={aiStatus} />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          {activeConvoId && hasMessages && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="text-foreground"
                style={{ background: "rgba(16,22,42,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <DropdownMenuItem onClick={handleSaveChat} className="gap-2 cursor-pointer hover:bg-white/5">
                  <Download className="h-4 w-4 text-emerald-400" /> Save Chat
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/8" />
                <DropdownMenuItem
                  onClick={handleClearMessages}
                  disabled={isClearing}
                  className="gap-2 cursor-pointer text-destructive hover:bg-destructive/10 focus:text-destructive"
                >
                  <Eraser className="h-4 w-4" /> Clear Messages
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Desktop action bar */}
        {activeConvoId && hasMessages && (
          <div className="hidden md:flex items-center justify-between gap-2 px-6 pt-4 pb-0">
            <div className="flex items-center gap-3">
              <AIOrb size={24} active={isStreaming} />
              <div>
                <span className="text-sm font-semibold text-foreground/60">
                  {conversations?.find((c: { id: number; title: string }) => c.id === activeConvoId)?.title || "Legal Inquiry"}
                </span>
                <div className="mt-0.5">
                  <AnimatePresence mode="wait">
                    <AIStatusBadge status={aiStatus} />
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveChat}
                className="gap-1.5 text-xs text-muted-foreground hover:text-emerald-400 hover:bg-emerald-400/10 rounded-xl h-8"
              >
                <Download className="h-3.5 w-3.5" /> Save Chat
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearMessages}
                disabled={isClearing}
                className="gap-1.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl h-8"
              >
                <Eraser className="h-3.5 w-3.5" /> Clear
              </Button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!activeConvoId ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            {/* Background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(43,108,235,0.09) 0%, transparent 70%)" }}
            />

            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 relative z-10"
            >
              <AIOrb size={100} active />
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground font-serif mb-2 relative z-10">NyaySetu AI</h2>
            <p className="max-w-sm text-sm text-muted-foreground mb-2 leading-relaxed relative z-10">
              Your intelligent legal companion. Ask about fundamental rights, IPC codes, court procedures, and more.
            </p>

            {/* Status */}
            <div className="mb-8 relative z-10">
              <AnimatePresence mode="wait">
                <AIStatusBadge status={aiStatus} />
              </AnimatePresence>
            </div>

            <p className="text-xs text-muted-foreground/40 mb-8 relative z-10 uppercase tracking-wider font-medium">
              Powered by Google Gemini AI
            </p>

            <div className="w-full max-w-md space-y-2.5 relative z-10">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent" /> Suggested Questions
              </p>
              {suggestedQuestions.map((q, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestedQuestion(q)}
                  disabled={createConvo.isPending}
                  className="w-full text-left px-4 py-3.5 rounded-2xl text-sm text-foreground/65 hover:text-white transition-all disabled:opacity-50 relative group"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(43,108,235,0.3)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(43,108,235,0.12)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(43,108,235,0.06)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-secondary/60 text-xs font-mono">{String(i + 1).padStart(2, "0")}</span>
                    {q}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-36 md:pb-28" ref={scrollRef}>
              <div className="max-w-3xl mx-auto space-y-5 pt-4">
                {loadingMessages && localMessages.length === 0 ? (
                  <div className="space-y-4">
                    <Skeleton className="h-14 w-2/3 ml-auto rounded-2xl bg-white/5" />
                    <Skeleton className="h-20 w-3/4 mr-auto rounded-2xl bg-white/5" />
                    <Skeleton className="h-14 w-1/2 ml-auto rounded-2xl bg-white/5" />
                  </div>
                ) : localMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <AIOrb size={56} />
                    <p className="text-sm text-muted-foreground mt-4">Chat cleared. Start a new conversation below.</p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {localMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 14, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.role === "assistant" && (
                          <div className="shrink-0 mt-1">
                            <AIOrb size={32} active={isStreaming && i === localMessages.length - 1} />
                          </div>
                        )}

                        <div
                          className={`px-5 py-3.5 rounded-2xl max-w-[85%] text-[15px] leading-relaxed whitespace-pre-wrap ${
                            msg.role === "user"
                              ? "rounded-tr-sm font-medium text-white"
                              : "rounded-tl-sm text-foreground/90"
                          }`}
                          style={msg.role === "user" ? {
                            background: "linear-gradient(135deg, hsl(221 83% 52%) 0%, hsl(221 83% 43%) 100%)",
                            boxShadow: "0 4px 24px rgba(43,108,235,0.38), inset 0 1px 0 rgba(255,255,255,0.12)",
                          } : {
                            background: "rgba(255,255,255,0.04)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                          }}
                        >
                          {msg.content}
                        </div>

                        {msg.role === "user" && (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 text-xs font-bold"
                            style={{
                              background: "rgba(43,108,235,0.15)",
                              border: "1px solid rgba(43,108,235,0.25)",
                              color: "rgba(255,255,255,0.6)",
                            }}
                          >
                            C
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {isStreaming && localMessages[localMessages.length - 1]?.role === "assistant" && !localMessages[localMessages.length - 1]?.content && (
                      <TypingIndicator />
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* Input area */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 pb-safe pb-24 lg:pb-5"
              style={{
                background: "linear-gradient(to top, rgba(8,12,26,0.98) 60%, transparent)",
                backdropFilter: "blur(12px)",
              }}
            >
              <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative flex items-end gap-2">
                <div className="relative flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a legal question..."
                    className="w-full pl-5 pr-24 min-h-[56px] py-4 rounded-3xl text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus-visible:ring-0 focus-visible:outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      backdropFilter: "blur(20px)",
                      border: inputValue ? "1px solid rgba(43,108,235,0.4)" : "1px solid rgba(255,255,255,0.09)",
                      boxShadow: inputValue
                        ? "0 0 0 3px rgba(43,108,235,0.08), 0 0 20px rgba(43,108,235,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
                        : "inset 0 1px 0 rgba(255,255,255,0.04)",
                      transition: "all 0.25s ease",
                    }}
                    disabled={isStreaming}
                    autoComplete="off"
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(e as any); } }}
                  />

                  {/* Mic button */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.88 }}
                    onClick={() => setMicActive(v => !v)}
                    className="absolute right-14 bottom-2 w-10 h-10 rounded-2xl flex items-center justify-center transition-all"
                    style={{
                      background: micActive ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.04)",
                      border: micActive ? "1px solid rgba(52,211,153,0.3)" : "1px solid rgba(255,255,255,0.08)",
                      animation: micActive ? "micPulse 1.5s ease-in-out infinite" : undefined,
                    }}
                  >
                    <Mic className={`h-4 w-4 transition-colors ${micActive ? "text-emerald-400" : "text-muted-foreground/50"}`} />
                  </motion.button>

                  {/* Send button */}
                  <motion.div whileTap={{ scale: 0.88 }} className="absolute right-2 bottom-2">
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!inputValue.trim() || isStreaming}
                      className="rounded-2xl w-10 h-10 text-white border-0 transition-all"
                      style={{
                        background: inputValue.trim()
                          ? "linear-gradient(135deg, hsl(221 83% 55%) 0%, hsl(221 83% 44%) 100%)"
                          : "rgba(255,255,255,0.06)",
                        boxShadow: inputValue.trim() ? "0 4px 20px rgba(43,108,235,0.5)" : undefined,
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </form>
              <p className="text-center mt-2.5 text-[10px] text-muted-foreground/35 uppercase tracking-widest hidden md:block">
                AI can make mistakes · Verify important legal information with a licensed advocate
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
