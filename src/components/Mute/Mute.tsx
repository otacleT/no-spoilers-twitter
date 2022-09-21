import { Button, Modal, MultiSelect, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC, useCallback, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useAuth } from 'src/context/auth';
import { useMute } from 'src/hook/useMute';
import { MuteItem } from 'src/types/MuteItem';
import { addMute } from 'src/utils/firebase/addMute';
import { CreateModal } from '../CreateModal';
import { MuteSwitch } from '../MuteItem';

// type MuteChildProps = {
//   userMutes: MuteItem[];
//   setUserMutes: Dispatch<SetStateAction<MuteItem[]>>;
// };

type MuteChildProps = {
  list: MuteItem[];
};

export const MuteChild: FC<MuteChildProps> = (props) => {
  const { list } = props;
  // const { userMutes, setUserMutes } = props;
  const [opened, setOpened] = useState<boolean>(false);
  const [userMutes, setUserMutes] = useState<MuteItem[]>(list);
  const { user } = useAuth();

  const handleUpdate = (changeIndex: number, newItem: MuteItem) => {
    // console.log("before map", userMutes);
    const updateArray = userMutes.map((item, index) =>
      index === changeIndex ? { ...newItem } : { ...item },
    );
    // console.log("handleUpdate", updateArray);
    setUserMutes(updateArray);
  };

  return (
    <div className='pl-5 pt-4'>
      <div className='hidden flex-grow sm:flex sm:w-[350px] items-center justify-between py-2 px-2'>
        <button className='text-sm text-white leading-none'>編集</button>
        <button className='text-xl text-white leading-none' onClick={() => setOpened(true)}>
          +
        </button>
      </div>
      <h3 className='text-2xl text-white font-bold pt-2 pb-3 px-2'>ワードミュート</h3>
      <div className='divide-y divide-gray-700'>
        <h4 className='text-sm text-white pb-2 pt-4 font-bold px-2'>ミュート中</h4>
        {userMutes &&
          userMutes.map(
            (item, index) =>
              item.mutable && (
                <div key={Math.round(Math.random() * 10000)}>
                  <MuteSwitch muteItem={item} index={index} handleUpdate={handleUpdate} />
                </div>
              ),
          )}

        <h4 className='text-sm text-white pb-2 pt-4 font-bold px-2'>履歴</h4>
        {userMutes &&
          userMutes.map(
            (item, index) =>
              !item.mutable && (
                <div key={Math.round(Math.random() * 10000)}>
                  <MuteSwitch muteItem={item} index={index} handleUpdate={handleUpdate} />
                </div>
              ),
          )}
      </div>
      <CreateModal opened={opened} setOpened={setOpened} setUserMutes={setUserMutes} />
    </div>
  );
};
