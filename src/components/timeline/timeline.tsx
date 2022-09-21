import { FC, useState, useEffect } from 'react';
import { Feed, HomeTimelineProps } from '../Feed';
import { useMute } from 'src/hook/useMute';
import { MuteChild } from '../Mute/Mute';
import { MuteItem } from 'src/types/MuteItem';

export const Timeline: FC<HomeTimelineProps> = (props) => {
  const { authorInfoTimeline } = props;
  const { isLoading, list } = useMute();
  const [userMutes, setUserMutes] = useState<MuteItem[]>(list);
  const [currentMutewords, setCurrentMuteWords] = useState<string[]>([]);
  const [filteredTimeline, setFilteredTimeline] = useState(authorInfoTimeline);

  useEffect(() => {
    let mutewords = new Array();
    userMutes.forEach((usermute) => {
      if (usermute.mutable) {
        mutewords = mutewords.concat(usermute.muteList);
      }
    });
    setCurrentMuteWords(mutewords);
  }, [userMutes, isLoading, list]);

  useEffect(() => {
    setUserMutes(list);
  }, [isLoading, list]);

  useEffect(() => {
    let timeline = new Array();
    authorInfoTimeline?.forEach((article) => {
      const muteArticle = currentMutewords.some((str) => article.text?.includes(str));
      if (!muteArticle) {
        timeline.push(article);
      }
    });
    setFilteredTimeline(timeline);
  }, [currentMutewords, authorInfoTimeline]);

  console.log(filteredTimeline);

  if (isLoading) {
    return (
      <div className='relative h-screen sm:ml-[73px] xl:ml-[370px] sm:w-[calc(100%-73px)] xl:w-[calc(100%-370px)]'>
        <div className='loading'></div>
      </div>
    );
  }

  return (
    <>
      <Feed authorInfoTimeline={filteredTimeline} />
      {/* <MuteChild list={list} /> */}
      <MuteChild userMutes={userMutes} setUserMutes={setUserMutes} />
    </>
  );
};
