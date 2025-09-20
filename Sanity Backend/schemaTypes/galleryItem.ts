import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100).error('Title is required and should be 100 characters or less.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Classroom', value: 'classroom' },
          { title: 'Events', value: 'events' },
          { title: 'Activities', value: 'activities' },
          { title: 'Experiments', value: 'experiments' },
        ],
      },
      validation: (Rule) => Rule.required().error('Category is required.'),
    }),
    defineField({
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
      },
      validation: (Rule) => Rule.required().error('Media Type is required.'),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true, // Enable image hotspot for cropping
      },
      validation: (Rule) => Rule.required().error('Thumbnail Image is required.'),
    }),
    defineField({
      name: 'media',
      title: 'Media (Image or Video)',
      type: 'file',
      options: {
        accept: 'image/*,video/*', // Accept both images and videos
      },
      validation: (Rule) => Rule.required().error('Media file is required.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(200).error('Description is required and should be 200 characters or less.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'thumbnail',
    },
  },
});