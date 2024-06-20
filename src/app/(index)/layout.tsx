import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import styles from './layout.module.css';

const libre_baskerville = Libre_Baskerville({
  weight: ['700', '400'],
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Galleria',
  description: `Discover a curated collection of the world's most iconic artworks at Galleria. Explore masterpieces from Van Gogh, Vermeer, Picasso, and more. Dive into art history with detailed descriptions and stunning visuals.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={libre_baskerville.className}>
        <div className={styles.container}>
          <Header />
          <main className={styles.main}>{children}</main>
        </div>
      </body>
    </html>
  );
}
