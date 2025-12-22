import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { markdownSchema } from 'sanity-plugin-markdown/next'
import { schemaTypes } from './schemaTypes'
import { resolve } from './presentation/resolve'
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
      resolve,
      previewUrl: {
        origin: typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? 'http://localhost:3000'
          : 'https://blog.doubleword.ai',
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      allowOrigins: [
        'http://localhost:3000',
        'https://blog.doubleword.ai',
        'https://*.vercel.app',
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
