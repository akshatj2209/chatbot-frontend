import React from 'react';
import Image from 'next/image';

export default function ChatbotDetails() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image src="/ava-image.png" alt="avatar" width={43} height={43} />
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex gap-[3px]">
          <div className="leading-[18px] text-[#353c49] text-xs font-semibold">Hey</div>
          <Image src="/hand-wave.jpg" alt="avatar" width={18} height={18} />
          <div className="leading-[18px] text-[#3b424f] text-xs font-semibold">I&apos;m Ava</div>
        </div>
        <div className="text-[#8b93a4] text-sm font-semibold">
          Ask me anything or pick a place to start
        </div>
      </div>
    </div>
  );
}
