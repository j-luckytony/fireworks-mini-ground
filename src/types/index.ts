export interface Model {
  name: string; // This is the model ID (e.g., "accounts/fireworks/models/kimi-k2-instruct")
  title: string; // This is the display name (e.g., "Kimi K2 Instruct")
  description?: string;
  type?: string;
  serverless?: boolean;
  contextLength?: number;
  supportsImageInput?: boolean;
  tags?: string[];
  cost?: {
    inputTokenPrice?: number;
    outputTokenPrice?: number;
    tokenPrice?: number;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  timing?: {
    responseTime: number;
    timeToFirstToken?: number;
    tokensPerSecond?: number;
  };
}

export interface ChatResponse {
  choices: Array<{
    delta: {
      content?: string;
      role?: string;
    };
    finish_reason?: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
