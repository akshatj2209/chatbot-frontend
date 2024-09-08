'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Header from './Header';
import MessageBox from './MessageBox';
import Footer from './Footer';
import { useChatContext } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

const ChatbotWidget: React.FC = () => {
  const { messages, isMaximized } = useChatContext();

  return (
    <Card
      className={cn(
        'flex flex-col gap-5 h-screen md:h-[90vh] md:max-h-[90vh] rounded-none md:rounded-lg ',
        isMaximized ? 'w-full' : 'w-full md:w-[360px]'
      )}
    >
      <Header />
      <CardContent className="h-full overflow-y-auto">
        <MessageBox messages={messages} />
      </CardContent>
      <Footer />
    </Card>
  );
};

export default ChatbotWidget;
