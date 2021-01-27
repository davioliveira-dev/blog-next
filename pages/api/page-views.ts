import { NextApiRequest, NextApiResponse } from 'next';

import connectToDatabase from '../../config/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.id;

  if (!slug) return res.json('Página não encontrada!');

  const { db, client } = await connectToDatabase();

  if (!client.isConnected()) {
    return res.status(500).json({ error: 'client DB is not connected' });
  }

  const pageViewBySlug = await db
    .collection('pageviews')
    .findOne({ slug });

  let total = 0;

  if (pageViewBySlug) {
    total = pageViewBySlug.total + 1;
    await db.collection('pageviews').updateOne({ slug }, { $set: { total } });
  } else {
    total = 1;
    await db.collection('pageviews').insertOne({ slug, total });
  }

  return res.status(200).json({ total });
};
