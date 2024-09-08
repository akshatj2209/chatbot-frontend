import React from 'react';
import { Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { languages } from '../constants';
import { useChatContext } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

const SettingsDropdown = () => {
  const { selectedLanguage, setSelectedLanguage } = useChatContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-6 h-6 flex items-center justify-center rounded-sm enabled:hover:bg-gray-200 disabled:opacity-40">
          <Settings className="w-5 h-5 text-gray-500" strokeWidth={2} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          <span className="font-semibold">Language</span>
        </DropdownMenuLabel>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            className="cursor-pointer"
            onClick={() => setSelectedLanguage(lang)}
          >
            <span
              className={cn(
                'text-sm',
                selectedLanguage === lang ? 'text-gray-800 font-semibold' : 'text-gray-400'
              )}
            >
              {lang}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
