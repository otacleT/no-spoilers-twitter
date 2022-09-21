import { doc, setDoc } from "firebase/firestore";
import { MuteItem } from "src/types/MuteItem";
import { db } from "./init";

export async function addMute(item: MuteItem): Promise<void> {
  if (!item.user) return;
  const ref = doc(db, `muteContents/${item.user.uid}/list`, item.id);
  await setDoc(ref, {
    title: item.title,
    muteList: item.muteList,
    mutable: item.mutable,
    id: item.id,
  });
}
