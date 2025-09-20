import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Calendar } from "lucide-react";

export function CTASection() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-8 pt-4 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground text-center fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join UTC?
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards academic excellence. Join thousands of successful students 
            who achieved their goals with our expert guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-success text-lg px-8">
              <Link to="/enroll" onClick={scrollToTop}>
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="bg-white text-blue-900 text-lg px-8 border-none">
              <Link to="/contact" onClick={scrollToTop}>
                <Phone className="mr-2 h-5 w-5" />
                Schedule Demo Class
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Calendar className="h-6 w-6 mx-auto mb-2 text-success" />
                <p className="text-sm font-medium">Free Demo Class</p>
                <p className="text-xs opacity-80">Experience our teaching style</p>
              </div>
              <div>
                <Phone className="h-6 w-6 mx-auto mb-2 text-success" />
                <p className="text-sm font-medium">Instant Support</p>
                <p className="text-xs opacity-80">Get answers to all your queries</p>
              </div>
              <div>
                <ArrowRight className="h-6 w-6 mx-auto mb-2 text-success" />
                <p className="text-sm font-medium">Easy Enrollment</p>
                <p className="text-xs opacity-80">Simple online registration process</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}