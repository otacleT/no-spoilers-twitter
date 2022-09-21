import { Button, Modal, MultiSelect, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC, useCallback, useEffect, useState, Dispatch, SetStateAction } from 'react';

import { useAuth } from 'src/context/auth';
import { useMute } from 'src/hook/useMute';
import { MuteItem } from 'src/types/MuteItem';
import { deleteMute } from 'src/utils/firebase/deleteMute';
import { CreateModal } from '../CreateModal';
import { MuteSwitch } from '../MuteItem';

type MuteChildProps = {
  userMutes: MuteItem[];
  setUserMutes: Dispatch<SetStateAction<MuteItem[]>>;
};

export const MuteChild: FC<MuteChildProps> = (props) => {
  const { userMutes, setUserMutes } = props;
  const [opened, setOpened] = useState<boolean>(false);
  const { user } = useAuth();
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const [isSelect, setIsSelect] = useState<boolean>(false);

  const handleUpdate = useCallback(
    (changeIndex: number, newItem: MuteItem) => {
      const updateArray = userMutes.map((item, index) =>
        index === changeIndex ? { ...newItem } : { ...item },
      );
      setUserMutes(updateArray);
    },
    [userMutes, setUserMutes],
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
    [user, userMutes, setUserMutes],
  );

  return (
    <div className='pl-5 pt-4'>
      <div className='hidden flex-grow sm:flex sm:w-[350px] items-center justify-between py-2 px-2'>
        <button className='text-sm text-white leading-none' onClick={() => setIsSelect(!isSelect)}>
          {isSelect ? '完了' : '編集'}
        </button>
        <button className='text-xl text-white leading-none' onClick={() => setIsCreate(true)}>
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

        <h4 className='text-sm text-white pb-2 pt-4 font-bold px-2'>履歴</h4>
        {userMutes &&
          userMutes.map(
            (item, index) =>
              !item.mutable && (
                <div className='w-full relative' key={Math.round(Math.random() * 10000)}>
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
