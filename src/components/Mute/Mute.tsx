import { Button, Modal, MultiSelect, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC, useCallback, useEffect, useState } from "react";
import { useAuth } from "src/context/auth";
import { addMute } from "src/utils/firebase/addMute";
import { MuteItem } from "../MuteItem";

type Mute = {
  title: string;
  muteItem: string;
};

export const Mute: FC = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [muteList, setMuteList] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);
  const { user } = useAuth();

  const form = useForm({
    initialValues: {
      title: "",
      muteList: muteList,
    },
  });

  const handleCreate = useCallback(
    (query: string) => {
      setData([...data, query]);
      setMuteList([...muteList, query]);
      return query;
    },
    [muteList, data],
  );
  const handleChange = useCallback((query: string[]) => {
    setData([...query]);
    setMuteList([...query]);
  }, []);
  const handleClose = useCallback(() => {
    setOpened(false);
    setData([]);
    setMuteList([]);
    form.reset();
  }, []);
  const handleSubmit = useCallback((values: typeof form.values) => {
    addMute({ user: user, title: values.title, muteList: values.muteList });
    handleClose();
  }, []);

  return (
    <div className="pl-5 pt-4">
      <div className="hidden flex-grow sm:flex sm:w-[350px] items-center justify-between py-2 px-2">
        <button className="text-sm text-white leading-none">編集</button>
        <button className="text-xl text-white leading-none" onClick={() => setOpened(true)}>
          +
        </button>
      </div>
      <h3 className="text-2xl text-white font-bold pt-2 pb-3 px-2">ワードミュート</h3>
      <div className="divide-y divide-gray-700">
        <h4 className="text-sm text-white pb-2 pt-4 font-bold px-2">ミュート中</h4>
        <MuteItem />
        <h4 className="text-sm text-white pb-2 pt-4 font-bold px-2">履歴</h4>
        <MuteItem />
        <MuteItem />
      </div>
      <Modal centered opened={opened} onClose={handleClose} title="ミュートしたい要素を追加">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label="タイトル"
            placeholder="ワンピース"
            {...form.getInputProps("title")}
          />
          <Space h="md" />
          <MultiSelect
            searchable
            clearable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => handleCreate(query)}
            onChange={handleChange}
            data={data}
            label="ミュートしたい要素"
            placeholder="選択or入力"
            {...form.getInputProps("muteList")}
          />
          <Space h="xl" />
          <Button
            className="w-full h-[40px] bg-[#1d9bf0] rounded-full flex items-center justify-center text-sm leading-none text-white"
            type="submit"
          >
            Add
          </Button>
        </form>
      </Modal>
    </div>
  );
};
