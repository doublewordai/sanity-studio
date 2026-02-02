import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroTitleMuted',
      title: 'Hero Title (Muted)',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    }),
    defineField({
      name: 'featuredGuides',
      title: 'Featured Guides',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'docPage'}]}],
    }),
  ],
})
