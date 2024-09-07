'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Header from './Header';
import { Message } from './types';
import { v4 as uuidv4 } from 'uuid';
import MessageBox from './MessageBox';

const ChatbotWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: 'Hi Jane,\n Amazing how Mosey is simplifying state compliance for businesses across the board!',
      sender: 'bot',
    },
    {
      id: uuidv4(),
      text: 'Hi, Thanks for connecting',
      sender: 'user',
    },
    {
      id: uuidv4(),
      text: 'Hi Jane,\n Amazing how Mosey is simplifying state compliance for businesses across the board!',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    setIsLoading(true);
    setMessages((prevMessages) => [...prevMessages, { id: uuidv4(), text: input, sender: 'user' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: uuidv4(), text: data.response, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: uuidv4(),
          text: 'Sorry, there was an error processing your message.',
          sender: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <Card className="w-[360px] flex flex-col gap-5">
      <Header />
      <CardContent className="overflow-y-auto">
        <MessageBox messages={messages} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full">
          <Input
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-grow mr-2"
            disabled={isLoading}
          />
          <Button onClick={sendMessage} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatbotWidget;
