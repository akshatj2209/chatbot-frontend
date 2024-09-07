import React from 'react';
import ActionRow from './ActionRow';
import ChatbotDetails from './ChatbotDetails';

export default function Header() {
  return (
    <div className="flex flex-col mt-5 px-4 gap-[18px]">
      <ActionRow />
      <ChatbotDetails />
    </div>
  );
}
