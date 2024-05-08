import type { NextApiRequest, NextApiResponse } from 'next';
import pexelsProxy from './proxy';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  pexelsProxy(req, res);
}