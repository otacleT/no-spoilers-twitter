import { FC, useState, useEffect } from 'react';
import { Feed, HomeTimelineProps } from '../Feed';
import { useMute } from 'src/hook/useMute';
import { MuteChild } from '../Mute/Mute';
import { MuteItem } from 'src/types/MuteItem';

export const Timeline: FC<HomeTimelineProps> = (props) => {
  const { authorInfoTimeline } = props;
  const { isLoading, list } = useMute();
  const [userMutes, setUserMutes] = useState<MuteItem[]>(list);

  useEffect(() => {
    setUserMutes(list);
  }, [isLoading, list]);

  if (isLoading) {
    return (
      <div className='relative h-screen sm:ml-[73px] xl:ml-[370px] sm:w-[calc(100%-73px)] xl:w-[calc(100%-370px)]'>
        <div className='loading'></div>
      </div>
    );
  }

  return (
    <>
      <Feed authorInfoTimeline={authorInfoTimeline} />
      <MuteChild list={list} />
      {/* <MuteChild userMutes={userMutes} setUserMutes={setUserMutes} /> */}
    </>
  );
};
