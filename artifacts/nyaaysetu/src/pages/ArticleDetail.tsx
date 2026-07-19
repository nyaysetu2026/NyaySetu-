import { useGetArticle } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, isError } = useGetArticle(Number(id), {
    query: { enabled: !!id, queryKey: ['/api/articles', Number(id)] }
  });

  if (isLoading) return <div className="container mx-auto max-w-3xl px-4 py-12"><Skeleton className="h-[60vh] w-full" /></div>;
  if (isError || !article) return <div className="text-center py-20">Article Not Found</div>;

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-3xl">
      <Link href="/rights" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-10 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Base
      </Link>

      <article className="glass-card p-8 md:p-12 mb-8">
        <header className="mb-10 text-center">
          <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm font-bold uppercase tracking-widest rounded-full mb-6">
            {article.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary leading-tight mb-6">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            {article.summary}
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(article.createdAt).toLocaleDateString()}</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime} min read</div>
          </div>
        </header>

        <Separator className="mb-10" />

        <div className="prose prose-lg prose-slate max-w-none text-foreground/90 font-serif leading-relaxed mb-12">
          {article.content.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('##')) {
              return <h2 key={i} className="text-2xl font-bold font-sans text-primary mt-8 mb-4">{paragraph.replace('##', '').trim()}</h2>;
            }
            if (paragraph.startsWith('-')) {
              return <li key={i} className="ml-4 list-disc">{paragraph.replace('-', '').trim()}</li>;
            }
            if (paragraph.trim() === '') return null;
            return <p key={i} className="mb-6">{paragraph}</p>;
          })}
        </div>

        <Separator className="mb-8" />
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-md">#{tag}</span>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2"><Share2 className="w-4 h-4" /> Share</Button>
            <Button variant="outline" size="sm" className="gap-2"><Bookmark className="w-4 h-4" /> Save</Button>
          </div>
        </div>
      </article>
    </div>
  );
}
