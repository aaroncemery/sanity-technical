import { defineType, defineField } from 'sanity';
import { SquareChevronUp } from 'lucide-react';

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  icon: SquareChevronUp,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
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
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  {
                    name: 'href',
                    title: 'Href',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    title: 'Open in new tab',
                    name: 'newTab',
                    type: 'boolean',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
});
