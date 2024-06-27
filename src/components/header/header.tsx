'use client';
import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './header.module.css';
import fonts from '@/styles/fonts.module.css';
import Logo from '@/icons/logo';
import { usePathname, useRouter } from 'next/navigation';
import Unmuted from '@/icons/unmuted';
import Muted from '@/icons/muted';

const Header = () => {
  const router = useRouter();
  const path = usePathname();
  const isPaintingPage = path.startsWith('/paintings/');

  const slideButton_class = cx(
    styles.slideButton,
    fonts['gallery--slideButton'],
  );
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
  };
  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsAudioPlaying(true);
    const handlePause = () => setIsAudioPlaying(false);
    audio.volume = 0.5;

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  });

  return (
    <header className={styles.header}>
      <button className={styles.logo} onClick={() => router.push('/')}>
        <Logo />
      </button>
      <div className={styles['header--controls']}>
        <audio ref={audioRef} loop>
          <source src="/background-music.mp3" type="audio/mpeg" />
        </audio>
        <button
          className={styles.playButton}
          onClick={isAudioPlaying ? pauseAudio : playAudio}
          aria-roledescription="Play/mute background music"
        >
          {isAudioPlaying ? <Unmuted /> : <Muted />}
        </button>
        <button
          className={slideButton_class}
          onClick={() =>
            router.push(isPaintingPage ? '/' : '/paintings/starry-night')
          }
        >
          {isPaintingPage ? 'Stop slideshow' : 'Start slideshow'}
        </button>
      </div>
    </header>
  );
};

export default Header;
