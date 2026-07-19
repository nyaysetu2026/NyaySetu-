import { useListEmergencyContacts } from "@workspace/api-client-react";
import { Phone, AlertTriangle, Info, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Emergency() {
  const { data: contacts, isLoading } = useListEmergencyContacts();

  const categories = Array.from(new Set(contacts?.map(c => c.category) || []));

  return (
    <div className="min-h-screen bg-rose-50/30 dark:bg-rose-950/10">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-4xl">
        
        <Alert variant="destructive" className="mb-10 border-2 bg-destructive/10 text-destructive-foreground">
          <AlertTriangle className="h-6 w-6" />
          <AlertTitle className="text-lg font-bold">EMERGENCY RESPONSE</AlertTitle>
          <AlertDescription className="text-base mt-1 font-medium">
            If you are in immediate physical danger, dial 112 (National Emergency Number) immediately.
            These numbers connect directly to official government dispatch centers.
          </AlertDescription>
        </Alert>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif text-foreground mb-4">National Helplines</h1>
          <p className="text-muted-foreground text-lg">24/7 verified contact numbers for citizens in distress.</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map(category => (
              <div key={category}>
                <h2 className="text-2xl font-bold font-serif text-primary mb-6 flex items-center gap-2 border-b pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contacts?.filter(c => c.category === category).map(contact => (
                    <div key={contact.id} className="bg-card border-2 border-border hover:border-destructive/50 rounded-xl p-6 shadow-sm flex flex-col transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.description}</p>
                        </div>
                        {contact.available247 && (
                          <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase">
                            <Clock className="w-3 h-3 mr-1" /> 24/7
                          </span>
                        )}
                      </div>
                      
                      <a 
                        href={`tel:${contact.phone}`} 
                        className="mt-auto bg-destructive hover:bg-destructive/90 text-white flex items-center justify-center gap-3 py-4 rounded-lg text-2xl font-bold font-mono tracking-wider transition-transform active:scale-95"
                      >
                        <Phone className="w-6 h-6" /> {contact.phone}
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
