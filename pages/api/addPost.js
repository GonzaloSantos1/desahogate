import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('desahogate');
    const {message} = req.body;

    const post = await db.collection('posts').insertOne({
      ...message,
      created_at: Date.now(),
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
