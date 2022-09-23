import { SparklesIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import { TimeLine } from 'src/types/TImeLine';
import { FeedItem } from '../FeedItem';
import { Input } from '../Input';

export const Feed: FC<TimeLine> = (props) => {
  const { authorInfoTimeline } = props;

  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]'>
      <div className='text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 border-b border-gray-700'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
        <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'>
          <SparklesIcon className='h-5 text-white' />
        </div>
      </div>
      <Input />
      <div className='devide-y divide-gray-700'>
        {authorInfoTimeline?.map((article) => (
          <FeedItem key={Math.round(Math.random() * 10000)} article={article} />
        ))}
      </div>
    </div>
  );
};
