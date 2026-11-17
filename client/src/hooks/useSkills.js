import { useEffect, useState } from 'react';
import { getSkills } from '../services/api.js';
import { skillGroups as staticSkills } from '../data/portfolio.js';

/** Fetches skill groups from the backend, falls back to static data. */
export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await getSkills();
        if (!active) return;
        const list = res.data?.data?.skills ?? [];
        setSkills(list.length > 0 ? list : staticSkills);
      } catch {
        if (active) setSkills(staticSkills);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return { skills, loading };
}
