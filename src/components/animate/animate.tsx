'use client';
import React, { FC, ReactNode } from 'react';
import { MotionProps, motion } from 'framer-motion';

type MotionTag = keyof typeof motion;

interface Props extends MotionProps {
  tag: MotionTag;
  children: ReactNode;
  className?: string;
}
const Animate: FC<Props> = ({ tag, children, className = '', ...props }) => {
  const MotionTag = motion[tag];
  return (
    <MotionTag className={className} {...props}>
      {children}
    </MotionTag>
  );
};

export default Animate;
