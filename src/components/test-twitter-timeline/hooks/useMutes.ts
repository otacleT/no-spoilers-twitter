import { useEffect, useState } from "react";
import { getMutes, Mute } from "src/utils/firebase/mutes";

export type UseMutesOutput = {
  isLoading: boolean;
  mutes: Mute[];
};

const DEFAULT_MUTE: UseMutesOutput = {
  isLoading: true,
  mutes: [],
};

export function useMutes(): UseMutesOutput {
  const [output, setOutput] = useState(DEFAULT_MUTE);

  useEffect(() => {
    void (async () => {
      const mutes = await getMutes();
      setOutput({ isLoading: false, mutes });
    })();
  }, []);

  return output;
}
