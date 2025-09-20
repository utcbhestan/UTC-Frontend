import { useEffect, useState } from "react";
import { Users, Award, TrendingUp, DollarSign, BookOpen, Clock, MessageCircle, Layers, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/utils/sanityClient";

const features = [
  {
    icon: Users,
    title: "Experienced Faculty",
    description: "Learn from qualified teachers with 10+ years of experience",
    color: "text-blue-600"
  },
  {
    icon: Award,
    title: "Small Batch Sizes",
    description: "Maximum 15 students per batch for personalized attention",
    color: "text-green-600"
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "95% of our students achieve their target grades",
    color: "text-purple-600"
  },
  {
    icon: DollarSign,
    title: "Affordable Fees",
    description: "Quality education at competitive prices with flexible payment",
    color: "text-orange-600"
  },
  {
    icon: BookOpen,
    title: "Comprehensive Study Material",
    description: "Updated curriculum materials and practice tests included",
    color: "text-red-600"
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Morning, evening, and weekend batches available",
    color: "text-indigo-600"
  },
  {
    icon: MessageCircle,
    title: "One-on-One Doubt Solving",
    description: "Personalized sessions to address individual queries and clarify concepts",
    color: "text-teal-600"
  },
  {
    icon: Layers,
    title: "Extra Classes",
    description: "Additional sessions for concept reinforcement and deeper understanding",
    color: "text-pink-600"
  },
  {
    icon: FileText,
    title: "Weekly Unit Tests",
    description: "Regular assessments to track progress and ensure mastery",
    color: "text-yellow-600"
  }
];

interface Stat {
  _id: string;
  number: string;
  label: string;
}

export function WhyChooseUs() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const query = '*[_type == "stat"]{ _id, number, label }';
        const data = await client.fetch(query);
        setStats(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="py-8 pb-4 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose UTC?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best learning experience for every student
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className={`card-hover text-center fade-in stagger-delay-${index + 1}`}>
              <CardContent className="p-6">
                <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-primary-foreground fade-in">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Achievements</h3>
            <p className="text-lg opacity-90">Numbers that speak for our excellence</p>
          </div>
          
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : stats.length === 0 ? (
            <div className="text-center">No statistics available</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={stat._id} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-success mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}