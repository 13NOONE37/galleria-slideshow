'use client';
import React, { FC, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './paintingHead.module.css';
import fonts from '@/styles/fonts.module.css';
import ViewButton from '@/components/viewButton/viewButton';
import { Painting } from 'contentlayer/generated';
import Image from 'next/image';
import useDetectOutsideClick from '@/hooks/useDetectOutsideClick';
import FocusTrap from 'focus-trap-react';
const ButtonAndLightbox: FC<Pick<Painting, 'title' | 'gallery'>> = ({
  title,
  gallery,
}) => {
  const containerRef = useRef(null);
  const [showLightbox, setShowLightbox] = useState(false);

  useDetectOutsideClick(containerRef, setShowLightbox);
  return (
    <>
      <ViewButton
        className={styles.viewButton}
        onClick={(e) => {
          setShowLightbox(true);
        }}
      />
      <div
        className={cx(styles.lightbox, {
          [styles['lightbox__visible']]: showLightbox,
        })}
      >
        <FocusTrap active={showLightbox}>
          <div className={styles['lightbox--content']}>
            <button
              className={cx(
                styles['lightbox--close'],
                fonts['lightbox--close'],
              )}
              onClick={() => setShowLightbox(false)}
            >
              Close
            </button>
            <div
              className={styles['lightbox--imageContainer']}
              ref={containerRef}
            >
              <Image
                src={gallery.src}
                alt={title}
                width={gallery.width}
                height={gallery.height}
                loading="lazy"
                placeholder="blur"
                quality={100}
                blurDataURL={gallery.blurred}
                style={{ aspectRatio: gallery.width + '/' + gallery.height }}
              />
            </div>
          </div>
        </FocusTrap>
      </div>
    </>
  );
};

export default ButtonAndLightbox;
