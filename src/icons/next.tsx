import React, { FC } from 'react';
import { IconType } from './IconType';

const Next: FC<IconType> = ({ className = '' }) => (
  <svg
    viewBox="0 0 26 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M1.528 1.843l20.538 10.27L1.528 22.382V1.843z" strokeWidth="2" />
      <path d="M24.708.5h1v22.775h-1z" />
    </g>
  </svg>
);

export default Next;
