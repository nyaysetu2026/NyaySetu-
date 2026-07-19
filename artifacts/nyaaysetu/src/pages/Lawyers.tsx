import { useListLawyers } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Scale, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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

  // Horizontal chips for mobile
  const popularSpecializations = ["Criminal Law", "Civil Law", "Family Law", "Corporate Law"];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl pt-safe-top">
      <div className="mb-8 pt-4 lg:pt-0">
        <h1 className="text-3xl lg:text-4xl font-bold font-serif text-foreground mb-2">Advocate Directory</h1>
        <p className="text-muted-foreground text-sm">Verified professionals by Bar Council.</p>
      </div>

      {/* App-style Search & Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search advocates..." 
            className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 text-base focus-visible:ring-secondary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="h-10 rounded-full bg-white/5 border-white/10 shrink-0 w-auto min-w-[120px]">
              <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
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

          {popularSpecializations.map(spec => (
            <div 
              key={spec}
              onClick={() => setSpecialization(specialization === spec ? "all" : spec)}
              className={`h-10 flex items-center px-4 rounded-full border shrink-0 text-sm cursor-pointer transition-colors ${
                specialization === spec 
                  ? "bg-secondary border-secondary text-white font-medium" 
                  : "bg-white/5 border-white/10 text-foreground hover:bg-white/10"
              }`}
            >
              {spec}
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-4 flex gap-4">
              <Skeleton className="h-20 w-20 rounded-xl bg-white/10 shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-3/4 bg-white/10" />
                <Skeleton className="h-4 w-1/2 bg-white/10" />
                <Skeleton className="h-4 w-full bg-white/10 mt-4" />
              </div>
            </div>
          ))
        ) : lawyers?.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-white/20">
              <Scale className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No advocates found</h3>
            <p className="text-muted-foreground text-sm mt-1">Try adjusting your search criteria.</p>
          </div>
        ) : (
          lawyers?.map((lawyer) => (
            <Link key={lawyer.id} href={`/lawyers/${lawyer.id}`}>
              <div className="glass-card p-5 group cursor-pointer hover:border-secondary/50 flex flex-col h-full">
                <div className="flex gap-4 mb-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/10">
                    {lawyer.imageUrl ? (
                      <img src={lawyer.imageUrl} alt={lawyer.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl font-serif font-bold text-white/30 bg-primary">
                        {lawyer.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold font-serif text-white line-clamp-1">{lawyer.name}</h3>
                      <div className="flex items-center gap-1 text-accent text-xs font-bold bg-accent/10 px-1.5 py-0.5 rounded">
                        <Star className="h-3 w-3 fill-current" /> {lawyer.rating}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-secondary flex items-center gap-1 mt-1">
                      {lawyer.specialization}
                    </p>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
                      <MapPin className="h-3 w-3" /> {lawyer.city}
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-white/5 pt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Consultation</div>
                    <div className="text-sm font-bold text-white">₹{lawyer.fee}</div>
                  </div>
                  <Button size="sm" className="rounded-full bg-white/10 text-white hover:bg-secondary hover:text-white border-0 transition-colors">
                    View Profile
                  </Button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}