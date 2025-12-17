import {defineLocations, defineDocuments, type PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    {
      route: '/:slug',
      filter: `_type == "post" && slug.current == $slug`,
    },
  ]),
  locations: {
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/${doc?.slug}`,
          },
          {
            title: 'Posts index',
            href: '/',
          },
        ],
      }),
    }),
  },
}
