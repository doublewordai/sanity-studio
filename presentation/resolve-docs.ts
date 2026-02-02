import {defineLocations, defineDocuments, type PresentationPluginOptions} from 'sanity/presentation'

export const resolveDocs: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {
      route: '/:product/:slug',
      filter: `_type == "docPage" && product->slug.current == $product && slug.current == $slug`,
    },
    {
      route: '/:product',
      filter: `_type == "product" && slug.current == $product`,
    },
    {
      route: '/',
      filter: `_type == "homepage"`,
    },
  ]),
  locations: {
    docPage: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
        productSlug: 'product->slug.current',
        productName: 'product->name',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/${doc?.productSlug}/${doc?.slug}`,
          },
          {
            title: doc?.productName || 'Product',
            href: `/${doc?.productSlug}`,
          },
          {
            title: 'Docs home',
            href: '/',
          },
        ],
      }),
    }),
    product: defineLocations({
      select: {
        name: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.name || 'Product',
            href: `/${doc?.slug}`,
          },
          {
            title: 'Docs home',
            href: '/',
          },
        ],
      }),
    }),
    homepage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [
          {
            title: 'Docs home',
            href: '/',
          },
        ],
      }),
    }),
  },
}
