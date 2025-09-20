import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { client } from "@/utils/sanityClient";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  type: string;
  thumbnailUrl: string;
  mediaUrl: string;
  description: string;
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const query = `*[_type == "galleryItem"]{
          _id,
          title,
          category,
          type,
          description,
          "thumbnailUrl": thumbnail.asset->url,
          "mediaUrl": media.asset->url
        }`;
        const data = await client.fetch(query);
        setGalleryItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Sanity fetch error:", err);
        setError("Failed to fetch gallery data");
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 max-w-7xl text-center py-10">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 max-w-7xl text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="py-0">
      {/* Hero Section */}
      <section className="bg-muted/30 py-10">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our vibrant learning environment, student achievements, and
            memorable moments at UTC
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Category Selector */}
        <section className="py-8 pt-6">
          {/* Show dropdown on small screens */}
          <div className="block md:hidden mb-0">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="classroom">Classroom</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="activities">Activities</SelectItem>
                <SelectItem value="experiments">Experiments</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Show button-tabs on medium+ screens */}
          <div className="hidden md:block">
            <div className="flex gap-4 justify-center">
              {["all", "classroom", "events", "activities", "experiments"].map(
                (category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item._id}
                className={`card-hover overflow-hidden fade-in stagger-delay-${
                  (index % 4) + 1
                } cursor-pointer`}
                onClick={() => openLightbox(item)}
              >
                <div className="relative group">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Type Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={item.type === "video" ? "destructive" : "secondary"}
                    >
                      {item.type === "video" ? "Video" : "Photo"}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No items found in this category.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              onClick={closeLightbox}
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="bg-white dark:bg-neutral-900 dark:text-neutral-200 rounded-lg overflow-hidden shadow-lg">
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              ) : (
                <img
                  src={selectedItem.mediaUrl || selectedItem.thumbnailUrl}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-muted-foreground">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
