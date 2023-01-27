import {ObjectId} from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('desahogate');
    const {message, userId} = req.body;

    const post = await db.collection('posts').insertOne({
      ...message,
      created_at: Date.now(),
      userId: ObjectId(userId),
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
