import { FC } from "react";
import { MuteItem } from "../MuteItem";

export const Mute: FC = () => {
  return (
    <div className="pl-5 pt-4">
      <div className="hidden flex-grow sm:flex sm:w-[350px] items-center justify-between py-2 px-2">
        <button className="text-sm text-white leading-none">編集</button>
        <button className="text-xl text-white leading-none">+</button>
      </div>
      <h3 className="text-2xl text-white font-bold pt-2 pb-3 px-2">ワードミュート</h3>
      <div className="divide-y divide-gray-700">
        <h4 className="text-sm text-white pb-2 pt-4 font-bold px-2">ミュート中</h4>
        <MuteItem />
        <h4 className="text-sm text-white pb-2 pt-4 font-bold px-2">履歴</h4>
        <MuteItem />
        <MuteItem />
      </div>
    </div>
  );
};
