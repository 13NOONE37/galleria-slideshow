import SlideNavigation from '@/components/slideNavigation/slideNavigation';
import { allPaintings } from 'contentlayer/generated';
import React, { ReactNode } from 'react';

const ArtLayout = ({ children }: { children: ReactNode }) => {
  const paintings = allPaintings.sort(
    (a, b) => a.publishTimestamp - b.publishTimestamp,
  );

  return (
    <>
      {children}
      <SlideNavigation paintings={paintings} />
    </>
  );
};

export default ArtLayout;
