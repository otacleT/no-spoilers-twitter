import { NextPage } from 'next';
import { TestTwitterTimeLine, PageProps } from '../../src/components/test-twitter-timeline';
import { GetServerSideProps } from 'next';
import { auth, Client } from 'twitter-api-sdk';

const Page = ({ homeTimeline }: PageProps) => {
    return (
        <>
            <TestTwitterTimeLine homeTimeline={homeTimeline} />
        </>
    );
};

const authClient = new auth.OAuth2User({
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
    callback: 'http://localhost:3000/test-twitter-timeline',
    scopes: ['tweet.read', 'users.read'],
});

const STATE = 'my-state';

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { code, state } = context.query;

        // if (state !== STATE) return context.res.status(500).send("State isn't matching");
        authClient.generateAuthURL({
            state: STATE,
            code_challenge: 'code_challenge',
            code_challenge_method: 'plain',
        });

        await authClient.requestAccessToken(code as string);

        // const host = context.req.headers.host || 'localhost:3000';
        // const protocol = /^localhost/.test(host) ? 'http' : 'https';
        // const res = await fetch(`${protocol}://${host}/api/generateAuthUrl`);
        // const data = await res.json();

        const client = new Client(authClient);

        const homeTimeline = await client.tweets.usersIdTimeline('1567915394400415745', {
            max_results: 20,
            'tweet.fields': ['author_id', 'created_at'],
            expansions: ['author_id'],
            'user.fields': ['profile_image_url', 'username'],
        });

        return { props: { homeTimeline } };
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
