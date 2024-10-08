'use client';

import { useChatContext } from '@/contexts/ChatContext';
import Image from 'next/image';
import React from 'react';

export default function InputBox() {
  const { input, setInput, sendMessage } = useChatContext();
  return (
    <div className="flex flex-row gap-2 py-3.5 items-center">
      <Image
        src="/input-avatar.png"
        alt="avatar"
        width={26}
        height={26}
        className="rounded-full max-h-[26px] max-w-[26px] shrink-0"
      />
      <input
        className="w-full h-3.5 text-gray-900 font-semibold placeholder-gray-400 text-xs border-none ring-0 focus:border-none outline-none"
        placeholder="Your question"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
    </div>
  );
}
