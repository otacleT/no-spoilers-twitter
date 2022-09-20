import { User } from "firebase/auth";

export type MuteItem = {
  user: User | null | undefined;
  title: string;
  muteList: string[];
  mutable: boolean;
};
