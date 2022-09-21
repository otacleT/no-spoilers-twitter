import type { NextPage } from "next";
import Head from "next/head";
import { Feed } from "src/components/Feed";
import { Mute } from "src/components/Mute";
import { Sidebar } from "src/components/Siderbar";

const Timeline: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Twitter clone</title>
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Mute />
      </main>
    </div>
  );
};

export default Timeline;
