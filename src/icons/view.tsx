import React, { FC } from 'react';
import { IconType } from './IconType';

const View: FC<IconType> = ({ className = '' }) => (
  <svg
    viewBox="0 0 12 12"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.71407 0L9.21407 1.5L6.85693 3.85714L8.14264 5.14285L10.4998 2.78571L11.9998 4.28571V0H7.71407Z"
      fill="white"
    />
    <path
      d="M3.85714 6.85693L1.5 9.21407L0 7.71407V11.9998H4.28571L2.78571 10.4998L5.14285 8.14264L3.85714 6.85693Z"
      fill="white"
    />
    <path
      d="M8.14264 6.85693L6.85693 8.14264L9.21407 10.4998L7.71407 11.9998H11.9998V7.71407L10.4998 9.21407L8.14264 6.85693Z"
      fill="white"
    />
    <path
      d="M4.28571 0H0V4.28571L1.5 2.78571L3.85714 5.14285L5.14285 3.85714L2.78571 1.5L4.28571 0Z"
      fill="white"
    />
  </svg>
);

export default View;
