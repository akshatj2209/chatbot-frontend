// src/app/api/chat/route.ts

import { NextResponse } from 'next/server';
import { fetchFromAPI } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const { message, conversationId, language, context } = await request.json();
    console.log('language:', language);
    console.log('context:', context);
    const response = await fetchFromAPI(`/api/v1/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message: { sender: 'user', content: message }, language: language, context: context }),
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'Failed to fetch response from chatbot' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { message, conversationId, messageId, language, context } = await request.json();
    const response = await fetchFromAPI(
      `/api/v1/conversations/${conversationId}/messages/${messageId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ message: { content: message }, language: language, context: context }),
      }
    );
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'Failed to fetch response from chatbot' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { conversationId, messageId } = await request.json();
    const response = await fetchFromAPI(
      `/api/v1/conversations/${conversationId}/messages/${messageId}`,
      {
        method: 'DELETE',
      }
    );
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'Failed to fetch response from chatbot' }, { status: 500 });
  }
}
