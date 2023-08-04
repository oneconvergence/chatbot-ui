import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';

const useD3xApiService = () => {
  const fetchService = useFetch();

  const getApps = useCallback(
    (signal?: AbortSignal) => {
      return fetchService.get(`/api/ds/apps/`, {
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      });
    },
    [fetchService],
  );

  const getModels = useCallback(
    (signal?: AbortSignal) => {
      return fetchService.get(`/chatbotui/api/gptfu/models`, {
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      });
    },
    [fetchService],
  );

  return {
    getApps,
    getModels
  };
};

export default useD3xApiService;
