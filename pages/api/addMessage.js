import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({name: 'Method Not Allowed'});
    return;
  }
  const client = await clientPromise;
  const db = client.db('posts');
  const {message} = req.body;

  const newMessage = {
    ...message,
    created_at: Date.now(),
  };
}
