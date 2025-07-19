import React from 'react';
import { ChatMessage, ChatInput } from '.';
import type { ChatMessage as ChatMessageType } from '@/hooks';

interface ChatContainerProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  selectedModel: string | null;
  showTiming: boolean;
  onSendMessage: (content: string) => Promise<void>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

function ChatContainer({
  messages,
  isLoading,
  selectedModel,
  showTiming,
  onSendMessage,
  messagesEndRef,
}: ChatContainerProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm border">
      <div className="h-[500px] overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">No messages yet</h3>
              <p className="text-sm">Start a conversation by typing a message below.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                showTiming={showTiming}
              />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Chat Input */}
      <div className="border-t p-4">
        <ChatInput
          onSubmit={onSendMessage}
          disabled={!selectedModel}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default ChatContainer;
