import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logoIcon from "@/assets/logo.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Academics", href: "/courses" },
  { name: "Faculty", href: "/faculty" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={scrollToTop}>
          <img src={logoIcon} alt="UTC Logo" className="h-9 w-9" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary">Unique Tuition Classes</span>
            <span className="text-xs text-muted-foreground -mt-1">UTC</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={scrollToTop}
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive(item.href)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild className="btn-success">
            <Link to="/enroll" onClick={scrollToTop}>Enroll Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-9 w-9 px-0"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
                className={`block py-2 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild className="btn-success w-full">
                <Link to="/enroll" onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}>
                  Enroll Now
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}