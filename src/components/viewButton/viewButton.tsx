'use client';
import React, { FC, MouseEventHandler } from 'react';
import cx from 'classnames';
import ViewIcon from '@/icons/view';
import styles from './viewButton.module.css';
import fonts from '@/styles/fonts.module.css';

const ViewButton: FC<{ className: string; onClick: MouseEventHandler }> = ({
  className,
  onClick,
}) => {
  return (
    <button
      className={cx(styles.button, fonts['slide--cta'], className)}
      type="button"
      onClick={onClick}
    >
      <ViewIcon />
      View Image
    </button>
  );
};

export default ViewButton;
