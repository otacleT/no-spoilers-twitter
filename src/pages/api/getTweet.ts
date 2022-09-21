import { Client } from 'twitter-api-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client(process.env.NEXT_PUBLIC_BEARER_TOKEN as string);

  const response = await client.tweets.findTweetsById({
    ids: ['1570038142228635649'],
  });

  res.status(200).json(response);
}
