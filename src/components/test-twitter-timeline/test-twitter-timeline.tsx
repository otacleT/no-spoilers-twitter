import { FunctionComponent, useState, useEffect } from 'react';
import { useMutes } from './hooks/useMutes';

export type PageProps = {
    homeTimeline?: {
        data?:
            | {
                  author_id?: string | undefined;
                  id?: string | undefined;
                  text?: string | undefined;
                  created_at?: string | undefined;
              }[]
            | undefined;
        includes: {};
        meta?:
            | {
                  next_token: string | undefined;
                  result_count: number | undefined;
                  newest_id: string | undefined;
                  oldest_id: string | undefined;
              }
            | undefined;
    };
};

export const TestTwitterTimeLine: FunctionComponent<PageProps> = (props) => {
    const { homeTimeline } = props;
    const { isLoading, mutes } = useMutes();
    const [currentTimeLine, setCurrentTimeline] = useState(homeTimeline);

    useEffect(() => {
        if (homeTimeline) {
            setCurrentTimeline(homeTimeline);
        }
    }, []);

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <ul>
                {mutes.map((mute) => (
                    <li key={mute.id}>
                        {mute.title}
                        {mute.id}
                        <div>
                            {mute.words.map((word) => (
                                <div>{word}</div>
                            ))}
                        </div>
                        {mute.active ? <div>悟空</div> : <div>カカロット</div>}
                    </li>
                ))}
            </ul>
            <div>
                {currentTimeLine &&
                    currentTimeLine.data?.map((article) => (
                        <div key={article.id}>{article.text}</div>
                    ))}
            </div>
        </>
    );
};
