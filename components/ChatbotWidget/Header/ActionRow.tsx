import React from 'react';
import { Maximize2, PanelLeft, X } from 'lucide-react';

export default function ActionRow() {
    return (
        <div className="flex justify-between gap-4 text-gray-500 font-bold">
            <div className="flex gap-3">
                <Maximize2 className="w-3 h-3" strokeWidth={3} />
                <PanelLeft className="w-3 h-3" strokeWidth={3} />
            </div>
            <X className="w-3 h-3" strokeWidth={3} />
        </div>
    );
}
