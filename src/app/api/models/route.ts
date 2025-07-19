import { NextResponse } from 'next/server';
import { FIREWORKS_CONFIG } from '@/server/config';

export async function GET() {
  try {
    const response = await fetch(FIREWORKS_CONFIG.MODELS_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }

    const models = await response.json();
    return NextResponse.json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
}
