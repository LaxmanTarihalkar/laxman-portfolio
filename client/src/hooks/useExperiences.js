import { useEffect, useState } from 'react';
import { getExperiences } from '../services/api.js';
import { experiences as staticExperiences } from '../data/portfolio.js';

/**
 * Fetches experience entries from the backend.
 * Falls back to the static data in portfolio.js if the API is unreachable
 * so the section is never blank.
 */
export function useExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await getExperiences();
        if (!active) return;
        const list = res.data?.data?.experiences ?? [];
        // If DB is empty fall back to static data
        setExperiences(list.length > 0 ? list : staticExperiences);
        setError(null);
      } catch {
        if (!active) return;
        // API unavailable — use static fallback silently
        setExperiences(staticExperiences);
        setError(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return { experiences, loading, error };
}
