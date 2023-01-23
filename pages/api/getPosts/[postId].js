import {ObjectId} from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('posts');
    const {postId} = req.query;

    const posts = await db
      .collection('posts')
      .find({_id: ObjectId(postId)})
      .toArray();

    res.json(posts);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
