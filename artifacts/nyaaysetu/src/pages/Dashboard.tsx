import { useGetDashboardStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Users, Landmark, FileText, ArrowRight, Activity, Globe, MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: stats, isLoading, isError } = useGetDashboardStats();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-primary tracking-tight mb-2">{getGreeting()}, Citizen.</h1>
        <p className="text-muted-foreground text-lg">Welcome to your central legal command center.</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          title="Active Cases" 
          value={stats?.activeCases} 
          icon={<Activity className="h-5 w-5 text-secondary" />} 
          loading={isLoading} 
        />
        <StatCard 
          title="Total Cases Tracked" 
          value={stats?.totalCases} 
          icon={<Landmark className="h-5 w-5 text-primary" />} 
          loading={isLoading} 
        />
        <StatCard 
          title="Lawyers Available" 
          value={stats?.totalLawyers} 
          icon={<Users className="h-5 w-5 text-accent" />} 
          loading={isLoading} 
        />
        <StatCard 
          title="AI Consultations" 
          value={stats?.aiConversations} 
          icon={<MessageSquare className="h-5 w-5 text-purple-500" />} 
          loading={isLoading} 
        />
      </div>

      {/* Quick Access */}
      <h2 className="text-2xl font-bold text-foreground mb-6 font-serif border-b pb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <QuickAccessCard
          title="AI Legal Assistant"
          description="Ask questions about your rights and IPC."
          icon={<Bot className="h-8 w-8" />}
          href="/ai-chat"
          color="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
        />
        <QuickAccessCard
          title="Find a Lawyer"
          description="Search verified advocates by city & specialization."
          icon={<Users className="h-8 w-8" />}
          href="/lawyers"
          color="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
        />
        <QuickAccessCard
          title="Case Tracker"
          description="Manage your ongoing legal proceedings."
          icon={<Landmark className="h-8 w-8" />}
          href="/cases"
          color="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
        />
        <QuickAccessCard
          title="Document Templates"
          description="Download standard legal formats & affidavits."
          icon={<FileText className="h-8 w-8" />}
          href="/documents"
          color="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
        />
      </div>

      {/* Platform Scale (Optional lower section) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-primary text-primary-foreground border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">A Bridge to Justice</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-base">
              NyaySetu is continuously expanding to serve every corner of India.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-8 mt-4">
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-16 bg-white/20" /> : stats?.citiesServed}</div>
                  <div className="text-sm text-primary-foreground/70 uppercase tracking-wider">Cities Served</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-16 bg-white/20" /> : stats?.languagesSupported}</div>
                  <div className="text-sm text-primary-foreground/70 uppercase tracking-wider">Languages</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Stay informed on your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-1.5" />
                <p><span className="font-semibold text-foreground">New Document Added:</span> Rental Agreement Template now available in Marathi.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-1.5" />
                <p><span className="font-semibold text-foreground">System Update:</span> eCourts integration synced successfully for Maharashtra.</p>
              </div>
            </div>
            <Link href="/documents">
              <Button variant="link" className="px-0 mt-4 h-auto text-secondary">View Documents <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, loading }: { title: string, value?: number, icon: React.ReactNode, loading: boolean }) {
  return (
    <Card className="shadow-sm border-border/50">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-3xl font-bold text-foreground">{value?.toLocaleString()}</p>
            )}
          </div>
          <div className="p-3 bg-muted rounded-xl">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickAccessCard({ title, description, icon, href, color }: { title: string, description: string, icon: React.ReactNode, href: string, color: string }) {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-border/50 hover:border-secondary/30 group">
        <CardContent className="p-6 flex flex-col h-full">
          <div className={`p-4 rounded-xl w-fit mb-4 ${color}`}>
            {icon}
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground flex-1">{description}</p>
          <div className="mt-4 flex items-center text-sm font-semibold text-secondary opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
            Access <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
