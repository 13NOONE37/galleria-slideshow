import React from 'react';
import cx from 'classnames';
import styles from './header.module.css';
import fonts from '@/styles/fonts.module.css';
import Logo from '@/icons/logo';

const Header = () => {
  const header_class = cx(styles.header, fonts['gallery--slideButton']);
  return (
    <header className={header_class}>
      <Logo className={styles.logo} />
      <button>Start slideshow</button>
    </header>
  );
};

export default Header;
