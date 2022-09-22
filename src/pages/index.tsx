import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from 'src/context/auth';
import { login, logout } from 'src/utils/firebase/auth';

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center flex-wrap max-w-[400px]'>
      <Image src='/logo.png' width={150} height={150} />
      <h1 className='text-3xl font-bold text-white mt-6'>No Spoilers Twitter!!!</h1>
      {user ? (
        <div className='w-2/3'>
          <Link href='/timeline'>
            <a className='w-full flex items-center justify-center border border-white px-4 py-3 mt-8 text-lg font-bold text-white rounded-full'>
              タイムラインを見る
            </a>
          </Link>
          <button
            className='w-full flex items-center justify-center border border-white px-4 py-3 mt-8 text-lg font-bold text-white rounded-full'
            onClick={logout}
          >
            logout
          </button>
        </div>
      ) : (
        <button
          className='w-2/3 flex items-center justify-center border border-white px-4 py-3 mt-8 text-lg font-bold text-white rounded-full'
          onClick={login}
        >
          Twitter login
        </button>
      )}
    </div>
  );
};

export default Home;
