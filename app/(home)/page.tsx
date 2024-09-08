import React from 'react';
import ChatInterface from './components/ChatInterface';
import { ChatContextProvider } from '@/contexts/ChatContext';

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-5 font-inter">
      <ChatContextProvider>
        <ChatInterface />
      </ChatContextProvider>
    </main>
  );
}
