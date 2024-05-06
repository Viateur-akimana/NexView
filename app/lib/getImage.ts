import { throwDeprecation } from "process";
import type { ImagesResults } from "../api/Image";
import { ImagesSchemaWithPhotos } from "../api/Image";

export default async function fetchImages(url: string): Promise<ImagesResults | undefined> {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    });

    if (!response.ok) throw new Error("No image found");

    const imageResult: ImagesResults = await response.json();
    const validatedImages = ImagesSchemaWithPhotos.safeParse(imageResult);
    if(validatedImages.data?.total_results === 0) throw undefined;
    return validatedImages;
  } catch (error) {
    if(e instanceof Error) console.log(e.stack);
    
  }
}