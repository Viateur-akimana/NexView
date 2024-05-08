'use client'
import React, { useEffect, useState } from 'react';
import fetchImages from '../lib/getImage';
import { ImagesResults } from '../api/Image'; // Assumed imported
import ImageContainer from './ImageContainer';

const Gallery = (): JSX.Element => {
  const [images, setImages] = useState<ImagesResults | undefined>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchImages().then(images => {
      setImages(images);
    }).catch(err => {
      setError(err.message);
    });
  }, []);

  if (error) return <h2 className="m-4 text-2xl font-bold">Error: {error}</h2>;
  if (!images) return <h2 className="m-4 text-2xl font-bold">Loading...</h2>;
  if (images.photos.length === 0) return <h2 className="m-4 text-2xl font-bold">No images found</h2>;

  return (
    <section className='px-2 my-3 grid gap-3 grid-cols-gallery'>
      {images.photos.map(photo => (
        <ImageContainer key={photo.id} photo={photo} />
      ))}
    </section>
  );
};

export default Gallery;
