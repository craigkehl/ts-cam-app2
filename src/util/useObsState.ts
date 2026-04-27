import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchObsState, triggerObsReconnect, ObsState } from './obs-http-requests';

const POLL_INTERVAL = 3000;

const INITIAL_STATE: ObsState = { connection: 'connecting', currentScene: null, scenes: [] };

export const useObsState = (): { state: ObsState; reconnect: () => void } => {
  const [state, setState] = useState<ObsState>(INITIAL_STATE);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);

  const startPolling = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const poll = async () => {
      const result = await fetchObsState();
      if (cancelledRef.current) return;
      setState(result);
      timerRef.current = setTimeout(poll, POLL_INTERVAL);
    };

    poll();
  }, []);

  const reconnect = useCallback(async () => {
    setState(s => ({ ...s, connection: 'connecting' }));
    await triggerObsReconnect();
    startPolling();
  }, [startPolling]);

  useEffect(() => {
    cancelledRef.current = false;
    startPolling();
    return () => {
      cancelledRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startPolling]);

  return { state, reconnect };
};
