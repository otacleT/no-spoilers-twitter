import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./init";

export type MuteItem = {
  user: User | null | undefined;
  title: string;
  muteList: string[];
};

export async function addMute(item: MuteItem): Promise<void> {
  const itemId = Math.round(Math.random() * 10000000000);
  if (!item.user) return;
  const ref = doc(db, `muteContents/${item.user.uid}/list`, String(itemId));
  await setDoc(ref, {
    title: item.title,
    muteList: item.muteList,
  });
}
