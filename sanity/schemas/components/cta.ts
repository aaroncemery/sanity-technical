import { defineType, defineField } from 'sanity';
import { SquareArrowUpRight, Link } from 'lucide-react';

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

  preview: {
    select: {
      href: 'href',
      ctaText: 'ctaText',
      type: 'type',
    },
    prepare({ href, ctaText, type }) {
      return {
        title: ctaText,
        subtitle: href,
        media: type === 'link' ? Link : SquareArrowUpRight,
      };
    },
  },
});
