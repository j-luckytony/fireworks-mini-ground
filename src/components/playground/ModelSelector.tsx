'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useModels } from '@/hooks/useModels';

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
        <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse" />
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
      <label className="text-sm font-medium mb-4">Model</label>
      <Select value={selectedModel || ''} onValueChange={handleModelChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.name} value={model.name}>
              <div className="flex flex-col items-start w-full">
                <span className="font-medium">{model.title}</span>
                {model.description && (
                  <span className="text-sm text-gray-500 truncate max-w-[300px]">
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
