import { useEffect, useState } from "react";
import { Users, Target, Lightbulb, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/utils/sanityClient";

const values = [
  {
    icon: Target,
    title: "Quality Education",
    description: "We provide top-notch education with updated curriculum and modern teaching methods"
  },
  {
    icon: Users,
    title: "Personalized Attention",
    description: "Small batch sizes ensure every student gets individual attention and support"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously innovate our teaching methods to make learning engaging and effective"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Our commitment to excellence has helped thousands of students achieve their goals"
  }
];

interface Stat {
  _id: string;
  number: string;
  label: string;
}

const About = () => {
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
        setError('Failed to fetch statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="py-0">
      {/* Hero Section */}
      <section className="bg-muted/30 py-10">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About UTC</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering students to achieve academic excellence through personalized education and expert guidance
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Our Story */}
        <section className="py-10 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in text-center">
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                <p>
                  Founded in 2017, Unique Tuition Classes UTC began with a simple mission: to provide 
                  quality education that makes a real difference in students' lives. What started as 
                  a small coaching center with just 20 students has grown into one of the most trusted 
                  educational institutions in the region.
                </p>
                <p>
                  Over the years, we have empowered countless students to unlock their full potential, 
                  with many securing top positions in their schools and competitive exams. Our success 
                  lies in our commitment to understanding each student's unique learning style and 
                  providing customized solutions.
                </p>
                <p>
                  Today, UTC stands as a beacon of educational excellence, continuing to evolve and 
                  adapt to meet the changing needs of modern education while maintaining our core 
                  values of quality, integrity, and student success.
                </p>
              </div>
            </div>
            <div className="bg-primary/5 p-8 rounded-2xl">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : stats.length === 0 ? (
                <div className="text-center">No statistics available</div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat) => (
                    <div key={stat._id} className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 bg-muted/30 -mx-4 px-4 rounded-2xl pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center fade-in">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To make learning fun, effective, and accessible for every student. We strive to 
                create an environment where students can discover their potential, build confidence, 
                and achieve academic excellence through innovative teaching methods and personalized attention.
              </p>
            </div>
            <div className="text-center fade-in">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading educational institution that transforms lives through quality education. 
                We envision a future where every student we teach becomes a confident, knowledgeable, 
                and successful individual who contributes positively to society.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-12 pb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              The principles that guide everything we do at UTC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className={`card-hover text-center fade-in stagger-delay-${index + 1}`}>
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Overview */}
        <section className="py-8 pt-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our dedicated faculty members bring years of experience and passion for teaching
            </p>
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl">
              <p className="text-lg mb-4">
                "At UTC, we don't just teach subjects - we mentor future leaders."
              </p>
              <p className="text-sm opacity-90">
                Meet our experienced faculty on the Faculty page to learn more about their qualifications and expertise.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;