import styles from './page.module.css';
import { allPaintings } from 'contentlayer/generated';
import GalleryContainer from '@/components/galleryContainer/galleryContainer';

export default function Home() {
  const paintings = allPaintings.sort(
    (a, b) => a.publishTimestamp - b.publishTimestamp,
  );

  return (
    <div className={styles.galleryContainer}>
      <GalleryContainer paintings={paintings} />
    </div>
  );
}
