'use client'
import React, { useEffect, useState } from 'react';
import type { ImagesResults } from "../api/Image";
import ImageContainer from './ImageContainer';
import fetchImages from "../lib/getImage";
const Gallery = () => {
  const [images, setImages] = useState<ImagesResults | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedImages = await fetchImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
  
    fetchData();
  }, []);

  if (!images) return <h2 className="m-4 text-2xl font-bold">Loading...</h2>;
  if (images.photos.length === 0) return <h2 className="m-4 text-2xl font-bold">No images found</h2>;

  return (
    <section className='px-2 my-3 grid gap-3 grid-cols-gallery' >
     
        {images.photos.map((photo) => (
          // eslint-disable-next-line react/jsx-key
          <ImageContainer photo={photo}/>
        ))}
    </section>
  );
};

export default Gallery;