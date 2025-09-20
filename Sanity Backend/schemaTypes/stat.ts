import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      validation: (Rule) => Rule.required().max(20).error('Number is required and should be 20 characters or less.'),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required().max(50).error('Label is required and should be 50 characters or less.'),
    }),
  ],
  preview: {
    select: {
      title: 'number',
      subtitle: 'label',
    },
  },
});