import { Switch } from '@mantine/core';
import { FC } from 'react';

export const Mute: FC = () => {
  return (
    <div>
      <div className='hidden flex-grow sm:flex sm:w-[250px] items-center justify-between py-2'>
        <button className='text-sm text-white leading-none'>編集</button>
        <button className='text-xl text-white leading-none'>+</button>
      </div>
      <div className='divide-y divide-gray-700'>
        <h3 className='text-2xl text-white py-3'>ワードミュート</h3>
        <h4 className='text-sm text-white pb-2 pt-4'>ミュート中</h4>
        <div className='relative py-4'>
          <h5 className='text-2xl text-white opacity-60'>タイトル</h5>
          <Switch
            className='absolute top-1/2 right-2 -translate-y-1/2'
            onLabel='ON'
            offLabel='OFF'
          />
        </div>
        <h4 className='text-sm text-white pb-2 pt-4'>履歴</h4>
      </div>
    </div>
  );
};
