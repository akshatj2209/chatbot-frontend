'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import ChatbotWidget from '@/components/ChatbotWidget';
import { useChatContext } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

export default function ChatInterface() {
    const { isChatOpen, toggleChat, paneLocation, isMaximized } = useChatContext();

    return (
        <div className={cn(isMaximized && "w-[calc(100%-40px)]", !isMaximized && paneLocation === 'left' ? 'fixed bottom-5 left-5' : 'fixed bottom-5 right-5')}>
            {isChatOpen ? (
                <div className="transition-opacity duration-300 ease-in-out opacity-100">
                    <ChatbotWidget />
                </div>
            ) : (
                <div className="transition-opacity duration-300 ease-in-out opacity-100">
                    <Button
                        onClick={toggleChat}
                        className="bg-violet-600 hover:bg-violet-800 text-white rounded-full p-3 shadow-lg h-12 w-12"
                    >
                        <MessageSquare size={24} />
                    </Button>
                </div>
            )}
        </div>
    );
}