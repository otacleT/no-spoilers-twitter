import { signInWithPopup, signOut, TwitterAuthProvider } from "firebase/auth";
import { auth } from "./init";

export const login = async () => {
  const provider = new TwitterAuthProvider();
  return signInWithPopup(auth, provider);
};
export const logout = async () => {
  return signOut(auth).then(() => {
    alert("logout sucessfully");
  });
};
