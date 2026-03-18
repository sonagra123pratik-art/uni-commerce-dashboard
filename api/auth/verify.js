import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { token } = req.query;
  const secret = process.env.AUTH_JWT_SECRET || 'change-me';
  if (!token) return res.status(400).json({ error: 'missing token' });
  try {
    const payload = jwt.verify(token, secret);
    return res.status(200).json({ email: payload.email });
  } catch (e) {
    return res.status(400).json({ error: 'invalid or expired token' });
  }
}
