import { doc, setDoc, updateDoc } from "firebase/firestore";
import { MuteItem } from "src/types/MuteItem";
import { db } from "./init";

export async function editMute(edit: MuteItem): Promise<void> {
  if (!edit.user) return;
  const docRef = doc(db, `muteContents/${edit.user.uid}/list`, edit.id);
  await updateDoc(docRef, {
    title: edit.title,
    muteList: edit.muteList,
    mutable: edit.mutable,
    id: edit.id,
  });
}
