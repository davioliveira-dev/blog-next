import { NextApiRequest, NextApiResponse } from 'next';

import connectToDatabase from '../../config/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.id;

  if (!slug) return res.json('Page not found!');

  const { db, client } = await connectToDatabase();

  if (!client.connectToDatabase()) {
    return res.status(500).json({ error: 'client DB is connected' });
  }

  const pageViewBySlug = await db.collection('pageviews').findOne({ slug });

  const total = pageViewBySlug ? pageViewBySlug.total : 0;

  return res.json({ total });
};
