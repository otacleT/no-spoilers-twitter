import Image from 'next/image';
import { FC } from 'react';
import { HomeIcon } from '@heroicons/react/24/solid';
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { SidebarLink } from '../SidebarLink';

export const Sidebar: FC = () => {
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
      <div className='flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24 '>
        <Image src='/logo.png' width={30} height={30} />
      </div>
      <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
        <SidebarLink text='Home' Icon={HomeIcon} active />
        <SidebarLink text='Explore' Icon={HashtagIcon} />
        <SidebarLink text='Notifications' Icon={BellIcon} />
        <SidebarLink text='Messages' Icon={InboxIcon} />
        <SidebarLink text='Bookmarks' Icon={BookmarkIcon} />
        <SidebarLink text='Lists' Icon={ClipboardIcon} />
        <SidebarLink text='Profile' Icon={UserIcon} />
        <SidebarLink text='More' Icon={EllipsisHorizontalCircleIcon} />
      </div>
      <button className='hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cda]'>
        Tweet
      </button>
      <div className='text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto'>
        <img
          src='https://yt3.ggpht.com/yti/AJo0G0mqpfSYV-eIAjjWrFAGnBJIkUlj6wdrn-9Up-br=s88-c-k-c0x00ffffff-no-rj-mo'
          alt=''
          className='h-10 w-10 rounded-full xl:mr-2.5'
        />
        <div className='hidden xl:inline leading-5'>
          <h4 className='font-bold'>firebase user</h4>
          <p className='text-[#6e767d]'>@firebaseuser</p>
        </div>
        <EllipsisHorizontalIcon className='h-5 hidden xl:inline ml-10' />
      </div>
    </div>
  );
};
