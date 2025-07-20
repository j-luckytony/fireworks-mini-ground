import { Model } from '@/types';

export class ApiService {
  private static readonly BASE_URL = '/api';

  /**
   * Fetch all available models from the API
   */
  static async fetchModels(): Promise<Model[]> {
    const response = await fetch(`${this.BASE_URL}/models`);

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
    }

    const data: Model[] = await response.json();

    // Filter to only show serverless models that are available for immediate use
    return data.filter(model => model.serverless !== false);
  }

  /**
   * Send a chat message and get a streaming response
   */
  static async sendChatMessage(
    model: string,
    messages: Array<{ role: string; content: string }>,
    signal?: AbortSignal
  ): Promise<Response> {
    const response = await fetch(`${this.BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
      }),
      signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  /**
   * Parse streaming chat response
   */
  static async *parseStreamingResponse(response: Response): AsyncGenerator<string, void, unknown> {
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body available');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                yield content;
              }
            } catch (e) {
              // Skip invalid JSON chunks
              console.warn('Failed to parse streaming chunk:', e);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

export default ApiService;
