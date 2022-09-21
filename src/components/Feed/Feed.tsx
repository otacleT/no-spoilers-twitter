import { SparklesIcon } from '@heroicons/react/24/solid';
import { FC, useState } from 'react';
import { Input } from '../Input';

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

export const Feed: FC<HomeTimelineProps> = (props) => {
  const { authorInfoTimeline } = props;

  const [currentTimeLine, setCurrentTimeline] = useState(authorInfoTimeline);

  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]'>
      <div className='text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
        <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'>
          <SparklesIcon className='h-5 text-white' />
        </div>
      </div>
      <Input />
      <ul>
        {currentTimeLine &&
          currentTimeLine.map((article) => (
            <li key={article.id}>
              {article.author_name}
              {article.author_name}
              {article.author_profile_image_url}
              {article.text}
            </li>
          ))}
      </ul>
    </div>
  );
};
