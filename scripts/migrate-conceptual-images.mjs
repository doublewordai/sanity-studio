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

// Images to upload with their metadata
const imagesToUpload = [
  {
    postId: 'drafts.5e4f1919-01fc-46dc-b58b-a5dc6f408627',
    localPath: '/Users/fergus/Documents/doubleword/docs/conceptual/assets/slack_message.png',
    filename: 'slack_message.png',
    alt: 'Slack message showing research digest with paper recommendations',
    caption: 'The final digest lands in Slack as a rich, formatted message showing relevant papers with scores and insights'
  },
  {
    postId: 'drafts.c8d6dd56-b15a-49c2-88e1-14612933b365',
    localPath: '/Users/fergus/Documents/doubleword/docs/conceptual/assets/batch.png',
    filename: 'batch.png',
    alt: 'Diagram showing the progression from interactive AI assistants to autonomous batch workloads',
    caption: 'Workloads that operate with more autonomy deliver higher value to organizations'
  },
  {
    postId: 'drafts.f66245e0-387c-46e9-8e8a-acb48c5a4073',
    localPath: '/Users/fergus/Documents/doubleword/docs/conceptual/assets/benchmarking.png',
    filename: 'benchmarking.png',
    alt: 'Comic showing the typical progression of performance benchmarking articles',
    caption: 'Fig. 1: How these sorts of articles go. From a paper on benchmarking in DBMS.'
  }
];

async function uploadImage(localPath, filename) {
  console.log(`Uploading ${filename}...`);

  const asset = await client.assets.upload('image', createReadStream(localPath), {
    filename: filename,
  });

  console.log(`✓ Uploaded: ${asset.url}`);
  return asset._id;
}

async function migrateImages() {
  console.log('Starting image migration for conceptual guides...\n');

  for (const imageData of imagesToUpload) {
    console.log(`\nProcessing ${imageData.filename} for post ${imageData.postId}...`);

    // Upload the image
    const assetId = await uploadImage(imageData.localPath, imageData.filename);

    // Update the post with the image data
    const imageObject = {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId,
      },
      filename: imageData.filename,
      alt: imageData.alt,
      caption: imageData.caption,
    };

    console.log(`Updating post ${imageData.postId}...`);

    await client
      .patch(imageData.postId)
      .set({ images: [imageObject] })
      .commit();

    console.log(`✓ Post updated with image`);
  }

  console.log('\n✅ Migration complete! All images uploaded and posts updated.');
}

migrateImages().catch(console.error);
