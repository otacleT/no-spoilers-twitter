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

export type HomeTimelineProps = {
  authorInfoTimeline?:
    | {
        id?: string | undefined;
        author_id?: string | undefined;
        author_username: string | undefined;
        author_name: string | undefined;
        author_profile_image_url: string | undefined;
        text?: string | undefined;
        created_at?: string | undefined;
      }[]
    | undefined;
};

export const TestTwitterTimeLine: FunctionComponent<HomeTimelineProps> = (props) => {
  const { authorInfoTimeline } = props;
  const { isLoading, mutes } = useMutes();
  const [currentTimeLine, setCurrentTimeline] = useState(authorInfoTimeline);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div>
        {currentTimeLine &&
          currentTimeLine.map((article) => (
            <div key={article.id}>
              {article.author_name}
              {article.author_profile_image_url}
            </div>
          ))}
      </div>
    </>
  );
};
