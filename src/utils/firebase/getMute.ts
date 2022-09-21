import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { MuteItem } from "src/types/MuteItem";
import { db } from "src/utils/firebase/init";

export async function getMute(user: User | null | undefined): Promise<MuteItem[]> {
  const list = new Array<MuteItem>();
  const mutesSnapshot = await getDocs(collection(db, `muteContents/${user?.uid}/list`));

  mutesSnapshot.forEach((doc) => {
    const item = doc.data() as MuteItem;
    list.push({ ...item });
  });

  return list;
}
