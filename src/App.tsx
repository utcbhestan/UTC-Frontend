import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Gallery from "./pages/Gallery";
import Enroll from "./pages/Enroll";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/Admin";

// Welcome Animation Component
import WelcomeAnimation from "./components/WelcomeAnimation";

const queryClient = new QueryClient();

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Show welcome animation every time the page loads
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000); // Animation lasts 3 seconds
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              {showWelcome ? (
                <WelcomeAnimation onComplete={() => setShowWelcome(false)} />
              ) : (
                <>
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/faculty" element={<Faculty />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/enroll" element={<Enroll />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              )}
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;