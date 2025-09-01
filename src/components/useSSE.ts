// useSSE.ts
import { useEffect } from 'react';

export default function useSSE(
  onMessage: (payload: unknown) => void
): void {
  useEffect(() => {
    const url = 'http://localhost:3000/events'; // adjust to match backend
    const es = new EventSource(url);

    es.onmessage = (e: MessageEvent) => {
      try {
        const payload = JSON.parse(e.data);
        onMessage(payload);
      } catch (err) {
        console.error('SSE parse error', err);
      }
    };

    es.addEventListener('connected', (e: MessageEvent) => {
      console.log('SSE connected', e.data);
    });

    es.onerror = (err: Event) => {
      console.error('SSE error', err);
    };

    return () => es.close();
  }, [onMessage]);
}
