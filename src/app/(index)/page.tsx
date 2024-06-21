import Image from 'next/image';
import styles from './page.module.css';
import { allPaintings } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import Link from 'next/link';

export default function Home() {
  const paintings = allPaintings.sort((a, b) =>
    compareDesc(new Date(a.postDate), new Date(b.postDate)),
  );

  return (
    <div>
      {paintings.map((painting) => (
        <Link href={painting.url}>{painting.title}</Link>
      ))}
    </div>
  );
}
