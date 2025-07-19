/**
 * Server-side configuration for Fireworks AI API
 * This file contains server-only configuration and utilities
 */
export const FIREWORKS_CONFIG = {
  // API endpoints
  BASE_URL: 'https://api.fireworks.ai/inference/v1',
  MODELS_URL: 'https://app.fireworks.ai/api/models/mini-playground',
  
  // Chat completions configuration
  CHAT_DEFAULTS: {
    stream: true,
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  },
  
  // Request configuration
  REQUEST_TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 3,
  
  // Model filtering
  SERVERLESS_ONLY: true,
} as const;

/**
 * Chat completion request parameters for server-side API routes
 */
export interface ChatCompletionParams {
  model: string;
  messages: Array<{ role: string; content: string }>;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

/**
 * Get default chat completion parameters
 * Used by server-side API routes only
 */
export function getDefaultChatParams(
  model: string,
  messages: Array<{ role: string; content: string }>,
  overrides?: Partial<ChatCompletionParams>
): ChatCompletionParams {
  return {
    model,
    messages,
    ...FIREWORKS_CONFIG.CHAT_DEFAULTS,
    ...overrides,
  };
}
