import { Badge, Switch } from "@mantine/core";
import { FC, useCallback, useEffect } from "react";
import { MuteItem } from "src/types/MuteItem";
import { editMute } from "src/utils/firebase/editMute";

type Props = {
  muteItem: MuteItem;
  index: number;
  handleUpdate: (key: number, newItem: MuteItem) => void;
};

export const MuteSwitch: FC<Props> = (props) => {
  const { muteItem, index, handleUpdate } = props;

  const handleSwitch = useCallback(
    (event: boolean) => {
      handleUpdate(index, {
        user: muteItem.user,
        title: muteItem.title,
        muteList: muteItem.muteList,
        mutable: event,
        id: muteItem.id,
      });
      editMute({
        user: muteItem.user,
        title: muteItem.title,
        muteList: muteItem.muteList,
        mutable: event,
        id: muteItem.id,
      });
    },
    [index, muteItem],
  );
  // useEffect(() => {
  //   console.log(muteItem.title, index);
  // }, [muteItem]);

  return (
    <div className="relative py-4 px-3">
      <h5 className="text-2xl text-white opacity-60">{muteItem.title}</h5>
      <Switch
        checked={muteItem.mutable}
        className="absolute top-1/2 right-2 -translate-y-1/2"
        color="twitterColor"
        onChange={(event) => handleSwitch(event.currentTarget.checked)}
      />
      {muteItem.muteList.map((item) => (
        <Badge key={item}>{item}</Badge>
      ))}
    </div>
  );
};
