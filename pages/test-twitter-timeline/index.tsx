import { NextPage } from 'next';
import { TestTwitterTimeLine, PageProps } from '../../src/components/test-twitter-timeline';
import { GetServerSideProps } from 'next';
import { auth, Client } from 'twitter-api-sdk';
import nookie from 'nookies';

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

            console.log('ggggg');
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
        });

        console.log(homeTimeline);

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
