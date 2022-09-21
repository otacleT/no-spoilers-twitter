import { NextPage, GetServerSideProps } from 'next';
import {
  TestTwitterTimeLine,
  PageProps,
  HomeTimelineProps,
} from 'src/components/test-twitter-timeline';
import { auth, Client } from 'twitter-api-sdk';
import nookie from 'nookies';

const Page = ({ authorInfoTimeline }: HomeTimelineProps) => {
  return (
    <>
      <TestTwitterTimeLine authorInfoTimeline={authorInfoTimeline} />
    </>
  );
};

const authClient = new auth.OAuth2User({
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
  client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
  callback: 'http://localhost:3000/test-twitter-timeline',
  scopes: ['tweet.read', 'users.read', 'offline.access'],
});

const STATE = 'my-state';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    try {
      const cookies = nookie.get(context);
      if (cookies.accessToken) {
        authClient.token = JSON.parse(cookies.accessToken);
      }

      const client = new Client(authClient);
      const user = await client.users.findMyUser();
    } catch (error) {
      const { code, state } = context.query;

      // if (state !== STATE) return context.res.status(500).send("State isn't matching");
      authClient.generateAuthURL({
        state: STATE,
        code_challenge: 'code_challenge',
        code_challenge_method: 'plain',
      });

      const { token } = await authClient.requestAccessToken(code as string);

      nookie.set(context, 'accessToken', JSON.stringify(token) ?? '');

      // const host = context.req.headers.host || 'localhost:3000';
      // const protocol = /^localhost/.test(host) ? 'http' : 'https';
      // const res = await fetch(`${protocol}://${host}/api/generateAuthUrl`);
      // const data = await res.json();
    }

    const client = new Client(authClient);
    const homeTimeline = await client.tweets.usersIdTimeline('1567915394400415745', {
      max_results: 20,
      'tweet.fields': ['author_id', 'created_at'],
      expansions: ['author_id'],
      'user.fields': ['profile_image_url', 'username'],
      exclude: ['replies', 'retweets'],
    });

    const users = homeTimeline.includes?.users;

    const authorInfoTimeline = new Array();

    homeTimeline.data?.forEach((atc) => {
      let username;
      let name;
      let user_profile_image_url;

      if (users) {
        for (const user of users) {
          if (user.id == atc.author_id) {
            username = user.username;
            name = user.name;
            user_profile_image_url = user.profile_image_url;
            break;
          }
        }
      }

      authorInfoTimeline.push({
        id: atc.id,
        author_id: atc.author_id,
        author_username: username,
        author_name: name,
        author_profile_image_url: user_profile_image_url,
        text: atc.text,
        created_at: atc.created_at,
      });
    });

    console.log(authorInfoTimeline);

    return { props: { authorInfoTimeline } };
  } catch (e) {
    console.log(e);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default Page;
