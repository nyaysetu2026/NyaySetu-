import { useListLawyers } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Scale, Search, ShieldCheck, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { TricolorBar } from "@/components/ui/india-flag-bg";

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
  const popularSpecializations = ["Criminal Law", "Civil Law", "Family Law", "Corporate Law"];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">

      {/* Header */}
      <div className="mb-8 pt-4 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Bar Council Verified</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold font-serif text-foreground mb-1.5">Advocate Directory</h1>
          <p className="text-muted-foreground text-sm">Find verified legal professionals across India.</p>
        </motion.div>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" />
          <Input
            placeholder="Search by name or specialization..."
            className="pl-12 h-14 rounded-2xl bg-white/5 border-white/10 text-base focus-visible:ring-secondary/40 focus-visible:border-secondary/30 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="h-10 rounded-full bg-white/6 border-white/10 shrink-0 w-auto min-w-[130px] text-sm">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent className="border-white/10" style={{ background: "hsl(222 47% 10%)" }}>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="New Delhi">New Delhi</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Bengaluru">Bengaluru</SelectItem>
              <SelectItem value="Chennai">Chennai</SelectItem>
              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              <SelectItem value="Kolkata">Kolkata</SelectItem>
            </SelectContent>
          </Select>

          {popularSpecializations.map(spec => (
            <motion.button
              key={spec}
              whileTap={{ scale: 0.94 }}
              onClick={() => setSpecialization(specialization === spec ? "all" : spec)}
              className={`h-10 flex items-center px-4 rounded-full border shrink-0 text-sm font-medium cursor-pointer transition-colors ${
                specialization === spec
                  ? "bg-secondary border-secondary text-white"
                  : "bg-white/5 border-white/10 text-foreground/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {spec}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-5">
              <div className="flex gap-4 mb-4">
                <Skeleton className="h-20 w-20 rounded-2xl bg-white/8 shrink-0" />
                <div className="space-y-2 flex-1 pt-1">
                  <Skeleton className="h-5 w-3/4 bg-white/8 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 bg-white/6 rounded-lg" />
                  <Skeleton className="h-3.5 w-2/3 bg-white/5 rounded-lg" />
                </div>
              </div>
              <Skeleton className="h-10 w-full bg-white/5 rounded-2xl" />
            </div>
          ))
        ) : lawyers?.length === 0 ? (
          <div className="col-span-full text-center py-24">
            <div className="w-20 h-20 rounded-3xl bg-white/4 flex items-center justify-center mx-auto mb-5 text-white/15">
              <Scale className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-foreground font-serif mb-1">No advocates found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          lawyers?.map((lawyer, index) => (
            <motion.div
              key={lawyer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <Link href={`/lawyers/${lawyer.id}`} className="block h-full">
                <div className="glass-card p-5 group cursor-pointer flex flex-col h-full">
                  {/* Avatar + Info */}
                  <div className="flex gap-4 mb-5">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-white/5 border border-white/8 relative">
                      {lawyer.imageUrl ? (
                        <img src={lawyer.imageUrl} alt={lawyer.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-serif font-bold text-white/25 bg-gradient-to-br from-white/5 to-transparent">
                          {lawyer.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="text-base font-bold font-serif text-white line-clamp-1">{lawyer.name}</h3>
                        <div className="flex items-center gap-1 text-accent text-xs font-bold bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full shrink-0">
                          <Star className="h-3 w-3 fill-current" /> {lawyer.rating}
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-secondary mb-1">{lawyer.specialization}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                        <MapPin className="h-3 w-3" /> {lawyer.city}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Consultation</div>
                      <div className="text-base font-bold text-white">₹{lawyer.fee}</div>
                    </div>
                    <Button size="sm" className="rounded-full bg-white/8 text-white hover:bg-secondary hover:text-white border-0 transition-all duration-200 group-hover:bg-secondary text-xs font-semibold px-4">
                      View Profile <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
