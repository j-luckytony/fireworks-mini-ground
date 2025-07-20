'use client';

import { useState } from 'react';

import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

function ChatInput({ onSubmit, disabled, loading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !loading) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here... (Shift+Enter for new line)"
        className="min-h-[60px] flex-1 resize-none"
        disabled={disabled || loading}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || disabled || loading}
        className="h-[60px] w-[60px] cursor-pointer"
      >
        {loading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}

export default ChatInput;
