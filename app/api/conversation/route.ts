// src/app/api/chat/route.ts

import { NextResponse } from 'next/server';
import { fetchFromAPI } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const { title } = await request.json();
    const response = await fetchFromAPI('/api/v1/conversations', {
      method: 'POST',
      body: JSON.stringify({ title: title }),
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json({ error: 'Failed to fetch response from chatbot' }, { status: 500 });
  }
}
