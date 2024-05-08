// pages/api/pexels.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface PexelsError {
  error: string;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<any | PexelsError>
) {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Pexels API key is not configured.' });
    return;
  }

  const url = 'https://api.pexels.com/v1/curated';
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey
      }
    });

    if (!response.ok) {
      const errorData: PexelsError = await response.json();
      res.status(response.status).json({ error: errorData.error || 'Failed to fetch data from Pexels' });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from Pexels.' });
  }
}
