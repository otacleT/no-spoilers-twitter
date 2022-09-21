import { Client, auth } from 'twitter-api-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const authClient = new auth.OAuth2User({
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
  client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
  callback: `${process.env.NEXT_PUBLIC_HEAD_URL}/test-twitter-timeline`,
  scopes: ['tweet.read', 'users.read'],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client(authClient);

  const response = await client.tweets.usersIdTimeline('1567915394400415745', {
    max_results: 20,
    'tweet.fields': ['author_id', 'created_at'],
    expansions: ['author_id'],
    'user.fields': ['profile_image_url', 'username'],
  });

  res.status(200).json(response);
}
