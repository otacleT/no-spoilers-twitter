import { auth, Client } from 'twitter-api-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie, parseCookies } from 'nookies';

const authClient = new auth.OAuth2User({
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
  client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
  callback: `${process.env.NEXT_PUBLIC_HEAD_URL}/api/callback`,
  scopes: ['tweet.read', 'users.read', 'offline.access'],
});

const STATE = 'my-state';

const client = new Client(authClient);

export default async function getTimeline(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await client.users.findMyUser();
  } catch (error) {
    const { code, state } = req.query;
    if (state !== STATE) return res.status(500).send("State isn't matching");
    authClient.generateAuthURL({
      state: STATE,
      code_challenge: 'code_challenge',
      code_challenge_method: 'plain',
    });

    // await authClient.requestAccessToken(code as string);
    const token = await authClient.requestAccessToken(code as string);
    // res.status(200).json(token);

    setCookie({ res }, 'accessToken', `${token.token.access_token}`, {
      maxAge: 30 * 24 * 60 * 60,
    });
  }

  const response = await client.tweets.usersIdTimeline(`${process.env.NEXT_PUBLIC_AUTHEN_ID}`, {
    max_results: 20,
    'tweet.fields': ['author_id', 'created_at'],
    expansions: ['author_id'],
    'user.fields': ['profile_image_url', 'username'],
  });

  res.status(200).json(response);
}
