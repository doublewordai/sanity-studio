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
      type: 'string',
      options: {
        list: [
          {title: 'Getting Started', value: 'getting-started'},
          {title: 'Usage', value: 'usage'},
          {title: 'Reference', value: 'reference'},
          {title: 'API', value: 'api'},
          {title: 'Deployment', value: 'deployment'},
        ],
      },
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
      name: 'body',
      title: 'Body',
      type: 'markdown',
      validation: (Rule) => Rule.required(),
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
      subtitle: 'category',
      product: 'product.name',
    },
    prepare(selection) {
      const {title, subtitle, product} = selection
      return {
        title: title,
        subtitle: `${product} - ${subtitle}`,
      }
    },
  },
})
