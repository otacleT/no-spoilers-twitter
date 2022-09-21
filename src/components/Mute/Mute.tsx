import { FC, useState } from "react";
import { useMute } from "src/hook/useMute";
import { MuteItem } from "src/types/MuteItem";
import { CreateModal } from "../CreateModal";
import { EditModal } from "../EditModal";
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
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userMutes, setUserMutes] = useState<MuteItem[]>(list);
  const [isSelect, setIsSelect] = useState<boolean>(false);

  const handleUpdate = (changeIndex: number, newItem: MuteItem) => {
    // console.log("before map", userMutes);
    const updateArray = userMutes.map((item, index) =>
      index === changeIndex ? { ...newItem } : { ...item },
    );
    // console.log("handleUpdate", updateArray);
    setUserMutes(updateArray);
  };

  return (
    <div className="pl-5 pt-4">
      <div className="hidden flex-grow sm:flex sm:w-[350px] items-center justify-between py-2 px-2">
        <button className="text-sm text-white leading-none" onClick={() => setIsSelect(!isSelect)}>
          編集
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
                  setIsEdit={setIsEdit}
                  isSelect={isSelect}
                  muteItem={item}
                  index={index}
                  handleUpdate={handleUpdate}
                />
              </div>
            ),
        )}

        <h4 className="text-sm text-white pb-2 pt-4 font-bold px-2">履歴</h4>
        {userMutes.map(
          (item, index) =>
            !item.mutable && (
              <div key={Math.round(Math.random() * 10000)}>
                <MuteSwitch
                  setIsEdit={setIsEdit}
                  isSelect={isSelect}
                  muteItem={item}
                  index={index}
                  handleUpdate={handleUpdate}
                />
              </div>
            ),
        )}
      </div>
      <CreateModal opened={isCreate} setOpened={setIsCreate} setUserMutes={setUserMutes} />
      <EditModal opened={isEdit} setOpened={setIsEdit} setUserMutes={setUserMutes} />
    </div>
  );
};
