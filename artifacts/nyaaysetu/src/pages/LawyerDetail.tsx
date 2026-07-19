import { useGetLawyer } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Scale, ShieldCheck, Mail, Phone, Calendar, ArrowLeft, Award, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function LawyerDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: lawyer, isLoading, isError } = useGetLawyer(Number(id), { 
    query: { enabled: !!id, queryKey: ['/api/lawyers', Number(id)] } 
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-12"><Skeleton className="h-96 w-full rounded-2xl" /></div>;
  }

  if (isError || !lawyer) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-foreground">Advocate Profile Not Found</h2>
        <Link href="/lawyers"><Button className="mt-4">Back to Directory</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-5xl">
      <Link href="/lawyers" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Image and Actions */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card overflow-hidden border-none shadow-lg">
            <div className="aspect-[3/4] bg-muted w-full relative rounded-t-2xl">
              {lawyer.imageUrl ? (
                <img src={lawyer.imageUrl} alt={lawyer.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-primary text-primary-foreground">
                  <Scale className="h-16 w-16 mb-4 opacity-50" />
                  <span className="font-serif text-xl tracking-wider opacity-50">NYAYSETU</span>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm shadow-sm text-yellow-700">
                <Star className="h-4 w-4 fill-current" /> {lawyer.rating} ({lawyer.reviewCount})
              </div>
            </div>
          </div>

          <div className="glass-card">
            <div className="p-6 space-y-4">
              <div className="text-center pb-4 border-b border-white/10">
                <div className="text-sm text-muted-foreground mb-1">Consultation Fee</div>
                <div className="text-3xl font-bold text-primary">₹{lawyer.fee}</div>
              </div>
              <Button className="w-full bg-secondary hover:bg-secondary/90 h-12 text-base font-semibold">
                <Calendar className="mr-2 h-5 w-5" /> Book Appointment
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10"><Phone className="mr-2 h-4 w-4" /> Call</Button>
                <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10"><Mail className="mr-2 h-4 w-4" /> Message</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-4">
              <ShieldCheck className="h-4 w-4" /> Bar Council Verified: {lawyer.barCouncilId}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-2">{lawyer.name}</h1>
            <p className="text-xl text-muted-foreground flex items-center gap-2">
              <Scale className="h-5 w-5" /> {lawyer.specialization}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {lawyer.city}, {lawyer.state}
            </div>
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <Award className="h-4 w-4 text-muted-foreground" />
              {lawyer.experience} Years Experience
            </div>
            <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Speaks: {lawyer.languages.join(", ")}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-bold font-serif text-primary mb-4">Professional Biography</h2>
            <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
              {lawyer.bio.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="text-2xl font-bold font-serif text-primary mb-4">Practice Areas</h2>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="text-sm py-1.5 px-3">{lawyer.specialization}</Badge>
              <Badge variant="outline" className="text-sm py-1.5 px-3">High Court Litigation</Badge>
              <Badge variant="outline" className="text-sm py-1.5 px-3">Legal Drafting</Badge>
              <Badge variant="outline" className="text-sm py-1.5 px-3">Mediation</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
