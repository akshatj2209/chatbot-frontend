'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Message } from '@/components/ChatbotWidget/types';
import { v4 as uuidv4 } from 'uuid';
import { ChatConversation, ConversationMessage, PaneLocation, Version } from './types';

interface ChatContextType {
  messages: Message[];
  input: string;
  isLoading: boolean;
  isChatOpen: boolean;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => Promise<void>;
  toggleChat: () => void;
  context: string;
  setContext: (context: string) => void;
  paneLocation: PaneLocation;
  setPaneLocation: React.Dispatch<React.SetStateAction<PaneLocation>>;
  isMaximized: boolean;
  setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  chatHistory: ChatConversation[] | null;
  setChatHistory: React.Dispatch<React.SetStateAction<ChatConversation[] | null>>;
  updateMessage: (messageId: string, newContent: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [context, setContext] = useState<string>('Onboarding');
  const [paneLocation, setPaneLocation] = useState<PaneLocation>('right');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [chatHistory, setChatHistory] = useState<ChatConversation[] | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);

  useEffect(() => {
    fetch('/api/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New Conversation' }),
    })
      .then((response) => response.json())
      .then((data) => setConversationId(data._id));
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    setIsLoading(true);
    setMessages((prevMessages) => [...prevMessages, { id: uuidv4(), text: input, sender: 'user' }]);
    const currentInput = input;
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, conversationId: conversationId }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      setConversationHistory(data);
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
      setInput(currentInput);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (conversationHistory) {
      const linearMessages = convertToLinearStructure(conversationHistory);
      setMessages(linearMessages);
    }
  }, [conversationHistory]);

  const convertToLinearStructure = (messages: ConversationMessage[]): Message[] => {
    const messageMap = new Map(messages?.map((m) => [m._id, m]));
    const rootMessage = messages?.find((m) => m.parent_id === null);
    const result: Message[] = [];

    let currentMessage = rootMessage as ConversationMessage | undefined;
    while (currentMessage) {
      const currentVersion = currentMessage.versions.find(
        (v: Version) => v.id === currentMessage?.current_version
      );
      result.push({
        id: currentMessage._id,
        text: currentVersion?.content || '',
        sender: currentMessage.sender === 'user' ? 'user' : 'bot',
      });

      const childIds = Object.keys(currentVersion?.child_messages || {});
      currentMessage =
        childIds.length > 0 ? (messageMap.get(childIds[0]) as ConversationMessage) : undefined;
    }

    return result;
  };

  const updateMessage = async (messageId: string, newContent: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: messageId,
          message: newContent,
          conversationId: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update message');
      }

      const data = await response.json();
      setConversationHistory(data);
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId: messageId, conversationId: conversationId }),
      });
      if (!response.ok) {
        throw new Error('Failed to update message');
      }

      const data = await response.json();
      setConversationHistory(data);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        isLoading,
        isChatOpen,
        setInput,
        sendMessage,
        toggleChat,
        context,
        setContext,
        paneLocation,
        setPaneLocation,
        isMaximized,
        setIsMaximized,
        selectedLanguage,
        setSelectedLanguage,
        chatHistory,
        setChatHistory,
        updateMessage,
        deleteMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
