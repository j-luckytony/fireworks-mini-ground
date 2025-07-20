"use client";

import { useState } from "react";
import { useChat, useModels } from "@/hooks";
import { ChatContainer } from "@/components/chat";
import {
  PlaygroundHeader,
  PlaygroundControls,
  StatusBar,
} from "@/components/playground";

export default function Home() {
  const { selectedModel, setSelectedModel } = useModels();
  const { messages, isLoading, sendMessage, clearMessages, messagesEndRef } =
    useChat(selectedModel);
  const [showTiming, setShowTiming] = useState(false);

  const toggleTiming = () => {
    setShowTiming(!showTiming);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
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

        <StatusBar
          selectedModel={selectedModel}
          messageCount={messages.length}
        />
      </div>
    </div>
  );
}
