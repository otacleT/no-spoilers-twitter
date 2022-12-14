import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { ChangeEvent, FC, useCallback, useRef, useState } from 'react';

export const Input: FC = () => {
  const [input, setInput] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const addImageToPost = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      if (!e.target.files) return;
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        if (readerEvent.target) {
          setSelectedFile(String(readerEvent.target.result));
        }
      };
    },
    [filePickerRef, selectedFile],
  );
  const addEmoji = useCallback(
    (e: any) => {
      let sym = e.unified.split('-');
      let codesArray: any = [];
      sym.forEach((el: any) => codesArray.push('0x' + el));
      let emoji = String.fromCodePoint(...codesArray);
      setInput(input + emoji);
    },
    [input],
  );

  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3 ${loading && 'opacity-60'}`}>
      <img
        src='https://yt3.ggpht.com/yti/AJo0G0mqpfSYV-eIAjjWrFAGnBJIkUlj6wdrn-9Up-br=s88-c-k-c0x00ffffff-no-rj-mo'
        alt=''
        className='h-11 w-11 rounded-full cursor-pointer'
      />
      <div className='w-full divide-y divide-gray-700'>
        <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="What's happening?"
            className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]'
          />
          {selectedFile && (
            <div className='relative'>
              <div
                className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                onClick={() => setSelectedFile(null)}
              >
                <XMarkIcon className='text-white h-5 ' />
              </div>
              <img src={selectedFile} alt='' className='rounded-2xl max-h-80 object-contain' />
            </div>
          )}
        </div>
        {!loading && (
          <div>
            <div className='flex items-center justify-between pt-2.5'>
              <div className='flex items-center relative'>
                <div className='icon' onClick={() => filePickerRef?.current?.click()}>
                  <PhotoIcon className='h-[22px] text-[#1d9bf0]' />
                  <input type='file' hidden onChange={addImageToPost} ref={filePickerRef} />
                </div>
                <div className='icon rotate-90'>
                  <ChartBarIcon className='text-[#1d9bf0] h-[22px]' />
                </div>
                <div className='icon' onClick={() => setShowEmojis(!showEmojis)}>
                  <FaceSmileIcon className='text-[#1d9bf0] h-[22px]' />
                </div>
                <div className='icon'>
                  <CalendarIcon className='text-[#1d9bf0] h-[22px]' />
                </div>

                {showEmojis && (
                  <Picker
                    onSelect={addEmoji}
                    style={{
                      position: 'absolute',
                      marginTop: '465px',
                      marginLeft: -40,
                      maxWidth: '320px',
                      borderRadius: '20px',
                      zIndex: 100,
                    }}
                    theme='dark'
                  />
                )}
              </div>
              <button
                className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
                disabled={!input.trim() && !selectedFile}
                // onClick={sendPost}
              >
                Tweet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
