import { useEffect, useState } from "react";
import { useAuth } from "src/context/auth";
import { MuteItem } from "src/types/MuteItem";
import { getMute } from "src/utils/firebase/getMute";

export type MuteList = {
  isLoading: boolean;
  list: MuteItem[];
};

const DEFAULT_OUTPUT: MuteList = {
  isLoading: true,
  list: [],
};

export function useMute(): MuteList {
  const [output, setOutput] = useState(DEFAULT_OUTPUT);
  const { user } = useAuth();

  useEffect(() => {
    void (async () => {
      const list = await getMute(user);
      setOutput({ isLoading: false, list });
    })();
  }, [user]);

  return output;
}
