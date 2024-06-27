import React from 'react';
import cx from 'classnames';
import { FC } from 'react';
import styles from './page.module.css';
import { allPaintings } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import PaintingBody from '@/components/painting/paintingBody/paintingBody';
import PaintingHead from '@/components/painting/paintingHead/paintingHead';
import { Metadata } from 'next';

interface pageProps {
  params: {
    slug: string;
  };
}

export const generateStaticParams = async () =>
  allPaintings.map((painting) => ({ slug: painting._raw.flattenedPath }));

export function generateMetadata({ params }: pageProps): Metadata {
  const painting = allPaintings.find(
    (painting) => painting._raw.flattenedPath === params.slug,
  );
  if (!painting) return {};

  return {
    alternates: {
      canonical: painting.url,
    },
    title: painting.title,
    description: painting.body.raw,
    keywords: `${painting.artist.name}, ${painting.title}`,
    openGraph: {
      title: painting.title,
      description: painting.body.raw,
      images: painting.hero.small.src,
      url: painting.url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: painting.title,
      description: painting.body.raw,
      images: painting.hero.small.src,
    },
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const painting = allPaintings.find(
    (painting) => painting._raw.flattenedPath === params.slug,
  );
  if (!painting) notFound();

  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'Painting',
    name: painting.title,
    creator: {
      '@type': 'Person',
      name: painting.artist.name,
    },
    dateCreated: painting.year,
    image: painting.gallery.src,
    description: painting.body.raw,
    url: painting.url,
  };

  return (
    <section className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PaintingHead
        title={painting.title}
        artist={painting.artist}
        hero={painting.hero}
        gallery={painting.gallery}
      />
      <PaintingBody
        year={painting.year}
        body={painting.body}
        source={painting.source}
      />
    </section>
  );
};

export default page;
