import { collection, getDocs, getFirestore } from 'firebase/firestore';

export type Mute = {
  id: string;
  title: string;
  words: string[];
  active: boolean;
};

export async function getMutes(): Promise<Mute[]> {
  const mutes = new Array<Mute>();
  const db = getFirestore();
  const mutesSnapshot = await getDocs(collection(db, '/mutes'));

  mutesSnapshot.forEach((doc) => {
    const mute = doc.data() as Mute;
    mutes.push({ ...mute, id: doc.id });
  });

  return mutes;
}
