import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'object',
  fields: [
    defineField({
      name: 'components',
      title: 'Components',
      type: 'array',
      of: [{ type: 'hero' }, { type: 'header' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
