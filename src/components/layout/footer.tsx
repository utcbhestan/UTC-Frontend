import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logoIcon from "@/assets/logo.png";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Academics", href: "/courses" },
  { name: "Faculty", href: "/faculty" },
  { name: "Gallery", href: "/gallery" },
  { name: "Enroll", href: "/enroll" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/1M9KQmN3wA/" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/unique_tuition_classes" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@utcbhestan" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-10 max-w-7xl pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo & Description */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2">
              <img src={logoIcon} alt="UTC Logo" className="h-9 w-9" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">Unique Tuition Classes</span>
                <span className="text-xs opacity-80">UTC</span>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed max-w-xs">
              Providing personalized tuition for students from standards 1-12, 
              focusing on building strong foundations and achieving academic excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-2 justify-items-center md:justify-items-start">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={scrollToTop}
                  className={`text-sm transition-colors ${
                    isActive(link.href)
                      ? "opacity-100 text-success font-semibold"
                      : "opacity-90 hover:opacity-100 hover:text-success"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <div className="flex items-start space-x-3">
                <MapPin className="h-10 w-10 opacity-80" />
                <div className="text-sm">
                  <p className="pb-3"><strong>Branch 1: </strong>309 Omkar plaza, Infront of Priyanka green park, Jiav road, Bhestan, Surat.</p>
                  <p><strong>Branch 2: </strong>1st floor, Dhruv Park Gate no.7, Saniya Kande Road, Dindoli.</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 opacity-80" />
                <span className="text-sm">+91 7041965804</span>
                <span className="text-sm">+91 9664817059</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 opacity-80" />
                <span className="text-sm">utcbhestan@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Social Media & Map */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  aria-label={social.name}
                  target="_blank"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            
            {/* Operating Hours */}
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2">Operating Hours</h4>
              <p className="text-xs opacity-80">Mon-Sat: 3 PM - 8 PM</p>
              <p className="text-xs opacity-80">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pt-6 border-t border-white/20 flex justify-center items-center">
          <p className="text-sm opacity-80">
            © {currentYear} Unique Tuition Classes UTC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}