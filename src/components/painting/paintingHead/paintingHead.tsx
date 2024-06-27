import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import styles from './paintingHead.module.css';
import fonts from '@/styles/fonts.module.css';
import { Painting } from 'contentlayer/generated';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image, { getImageProps } from 'next/image';
import ButtonAndLightbox from './buttonAndLightbox';
import Animate from '@/components/animate/animate';

type Props = Pick<Painting, 'hero' | 'title' | 'artist' | 'gallery'>;
const PaintingHead: FC<Props> = ({ hero, title, artist, gallery }) => {
  const commonHeroImage: {
    alt: string;
    loading: 'lazy' | 'eager' | undefined;
    placeholder: PlaceholderValue;
    quality: number;
  } = {
    alt: artist.name,
    loading: 'eager',
    placeholder: 'blur',
    quality: 75,
  };

  const {
    props: { srcSet: smallHeroImage },
  } = getImageProps({
    ...commonHeroImage,
    src: hero.small.src,
    width: hero.small.width,
    height: hero.small.height,
    blurDataURL: hero.small.blurred,
  });
  const {
    props: { srcSet: largeHeroImage, ...rest },
  } = getImageProps({
    ...commonHeroImage,
    src: hero.large.src,
    width: hero.large.width,
    height: hero.large.height,
    blurDataURL: hero.large.blurred,
  });

  return (
    <Animate
      tag="div"
      className={styles.painting}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.05,
        ease: 'easeInOut',
      }}
      viewport={{ once: true }}
    >
      <picture>
        <source media="(min-width: 688px)" srcSet={largeHeroImage} />
        <source media="(max-width: 688px)" srcSet={smallHeroImage} />
        <img className={styles.heroImage} {...rest} />
      </picture>

      <ButtonAndLightbox title={title} gallery={gallery} />

      <div className={styles.description}>
        <div className={styles.credits}>
          <h1 className={cx(styles.title, fonts['slide--title'])}>{title}</h1>
          <h2 className={cx(styles['artist--name'], fonts['slide--artist'])}>
            {artist.name}
          </h2>
        </div>

        <Image
          className={styles['artist--picture']}
          src={artist.image.src}
          alt={artist.name}
          width={artist.image.width}
          height={artist.image.height}
          loading="lazy"
          placeholder="blur"
          blurDataURL={artist.image.blurred}
        />
      </div>
    </Animate>
  );
};

export default PaintingHead;
