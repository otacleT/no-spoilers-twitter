import { Button, Modal, MultiSelect, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { useAuth } from "src/context/auth";
import { MuteItem } from "src/types/MuteItem";
import { addMute } from "src/utils/firebase/addMute";
import { editMute } from "src/utils/firebase/editMute";

type Props = {
  index: number;
  opened: boolean;
  muteItem: MuteItem;
  setOpened: Dispatch<SetStateAction<boolean>>;
  handleUpdate: (key: number, newItem: MuteItem) => void;
};

export const EditModal: FC<Props> = (props) => {
  const { index, opened, muteItem, setOpened, handleUpdate } = props;
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
      handleUpdate(index, {
        user: user,
        title: values.title,
        muteList: values.muteList,
        mutable: muteItem.mutable,
        id: muteItem.id,
      });
      editMute({
        user: user,
        title: values.title,
        muteList: values.muteList,
        mutable: muteItem.mutable,
        id: muteItem.id,
      });
      handleClose();
    },
    [muteItem, user],
  );
  useEffect(() => {
    form.setValues({ title: muteItem.title, muteList: muteItem.muteList });
    setData([...muteItem.muteList]);
  }, [muteItem]);
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
