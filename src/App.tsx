
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { MenuProvider } from "@/context/MenuContext";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageTransition from "./components/ui/PageTransition";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MenuProvider>
        <CartProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Navbar />
            <main className="pt-20">
              <Routes>
                <Route path="/" element={
                  <PageTransition>
                    <Index />
                  </PageTransition>
                } />
                <Route path="/menu" element={
                  <PageTransition>
                    <Menu />
                  </PageTransition>
                } />
                <Route path="/cart" element={
                  <PageTransition>
                    <Cart />
                  </PageTransition>
                } />
                <Route path="/payment" element={
                  <PageTransition>
                    <Payment />
                  </PageTransition>
                } />
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </MenuProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
