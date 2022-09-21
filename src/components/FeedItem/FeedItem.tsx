import {
  ArrowsUpDownIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { FC } from 'react';

type ArticleType = {
  id?: string | undefined;
  author_id?: string | undefined;
  author_username: string | undefined;
  author_name: string | undefined;
  author_profile_image_url: string | undefined;
  text?: string | undefined;
  created_at?: string | undefined;
};

type Props = {
  key: number;
  article: ArticleType;
};

export const FeedItem: FC<Props> = (props) => {
  const { key, article } = props;
  return (
    <div className='p-3' key={key}>
      <div className='flex w-full space-x-3'>
        <img
          src={article.author_profile_image_url}
          alt=''
          className='h-11 w-11 rounded-full cursor-pointer'
        />
        <div className='w-full'>
          <div className='relative flex justify-start items-center'>
            <h5 className='text-sm font-bold'>{article.author_name}</h5>
            <p className='text-sm text-gray-300 pl-1'>{`@${article.author_username}・${article.created_at}`}</p>
            <button className='absolute t-0 right-0'>
              <EllipsisHorizontalIcon className='w-6 h-6 text-gray-300 ' />
            </button>
          </div>
          <div className='w-full pr-3 mt-1'>
            <p className='text-sm leading-relaxed'>{article.text}</p>
            {/* <img
              src={}
              className='max-w-sm w-full rounded-xl mt-4'
              alt=''
            /> */}
          </div>
        </div>
      </div>
      <div className='w-full flex justify-between pl-14 max-w-[450px] mt-4'>
        <button className='icon group'>
          <ChatBubbleOvalLeftIcon className='w-5 group-hover:text-[#1d9bf0]' />
        </button>
        <button className='icon hover:bg-[#57b670] hover:bg-opacity-10 group'>
          <ArrowsUpDownIcon className='w-5 group-hover:text-[#57b670]' />
        </button>
        <button className='icon hover:bg-[#de352f] hover:bg-opacity-10 group'>
          <HeartIcon className='w-5 group-hover:text-[#de352f]' />
        </button>
        <button className='icon group'>
          <ArrowUpTrayIcon className='w-5 group-hover:text-[#1d9bf0]' />
        </button>
      </div>
    </div>
  );
};
