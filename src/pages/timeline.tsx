import type { NextPage } from 'next';
import Head from 'next/head';
import { Sidebar } from 'src/components/Siderbar';
import { Timeline } from 'src/components/timeline';

const Page: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Twitter clone</title>
      </Head>
      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
        <Timeline />
      </main>
    </div>
  );
};

export default Page;
