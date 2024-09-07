import React from "react";
import InputBox from "./InputBox";
import BottomActionRow from "./BottomActionRow";

export default function Footer() {
    return <div className="flex flex-col px-4 py-5 w-full">
        <hr className="text-gray-700 w-full" />
        <InputBox />
        <BottomActionRow />
    </div>
}