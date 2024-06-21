import React from 'react';
import { FC } from 'react';
import styles from './page.module.css';
import { Painting } from 'contentlayer.config';
import { allPaintings } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface pageProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () =>
  allPaintings.map((painting) => ({ slug: painting._raw.flattenedPath }));

export const generateMetadata = ({ params }: pageProps) => {
  const painting = allPaintings.find(
    (painting) => painting._raw.flattenedPath === params.slug,
  );
  if (!painting) notFound();

  return { title: painting.title };
};

const page: FC<pageProps> = async ({ params }) => {
  const painting = allPaintings.find(
    (painting) => painting._raw.flattenedPath === params.slug,
  );
  if (!painting) notFound();

  return (
    <section className={styles.container}>
      {painting.title}
      {painting.artist_name}
    </section>
  );
};

export default page;
