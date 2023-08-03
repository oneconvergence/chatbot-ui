import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';

const useD3xApiService = () => {
  const fetchService = useFetch();

  const getApps = useCallback(
    (signal?: AbortSignal) => {
      return fetchService.get(`http://127.0.0.1:8081/api/ds/apps/`, {
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
  };
};

export default useD3xApiService;
