"use client"
import fetchImages from "../lib/getImage";
import type { ImagesResults } from "../api/Image";
import React, { useEffect, useState } from 'react';

const Gallery = () => {
  const [images, setImages] = useState<ImagesResults | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://www.pexels.com/v1/curated';
      const fetchedImages: ImagesResults | undefined = await fetchImages(url);
      setImages(fetchedImages);
    };

    fetchData();
  }, []);

  if (!images) return <h2 className="m-4 text-2xl font-bold">No image found</h2>;

  return (
    <section>
      <ul>
        {images.photos.map((photo) => (
          <li key={photo.id}>{photo.src.large}</li>
        ))}
      </ul>
    </section>
  );
};

export default Gallery;