import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100).error('Name is required and should be 100 characters or less.'),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required().max(100).error('Role is required and should be 100 characters or less.'),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule) => Rule.required().max(500).error('Content is required and should be 500 characters or less.'),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [
          { title: '1 Star', value: 1 },
          { title: '2 Stars', value: 2 },
          { title: '3 Stars', value: 3 },
          { title: '4 Stars', value: 4 },
          { title: '5 Stars', value: 5 },
        ],
      },
      validation: (Rule) => Rule.required().min(1).max(5).error('Rating is required and must be between 1 and 5.'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      description: 'content',
    },
  },
});