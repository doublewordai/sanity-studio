import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = createClient({
  projectId: 'g1zo7y59',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
});

// Image mappings: { localPath: { filename: 'what to call it in markdown', alt: 'alt text', caption: 'optional caption' } }
const imagesToMigrate = {
  '/Users/fergus/Documents/doubleword/docs/conceptual/assets/summary_table_chargeback.png': {
    filename: 'summary_table_chargeback.png',
    alt: 'Summary table showing user resource consumption breakdown',
    caption: 'Example summary table from Doubleword Control Layer showing token usage by user and model'
  }
};

// Post ID to update
const POST_ID = 's7p7oVBibDU3hHsbuFctnQ'; // Chargeback post

async function uploadImage(localPath, metadata) {
  console.log(`Uploading ${localPath}...`);

  const asset = await client.assets.upload('image', createReadStream(localPath), {
    filename: metadata.filename,
  });

  console.log(`✓ Uploaded: ${asset.url}`);

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
    filename: metadata.filename,
    alt: metadata.alt,
    caption: metadata.caption,
  };
}

async function migrateImages() {
  console.log('Starting image migration...\n');

  // Upload all images
  const uploadedImages = [];
  for (const [localPath, metadata] of Object.entries(imagesToMigrate)) {
    const imageData = await uploadImage(localPath, metadata);
    uploadedImages.push(imageData);
  }

  console.log(`\n✓ Uploaded ${uploadedImages.length} images`);

  // Update the blog post
  console.log(`\nUpdating post ${POST_ID}...`);

  await client
    .patch(POST_ID)
    .set({ images: uploadedImages })
    .commit();

  console.log('✓ Post updated with images array');
  console.log('\n✅ Migration complete!');
  console.log('\nThe markdown reference ![image](./assets/summary_table_chargeback.png) will now work correctly.');
}

migrateImages().catch(console.error);
