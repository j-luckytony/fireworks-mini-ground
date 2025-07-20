import React from 'react';

import { Eye, EyeOff, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { ModelSelector } from '.';

interface PlaygroundControlsProps {
  onModelChange: (model: string | null) => void;
  showTiming: boolean;
  onToggleTiming: () => void;
  onClearChat: () => void;
  hasMessages: boolean;
}

function PlaygroundControls({
  onModelChange,
  showTiming,
  onToggleTiming,
  onClearChat,
  hasMessages,
}: PlaygroundControlsProps) {
  return (
    <div className="bg-card mb-6 rounded-lg border p-6 shadow-sm">
      <div className="flex flex-col items-end gap-4 sm:flex-row">
        <div className="flex-1">
          <ModelSelector onModelChange={onModelChange} />
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleTiming}
                  className="flex cursor-pointer items-center gap-2"
                >
                  {showTiming ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showTiming ? 'Hide Timing' : 'Show Timing'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {showTiming ? 'Hide timing metrics' : 'Show response time and token statistics'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearChat}
                  disabled={!hasMessages}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Chat
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear all chat messages and start fresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

export default PlaygroundControls;
