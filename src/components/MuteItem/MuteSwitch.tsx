import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { ActionIcon, Badge, Switch } from '@mantine/core';
import { FC, useCallback, useState } from 'react';
import { useAuth } from 'src/context/auth';
import { MuteItem } from 'src/types/MuteItem';
import { editMute } from 'src/utils/firebase/editMute';
import { EditModal } from '../EditModal';

type Props = {
  muteItem: MuteItem;
  index: number;
  isSelect: boolean;
  handleUpdate: (key: number, newItem: MuteItem) => void;
  handleDelete: (deleteIndex: number) => void;
};

export const MuteSwitch: FC<Props> = (props) => {
  const { user } = useAuth();
  const { muteItem, index, isSelect, handleUpdate, handleDelete } = props;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleSwitch = useCallback(
    (event: boolean) => {
      handleUpdate(index, {
        user: user,
        title: muteItem.title,
        muteList: muteItem.muteList,
        mutable: event,
        id: muteItem.id,
      });
      editMute({
        user: user,
        title: muteItem.title,
        muteList: muteItem.muteList,
        mutable: event,
        id: muteItem.id,
      });
    },
    [index, muteItem],
  );
  const handleOpen = useCallback(() => {
    if (!isSelect) return;
    setIsEdit(true);
  }, [isSelect]);

  return (
    <div
      className={`w-full relative py-3 pr-3 flex flex-wrap items-center justify-start ${
        isSelect && 'cursor-pointer hover:opacity-80'
      }`}
    >
      <ActionIcon
        className={`w-[25px] flex justify-center opacity-0 invisible -translate-x-[10px] ${
          isSelect && 'fadeIn'
        } `}
        onClick={() => handleDelete(index)}
      >
        <MinusCircleIcon className='w-6 h-6 text-[#ff0000]' />
      </ActionIcon>
      <div
        className={`w-[calc(100%-35px)] ${isSelect && 'translateLeft'}`}
        onClick={() => handleOpen()}
      >
        <h5 className={`text-2xl text-white opacity-60 ${muteItem.mutable && 'opacity-100'}`}>
          {muteItem.title}
        </h5>
        <div className='w-full mt-2'>
          {muteItem.muteList.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </div>
      {!isSelect && (
        <Switch
          checked={muteItem.mutable}
          className='absolute top-1/2 right-2 -translate-y-1/2'
          color='twitterColor'
          onChange={(event) => handleSwitch(event.currentTarget.checked)}
        />
      )}
      <ChevronRightIcon
        className={`w-6 h-6 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none opacity-0 invisible translate-x-[0px] ${
          isSelect && 'translateRight'
        }`}
      />
      <EditModal
        index={index}
        opened={isEdit}
        muteItem={muteItem}
        setOpened={setIsEdit}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};
