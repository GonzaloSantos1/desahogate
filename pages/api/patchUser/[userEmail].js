import {ObjectId} from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import {unstable_getServerSession} from 'next-auth/next';
import {authOptions} from '..//auth/[...nextauth]';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method !== 'POST' && !session) {
    res.status(405).json({name: 'Method Not Allowed'});
    return;
  }
  const client = await clientPromise;
  const db = client.db('desahogate');
  const {username} = req.body;
  const {userEmail} = req.query;

  const post = await db.collection('users').updateOne(
    {
      email: userEmail,
    },
    {
      $set: {username: username},
    }
  );

  res.json(post);
};
