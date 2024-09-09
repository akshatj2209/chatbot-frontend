// src/app/api/chat/route.ts

import { NextResponse } from 'next/server';
import { fetchFromAPI } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const { message, conversationId } = await request.json();
    const response = await fetchFromAPI(`/api/v1/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ sender: 'user', content: message }),
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'Failed to fetch response from chatbot' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { message, conversationId, messageId } = await request.json();
    const response = await fetchFromAPI(
      `/api/v1/conversations/${conversationId}/messages/${messageId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ content: message }),
      }
    );
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'Failed to fetch response from chatbot' }, { status: 500 });
  }
}
