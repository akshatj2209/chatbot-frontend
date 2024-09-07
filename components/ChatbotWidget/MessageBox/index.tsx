import React from "react";
import { Message } from "../types";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

type Props = {
    messages: Message[]
}

export default function MessageBox({ messages }: Props) {
    return <div className="flex flex-col gap-[18px]">
        {messages.map((message) => (
            message.sender === "bot" ? <BotMessage key={message.id} message={message} /> : <UserMessage key={message.id} message={message} />
        ))}
    </div>
}