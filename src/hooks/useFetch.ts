import { useCallback, useRef, useState } from 'react';

export function useFetch<T>(requestFn: (signal?: AbortSignal) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async () => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const result = await requestFn(controllerRef.current.signal);
      setData(result);
    } catch (err: any) {
      if (err.name !== 'CanceledError') {
        setError(err.message || 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }, [requestFn]);

  return { data, loading, error, execute };
}
