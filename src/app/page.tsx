'use client';

import { useState } from 'react';

import { useChat, useModels } from '@/hooks';

import { ChatContainer } from '@/components/chat';
import { PlaygroundControls, PlaygroundHeader, StatusBar } from '@/components/playground';

export default function Home() {
  const { selectedModel, setSelectedModel } = useModels();
  const { messages, isLoading, sendMessage, clearMessages, messagesEndRef } =
    useChat(selectedModel);
  const [showTiming, setShowTiming] = useState(false);

  const toggleTiming = () => {
    setShowTiming(!showTiming);
  };

  return (
    <div className="bg-background min-h-screen p-4">
      <div className="mx-auto max-w-4xl">
        <PlaygroundHeader
          title="Mini Model Playground"
          subtitle="Test and interact with Fireworks AI models"
        />

        <PlaygroundControls
          onModelChange={setSelectedModel}
          showTiming={showTiming}
          onToggleTiming={toggleTiming}
          onClearChat={clearMessages}
          hasMessages={messages.length > 0}
        />

        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          selectedModel={selectedModel}
          showTiming={showTiming}
          onSendMessage={sendMessage}
          messagesEndRef={messagesEndRef}
        />

        <StatusBar selectedModel={selectedModel} messageCount={messages.length} />
      </div>
    </div>
  );
}
