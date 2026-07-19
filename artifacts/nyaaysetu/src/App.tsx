import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { AppLayout } from './components/layout/AppLayout';
import { AnimatePresence, motion } from 'framer-motion';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AIChat from './pages/AIChat';
import Lawyers from './pages/Lawyers';
import LawyerDetail from './pages/LawyerDetail';
import Documents from './pages/Documents';
import DocumentDetail from './pages/DocumentDetail';
import Rights from './pages/Rights';
import ArticleDetail from './pages/ArticleDetail';
import Cases from './pages/Cases';
import Emergency from './pages/Emergency';
import NotFound from './pages/not-found';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

// A wrapper component to handle framer-motion transitions per route
function AnimatedRoute({ path, component: Component }: { path: string; component: any }) {
  const [location] = useLocation();
  // Using exact match for wouter logic, if not exact it won't render
  const match = path === '/' ? location === '/' : location.startsWith(path) || location === path;
  
  if (!match && path !== '*') return null;

  return (
    <motion.div
      key={path}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex-1 flex flex-col w-full h-full"
    >
      <Component />
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <Switch location={location} key={location}>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/ai-chat" component={AIChat} />
          <Route path="/lawyers" component={Lawyers} />
          <Route path="/lawyers/:id" component={LawyerDetail} />
          <Route path="/documents" component={Documents} />
          <Route path="/documents/:id" component={DocumentDetail} />
          <Route path="/rights" component={Rights} />
          <Route path="/rights/:id" component={ArticleDetail} />
          <Route path="/cases" component={Cases} />
          <Route path="/emergency" component={Emergency} />
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;