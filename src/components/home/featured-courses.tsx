import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const offering = {
  title: "Premium Academic Coaching (Standards 1-12)",
  description: "Comprehensive English medium coaching for Standards 1-12 designed to deliver exceptional results through structured learning, personalized attention, and innovative teaching methods.",
  features: [
    "Weekly unit tests for continuous assessment",
    "Extra classes for concept reinforcement",
    "One-on-one personal doubt-solving sessions",
    "Live experiments for hands-on learning",
    "Personalized progress tracking and feedback",
    "Career counseling and exam strategy workshops",
    "Parent-teacher engagement for holistic development",
    "Activity-based learning for younger students",
    "Specialized tutoring for board and competitive exams"
  ]
};

export function FeaturedCourses() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium English medium coaching from 1st to 12th standard for academic excellence
          </p>
        </div>

        <div className="space-y-8">
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {offering.features.map((feature, index) => (
              <div
                key={feature}
                className="flex items-center space-x-4 p-4 rounded-xl bg-muted/40 transition-all duration-200 hover:bg-muted/60 hover:scale-105"
              >
                <svg
                  className="w-6 h-6 text-primary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-2 flex justify-center">
            <Button
              asChild
              className="px-7 py-6 text-lg font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300"
            >
              <Link to="/enroll" onClick={scrollToTop}>Enroll Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}