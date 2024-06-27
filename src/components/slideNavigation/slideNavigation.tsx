'use client';
import React, { FC, useEffect, useState } from 'react';
import { Painting } from 'contentlayer/generated';
import { notFound, usePathname, useRouter } from 'next/navigation';
import cx from 'classnames';

import styles from './slideNavigation.module.css';
import fonts from '@/styles/fonts.module.css';
import NextIcon from '@/icons/next';
import BackIcon from '@/icons/back';
import Link from 'next/link';

const SlideNavigation: FC<{ paintings: Painting[] }> = ({ paintings }) => {
  const router = useRouter();
  const path = usePathname();

  const [index, setIndex] = useState(
    paintings.findIndex(({ url }) => `/${url}` === path),
  );
  const doesPrevExist = index > 0;
  const doesNextExist = index < paintings.length - 1;
  const getPaintingPath = (index: number) => `/${paintings[index].url}`;

  useEffect(() => {
    if (index === -1) notFound();

    doesPrevExist && router.prefetch(getPaintingPath(index - 1));
    doesNextExist && router.prefetch(getPaintingPath(index + 1));
  }, [index]);

  const goBack = () => {
    if (doesPrevExist) {
      router.push(getPaintingPath(index - 1), { scroll: false });
      setIndex((i) => i - 1);
    }
  };
  const goNext = () => {
    if (doesNextExist) {
      router.push(getPaintingPath(index + 1), { scroll: false });
      setIndex((i) => i + 1);
    }
  };

  return (
    <nav className={styles.navigation}>
      <div
        className={styles['navigation--progress']}
        style={{ ['--progress' as string]: (index + 1) / paintings.length }}
      ></div>

      <div className={styles['navigtion--description']}>
        <h2 className={fonts['slide--nav-title']}>{paintings[index].title}</h2>
        <p className={fonts['slide--nav-author']}>
          {paintings[index].artist.name}
        </p>
      </div>

      <div className={styles['navigation--controls']}>
        <button
          onClick={goBack}
          className={styles['controls--button']}
          disabled={!doesPrevExist}
        >
          <BackIcon />
        </button>
        <button
          onClick={goNext}
          className={styles['controls--button']}
          disabled={!doesNextExist}
        >
          <NextIcon />
        </button>
      </div>
    </nav>
  );
};

export default SlideNavigation;
