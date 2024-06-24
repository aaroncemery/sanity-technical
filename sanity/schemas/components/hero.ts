import { defineType, defineField } from 'sanity';
import { VenetianMask } from 'lucide-react';

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: VenetianMask,
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
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctas',
      title: 'CTAs',
      type: 'array',
      of: [{ type: 'cta' }],
      validation: (Rule) => Rule.required().max(2),
    }),
  ],
});

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Href',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Link', value: 'link' },
          { title: 'Button', value: 'button' },
        ],
        layout: 'radio',
      },
    }),
  ],
});
