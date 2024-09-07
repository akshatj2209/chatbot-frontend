// src/app/api/chat/route.ts

import { NextResponse } from "next/server";
import { fetchFromAPI } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = await fetchFromAPI("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in chat API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch response from chatbot" },
      { status: 500 }
    );
  }
}
