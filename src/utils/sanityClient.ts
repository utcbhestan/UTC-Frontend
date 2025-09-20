import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize the Sanity client
export const client = createClient({
  projectId: 'lj7rynqu', // Replace with your actual Sanity project ID (e.g., 'abc123')
  dataset: 'production', // Replace with your actual dataset name (e.g., 'production')
  apiVersion: '2023-08-01', // Consistent API version for stable queries
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster queries, disable in development for fresher data
});

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: any): string {
  if (!source) {
    return ''; // Return empty string if source is invalid
  }
  return builder.image(source).auto('format').fit('max').url();
}