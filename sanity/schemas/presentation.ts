import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'presentation',
  title: 'Presentation',
  type: 'document',
  icon: '🎥',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{ type: 'slide' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
