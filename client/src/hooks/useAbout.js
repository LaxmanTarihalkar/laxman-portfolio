import { useEffect, useState } from 'react';
import { getAbout } from '../services/api.js';
import { aboutParagraphs, aboutFacts, personal } from '../data/portfolio.js';

/** Fetches About content from the backend, falls back to static data. */
export function useAbout() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await getAbout();
        if (!active) return;
        const data = res.data?.data?.about;
        if (data && (data.paragraphs?.length > 0 || data.facts?.length > 0)) {
          setAbout(data);
        } else {
          setAbout(null); // use static fallback
        }
      } catch {
        if (active) setAbout(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return {
    loading,
    paragraphs: about?.paragraphs?.length ? about.paragraphs : aboutParagraphs,
    facts: about?.facts?.length ? about.facts : aboutFacts,
    profileImage: about?.profileImage || personal.profileImage || '/images/Laxman-Tarihalkar-img.png',
  };
}
