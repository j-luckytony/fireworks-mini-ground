import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, EyeOff, Trash2 } from 'lucide-react';

import { ModelSelector } from '.';

interface PlaygroundControlsProps {
  selectedModel: string | null;
  onModelChange: (model: string | null) => void;
  showTiming: boolean;
  onToggleTiming: () => void;
  onClearChat: () => void;
  hasMessages: boolean;
}

function PlaygroundControls({
  selectedModel,
  onModelChange,
  showTiming,
  onToggleTiming,
  onClearChat,
  hasMessages,
}: PlaygroundControlsProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <ModelSelector
            onModelChange={onModelChange}
          />
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleTiming}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  {showTiming ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  {showTiming ? 'Hide Timing' : 'Show Timing'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showTiming ? 'Hide timing metrics' : 'Show response time and token statistics'}</p>
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
