import clientPromise from '../../lib/mongodb';
import {ObjectId} from 'mongodb';

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({name: 'Method Not Allowed'});
    return;
  }

  const client = await clientPromise;
  const db = client.db('desahogate');
  const {userId} = req.query;

  const user = await db.collection('users').findOne({
    _id: ObjectId(userId),
  });

  res.json(user);
};
