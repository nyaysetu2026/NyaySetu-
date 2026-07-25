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
import { Landmark, Calendar, FileText, Trash2, Plus, Scale, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { TricolorBar } from "@/components/ui/india-flag-bg";

const caseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  status: z.string(),
  category: z.string(),
  caseNumber: z.string().optional(),
  court: z.string().optional(),
});

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; glow: string }> = {
  active:  { label: "Active",  color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.3)",  glow: "rgba(59,130,246,0.4)" },
  pending: { label: "Pending", color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.3)",  glow: "rgba(245,158,11,0.4)" },
  closed:  { label: "Closed",  color: "#6b7280", bg: "rgba(107,114,128,0.1)",  border: "rgba(107,114,128,0.2)", glow: "rgba(107,114,128,0.3)" },
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

  const tabCounts = {
    All: cases?.length || 0,
    Active: cases?.filter(c => c.status.toLowerCase() === "active").length || 0,
    Pending: cases?.filter(c => c.status.toLowerCase() === "pending").length || 0,
    Closed: cases?.filter(c => c.status.toLowerCase() === "closed").length || 0,
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-5xl min-h-screen relative">

      {/* Header */}
      <div className="mb-8 pt-4 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl lg:text-4xl font-bold font-serif text-foreground mb-1.5">
            Case Tracker
          </h1>
          <p className="text-muted-foreground text-sm">Track and manage your legal proceedings.</p>
          <TricolorBar className="w-20 mt-3" />
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6 flex-wrap"
      >
        {tabs.map(tab => {
          const active = activeTab === tab;
          const count = tabCounts[tab as keyof typeof tabCounts];
          return (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileTap={{ scale: 0.94 }}
              className="relative px-5 py-2.5 rounded-2xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2"
              style={active ? {
                background: "#ffffff",
                color: "#0a0e1c",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              } : {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {active && (
                <motion.div
                  layoutId="cases-tab-bg"
                  className="absolute inset-0 rounded-2xl bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
              {count > 0 && (
                <span
                  className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    background: active ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)",
                    color: active ? "#0a0e1c" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {count}
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Cases List */}
      <div className="space-y-4 pb-28">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="p-5 rounded-[20px]"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Skeleton className="h-6 w-2/3 mb-3 bg-white/8 rounded-lg" />
              <Skeleton className="h-4 w-full mb-2 bg-white/5 rounded-lg" />
              <Skeleton className="h-4 w-3/4 bg-white/5 rounded-lg" />
            </div>
          ))
        ) : filteredCases?.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Landmark className="h-10 w-10 text-foreground/15" />
            </div>
            <h3 className="text-xl font-bold text-foreground font-serif mb-1">No cases found</h3>
            <p className="text-muted-foreground text-sm">Tap + to start tracking a new case.</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {filteredCases?.map((c, index) => {
              const statusKey = c.status.toLowerCase() as keyof typeof STATUS_CONFIG;
              const cfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG.active;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, scale: 0.97 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 28 }}
                  whileHover={{ y: -3 }}
                  className="relative overflow-hidden group rounded-[20px] transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${cfg.border}`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.02)`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px rgba(0,0,0,0.35), 0 0 24px ${cfg.glow.replace('0.4', '0.08')}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.02)`;
                  }}
                >
                  {/* Left gradient accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[20px]"
                    style={{
                      background: `linear-gradient(to bottom, ${cfg.color}, ${cfg.color}80)`,
                      boxShadow: `2px 0 16px ${cfg.glow}`,
                    }}
                  />

                  {/* Top shimmer on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}50, transparent)` }}
                  />

                  <div className="p-5 pl-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="pr-4 flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-0.5 truncate">{c.title}</h3>
                        {c.caseNumber && (
                          <p className="text-xs font-mono text-muted-foreground/60">{c.caseNumber}</p>
                        )}
                      </div>
                      {/* Status badge */}
                      <div
                        className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          background: cfg.bg,
                          border: `1px solid ${cfg.border}`,
                          color: cfg.color,
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.glow}` }}
                        />
                        {cfg.label}
                      </div>
                    </div>

                    <p className="text-sm text-foreground/55 mb-4 line-clamp-2 leading-relaxed">{c.description}</p>

                    <div className="flex flex-wrap gap-4 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground/60">
                        <Landmark className="h-3.5 w-3.5" />
                        <span>{c.court || "Court TBA"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground/60">
                        <FileText className="h-3.5 w-3.5" />
                        <span>{c.category}</span>
                      </div>
                      {c.nextHearingDate && (
                        <div
                          className="flex items-center gap-1.5 font-semibold"
                          style={{ color: "#3b82f6" }}
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          Next: {new Date(c.nextHearingDate).toLocaleDateString("en-IN")}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delete button */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive/50 hover:text-destructive hover:bg-destructive/10 rounded-xl"
                      onClick={() => {
                        if (confirm("Remove this case?")) {
                          deleteCase.mutate({ id: c.id }, {
                            onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/cases"] })
                          });
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* FAB — Add Case */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-24 lg:bottom-8 right-6 z-40"
          >
            <Button
              className="w-14 h-14 rounded-2xl text-black border-0 p-0 flex items-center justify-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #f5d06b 50%, #c9a227 100%)",
                boxShadow: "0 0 30px rgba(212,175,55,0.5), 0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div
                  className="absolute inset-y-0 w-1/3"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    animation: "shimmerSweep 2s ease-in-out infinite",
                  }}
                />
              </div>
              <Plus className="w-6 h-6 relative z-10" />
            </Button>
          </motion.div>
        </DrawerTrigger>

        <DrawerContent
          className="border-white/8 px-4 pb-8 h-[88vh]"
          style={{
            background: "rgba(8,12,26,0.97)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0">
            <TricolorBar />
          </div>

          <DrawerHeader className="text-left px-0 mb-5 border-b border-white/5 pb-5 mt-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(212,175,55,0.12)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  boxShadow: "0 0 16px rgba(212,175,55,0.15)",
                }}
              >
                <Scale className="w-5 h-5 text-accent" />
              </div>
              <div>
                <DrawerTitle className="font-serif text-2xl">Track New Case</DrawerTitle>
                <p className="text-xs text-muted-foreground/60 mt-0.5">Enter case details below</p>
              </div>
            </div>
          </DrawerHeader>

          <div className="overflow-y-auto no-scrollbar">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-bold">Case Title</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 rounded-2xl focus-visible:ring-0 focus-visible:outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.09)",
                        }}
                        placeholder="Enter case title"
                        {...field}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(43,108,235,0.4)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                      />
                    </FormControl>
                  </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="caseNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-bold">CNR Number</FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 rounded-2xl font-mono focus-visible:ring-0"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                          placeholder="Optional"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="court" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-bold">Court</FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 rounded-2xl focus-visible:ring-0"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                          placeholder="Optional"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-bold">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger
                            className="h-12 rounded-2xl focus:ring-0"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent style={{ background: "rgba(12,18,36,0.98)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.09)" }}>
                          {["Civil", "Criminal", "Corporate", "Family"].map(v => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-bold">Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger
                            className="h-12 rounded-2xl focus:ring-0"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent style={{ background: "rgba(12,18,36,0.98)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.09)" }}>
                          {["Active", "Pending", "Closed"].map(v => (
                            <SelectItem key={v} value={v}>{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-bold">Case Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none min-h-[100px] rounded-2xl focus-visible:ring-0"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                        placeholder="Brief description of the case..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )} />

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full h-12 text-black rounded-2xl text-base font-bold border-0 relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #d4af37 0%, #f5d06b 50%, #c9a227 100%)",
                      boxShadow: "0 4px 24px rgba(212,175,55,0.4)",
                    }}
                    disabled={createCase.isPending}
                  >
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div
                        className="absolute inset-y-0 w-1/3"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                          animation: "shimmerSweep 2s ease-in-out infinite",
                        }}
                      />
                    </div>
                    <span className="relative z-10">
                      {createCase.isPending ? "Saving..." : "Save Case"}
                    </span>
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
