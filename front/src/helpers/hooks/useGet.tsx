import { useState, useEffect, useCallback } from "react";
import { Http } from "../../config/api";

interface UseGetReturn<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
  refetch: () => Promise<void>;
}

export const useGet = <T,>(path: string | null): UseGetReturn<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(async () => {
    if (!path) return;

    try {
      setLoading(true);
      setError(null);

      console.log("PATH:", path);

      const res = await Http.get<T>(path);

      console.log("RESPONSE:", res.data);

      setData(res.data);
    } catch (err: any) {
      console.error("GET ERROR:", err);
      setError(err?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = async () => {
    await fetchData();
  };

  return {
    loading,
    error,
    data,
    refetch,
  };
};