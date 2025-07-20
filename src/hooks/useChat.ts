import { useEffect, useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import ApiService from '@/lib/api';

export interface ChatMessage {
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

export interface ChatHookReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function useChat(selectedModel: string | null): ChatHookReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!selectedModel || !content.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Create assistant message for streaming
    const assistantMessageId = uuidv4();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);

    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const startTime = Date.now();
    let assistantContent = '';

    try {
      const response = await ApiService.sendChatMessage(
        selectedModel,
        [...messages, userMessage].map(m => ({
          role: m.role,
          content: m.content,
        })),
        abortControllerRef.current.signal
      );

      // Stream the response
      for await (const chunk of ApiService.parseStreamingResponse(response)) {
        assistantContent += chunk;

        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId ? { ...msg, content: assistantContent } : msg
          )
        );
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Update final message with timing
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: assistantContent, timing: { responseTime: duration } }
            : msg
        )
      );
      return;
    } catch (error) {
      console.error('Error sending message:', error);
      if (error instanceof Error && error.name === 'AbortError') {
        // Remove assistant message on abort
        setMessages(prev => prev.filter(msg => msg.id !== assistantMessageId));
      } else {
        // Show error message
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, content: 'Error: Failed to get response from the model.' }
              : msg
          )
        );
      }
      // Remove the assistant message if there was an error (we'll need to identify it differently)
      setMessages(prev => prev.slice(0, -1)); // Remove the last message (assistant message)
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    messagesEndRef,
  };
}
