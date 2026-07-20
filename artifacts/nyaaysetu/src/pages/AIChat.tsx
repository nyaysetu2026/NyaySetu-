import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  useListGeminiConversations,
  useCreateGeminiConversation,
  useDeleteGeminiConversation,
  useListGeminiMessages
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Trash2, Plus, MessageSquare, Menu, Sparkles, Download, Eraser, MoreVertical } from "lucide-react";
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

function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center shrink-0 mt-1">
        <Bot className="h-4 w-4 text-secondary" />
      </div>
      <div className="glass-card px-5 py-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-secondary/70 block"
            style={{ animation: `typing-dot 1.2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
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

  const sendMessage = useCallback(async (convId: number, text: string) => {
    setLocalMessages(prev => [...prev, { role: "user", content: text }]);
    setIsStreaming(true);
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
      queryClient.invalidateQueries({ queryKey: ["/api/gemini/conversations", convId, "messages"] });
    }
  }, [queryClient]);

  // After creating a conversation with a pending question, send it
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
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["/api/gemini/conversations"] });
        setLocalMessages([]);
        setActiveConvoId(data.id);
        setDrawerOpen(false);
        if (prefillQuestion) {
          setPendingQuestion(prefillQuestion);
        }
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
    const conv = conversations?.find(c => c.id === activeConvoId);
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
    <div className="flex flex-col h-full" style={{ background: "hsl(222 50% 8%)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="p-4 border-b border-white/5">
        <motion.div whileTap={{ scale: 0.97 }}>
          <Button
            onClick={() => handleCreateNew()}
            className="w-full gap-2 bg-secondary hover:bg-secondary/90 text-white rounded-2xl h-12 font-semibold border-0"
            style={{ boxShadow: "0 4px 16px rgba(43,108,235,0.3)" }}
            disabled={createConvo.isPending}
          >
            <Plus className="h-4 w-4" /> New Chat
          </Button>
        </motion.div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 no-scrollbar">
        {loadingConvos ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-2xl bg-white/5" />)
        ) : conversations?.length === 0 ? (
          <div className="text-center p-6 text-sm text-muted-foreground">
            <Bot className="w-8 h-8 mx-auto mb-2 text-secondary/30" />
            No conversations yet.
          </div>
        ) : (
          conversations?.map((conv) => (
            <motion.div
              key={conv.id}
              whileTap={{ scale: 0.97 }}
              className={`group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${
                activeConvoId === conv.id
                  ? "bg-secondary/15 border border-secondary/25"
                  : "hover:bg-white/5 border border-transparent"
              }`}
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
        <div className="md:hidden flex items-center justify-between px-4 h-16 border-b border-white/5 sticky top-0 z-20"
          style={{ background: "hsl(222 47% 7% / 0.9)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground -ml-2 rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh] border-white/5 px-0" style={{ background: "hsl(222 50% 8%)" }}>
                <ConversationList />
              </DrawerContent>
            </Drawer>
            <div>
              <span className="font-serif font-bold text-base">AI Assistant</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-emerald-400/80 font-medium">Online</span>
              </div>
            </div>
          </div>
          {/* Mobile actions */}
          {activeConvoId && hasMessages && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-white/10 text-foreground">
                <DropdownMenuItem onClick={handleSaveChat} className="gap-2 cursor-pointer hover:bg-white/5">
                  <Download className="h-4 w-4 text-emerald-400" /> Save Chat
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
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

        {/* Desktop action bar (shown when chat is active & has messages) */}
        {activeConvoId && hasMessages && (
          <div className="hidden md:flex items-center justify-end gap-2 px-6 pt-4 pb-0">
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
        )}

        {/* Empty state */}
        {!activeConvoId ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-3xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6"
              style={{ boxShadow: "0 0 40px rgba(43,108,235,0.15)" }}
            >
              <Bot className="h-12 w-12 text-secondary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground font-serif mb-2">NyaySetu AI</h2>
            <p className="max-w-sm text-sm text-muted-foreground mb-8 leading-relaxed">
              Your intelligent legal companion. Ask about fundamental rights, IPC codes, court procedures, and more.
            </p>
            <div className="w-full max-w-md space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent" /> Suggested Questions
              </p>
              {suggestedQuestions.map((q, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestedQuestion(q)}
                  disabled={createConvo.isPending}
                  className="w-full text-left px-4 py-3 rounded-2xl glass-card text-sm text-foreground/70 hover:text-white transition-colors disabled:opacity-50"
                >
                  {q}
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
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4">
                      <Bot className="h-8 w-8 text-secondary/50" />
                    </div>
                    <p className="text-sm text-muted-foreground">Chat cleared. Start a new conversation below.</p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {localMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-secondary/15 border border-secondary/25 flex items-center justify-center shrink-0 mt-1">
                            <Bot className="h-4 w-4 text-secondary" />
                          </div>
                        )}
                        <div className={`px-5 py-3.5 rounded-2xl max-w-[85%] text-[15px] leading-relaxed whitespace-pre-wrap ${
                          msg.role === "user"
                            ? "text-white rounded-tr-sm font-medium"
                            : "glass-card rounded-tl-sm text-foreground/90"
                        }`}
                          style={msg.role === "user" ? {
                            background: "linear-gradient(135deg, hsl(221 83% 55%) 0%, hsl(221 83% 48%) 100%)",
                            boxShadow: "0 4px 20px rgba(43,108,235,0.3)"
                          } : undefined}
                        >
                          {msg.content}
                        </div>
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0 mt-1 text-xs font-bold text-foreground/60">
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

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-safe pb-24 lg:pb-5"
              style={{ background: "linear-gradient(to top, hsl(222 47% 7%) 60%, transparent)", backdropFilter: "blur(8px)" }}>
              <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative flex items-end gap-2">
                <div className="relative flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a legal question..."
                    className="w-full pl-5 pr-14 min-h-[56px] py-4 rounded-3xl border-white/10 bg-white/6 focus-visible:ring-secondary/50 focus-visible:border-secondary/40 text-base focus-visible:bg-white/8 transition-all text-foreground placeholder:text-muted-foreground/60"
                    disabled={isStreaming}
                    autoComplete="off"
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(e as any); } }}
                  />
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!inputValue.trim() || isStreaming}
                      className="absolute right-2 bottom-2 rounded-2xl w-10 h-10 bg-secondary hover:bg-secondary/90 text-white disabled:bg-white/8 disabled:text-white/25 border-0"
                      style={{ boxShadow: inputValue.trim() ? "0 4px 12px rgba(43,108,235,0.4)" : undefined }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </form>
              <p className="text-center mt-2.5 text-[10px] text-muted-foreground/40 uppercase tracking-widest hidden md:block">
                AI can make mistakes · Verify important legal information
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
