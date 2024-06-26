import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'slide',
  title: 'Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'titleSlide',
      title: 'Title Slide',
      type: 'boolean',
      initialValue: false,
    }),
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
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
});
