import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faculty',
  title: 'Faculty',
  type: 'document',
  fields: [
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      validation: (Rule) => Rule.required().error('Profile image is required.'),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100).error('Name is required and should be 100 characters or less.'),
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      validation: (Rule) => Rule.required().max(100).error('Designation is required and should be 100 characters or less.'),
    }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications',
      type: 'string',
      validation: (Rule) => Rule.required().max(200).error('Qualifications are required and should be 200 characters or less.'),
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'string',
      validation: (Rule) => Rule.required().max(50).error('Experience is required and should be 50 characters or less.'),
    }),
    defineField({
      name: 'subjects',
      title: 'Subjects',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1).error('At least one subject is required.'),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(5).error('Rating is required and must be between 0 and 5.'),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      validation: (Rule) => Rule.required().max(500).error('Bio is required and should be 500 characters or less.'),
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'designation',
      media: 'profileImage',
    },
  },
});