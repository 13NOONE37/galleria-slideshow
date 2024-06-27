import { allPaintings } from 'contentlayer/generated';
import { notFound, redirect } from 'next/navigation';

const page = async () => {
  const painting = allPaintings.sort(
    (a, b) => a.publishTimestamp - b.publishTimestamp,
  );

  if (!painting) notFound();

  redirect(painting[0].url);
};

export default page;
