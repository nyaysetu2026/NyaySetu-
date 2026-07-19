import { useListDocuments } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Clock, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Documents() {
  const { data: documents, isLoading } = useListDocuments();

  const categories = ["All", "Affidavits", "Agreements", "Petitions", "Notices"];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-serif text-primary mb-4">Legal Document Vault</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Standardized, legally-sound templates for everyday use. Download ready-to-use formats for affidavits, agreements, and official notices across multiple languages.
        </p>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="mb-8 bg-muted/50 h-auto p-1 overflow-x-auto flex-wrap justify-start">
          {categories.map(cat => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="px-6 py-2.5 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat} value={cat} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}><CardContent className="p-6"><Skeleton className="h-32 w-full" /></CardContent></Card>
                ))
              ) : documents?.filter(doc => cat === "All" || doc.category === cat).length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No documents found in this category.
                </div>
              ) : (
                documents?.filter(doc => cat === "All" || doc.category === cat).map((doc) => (
                  <Card key={doc.id} className="group hover:border-secondary/50 hover:shadow-md transition-all flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="p-2.5 bg-primary/5 text-primary rounded-lg">
                          <FileText className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className="bg-background text-xs">
                          {doc.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight line-clamp-2 mt-2">{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">
                        {doc.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> {doc.language}</span>
                        <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5" /> {doc.downloadCount}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                      <Link href={`/documents/${doc.id}`}>
                        <Button variant="secondary" className="w-full group-hover:bg-secondary group-hover:text-white transition-colors">
                          View Template
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
