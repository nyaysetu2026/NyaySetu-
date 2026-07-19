import { useListArticles } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, BookOpen, Clock, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Rights() {
  const { data: articles, isLoading } = useListArticles();
  const categories = ["All", "Constitutional Rights", "Criminal Procedure", "Property Law", "Family Law", "Labor Rights"];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-6xl">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-accent/20 text-accent rounded-full mb-6">
          <Scale className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-6">Know Your Rights</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Knowledge is the first step to justice. Explore comprehensive guides explaining Indian laws in simple, actionable language.
        </p>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="mb-10 bg-transparent border-b w-full justify-start h-auto p-0 space-x-6 overflow-x-auto">
          {categories.map(cat => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold text-muted-foreground"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat} value={cat} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i}><CardContent className="p-6"><Skeleton className="h-40 w-full" /></CardContent></Card>
                ))
              ) : articles?.filter(art => cat === "All" || art.category === cat).length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No articles found in this category.
                </div>
              ) : (
                articles?.filter(art => cat === "All" || art.category === cat).map((art) => (
                  <Link key={art.id} href={`/rights/${art.id}`}>
                    <Card className="h-full border-border/60 hover:border-secondary/50 hover:shadow-lg transition-all group cursor-pointer overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-primary to-secondary w-0 group-hover:w-full transition-all duration-500"></div>
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-secondary mb-4">
                          <BookOpen className="w-4 h-4" /> {art.category}
                        </div>
                        <h2 className="text-2xl font-bold font-serif text-foreground mb-3 group-hover:text-primary transition-colors">
                          {art.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                          {art.summary}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground font-medium">
                            <Clock className="w-4 h-4" /> {art.readTime} min read
                          </div>
                          <div className="text-primary font-bold flex items-center group-hover:text-secondary transition-colors">
                            Read Article <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
