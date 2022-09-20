import { FunctionComponent } from "react";
import { useMutes } from "./hooks/useMutes";

export const TestTwitterTimeLine: FunctionComponent = () => {
  const { isLoading, mutes } = useMutes();
  if (isLoading) return <p>Loading...</p>;
  return (
    <ul>
      {mutes.map((mute) => (
        <li key={mute.title}>
          {mute.title}
          <div>
            {mute.words.map((word: string) => (
              <div>{word}</div>
            ))}
          </div>
          {mute.active ? <div>悟空</div> : <div>カカロット</div>}
        </li>
      ))}
    </ul>
  );
};
