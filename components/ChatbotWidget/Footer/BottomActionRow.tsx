import React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, SendHorizonal } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';
import SettingsDropdown from './SettingsDropdown';
import { contextOptions } from '../constants';

export default function BottomActionRow() {
  const { context, setContext, isLoading, input, sendMessage } = useChatContext();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-3 items-center">
        <div className="text-gray-400 text-xs font-semibold">Context</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex px-1.5 gap-1 py-0.5 h-7 text-gray-800 bg-gray-100 text-xs font-semibold"
            >
              {context}
              <ChevronDownIcon className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 text-gray-400 text-xs font-semibold">
            {contextOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                className="cursor-pointer"
                onClick={() => setContext(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-[18px] items-center">
        <SettingsDropdown />
        <button
          className="w-6 h-6 flex items-center justify-center rounded-sm enabled:hover:bg-gray-200 disabled:opacity-40"
          onClick={sendMessage}
          disabled={isLoading || !input.length}
        >
          <SendHorizonal className="w-5 h-5 text-gray-500" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
