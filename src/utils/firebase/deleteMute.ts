import { User } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./init";

type DeleteProps = {
  user: User | null | undefined;
  id: string;
};

export async function deleteMute(del: DeleteProps): Promise<void> {
  if (!del.user) return;
  const docRef = doc(db, `muteContents/${del.user.uid}/list`, String(del.id));
  await deleteDoc(docRef);
}
