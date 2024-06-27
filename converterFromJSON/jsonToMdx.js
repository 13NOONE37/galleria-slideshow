const sharp = require('sharp');
const fs = require('fs').promises;
const slugify = require('slugify');

const getFilePath = (name) => name.replace('./assets', '/paintings');

const getImageDimensions = async (imagePath) => {
  try {
    const metadata = await sharp(imagePath).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
    };
  } catch (error) {
    console.error('Error reading image dimensions:', error);
    return null;
  }
};

const TARGET_RESIZE_WIDTH = 20;
const generateLowResolutionImage = async (inputImagePath) => {
  try {
    // Read metadata of the input image
    const metadata = await sharp(inputImagePath).metadata();

    // Calculate height while maintaining aspect ratio
    const targetHeight = Math.round(
      metadata.height * (TARGET_RESIZE_WIDTH / metadata.width),
    );

    // Resize the image
    const lowResBuffer = await sharp(inputImagePath)
      .resize(TARGET_RESIZE_WIDTH, targetHeight)
      .toBuffer();

    const base64Image = `data:image/jpeg;base64,${lowResBuffer.toString(
      'base64',
    )}`;

    return base64Image;
  } catch (error) {
    console.error('Error generating low-resolution image:', error);
  }
};

const getProcessedImage = async (imageName) => {
  const path = getFilePath(imageName);
  const { width, height } = await getImageDimensions(`../public${path}`);
  const blurred = await generateLowResolutionImage(`../public${path}`);

  return {
    path,
    width,
    height,
    blurred,
  };
};

fs.readFile('./data.json', 'utf8').then((data) => {
  async function saveToFile(titleOfFile, mdxContent) {
    try {
      await fs.writeFile(`./content/${titleOfFile}.mdx`, mdxContent, 'utf8');
      console.log('File has been saved!');
    } catch (err) {
      console.log(err);
    }
  }

  const date = new Date();
  let publishTimestamp = date.getTime();
  async function processInstance(data) {
    publishTimestamp += 1;

    const artistImage = await getProcessedImage(data.artist.image);
    const thumbnailImage = await getProcessedImage(data.images.thumbnail);
    const heroSmallImage = await getProcessedImage(data.images.hero.small);
    const heroLargeImage = await getProcessedImage(data.images.hero.large);
    const galleryImage = await getProcessedImage(data.images.gallery);

    const mdxContent = `---
publishTimestamp: ${publishTimestamp}
title: ${data.name}
year: "${data.year}"
source: ${data.source}
artist: 
  name: ${data.artist.name}
  image:
    src: ${artistImage.path}
    width: ${artistImage.width}
    height: ${artistImage.height}
    blurred: ${artistImage.blurred}
thumbnail: 
    src: ${thumbnailImage.path}
    width: ${thumbnailImage.width}
    height: ${thumbnailImage.height}
    blurred: ${thumbnailImage.blurred}
hero:
    small:
      src: ${heroSmallImage.path}
      width: ${heroSmallImage.width}
      height: ${heroSmallImage.height}
      blurred: ${heroSmallImage.blurred}
    large:
      src: ${heroLargeImage.path}
      width: ${heroLargeImage.width}
      height: ${heroLargeImage.height}
      blurred: ${heroLargeImage.blurred}
gallery:
  src: ${galleryImage.path}
  width: ${galleryImage.width}
  height: ${galleryImage.height}
  blurred: ${galleryImage.blurred}
---
${data.description}
`;

    const titleOfFile = slugify(data.name, {
      lower: true,
    });
    await saveToFile(titleOfFile, mdxContent);
  }

  const jsonData = JSON.parse(data);
  jsonData.forEach((data) => {
    processInstance(data);
  });
});
