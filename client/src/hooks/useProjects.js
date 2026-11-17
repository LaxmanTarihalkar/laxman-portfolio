import { useEffect, useState } from 'react';
import { getProjects } from '../services/api.js';

/**
 * Fetches projects from the backend with explicit loading / error / empty
 * states. If the API is unreachable, the UI degrades gracefully to an empty
 * state rather than crashing.
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const res = await getProjects();
        if (!active) return;
        const list = res.data?.data?.projects ?? [];
        setProjects(list);
        setError(null);
      } catch (err) {
        if (!active) return;
        setError(err?.response?.data?.message || 'Unable to load projects.');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return { projects, loading, error };
}
