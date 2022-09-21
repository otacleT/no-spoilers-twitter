import { Button, Modal, MultiSelect, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { useAuth } from "src/context/auth";
import { MuteItem } from "src/types/MuteItem";
import { addMute } from "src/utils/firebase/addMute";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setUserMutes: Dispatch<SetStateAction<MuteItem[]>>;
};

export const EditModal: FC<Props> = (props) => {
  const { opened, setOpened, setUserMutes } = props;
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
  const handleSubmit = useCallback(
    (values: typeof form.values) => {
      const addId = String(Math.round(Math.random() * 10000000000));
      setUserMutes((prev) => {
        return [
          ...prev,
          {
            user: user,
            title: values.title,
            muteList: values.muteList,
            mutable: true,
            id: addId,
          },
        ];
      });
      addMute({
        user: user,
        title: values.title,
        muteList: values.muteList,
        mutable: true,
        id: addId,
      });
      handleClose();
    },
    [user],
  );
  return (
    <Modal centered opened={opened} onClose={handleClose} title="ミュートしたいワードを編集">
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
  );
};
