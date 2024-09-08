import React from 'react';
import { Maximize2, Minimize2, PanelLeft, PanelRight, X } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';

export default function ActionRow() {
  const { toggleChat, isLoading, setPaneLocation, paneLocation, isMaximized, setIsMaximized } =
    useChatContext();
  return (
    <div className="flex justify-between gap-4 text-gray-500 font-bold">
      <div className="flex gap-3">
        <button
          className="w-4 h-4 flex items-center justify-center rounded-sm hover:bg-gray-200"
          onClick={() => setIsMaximized((prev) => !prev)}
        >
          {isMaximized ? (
            <Minimize2 className="w-3 h-3" strokeWidth={3} />
          ) : (
            <Maximize2 className="w-3 h-3" strokeWidth={3} />
          )}
        </button>
        {!isMaximized && (
          <button
            className="w-4 h-4 flex items-center justify-center rounded-sm hover:bg-gray-200"
            onClick={() => setPaneLocation((prev) => (prev === 'left' ? 'right' : 'left'))}
          >
            {paneLocation === 'right' ? (
              <PanelLeft className="w-3 h-3" strokeWidth={3} />
            ) : (
              <PanelRight className="w-3 h-3" strokeWidth={3} />
            )}
          </button>
        )}
      </div>
      <button
        className="w-4 h-4 flex items-center justify-center rounded-sm hover:bg-gray-200"
        onClick={toggleChat}
        disabled={isLoading}
      >
        <X className="w-3 h-3" strokeWidth={3} />
      </button>
    </div>
  );
}
