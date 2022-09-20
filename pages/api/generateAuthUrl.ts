import { auth } from 'twitter-api-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const authClient = new auth.OAuth2User({
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
    callback: 'http://localhost:3000/test-twitter-timeline',
    scopes: ['tweet.read', 'users.read'],
});

const STATE = 'my-state';

export default async function getHomeTimeline(req: NextApiRequest, res: NextApiResponse) {
    const authUrl = authClient.generateAuthURL({
        state: STATE,
        code_challenge: 'code_challenge',
        code_challenge_method: 'plain',
    });
    res.redirect(authUrl);
}
