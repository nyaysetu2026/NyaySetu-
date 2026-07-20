import { useState } from "react";
import { useListCases, useCreateCase, useDeleteCase } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Landmark, Calendar, FileText, Trash2, Plus, Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const caseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  status: z.string(),
  category: z.string(),
  caseNumber: z.string().optional(),
  court: z.string().optional(),
});

const STATUS_CONFIG: Record<string, { label: string; dot: string; badge: string; glow: string }> = {
  active:  { label: "Active",  dot: "bg-secondary",       badge: "bg-secondary/15 text-secondary border-secondary/25",      glow: "rgba(43,108,235,0.7)" },
  pending: { label: "Pending", dot: "bg-amber-400",        badge: "bg-amber-400/15 text-amber-400 border-amber-400/25",      glow: "rgba(251,191,36,0.7)" },
  closed:  { label: "Closed",  dot: "bg-muted-foreground", badge: "bg-white/8 text-muted-foreground border-white/10",        glow: "rgba(100,116,139,0.5)" },
};

export default function Cases() {
  const queryClient = useQueryClient();
  const { data: cases, isLoading } = useListCases();
  const createCase = useCreateCase();
  const deleteCase = useDeleteCase();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const form = useForm<z.infer<typeof caseSchema>>({
    resolver: zodResolver(caseSchema),
    defaultValues: { title: "", description: "", status: "Active", category: "Civil" },
  });

  const onSubmit = (values: z.infer<typeof caseSchema>) => {
    createCase.mutate({ data: values }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/cases"] });
        setDrawerOpen(false);
        form.reset();
      }
    });
  };

  const filteredCases = cases?.filter(c => activeTab === "All" || c.status.toLowerCase() === activeTab.toLowerCase());
  const tabs = ["All", "Active", "Pending", "Closed"];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-5xl min-h-screen relative">

      {/* Header */}
      <div className="mb-8 pt-4 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl lg:text-4xl font-bold font-serif text-foreground mb-1.5">Cases</h1>
          <p className="text-muted-foreground text-sm">Track and manage your legal proceedings.</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 relative">
        {tabs.map(tab => {
          const active = activeTab === tab;
          return (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileTap={{ scale: 0.94 }}
              className={`relative px-5 py-2 rounded-2xl text-xs font-bold cursor-pointer transition-all ${
                active ? "text-black" : "text-muted-foreground hover:text-white bg-white/5 border border-white/8"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="cases-tab"
                  className="absolute inset-0 rounded-2xl bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Cases List */}
      <div className="space-y-4 pb-28">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card p-5">
              <Skeleton className="h-6 w-2/3 mb-3 bg-white/8 rounded-lg" />
              <Skeleton className="h-4 w-full mb-2 bg-white/5 rounded-lg" />
              <Skeleton className="h-4 w-3/4 bg-white/5 rounded-lg" />
            </div>
          ))
        ) : filteredCases?.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="w-20 h-20 rounded-3xl bg-white/4 flex items-center justify-center mx-auto mb-5 text-white/15">
              <Landmark className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-foreground font-serif mb-1">No cases found</h3>
            <p className="text-muted-foreground text-sm">Tap + to start tracking a new case.</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {filteredCases?.map((c, index) => {
              const statusKey = c.status.toLowerCase() as keyof typeof STATUS_CONFIG;
              const statusCfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG.active;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 28 }}
                  whileHover={{ y: -2 }}
                  className="glass-card p-5 relative overflow-hidden group"
                >
                  {/* Left accent bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-[18px] ${statusCfg.dot}`}
                    style={{ boxShadow: `2px 0 12px ${statusCfg.glow}` }} />

                  <div className="pl-3">
                    <div className="flex justify-between items-start mb-3">
                      <div className="pr-4 flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-0.5 truncate">{c.title}</h3>
                        {c.caseNumber && <p className="text-xs font-mono text-muted-foreground/70">{c.caseNumber}</p>}
                      </div>
                      <div className={`flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusCfg.badge}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} style={{ boxShadow: `0 0 6px ${statusCfg.glow}` }} />
                        {statusCfg.label}
                      </div>
                    </div>

                    <p className="text-sm text-foreground/60 mb-4 line-clamp-2 leading-relaxed">{c.description}</p>

                    <div className="flex flex-wrap gap-4 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground/70">
                        <Landmark className="h-3.5 w-3.5" /> {c.court || "Court TBA"}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground/70">
                        <FileText className="h-3.5 w-3.5" /> {c.category}
                      </div>
                      {c.nextHearingDate && (
                        <div className="flex items-center gap-1.5 text-secondary font-semibold">
                          <Calendar className="h-3.5 w-3.5" /> Next Hearing: {new Date(c.nextHearingDate).toLocaleDateString("en-IN")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/50 hover:text-destructive hover:bg-destructive/10 rounded-xl"
                      onClick={() => {
                        if (confirm("Remove this case?")) {
                          deleteCase.mutate({ id: c.id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/cases"] }) });
                        }
                      }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* FAB */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            className="fixed bottom-24 lg:bottom-8 right-6 z-40">
            <Button className="w-14 h-14 rounded-2xl bg-accent hover:bg-accent text-black border-0 p-0 flex items-center justify-center"
              style={{ boxShadow: "0 0 24px rgba(212,175,55,0.45), 0 8px 20px rgba(0,0,0,0.4)" }}>
              <Plus className="w-6 h-6" />
            </Button>
          </motion.div>
        </DrawerTrigger>
        <DrawerContent className="border-white/8 px-4 pb-8 h-[88vh]" style={{ background: "hsl(222 47% 8%)" }}>
          <DrawerHeader className="text-left px-0 mb-5 border-b border-white/5 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-accent/15 flex items-center justify-center">
                <Scale className="w-5 h-5 text-accent" />
              </div>
              <DrawerTitle className="font-serif text-2xl">Track New Case</DrawerTitle>
            </div>
          </DrawerHeader>
          <div className="overflow-y-auto no-scrollbar">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Case Title</FormLabel>
                    <FormControl>
                      <Input className="bg-white/5 border-white/10 focus-visible:ring-secondary/40 focus-visible:border-secondary/40 h-12 rounded-2xl" placeholder="Enter case title" {...field} />
                    </FormControl>
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="caseNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-bold">CNR Number</FormLabel>
                      <FormControl>
                        <Input className="bg-white/5 border-white/10 h-12 rounded-2xl font-mono" placeholder="Optional" {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="court" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Court</FormLabel>
                      <FormControl>
                        <Input className="bg-white/5 border-white/10 h-12 rounded-2xl" placeholder="Optional" {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-2xl">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-white/10" style={{ background: "hsl(222 47% 10%)" }}>
                          <SelectItem value="Civil">Civil</SelectItem>
                          <SelectItem value="Criminal">Criminal</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Family">Family</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-2xl">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-white/10" style={{ background: "hsl(222 47% 10%)" }}>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Case Summary</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none bg-white/5 border-white/10 focus-visible:ring-secondary/40 min-h-[100px] rounded-2xl" placeholder="Brief description..." {...field} />
                    </FormControl>
                  </FormItem>
                )} />
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full h-12 bg-secondary text-white rounded-2xl text-base font-bold border-0"
                    style={{ boxShadow: "0 4px 20px rgba(43,108,235,0.35)" }}
                    disabled={createCase.isPending}>
                    {createCase.isPending ? "Saving..." : "Save Case"}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
