import React from "react";
import Image from "next/image";
import { Message } from "../types";

type Props = {
    message: Message
}

export default function BotMessage({ message }: Props) {
    return <div className="flex gap-2">
        <Image src="/ava-image.png" alt="avatar" width={32} height={32} className="max-h-8 max-w-8 shrink-0" />
        <div className="bg-gray-50 py-2.5 px-3 rounded-b-[18px] rounded-r-[18px] text-gray-600 text-xs font-semibold" >
            {message.text}
        </div>
    </div>
}