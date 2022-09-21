import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ActionIcon, Badge, Switch } from "@mantine/core";
import { FC, useCallback, useState } from "react";
import { useAuth } from "src/context/auth";
import { MuteItem } from "src/types/MuteItem";
import { editMute } from "src/utils/firebase/editMute";
import { EditModal } from "../EditModal";

type Props = {
  muteItem: MuteItem;
  index: number;
  isSelect: boolean;
  handleUpdate: (key: number, newItem: MuteItem) => void;
};

export const MuteSwitch: FC<Props> = (props) => {
  const { user } = useAuth();
  const { muteItem, index, isSelect, handleUpdate } = props;
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
      className={`relative py-4 px-3 flex flex-wrap items-center justify-start ${
        isSelect && "cursor-pointer hover:opacity-80"
      }`}
    >
      {isSelect && (
        <ActionIcon
          color="red"
          className="w-[10%] pointer-events-none"
          onClick={() => console.log("test")}
        >
          <MinusCircleIcon className="w-6 h-6 text-[#ff0000]" />
        </ActionIcon>
      )}
      <div className="w-[90%]" onClick={() => handleOpen()}>
        <h5
          className={`text-2xl text-white opacity-60 ${muteItem.mutable && "opacity-100"} ${
            isSelect && "pl-3"
          }`}
        >
          {muteItem.title}
        </h5>
        <div className={`w-full mt-2 ${isSelect && "pl-3"}`}>
          {muteItem.muteList.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </div>
      {isSelect ? (
        <ChevronRightIcon className="w-6 h-6 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" />
      ) : (
        <Switch
          checked={muteItem.mutable}
          className="absolute top-1/2 right-2 -translate-y-1/2"
          color="twitterColor"
          onChange={(event) => handleSwitch(event.currentTarget.checked)}
        />
      )}
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
