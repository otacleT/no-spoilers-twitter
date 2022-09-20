import { FunctionComponent } from 'react';
import { useMutes } from './hooks/useMutes';
import useSWR from 'swr';

// const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export const TestTwitterTimeLine: FunctionComponent = () => {
    // const { data, error } = useSWR('http://localhost:3000/api/generateAuthUrl', fetcher);
    const { isLoading, mutes } = useMutes();

    // console.log(data, error);
    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <form method='GET' action='/api/generateAuthUrl'>
                <button type='submit'>Redirect</button>
            </form>
            <ul>
                {mutes.map((mute) => (
                    <li key={mute.id}>
                        {mute.title}
                        <div>
                            {mute.words.map((word) => (
                                <div>{word}</div>
                            ))}
                        </div>
                        {mute.active ? <div>悟空</div> : <div>カカロット</div>}
                    </li>
                ))}
            </ul>
        </>
    );
};
