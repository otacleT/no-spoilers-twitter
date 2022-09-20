import { Switch } from "@mantine/core";

export const MuteItem = () => {
  return (
    <div className="relative py-4 px-3">
      <h5 className="text-2xl text-white opacity-60">タイトル</h5>
      <Switch className="absolute top-1/2 right-2 -translate-y-1/2" color="twitterColor" />
    </div>
  );
};
