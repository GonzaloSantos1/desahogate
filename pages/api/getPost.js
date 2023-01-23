import {ObjectId} from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('posts');
    const {params} = req;

    const posts = await db.collection('posts').find({params}).toArray();

    res.json(posts);
  } catch (e) {
    throw new Error(e).message;
  }
};
