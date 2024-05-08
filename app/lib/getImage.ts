import { ImagesSchemaWithPhotos } from "../api/Image";
import type { ImagesResults } from "../api/Image";

export default async function fetchImages(): Promise<ImagesResults | undefined> {
  try {
    const response = await fetch('/api/pexels');

    if (!response.ok) throw new Error("No image found");

    const imageResult: ImagesResults = await response.json();
    const validatedImageResult = ImagesSchemaWithPhotos.safeParse(imageResult);

    if (validatedImageResult.data?.total_results === 0) return undefined;

    return validatedImageResult.data;
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);
    return undefined;
  }
}