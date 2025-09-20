import { HeroSlider } from "@/components/home/hero-slider";
import { FeaturedCourses } from "@/components/home/featured-courses";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { CTASection } from "@/components/home/cta-section";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      
      {/* Welcome Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-7xl text-center fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Welcome to Unique Tuition Classes UTC
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Unique Tuition Classes UTC provides personalized tuition for students from grades 1-12, 
            focusing on building strong foundations and achieving academic excellence. Our experienced 
            faculty and proven teaching methods have helped thousands of students succeed in their 
            academic journey.
          </p>
        </div>
      </section>

      <FeaturedCourses />
      <Testimonials />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
};

export default Home;
