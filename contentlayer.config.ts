import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Painting = defineDocumentType(() => ({
  name: 'Painting',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    postDate: { type: 'date', required: true },
    title: { type: 'string', required: true },
    year: { type: 'string', required: true },
    source: { type: 'string', required: true },
    artist_name: { type: 'string', required: true },
    artist_image: { type: 'string', required: true },
    thumbnail: { type: 'string', required: true },
    hero_large: { type: 'string', required: true },
    hero_small: { type: 'string', required: true },
    gallery: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (painting) => `paintings/${painting._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'paintings',
  documentTypes: [Painting],
});
