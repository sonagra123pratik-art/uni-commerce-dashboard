import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function handler(req, res) {
  const { code } = req.query;
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const BASE_URL = process.env.BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173');
  const REDIRECT_URI = `${BASE_URL}/api/auth/callback`;

  if (!code) {
    res.status(400).send('Missing code');
    return;
  }

  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    })
  });

  const tokenJson = await tokenRes.json();
  if (!tokenJson.access_token) {
    res.status(500).send('Failed to get access token');
    return;
  }

  // Get user info
  const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + tokenJson.access_token);
  const userInfo = await userRes.json();
  const email = userInfo.email;

  // Create short-lived verification JWT
  const secret = process.env.AUTH_JWT_SECRET || 'change-me';
  const token = jwt.sign({ email }, secret, { expiresIn: '15m' });

  // Send verification email with link
  const verifyUrl = `${BASE_URL}/verify?token=${token}`;
  try {
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM || 'no-reply@example.com',
      subject: 'Verify your email',
      text: `Click to verify: ${verifyUrl}`,
      html: `<p>Click to verify your email and continue:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`
    });
  } catch (e) {
    console.error('SendGrid error', e && e.response ? e.response.body : e);
  }

  // Show a simple confirmation page
  res.setHeader('Content-Type', 'text/html');
  res.end(`<html><body><h2>Verification email sent to ${email}</h2><p>Check your inbox and click the link to continue.</p></body></html>`);
}
