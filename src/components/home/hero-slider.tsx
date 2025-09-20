import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { client, urlFor } from "@/utils/sanityClient";

interface HeroSlide {
  _id: string;
  title?: string;
  subtitle?: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  cta?: string;
  ctaLink?: string;
  order?: number;
}

export function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // ✅ Updated query to include order & sort by order
        const query = `*[_type == "heroSlide"] | order(order asc) {
          _id,
          title,
          subtitle,
          image,
          cta,
          ctaLink,
          order
        }`;

        const data = await client.fetch(query);
        setSlides(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch hero slides");
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="h-[600px] md:h-[700px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] md:h-[700px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-[600px] md:h-[700px] flex items-center justify-center">
        No slides available
      </div>
    );
  }

  return (
    <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${urlFor(slide.image)})` }}
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center max-w-7xl">
            <div className="max-w-2xl text-white space-y-6 fade-in">
              {slide.title && (
                <h1 className="text-4xl md:text-6xl font-bold leading-tight hero-text-shadow">
                  {slide.title}
                </h1>
              )}
              {slide.subtitle && (
                <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                  {slide.subtitle}
                </p>
              )}
              {(slide.cta || slide.ctaLink) && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {slide.cta && slide.ctaLink && (
                    <Button asChild size="lg" className="btn-hero text-lg px-8">
                      <Link to={slide.ctaLink}>{slide.cta}</Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
