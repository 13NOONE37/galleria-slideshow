import React from 'react';
import { FC } from 'react';
import styles from './page.module.css';

interface pageProps {
  params: {
    slug: string;
  };
}
const page: FC<pageProps> = async ({ params }) => {
  //   const data = (await getProduct(params.slug)) as ApiProductProduct;

  return <section className={styles.container}>{params.slug}</section>;
};

export default page;

// export async function generateMetadata({
//   params,
// }: pageProps): Promise<Metadata> {
//   const data = (await getProduct(params.slug)) as ApiProductProduct;
//   console.log('⭕⭕', data);
//   if (!data) return {};
//   return {
//     title: `${data.attributes.name}`,
//     description: `${data.attributes.short_description}`,
//     openGraph: {
//       type: 'website',
//       siteName: 'Audiophile store',
//       title: `${data.attributes.name}`,
//       description: `${data.attributes.short_description}`,
//       images: [
//         {
//           url: `${process.env.API_URL}${data.attributes.cart_image}`,
//           width: 150,
//           height: 150,
//           alt: data.attributes.name,
//         },
//         {
//           url: `${process.env.API_URL}${data.attributes.product_image.mobile.data.attributes.url}`,
//           width: 654,
//           height: 654,
//           alt: data.attributes.product_image.alt_text,
//         },
//       ],
//     },
//   };
// }
