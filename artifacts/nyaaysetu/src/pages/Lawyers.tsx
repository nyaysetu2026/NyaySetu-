import { useListLawyers } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Scale, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Lawyers() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [specialization, setSpecialization] = useState("all");

  const params = {
    ...(search && { search }),
    ...(city !== "all" && { city }),
    ...(specialization !== "all" && { specialization })
  };

  const { data: lawyers, isLoading } = useListLawyers(params);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold font-serif text-primary mb-4">Verified Advocate Directory</h1>
        <p className="text-muted-foreground text-lg">
          Find and consult with specialized legal professionals verified by the Bar Council.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-10 shadow-sm border-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by name or keyword..." 
                className="pl-10 h-12"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <Select value={specialization} onValueChange={setSpecialization}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                <SelectItem value="Civil Law">Civil Law</SelectItem>
                <SelectItem value="Family Law">Family Law</SelectItem>
                <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                <SelectItem value="Constitutional Law">Constitutional Law</SelectItem>
              </SelectContent>
            </Select>

            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="New Delhi">New Delhi</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden"><Skeleton className="h-64 w-full" /></Card>
          ))
        ) : lawyers?.length === 0 ? (
          <div className="col-span-2 text-center py-20 text-muted-foreground">
            <Scale className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <h3 className="text-xl font-semibold text-foreground">No advocates found</h3>
            <p>Try adjusting your search filters.</p>
          </div>
        ) : (
          lawyers?.map((lawyer) => (
            <Card key={lawyer.id} className="overflow-hidden hover:shadow-md transition-all border-border/50">
              <CardContent className="p-0 sm:flex">
                <div className="sm:w-1/3 bg-muted aspect-square sm:aspect-auto">
                  {lawyer.imageUrl ? (
                    <img src={lawyer.imageUrl} alt={lawyer.name} className="w-full h-full object-cover grayscale-[20%]" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-primary/5">
                      <Scale className="h-12 w-12 mb-2" />
                      <span className="text-xs uppercase tracking-wider font-semibold">No Photo</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-bold font-serif text-primary">{lawyer.name}</h3>
                      <div className="flex items-center gap-1 text-sm font-medium text-secondary mt-1">
                        <ShieldCheck className="h-4 w-4" /> Bar Council Verified
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-accent/20 text-yellow-700 px-2 py-1 rounded font-bold text-sm">
                      <Star className="h-4 w-4 fill-current" /> {lawyer.rating}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4" /> {lawyer.specialization} ({lawyer.experience} yrs exp.)
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {lawyer.city}, {lawyer.state}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {lawyer.languages.map((lang) => (
                      <Badge key={lang} variant="secondary" className="bg-muted text-muted-foreground font-normal">
                        {lang}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="text-sm font-semibold text-foreground">
                      ₹{lawyer.fee} / consultation
                    </div>
                    <Link href={`/lawyers/${lawyer.id}`}>
                      <Button variant="default" className="bg-primary hover:bg-primary/90">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
