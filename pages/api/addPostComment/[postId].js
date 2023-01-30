import {ObjectId} from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import {unstable_getServerSession} from 'next-auth/next';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res);

  if (req.method !== 'POST' && !session) {
    res.status(405).json({name: 'Method Not Allowed'});
    return;
  }
  const client = await clientPromise;
  const db = client.db('desahogate');
  const {comment, userId} = req.body;
  const {postId} = req.query;

  const post = await db.collection('posts').updateOne(
    {
      _id: ObjectId(postId),
    },
    {
      $addToSet: {comments: {...comment, userId: ObjectId(userId)}},
    }
  );

  res.json(post);
};
