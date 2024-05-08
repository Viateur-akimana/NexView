import { ImagesResults, ImagesSchemaWithPhotos } from "../api/Image"; 

export default async function fetchImages(): Promise<ImagesResults | undefined> {
  try {
    const response = await fetch('/api/pexels');

    if (!response.ok) {
      const errorData = await response.json() as { error: string };
      throw new Error(`Error fetching images: ${errorData.error}`);
    }

    const imageResult: ImagesResults = await response.json();
    if (ImagesSchemaWithPhotos.safeParse(imageResult).success) {
      return imageResult;
    } else {
      console.error("Failed to validate response data.");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching images:", (error as Error).message);
    return undefined;
  }
}
