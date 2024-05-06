import type { ImagesResults } from "../api/Image";
import { ImagesSchemaWithPhotos } from "../api/Image";
import env from "./env";

export default async function fetchImages(url: string): Promise<ImagesResults | undefined> {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      },
    });

    if (!response.ok) throw new Error("No image found");

    const imageResult: ImagesResults = await response.json();
    const validatedImages = ImagesSchemaWithPhotos.safeParse(imageResult);

    if (validatedImages.data?.total_results === 0) return undefined;

    return validatedImages.data;
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);
    return undefined;
  }
}