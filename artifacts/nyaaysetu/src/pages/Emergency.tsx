import { useListEmergencyContacts } from "@workspace/api-client-react";
import { Phone, AlertTriangle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Emergency() {
  const { data: contacts, isLoading } = useListEmergencyContacts();
  const categories = Array.from(new Set(contacts?.map(c => c.category) || []));

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-safe-top pb-24">
      {/* Red ambient glow */}
      <div className="absolute top-[-20%] left-[10%] w-[80%] h-[40%] bg-destructive/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 pt-4 lg:pt-8">
        
        {/* Urgent Header Card */}
        <div className="bg-destructive/20 border border-destructive/50 rounded-3xl p-6 md:p-8 mb-10 shadow-[0_0_30px_rgba(220,38,38,0.15)] flex flex-col items-center text-center animate-in slide-in-from-top-4 duration-500">
          <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center text-white mb-4 shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-pulse">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-white mb-2">URGENT RESPONSE</h1>
          <p className="text-destructive-foreground/80 text-sm md:text-base max-w-md">
            If you are in immediate physical danger, tap below to dial the National Emergency Dispatch.
          </p>
          <a href="tel:112" className="mt-6 w-full max-w-xs bg-destructive text-white font-mono text-3xl font-bold py-4 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-lg">
            <Phone className="w-6 h-6 fill-current" /> 112
          </a>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-2xl bg-white/5" />
            <Skeleton className="h-24 w-full rounded-2xl bg-white/5" />
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map(category => (
              <div key={category}>
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 pl-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contacts?.filter(c => c.category === category).map(contact => (
                    <div key={contact.id} className="glass-card p-5 flex items-center justify-between border-white/5">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-white">{contact.name}</h3>
                          {contact.available247 && (
                            <Clock className="w-3 h-3 text-secondary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{contact.description}</p>
                      </div>
                      
                      <a 
                        href={`tel:${contact.phone}`} 
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors shrink-0"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}