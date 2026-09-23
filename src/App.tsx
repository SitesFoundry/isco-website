import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import BoilerDetail from "./pages/BoilerDetail";

/*
 * Vite's BASE_URL is "/" when the site is served from the root of a domain
 * (www.iscogmbh.com) and "/isco-website/" while it is previewed as a GitHub
 * Pages project site. wouter prefixes every <Link> with this base, so the
 * router paths below stay root-relative and the deploy target decides the
 * prefix. Strip the trailing slash because wouter expects none.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

function Routes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/products/boiler/:slug" component={BoilerDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  return (
    <WouterRouter base={BASE}>
      <Routes />
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <Router />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
