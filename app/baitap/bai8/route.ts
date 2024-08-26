import { NextApiRequest, NextApiResponse } from 'next';

const config = {
  username: 'john_doe',
  theme: 'dark',
  language: 'en',
  timezone: 'UTC+7',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(config);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}