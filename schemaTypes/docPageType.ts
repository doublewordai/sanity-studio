import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'docPage',
  title: 'Documentation Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort pages within a category',
    }),
    defineField({
      name: 'parent',
      title: 'Parent Page',
      type: 'reference',
      to: [{type: 'docPage'}],
      description: 'Optional parent page for nested documentation',
    }),
    defineField({
      name: 'linkedPost',
      title: 'Linked Blog Post',
      type: 'reference',
      to: [{type: 'post'}],
      description: 'Link to a blog post to transclude its content. When set, the blog post content will be displayed instead of the body field.',
    }),
    defineField({
      name: 'externalSource',
      title: 'External Source',
      type: 'url',
      description: 'URL to fetch markdown content from (e.g., raw GitHub README). Takes precedence over body.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'markdown',
      validation: (Rule) => Rule.custom((body, context) => {
        const doc = context.document as any
        if (!body && !doc?.linkedPost && !doc?.externalSource) {
          return 'Either body content, a linked post, or an external source is required'
        }
        return true
      }),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Images used in this document. Reference them in markdown using the filename.',
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
    defineField({
      name: 'sidebarLabel',
      title: 'Sidebar Label',
      type: 'string',
      description: 'Override the title shown in the sidebar',
    }),
    defineField({
      name: 'hideTitle',
      title: 'Hide Title',
      type: 'boolean',
      description: 'Hide the title on the page',
    }),
    defineField({
      name: 'externalLinkIcon',
      title: 'External Link Icon',
      type: 'boolean',
      description: 'Show external link icon in sidebar (for pages like API Reference)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'SEO description and preview text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.name',
      product: 'product.name',
    },
    prepare(selection) {
      const {title, category, product} = selection
      return {
        title: title,
        subtitle: `${product} - ${category}`,
      }
    },
  },
})
