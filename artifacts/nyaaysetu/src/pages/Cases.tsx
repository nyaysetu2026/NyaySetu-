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

const caseSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  status: z.string(),
  category: z.string(),
  caseNumber: z.string().optional(),
  court: z.string().optional(),
});

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
        queryClient.invalidateQueries({ queryKey: ['/api/cases'] });
        setDrawerOpen(false);
        form.reset();
      }
    });
  };

  const getStatusDot = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-secondary shadow-[0_0_8px_rgba(43,108,235,0.8)]';
      case 'closed': return 'bg-muted-foreground';
      case 'pending': return 'bg-accent shadow-[0_0_8px_rgba(212,175,55,0.8)]';
      default: return 'bg-primary';
    }
  };

  const filteredCases = cases?.filter(c => activeTab === "All" || c.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-5xl pt-safe-top min-h-screen relative">
      <div className="mb-6 pt-4 lg:pt-0 flex justify-between items-end">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold font-serif text-foreground mb-1">Cases</h1>
          <p className="text-muted-foreground text-sm">Track your legal proceedings.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
        {["All", "Active", "Pending", "Closed"].map(tab => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === tab ? "bg-white text-black" : "text-muted-foreground hover:text-white"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="space-y-4 pb-24">
        {isLoading ? (
          <p className="text-muted-foreground text-center py-10">Loading cases...</p>
        ) : filteredCases?.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-white/20">
              <Landmark className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No cases found</h3>
            <p className="text-muted-foreground text-sm mt-1">Tap + to track a new case.</p>
          </div>
        ) : (
          filteredCases?.map((c) => (
            <div key={c.id} className="glass-card p-5 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-3">
                <div className="pr-4">
                  <h3 className="text-lg font-bold text-white mb-0.5">{c.title}</h3>
                  {c.caseNumber && <p className="text-xs font-mono text-muted-foreground">{c.caseNumber}</p>}
                </div>
                <div className="flex items-center gap-1.5 shrink-0 bg-white/5 px-2 py-1 rounded-md">
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(c.status)}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">{c.status}</span>
                </div>
              </div>
              
              <p className="text-sm text-foreground/70 mb-5 line-clamp-2">{c.description}</p>
              
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Landmark className="h-3.5 w-3.5" /> {c.court || "Court TBA"}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" /> {c.category}
                </div>
                {c.nextHearingDate && (
                  <div className="flex items-center gap-1.5 text-secondary font-medium w-full mt-1">
                    <Calendar className="h-3.5 w-3.5" /> Next Hearing: {new Date(c.nextHearingDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" 
                  onClick={() => {
                    if(confirm('Remove case?')) {
                      deleteCase.mutate({ id: c.id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ['/api/cases'] }) });
                    }
                  }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAB (Floating Action Button) */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button className="fixed bottom-24 lg:bottom-8 right-6 w-14 h-14 rounded-full bg-accent hover:bg-accent text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] border-0 z-40 p-0 flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-background border-white/10 px-4 pb-8 h-[85vh]">
          <DrawerHeader className="text-left px-0 mb-4 border-b border-white/5 pb-4">
            <DrawerTitle className="font-serif text-2xl">Track New Case</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto no-scrollbar">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs uppercase tracking-wider">Case Title</FormLabel><FormControl><Input className="bg-white/5 border-white/10 focus-visible:ring-secondary h-12" placeholder="Title" {...field} /></FormControl></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="caseNumber" render={({ field }) => (
                    <FormItem><FormLabel className="text-xs uppercase tracking-wider">Number (Opt)</FormLabel><FormControl><Input className="bg-white/5 border-white/10 h-12" placeholder="CNR No." {...field} /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="court" render={({ field }) => (
                    <FormItem><FormLabel className="text-xs uppercase tracking-wider">Court (Opt)</FormLabel><FormControl><Input className="bg-white/5 border-white/10 h-12" placeholder="Court" {...field} /></FormControl></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem><FormLabel className="text-xs uppercase tracking-wider">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="bg-white/5 border-white/10 h-12"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                        <SelectContent className="bg-background border-white/10">
                          <SelectItem value="Civil">Civil</SelectItem><SelectItem value="Criminal">Criminal</SelectItem><SelectItem value="Corporate">Corporate</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem><FormLabel className="text-xs uppercase tracking-wider">Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="bg-white/5 border-white/10 h-12"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                        <SelectContent className="bg-background border-white/10">
                          <SelectItem value="Active">Active</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs uppercase tracking-wider">Summary</FormLabel><FormControl><Textarea className="resize-none bg-white/5 border-white/10 focus-visible:ring-secondary min-h-[100px]" placeholder="Brief notes..." {...field} /></FormControl></FormItem>
                )} />
                <Button type="submit" className="w-full h-12 bg-secondary text-white rounded-xl text-base font-bold shadow-[0_4px_15px_rgba(43,108,235,0.3)] mt-4" disabled={createCase.isPending}>Save Case</Button>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}