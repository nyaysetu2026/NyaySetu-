import { useState } from "react";
import { useListCases, useCreateCase, useDeleteCase } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Landmark, Calendar, FileText, Activity, Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof caseSchema>>({
    resolver: zodResolver(caseSchema),
    defaultValues: { title: "", description: "", status: "Active", category: "Civil" },
  });

  const onSubmit = (values: z.infer<typeof caseSchema>) => {
    createCase.mutate({ data: values }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/api/cases'] });
        setIsDialogOpen(false);
        form.reset();
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'pending': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-primary">Case Tracker</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your ongoing legal proceedings.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold">
              <Plus className="w-4 h-4 mr-2" /> Track New Case
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-primary">Add Case Record</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Case Title</FormLabel><FormControl><Input placeholder="e.g. Property Dispute vs Builder" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="caseNumber" render={({ field }) => (
                    <FormItem><FormLabel>Case Number (Optional)</FormLabel><FormControl><Input placeholder="CNR No." {...field} /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="court" render={({ field }) => (
                    <FormItem><FormLabel>Court (Optional)</FormLabel><FormControl><Input placeholder="e.g. Delhi High Court" {...field} /></FormControl></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem><FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                        <SelectContent><SelectItem value="Civil">Civil</SelectItem><SelectItem value="Criminal">Criminal</SelectItem><SelectItem value="Corporate">Corporate</SelectItem></SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem><FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                        <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Closed">Closed</SelectItem></SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Summary / Notes</FormLabel><FormControl><Textarea className="resize-none" rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={createCase.isPending}>Save Case Record</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <p>Loading cases...</p>
        ) : cases?.length === 0 ? (
          <Card className="col-span-full border-dashed bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <Landmark className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-foreground mb-2">No Cases Tracked</h3>
              <p className="text-muted-foreground mb-6 max-w-md">Add a case to start tracking hearing dates, advocate notes, and status updates centrally.</p>
              <Button onClick={() => setIsDialogOpen(true)} variant="outline">Track New Case</Button>
            </CardContent>
          </Card>
        ) : (
          cases?.map((c) => (
            <Card key={c.id} className="relative overflow-hidden border-border/50 hover:shadow-md transition-shadow">
              <div className={`absolute top-0 left-0 w-1 h-full ${c.status.toLowerCase() === 'active' ? 'bg-secondary' : 'bg-muted'}`} />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{c.title}</h3>
                    {c.caseNumber && <p className="text-sm font-mono text-muted-foreground">{c.caseNumber}</p>}
                  </div>
                  <Badge variant="secondary" className={getStatusColor(c.status)}>{c.status}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{c.description}</p>
                
                <div className="grid grid-cols-2 gap-y-3 text-sm mb-6 bg-muted/30 p-3 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Landmark className="h-4 w-4 text-primary" /> {c.court || "Court TBA"}
                  </div>
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <FileText className="h-4 w-4 text-primary" /> {c.category}
                  </div>
                  {c.nextHearingDate && (
                    <div className="flex items-center gap-2 text-accent font-bold col-span-2 mt-1">
                      <Calendar className="h-4 w-4" /> Next Hearing: {new Date(c.nextHearingDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 border-t pt-4">
                  <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" 
                    onClick={() => {
                      if(confirm('Delete this case record?')) {
                        deleteCase.mutate({ id: c.id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ['/api/cases'] }) });
                      }
                    }}>
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                  </Button>
                  <Button variant="outline" size="sm">Update Details</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
