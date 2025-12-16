import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      description: 'Job title',
    }),
    defineField({
      name: 'url',
      type: 'url',
      description: 'LinkedIn or personal website URL',
    }),
    defineField({
      name: 'image',
      type: 'image',
      description: 'Author profile image',
    }),
  ],
})
