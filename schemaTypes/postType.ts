import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      description: 'YouTube or other video embed URL',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'externalSource',
      type: 'url',
      description: 'URL to fetch markdown content from (e.g., https://fergusfinn.com/blog/my-post/md). When set, body is fetched from this URL at build time.',
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Short description for SEO and previews. Required for syndicated posts.',
    }),
    defineField({
      name: 'canonicalUrl',
      type: 'url',
      description: 'Original source URL for syndicated content. Used for SEO canonical link.',
    }),
    defineField({
      name: 'body',
      type: 'markdown',
      description: 'A Github flavored markdown field with image uploading',
      hidden: ({ document }) => !!document?.externalSource,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Images used in this post. Reference them in markdown using the filename.',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'filename',
              type: 'string',
              title: 'Filename',
              description: 'Use this name to reference the image in markdown: ![Alt](filename.png)',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Important for accessibility and SEO',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption to display below the image',
            },
          ],
        },
      ],
    }),
  ],
})
