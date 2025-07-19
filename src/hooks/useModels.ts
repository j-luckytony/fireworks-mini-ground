import { useState, useEffect } from "react";
import { Model } from "@/types";
import ApiService from "@/lib/api";

export interface ModelsHookReturn {
  models: Model[];
  isLoading: boolean;
  error: string | null;
  selectedModel: string | null;
  setSelectedModel: (model: string | null) => void;
}

export function useModels(): ModelsHookReturn {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModels() {
      try {
        setIsLoading(true);
        setError(null);

        const availableModels = await ApiService.fetchModels();
        setModels(availableModels);

        // Select first model by default if none selected
        if (availableModels.length > 0 && !selectedModel) {
          setSelectedModel(availableModels[0].name);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch models");
      } finally {
        setIsLoading(false);
      }
    }

    fetchModels();
  }, [selectedModel]);

  return {
    models,
    isLoading,
    error,
    selectedModel,
    setSelectedModel,
  };
}
