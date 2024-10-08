// lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  console.log(process.env.BACKEND_API_KEY);
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.BACKEND_API_KEY || '',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }

  return response.json();
}
