import {ObjectId} from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('desahogate');
    const {userEmail} = req.query;

    const posts = await db.collection('users').find({email: userEmail}).toArray();

    res.json(posts);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
