import { useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Noticias from "@/pages/Noticias";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { LoaderContext } from "@/contexts/LoaderContext";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/noticias" component={Noticias} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loaderDone, setLoaderDone] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    setLoaderDone(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoaderContext.Provider value={loaderDone}>
          <AnimatePresence>
            {isLoading && <LoadingScreen key="loader" onComplete={handleLoadComplete} />}
          </AnimatePresence>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </LoaderContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
