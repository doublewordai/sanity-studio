import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      description: 'The product this category belongs to',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort categories in the sidebar',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Optional parent category for nested categories',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional description of this category',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      order: 'order',
      parent: 'parent.name',
      product: 'product.name',
    },
    prepare(selection) {
      const {title, order, parent, product} = selection
      const orderText = `Order: ${order}`
      const productText = product ? `${product}` : 'No product'
      const subtitle = parent ? `${productText} | ${parent} > ${orderText}` : `${productText} | ${orderText}`
      return {
        title: title,
        subtitle,
      }
    },
  },
})
