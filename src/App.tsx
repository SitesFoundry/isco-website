import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SEOHead from "./components/SEOHead";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import BoilerDetail from "./pages/BoilerDetail";
import ProductCategory from "./pages/ProductCategory";
import SolarModuleDetail from "./pages/SolarModuleDetail";
import ProductDetail from "./pages/ProductDetail";

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
      {/* More specific paths first; the category route matches a single
          segment so the two-segment product routes never reach it. */}
      <Route path="/products/solar-modules/:slug" component={SolarModuleDetail} />
      {/* Inverter and battery products share one generic detail page; their spec
          sheets are label/value tables rather than the module's power-step matrix. */}
      <Route path="/products/inverters/:slug" component={ProductDetail} />
      <Route path="/products/bess/:slug" component={ProductDetail} />
      <Route path="/products/boiler/:slug" component={BoilerDetail} />
      <Route path="/products/:category" component={ProductCategory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router({ ssrPath }: { ssrPath?: string }) {
  return (
    /*
     * `ssrPath` is only passed while the site is prerendered in Node: there is
     * no window.location to read, so the route has to be handed in. In the
     * browser it stays undefined and wouter reads the address bar.
     */
    <WouterRouter base={BASE} ssrPath={ssrPath}>
      {/* Mounted once, inside the router: every route, including one reached
          without a page load, gets its own metadata. */}
      <SEOHead />
      <Routes />
    </WouterRouter>
  );
}

function App({ ssrPath }: { ssrPath?: string } = {}) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <Router ssrPath={ssrPath} />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
