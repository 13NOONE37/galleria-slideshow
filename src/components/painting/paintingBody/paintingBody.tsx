import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import styles from './paintingBody.module.css';
import fonts from '@/styles/fonts.module.css';
import { Painting } from 'contentlayer/generated';
import Link from 'next/link';
import Animate from '@/components/animate/animate';

type Props = Pick<Painting, 'year' | 'body' | 'source'>;
const PaintingBody: FC<Props> = ({ year, body, source }) => {
  return (
    <Animate
      className={styles.container}
      tag="div"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.7,
        ease: 'easeInOut',
      }}
      viewport={{ once: true }}
    >
      <h3 className={cx(styles.year, fonts['slide--year'])}>{year}</h3>

      <div
        className={cx(styles.body, fonts['slide--body'])}
        dangerouslySetInnerHTML={{ __html: body.raw }}
      />
      <Link
        href={source}
        target="_blank"
        className={cx(styles.source, fonts['slide--source'])}
      >
        Go to source
      </Link>
    </Animate>
  );
};

export default PaintingBody;
