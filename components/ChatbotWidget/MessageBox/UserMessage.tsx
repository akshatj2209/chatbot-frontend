import React from "react";
import { Message } from "../types";

type Props = {
    message: Message
}

export default function BotMessage({ message }: Props) {
    return <div className="ml-auto w-max bg-violet-600 px-3 py-2.5 rounded-l-2xl rounded-b-2xl border border-violet-500 text-white text-xs font-semibold" >
        {message.text}
    </div>
}