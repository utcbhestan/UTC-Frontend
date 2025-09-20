import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What is the batch size for each class?",
    answer: "We maintain small batch sizes of maximum 15 students to ensure personalized attention for every student."
  },
  {
    question: "Do you provide study materials?",
    answer: "Yes, comprehensive study materials, practice tests, and reference books are included in the program."
  },
  {
    question: "Can I change my batch timings?",
    answer: "Yes, subject to availability, you can request a batch change. We offer morning, evening, and weekend options."
  },
  {
    question: "What if I miss classes?",
    answer: "We provide makeup classes and recorded sessions for students who miss regular classes due to valid reasons."
  }
];

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
  ],
  details: "Our premium coaching program for Standards 1-12 focuses on building strong academic foundations and achieving top results. With weekly unit tests, students receive regular feedback to track progress and address gaps. Extra classes ensure deep understanding of complex topics, while one-on-one doubt-solving sessions provide tailored support. Live experiments and activity-based learning make concepts engaging, especially for younger students. We incorporate interactive digital tools, career counseling, and exam strategies to prepare students for board and competitive exams. Regular parent-teacher interactions ensure holistic development, fostering confidence and academic excellence across all Standards."
};

const WhatWeOffer = () => {
  return (
    <div className="py-0 bg-background">
      {/* Hero Section - Unchanged */}
      <section className="bg-muted/30 py-10">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">What We Offer</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium English medium coaching from 1st to 12th standard for academic excellence
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Offering Section */}
        <section className="py-8">
          <Card className="relative overflow-hidden shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-3xl bg-background border border-primary/20">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <CardHeader className="pb-6 text-center">
              <CardTitle className="text-3xl md:text-4xl font-extrabold text-primary pt-2">
                {offering.title}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
                {offering.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
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

              {/* Complete Details */}
              <p className="pb-2 text-base text-muted-foreground leading-relaxed text-justify max-w-6xl mx-auto">
                {offering.details}
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default WhatWeOffer;