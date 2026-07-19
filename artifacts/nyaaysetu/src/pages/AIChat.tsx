import React, { useState, useEffect, useRef } from "react";
import { 
  useListGeminiConversations, 
  useCreateGeminiConversation, 
  useDeleteGeminiConversation,
  useListGeminiMessages
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Trash2, Plus, MessageSquare, Menu, ChevronLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface Message {
  id?: number;
  role: string;
  content: string;
}

export default function AIChat() {
  const queryClient = useQueryClient();
  const { data: conversations, isLoading: loadingConvos } = useListGeminiConversations();
  const createConvo = useCreateGeminiConversation();
  const deleteConvo = useDeleteGeminiConversation();
  
  const [activeConvoId, setActiveConvoId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  useEffect(() => {
    if (!activeConvoId && conversations && conversations.length > 0) {
      setActiveConvoId(conversations[0].id);
    }
  }, [conversations, activeConvoId]);

  const { data: messagesData, isLoading: loadingMessages } = useListGeminiMessages(
    activeConvoId as number, 
    { query: { enabled: !!activeConvoId, queryKey: ['/api/gemini/conversations', activeConvoId, 'messages'] } }
  );

  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesData) {
      setLocalMessages(messagesData);
    }
  }, [messagesData, activeConvoId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localMessages, isStreaming]);

  const handleCreateNew = () => {
    createConvo.mutate({ data: { title: "New Legal Inquiry" } }, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['/api/gemini/conversations'] });
        setActiveConvoId(data.id);
        setDrawerOpen(false);
      }
    });
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteConvo.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/gemini/conversations'] });
        if (activeConvoId === id) {
          setActiveConvoId(null);
          setLocalMessages([]);
        }
      }
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeConvoId || isStreaming) return;

    const userMsg = inputValue.trim();
    setInputValue("");
    setLocalMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsStreaming(true);
    
    setLocalMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/gemini/conversations/${activeConvoId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: userMsg })
      });
      
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = decoder.decode(value);
        const lines = text.split('\n').filter(l => l.startsWith('data: '));
        
        for (const line of lines) {
          const data = JSON.parse(line.slice(6));
          if (data.done) break;
          
          setLocalMessages(prev => {
            const newMsgs = [...prev];
            const lastMsg = newMsgs[newMsgs.length - 1];
            if (lastMsg.role === "assistant") {
              lastMsg.content += data.content;
            }
            return newMsgs;
          });
        }
      }
    } catch (error) {
      console.error("Stream error", error);
      setLocalMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        lastMsg.content = "Connection error. Please try again.";
        return newMsgs;
      });
    } finally {
      setIsStreaming(false);
      queryClient.invalidateQueries({ queryKey: ['/api/gemini/conversations', activeConvoId, 'messages'] });
    }
  };

  const ConversationList = () => (
    <div className="flex flex-col h-full bg-card/50 backdrop-blur-xl border-r border-white/5">
      <div className="p-4 border-b border-white/5">
        <Button onClick={handleCreateNew} className="w-full gap-2 bg-secondary text-white rounded-xl shadow-sm h-12 font-semibold" disabled={createConvo.isPending}>
          <Plus className="h-5 w-5" /> New Chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
        {loadingConvos ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-xl bg-white/5" />)
        ) : conversations?.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center p-4">No conversations yet.</p>
        ) : (
          conversations?.map((conv) => (
            <div 
              key={conv.id} 
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                activeConvoId === conv.id 
                  ? 'bg-secondary/20 text-white border border-secondary/30 shadow-[inset_0_0_20px_rgba(43,108,235,0.1)]' 
                  : 'hover:bg-white/5 text-foreground/70 border border-transparent'
              }`}
              onClick={() => { setActiveConvoId(conv.id); setDrawerOpen(false); }}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <MessageSquare className={`h-4 w-4 flex-shrink-0 ${activeConvoId === conv.id ? 'text-secondary' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium truncate">{conv.title}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0 ml-2 rounded-lg"
                onClick={(e) => handleDelete(conv.id, e)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-full min-h-[100dvh] lg:min-h-0 relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[300px] flex-col h-full absolute lg:relative z-10 left-0 top-0 bottom-0">
        <ConversationList />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative w-full h-[100dvh] lg:h-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 h-16 border-b border-white/5 bg-background/80 backdrop-blur-xl z-20 sticky top-0">
          <div className="flex items-center gap-3">
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground -ml-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80vh] bg-background border-white/5 px-0">
                <ConversationList />
              </DrawerContent>
            </Drawer>
            <span className="font-serif font-bold text-lg">AI Assistant</span>
          </div>
          <Bot className="h-5 w-5 text-secondary" />
        </div>

        {!activeConvoId ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Bot className="h-10 w-10 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-serif mb-2">NyaySetu AI</h2>
            <p className="max-w-sm text-sm">Select a conversation or start a new one to ask about fundamental rights or procedures.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-32 md:pb-6" ref={scrollRef}>
              <div className="max-w-3xl mx-auto space-y-6 pt-4">
                {loadingMessages && localMessages.length === 0 ? (
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-2/3 ml-auto rounded-2xl bg-white/5" />
                    <Skeleton className="h-24 w-2/3 mr-auto rounded-2xl bg-white/5" />
                  </div>
                ) : (
                  localMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/50 flex items-center justify-center shrink-0 mt-1">
                          <Bot className="h-4 w-4 text-secondary" />
                        </div>
                      )}
                      <div className={`p-4 rounded-2xl max-w-[85%] whitespace-pre-wrap text-[15px] leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-secondary text-white rounded-tr-sm shadow-[0_4px_15px_rgba(43,108,235,0.2)]' 
                          : 'glass-card rounded-tl-sm text-foreground'
                      }`}>
                        {msg.content || (isStreaming && msg.role === 'assistant' ? (
                          <div className="flex space-x-1.5 h-4 items-center px-1">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" />
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                          </div>
                        ) : '')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-white/5 pb-safe pb-24 lg:pb-6">
              <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative flex items-end gap-2">
                <div className="relative flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Message AI..."
                    className="w-full pl-4 pr-12 min-h-[56px] py-4 rounded-3xl border-white/10 bg-white/5 focus-visible:ring-secondary text-base focus-visible:bg-white/10 transition-colors shadow-inner"
                    disabled={isStreaming}
                    autoComplete="off"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!inputValue.trim() || isStreaming}
                    className="absolute right-2 bottom-2 rounded-full w-10 h-10 bg-secondary hover:bg-secondary/90 text-white disabled:bg-white/10 disabled:text-white/30"
                  >
                    <Send className="h-4 w-4 ml-0.5" />
                  </Button>
                </div>
              </form>
              <div className="text-center mt-3 text-[10px] text-muted-foreground uppercase tracking-widest hidden md:block">
                AI can make mistakes. Verify important information.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}