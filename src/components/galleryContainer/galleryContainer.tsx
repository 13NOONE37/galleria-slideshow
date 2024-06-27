'use client';
import { Painting } from 'contentlayer/generated';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './galleryContainer.module.css';
import fonts from '@/styles/fonts.module.css';
import { Masonry } from 'react-plock';
import Animate from '../animate/animate';

const GalleryContainer: FC<{ paintings: Painting[] }> = ({ paintings }) => {
  return (
    <div>
      <Masonry
        items={paintings}
        className={styles.container}
        config={{
          columns: [1, 2, 3, 4],
          gap: [40, 40, 40, 40],
          media: [535, 880, 1359, 1360],
        }}
        render={(painting) => (
          <Animate
            tag="div"
            style={{
              aspectRatio: `${painting.thumbnail.width}/${painting.thumbnail.height}`,
            }}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: 'easeInOut',
            }}
          >
            <Link
              className={styles.thumbnail}
              href={painting.url}
              key={painting._id}
            >
              <Image
                src={painting.thumbnail.src}
                alt={painting.title}
                width={painting.thumbnail.width}
                height={painting.thumbnail.height}
                placeholder="blur"
                blurDataURL={painting.thumbnail.blurred}
              />
              <div className={styles['thumbnail--content']}>
                <h2 className={fonts['thumb-title']}>{painting.title}</h2>
                <p className={fonts['thumb-author']}>{painting.artist.name}</p>
              </div>
            </Link>
          </Animate>
        )}
      />
    </div>
  );
};

export default GalleryContainer;
