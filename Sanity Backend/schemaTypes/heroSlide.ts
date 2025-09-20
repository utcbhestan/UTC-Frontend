import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.max(100).error('Title should be 100 characters or less.'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: (Rule) => Rule.max(200).error('Subtitle should be 200 characters or less.'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Image is required.'),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Text',
      type: 'string',
      validation: (Rule) => Rule.max(50).error('CTA text should be 50 characters or less.'),
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'string',
      validation: (Rule) => Rule.max(100).error('CTA link should be 100 characters or less.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
  },
});