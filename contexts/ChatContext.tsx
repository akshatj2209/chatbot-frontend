'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Message } from '@/components/ChatbotWidget/types';
import { v4 as uuidv4 } from 'uuid';
import { PaneLocation } from './types';

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
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: uuidv4(),
            text: 'Hi Jane,\n Amazing how Mosey is simplifying state compliance for businesses across the board!',
            sender: 'bot',
        },
    ]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
    const [context, setContext] = useState<string>('Onboarding');
    const [paneLocation, setPaneLocation] = useState<PaneLocation>('right');
    const [isMaximized, setIsMaximized] = useState<boolean>(false);

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