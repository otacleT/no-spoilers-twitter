import { FC } from 'react';
import { Feed } from '../Feed';
import { useMute } from 'src/hook/useMute';
import { MuteChild } from '../Mute/Mute';

export const Timeline: FC = () => {
  const { isLoading, list } = useMute();

  if (isLoading) {
    return (
      <div className='relative h-screen sm:ml-[73px] xl:ml-[370px] sm:w-[calc(100%-73px)] xl:w-[calc(100%-370px)]'>
        <div className='loading'></div>
      </div>
    );
  }

  return (
    <>
      <Feed />
      <MuteChild list={list} />
    </>
  );
};
