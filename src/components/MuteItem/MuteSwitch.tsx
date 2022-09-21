import { Badge, Switch } from "@mantine/core";
import { FC, useCallback, useEffect, useState } from "react";
import { useAuth } from "src/context/auth";
import { MuteItem } from "src/types/MuteItem";
import { editMute } from "src/utils/firebase/editMute";

type Props = {
  muteItem: MuteItem;
};

export const MuteSwitch: FC<Props> = (props) => {
  const [active, setActive] = useState<boolean>();
  const { user } = useAuth();
  const { muteItem } = props;

  const handleSwitch = useCallback(
    (event: boolean) => {
      setActive(event);
      editMute({
        title: muteItem.title,
        muteList: muteItem.muteList,
        id: muteItem.id,
        mutable: event,
        user: user,
      });
    },
    [user],
  );
  return (
    <div className="relative py-4 px-3">
      <h5 className="text-2xl text-white opacity-60">{muteItem.title}</h5>
      <Switch
        checked={active}
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
