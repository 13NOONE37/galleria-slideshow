import React, { FC } from 'react';
import { IconType } from './IconType';

const Back: FC<IconType> = ({ className = '' }) => (
  <svg
    viewBox="0 0 26 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="none" fillRule="evenodd">
      <path
        d="M24.166 1.843L3.627 12.113l20.539 10.269V1.843z"
        strokeWidth="2"
      />
      <path d="M.986.5h-1v22.775h1z" />
    </g>
  </svg>
);

export default Back;
