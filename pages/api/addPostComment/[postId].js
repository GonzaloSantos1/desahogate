import {ObjectId} from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({name: 'Method Not Allowed'});
    return;
  }
  const client = await clientPromise;
  const db = client.db('posts');
  const {comment} = req.body;
  const {postId} = req.query;

  const post = await db.collection('posts').updateOne(
    {
      _id: ObjectId(postId),
    },
    {
      $addToSet: {comments: {...comment}},
    }
  );

  res.json(post);
};
