import { useEffect, useState } from 'react';
import { getProjects } from '../services/api.js';
import { staticProjects } from '../data/portfolio.js';

/**
 * Fetches projects from the backend API.
 * If the API is unreachable (e.g. GitHub Pages with no backend),
 * silently falls back to the static project data so the section
 * never shows an error to visitors.
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
        // If API returned an empty list, use static fallback
        setProjects(list.length > 0 ? list : staticProjects);
        setError(null);
      } catch {
        // API unavailable — use static data silently, no error shown
        if (!active) return;
        setProjects(staticProjects);
        setError(null);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => { active = false; };
  }, []);

  return { projects, loading, error };
}
