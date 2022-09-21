import { FC, useCallback, useState } from "react";
import { useAuth } from "src/context/auth";
import { useMute } from "src/hook/useMute";
import { MuteItem } from "src/types/MuteItem";
import { deleteMute } from "src/utils/firebase/deleteMute";
import { CreateModal } from "../CreateModal";
import { MuteSwitch } from "../MuteItem";

type Mute = {
  title: string;
  muteItem: string;
  mutable: boolean;
};

export const Mute: FC = () => {
  const { isLoading, list } = useMute();

  if (isLoading) {
    return (
      <div className="relative h-screen sm:w-[350px]">
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <>
      <MuteChild list={list} />
    </>
  );
};

type MuteChildProps = {
  list: MuteItem[];
};

export const MuteChild: FC<MuteChildProps> = ({ list }) => {
  const { user } = useAuth();
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [userMutes, setUserMutes] = useState<MuteItem[]>(list);
  const [isSelect, setIsSelect] = useState<boolean>(false);

  const handleUpdate = useCallback(
    (changeIndex: number, newItem: MuteItem) => {
      // console.log("before map", userMutes);
      const updateArray = userMutes.map((item, index) =>
        index === changeIndex ? { ...newItem } : { ...item },
      );
      // console.log("handleUpdate", updateArray);
      setUserMutes(updateArray);
    },
    [userMutes],
  );

  const handleDelete = useCallback(
    (deleteIndex: number) => {
      const deletedArray = userMutes.filter((_, index) => index !== deleteIndex);
      deleteMute({
        user: user,
        id: userMutes[deleteIndex].id,
      });
      setUserMutes([...deletedArray]);
    },
    [user, userMutes],
  );

  return (
    <div className="pl-5 pt-4">
      <div className="hidden flex-grow sm:flex sm:w-[350px] items-center justify-between py-2 px-2">
        <button className="text-sm text-white leading-none" onClick={() => setIsSelect(!isSelect)}>
          {isSelect ? "完了" : "編集"}
        </button>
        <button className="text-xl text-white leading-none" onClick={() => setIsCreate(true)}>
          +
        </button>
      </div>
      <h3 className="text-2xl text-white font-bold pt-2 pb-3 px-2">ワードミュート</h3>
      <div className="divide-y divide-gray-700">
        <h4 className="text-sm text-white pb-2 pt-4 font-bold px-2">ミュート中</h4>
        {userMutes.map(
          (item, index) =>
            item.mutable && (
              <div key={Math.round(Math.random() * 10000)}>
                <MuteSwitch
                  isSelect={isSelect}
                  muteItem={item}
                  index={index}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              </div>
            ),
        )}

        <h4 className="text-sm text-white pb-2 pt-4 font-bold px-2">履歴</h4>
        {userMutes.map(
          (item, index) =>
            !item.mutable && (
              <div className="w-full relative" key={Math.round(Math.random() * 10000)}>
                <MuteSwitch
                  isSelect={isSelect}
                  muteItem={item}
                  index={index}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              </div>
            ),
        )}
      </div>
      <CreateModal opened={isCreate} setOpened={setIsCreate} setUserMutes={setUserMutes} />
    </div>
  );
};
