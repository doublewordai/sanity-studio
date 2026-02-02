import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { markdownSchema } from 'sanity-plugin-markdown/next'
import { schemaTypes } from './schemaTypes'
import { resolveBlog } from './presentation/resolve-blog'
import { resolveDocs } from './presentation/resolve-docs'
import { media } from 'sanity-plugin-media'
import 'easymde/dist/easymde.min.css'

export default defineConfig({
  name: 'default',
  title: 'Doubleword API',

  projectId: 'g1zo7y59',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    markdownSchema(),
    media(),
    presentationTool({
      name: 'blog',
      title: 'Blog Preview',
      resolve: resolveBlog,
      previewUrl: {
        origin: typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? 'http://localhost:3000'
          : 'https://blog.doubleword.ai',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    presentationTool({
      name: 'docs',
      title: 'Docs Preview',
      resolve: resolveDocs,
      previewUrl: {
        origin: typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? 'http://localhost:3001'
          : 'https://docs.doubleword.ai',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
