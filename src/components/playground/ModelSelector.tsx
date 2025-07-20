'use client';

import { useModels } from '@/hooks/useModels';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ModelSelectorProps {
  onModelChange: (model: string) => void;
}

function ModelSelector({ onModelChange }: ModelSelectorProps) {
  const { models, isLoading, error, selectedModel, setSelectedModel } = useModels();

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    onModelChange(model);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Model</label>
        <div className="h-10 w-full animate-pulse rounded-md bg-gray-100" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Model</label>
        <Badge variant="destructive">{error}</Badge>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="mb-4 text-sm font-medium">Model</label>
      <Select value={selectedModel || ''} onValueChange={handleModelChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map(model => (
            <SelectItem key={model.name} value={model.name}>
              <div className="flex w-full flex-col items-start">
                <span className="font-medium">{model.title}</span>
                {model.description && (
                  <span className="max-w-[300px] truncate text-sm text-gray-500">
                    {model.description}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default ModelSelector;
