'use client';

import { Message } from '@/lib/types';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: Message;
  showTiming?: boolean;
}

function ChatMessage({ message, showTiming = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <Card className={cn(
        "max-w-[80%] p-4",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted text-muted-foreground"
      )}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={isUser ? "secondary" : "outline"}>
              {isUser ? "You" : "Assistant"}
            </Badge>
            <span className="text-xs opacity-70">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
          
          <div className="flex-1">
            {message.role === 'assistant' ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({children}) => <h1 className="text-lg font-bold mb-2 text-gray-900">{children}</h1>,
                    h2: ({children}) => <h2 className="text-base font-semibold mb-2 text-gray-800">{children}</h2>,
                    h3: ({children}) => <h3 className="text-sm font-medium mb-1 text-gray-700">{children}</h3>,
                    p: ({children}) => <p className="mb-2 text-gray-900">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                    li: ({children}) => <li className="text-gray-900">{children}</li>,
                    strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                    em: ({children}) => <em className="italic text-gray-800">{children}</em>,
                    code: ({children}) => (
                      <code className="bg-gray-100 text-gray-900 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                    ),
                    pre: ({children}) => (
                      <pre className="bg-gray-100 text-gray-900 p-2 rounded text-xs font-mono overflow-x-auto mb-2">{children}</pre>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}
          </div>
          
          {showTiming && message.timing && !isUser && (
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {message.timing.responseTime}ms
              </Badge>
              {message.timing.timeToFirstToken && (
                <Badge variant="outline" className="text-xs">
                  TTFT: {message.timing.timeToFirstToken}ms
                </Badge>
              )}
              {message.timing.tokensPerSecond && (
                <Badge variant="outline" className="text-xs">
                  {message.timing.tokensPerSecond.toFixed(1)} tok/s
                </Badge>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ChatMessage;
