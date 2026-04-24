import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key);
        if (mounted && raw !== null) {
          setState(JSON.parse(raw) as T);
        }
      } catch {}
      if (mounted) {
        setLoaded(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [key]);

  const update = useCallback(
    async (value: T | ((prev: T) => T)) => {
      setState(prev => {
        const next =
          typeof value === 'function' ? (value as (p: T) => T)(prev) : value;
        AsyncStorage.setItem(key, JSON.stringify(next)).catch(() => {});
        return next;
      });
    },
    [key],
  );

  return {state, update, loaded};
}
