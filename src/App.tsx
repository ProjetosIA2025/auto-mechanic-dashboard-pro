
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Vehicles from "./pages/Vehicles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/vehicles" element={<Vehicles />} />
            {/* Placeholder routes for other pages */}
            <Route path="/clients" element={<div className="p-6"><h1 className="text-3xl font-bold">Clientes</h1><p>Em desenvolvimento...</p></div>} />
            <Route path="/services" element={<div className="p-6"><h1 className="text-3xl font-bold">Serviços & Produtos</h1><p>Em desenvolvimento...</p></div>} />
            <Route path="/inventory" element={<div className="p-6"><h1 className="text-3xl font-bold">Estoque</h1><p>Em desenvolvimento...</p></div>} />
            <Route path="/financial" element={<div className="p-6"><h1 className="text-3xl font-bold">Financeiro</h1><p>Em desenvolvimento...</p></div>} />
            <Route path="/reports" element={<div className="p-6"><h1 className="text-3xl font-bold">Relatórios</h1><p>Em desenvolvimento...</p></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
