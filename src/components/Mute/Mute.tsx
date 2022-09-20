import { Modal, MultiSelect, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FC, useState } from "react";
import { MuteItem } from "../MuteItem";

type Mute = {
  title: string;
  muteItem: string;
};

export const Mute: FC = () => {
  const [opened, setOpened] = useState<boolean>(false);
  // const [muteList, setMuteList] = useState<
  // const data = [
  //   { value: "react", label: "React" },
  //   { value: "ng", label: "Angular" },
  //   { value: "svelte", label: "Svelte" },
  //   { value: "vue", label: "Vue" },
  //   { value: "riot", label: "Riot" },
  //   { value: "next", label: "Next.js" },
  //   { value: "blitz", label: "Blitz.js" },
  // ];

  const form = useForm({
    initialValues: {
      title: "",
      muteItem: "",
    },
  });
  const [data, setData] = useState(["Cleaning", "Manual work", "Lifting", "Delivering"]);
  const handleSubmit = (values: typeof form.values) => {
    console.log(values.title, values.muteItem);
    setOpened(false);
    form.reset();
  };
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
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="ミュートしたい要素を追加"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label="タイトル"
            placeholder="ワンピース"
            {...form.getInputProps("title")}
          />
          <Space h="md" />
          <TextInput
            required
            label="ミュートする要素"
            placeholder="RED"
            {...form.getInputProps("muteItem")}
          />
          <Space h="xl" />
          <MultiSelect
            searchable
            clearable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => `${query}`}
            data={data}
            label="Your favorite frameworks/libraries"
            placeholder="Pick all that you like"
          />
          <Space h="xl" />
          <button className="w-full h-[40px] bg-[#1d9bf0] rounded-full flex items-center justify-center text-sm leading-none text-white">
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
};
