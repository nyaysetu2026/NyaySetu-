import React, { useState, useEffect, useRef } from "react";
import { 
  useListGeminiConversations, 
  useCreateGeminiConversation, 
  useGetGeminiConversation,
  useDeleteGeminiConversation,
  useListGeminiMessages
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Trash2, Plus, MessageSquare, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQueryClient } from "@tanstack/react-query";

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
  
  // Set first convo as active if none selected
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

  // Sync server messages to local state
  useEffect(() => {
    if (messagesData) {
      setLocalMessages(messagesData);
    }
  }, [messagesData, activeConvoId]);

  // Auto-scroll
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
      }
    });
  };

  const handleDelete = (id: number) => {
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
    
    // Add empty assistant message placeholder for streaming
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
      // Invalidate to get true state with IDs
      queryClient.invalidateQueries({ queryKey: ['/api/gemini/conversations', activeConvoId, 'messages'] });
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col bg-muted/30">
        <div className="p-4 border-b">
          <Button onClick={handleCreateNew} className="w-full gap-2" variant="default" disabled={createConvo.isPending}>
            <Plus className="h-4 w-4" /> New Conversation
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {loadingConvos ? (
              Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)
            ) : conversations?.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center p-4">No conversations yet.</p>
            ) : (
              conversations?.map((conv) => (
                <div 
                  key={conv.id} 
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    activeConvoId === conv.id ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'hover:bg-muted text-foreground'
                  }`}
                  onClick={() => setActiveConvoId(conv.id)}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <MessageSquare className={`h-4 w-4 flex-shrink-0 ${activeConvoId === conv.id ? 'text-secondary' : 'text-muted-foreground'}`} />
                    <span className="text-sm font-medium truncate">{conv.title}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0 ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(conv.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-background relative">
        {!activeConvoId ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <Bot className="h-16 w-16 mb-4 opacity-20" />
            <h2 className="text-2xl font-bold text-foreground font-serif mb-2">NyaySetu AI Legal Assistant</h2>
            <p className="max-w-md">Select a conversation or start a new one to ask about fundamental rights, IPC sections, or legal procedures.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6" ref={scrollRef}>
              <div className="max-w-4xl mx-auto space-y-6">
                <Alert className="bg-primary/5 border-primary/20 mb-8">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertTitle>Legal Disclaimer</AlertTitle>
                  <AlertDescription className="text-xs">
                    This AI assistant provides legal information based on Indian laws, not professional legal advice. For formal matters, please consult a verified advocate via the Lawyers directory.
                  </AlertDescription>
                </Alert>

                {loadingMessages && localMessages.length === 0 ? (
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-3/4 ml-auto" />
                    <Skeleton className="h-24 w-3/4 mr-auto" />
                  </div>
                ) : (
                  localMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <Bot className="h-6 w-6 text-primary-foreground" />
                        </div>
                      )}
                      <div className={`p-4 rounded-2xl max-w-[80%] whitespace-pre-wrap text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-secondary text-primary-foreground rounded-tr-sm' 
                          : 'bg-card border border-border rounded-tl-sm'
                      }`}>
                        {msg.content || (isStreaming && msg.role === 'assistant' ? <span className="animate-pulse">Thinking...</span> : '')}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t">
              <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a legal question... (e.g., 'What are my rights if I am arrested?')"
                  className="pr-12 h-14 rounded-full border-muted-foreground/30 shadow-sm focus-visible:ring-secondary text-base bg-card"
                  disabled={isStreaming}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!inputValue.trim() || isStreaming}
                  className="absolute right-2 rounded-full w-10 h-10 bg-secondary hover:bg-secondary/90 text-white"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
