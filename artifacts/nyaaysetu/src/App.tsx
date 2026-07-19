import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppLayout } from './components/layout/AppLayout';

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

function Router() {
  return (
    <AppLayout>
      <Switch>
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
