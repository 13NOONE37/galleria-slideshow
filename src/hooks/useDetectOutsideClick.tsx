'use client';

import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

const useDetectOutsideClick = (
  ref: RefObject<HTMLElement>,
  setState: Dispatch<SetStateAction<boolean>>,
) => {
  const listener = (e: MouseEvent | TouchEvent) => {
    if (!ref.current || ref.current.contains(e.target as Node)) return;
    setState(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, []);
};

export default useDetectOutsideClick;
