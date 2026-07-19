import { useGetDocument } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowLeft, Download, Copy, Check, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function DocumentDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: doc, isLoading, isError } = useGetDocument(Number(id), {
    query: { enabled: !!id, queryKey: ['/api/documents', Number(id)] }
  });
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  if (isLoading) return <div className="container mx-auto px-4 py-12"><Skeleton className="h-[60vh] w-full" /></div>;
  
  if (isError || !doc) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h2>Document Not Found</h2>
      <Link href="/documents"><Button className="mt-4">Back</Button></Link>
    </div>
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(doc.content);
    setCopied(true);
    toast({ title: "Copied to clipboard", description: "You can now paste the template." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([doc.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    toast({ title: "Downloading...", description: "Template is saving to your device." });
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
      <Link href="/documents" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Vault
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
            {doc.category}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
            <Globe className="w-4 h-4" /> {doc.language}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">{doc.title}</h1>
        <p className="text-lg text-muted-foreground">{doc.description}</p>
      </div>

      <div className="glass-card shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
        <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="w-4 h-4" /> Template Preview
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="bg-white/5 border-white/10 hover:bg-white/10">
              {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied" : "Copy text"}
            </Button>
            <Button size="sm" onClick={handleDownload} className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </div>
        </div>
        <div className="p-8 md:p-12">
          <div className="prose prose-slate max-w-none font-serif text-foreground/90 whitespace-pre-wrap">
            {doc.content}
          </div>
        </div>
      </div>
    </div>
  );
}
