import React from 'react';

import { Badge } from '@/components/ui/badge';

interface StatusBarProps {
  selectedModel: string | null;
  messageCount: number;
}

function StatusBar({ selectedModel, messageCount }: StatusBarProps) {
  if (!selectedModel) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center gap-2">
      <Badge variant="outline">Model: {selectedModel}</Badge>
      <Badge variant="outline">Messages: {messageCount}</Badge>
    </div>
  );
}

export default StatusBar;
