import { NextRequest } from 'next/server';
import { FIREWORKS_CONFIG, getDefaultChatParams } from '@/server/config';

export async function POST(request: NextRequest) {
  try {
    const { model, messages } = await request.json();

    if (!process.env.FIREWORKS_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'FIREWORKS_API_KEY not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const chatParams = getDefaultChatParams(model, messages);
    
    const response = await fetch(`${FIREWORKS_CONFIG.BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.FIREWORKS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chatParams),
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(
        JSON.stringify({ error: `Fireworks API error: ${error}` }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return streaming response
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
