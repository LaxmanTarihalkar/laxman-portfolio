import { useEffect, useState } from 'react';
import {
  Plus, Pencil, Trash2, Loader2,
  Briefcase, Calendar, MapPin,
} from 'lucide-react';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../services/api.js';
import ExperienceFormModal from './ExperienceFormModal.jsx';

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null); // null | { experience? }
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getExperiences();
      setExperiences(res.data?.data?.experiences ?? []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load experiences.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (payload) => {
    if (modal?.experience) {
      await updateExperience(modal.experience._id, payload);
    } else {
      await createExperience(payload);
    }
    await load();
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience entry? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await deleteExperience(id);
      setExperiences((list) => list.filter((e) => e._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete experience.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-cream">Experience</h2>
          <p className="mt-1 text-sm text-cream/50">
            Manage your internships and work history.
          </p>
        </div>
        <button
          onClick={() => setModal({ experience: null })}
          className="btn-primary !py-2.5"
        >
          <Plus className="h-4 w-4" /> Add Experience
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-burnt" />
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && experiences.length === 0 && (
        <div className="mt-6 rounded-2xl border border-cream/10 bg-charcoal-700/40 p-10 text-center text-cream/50">
          No experience entries yet.{' '}
          <button
            onClick={() => setModal({ experience: null })}
            className="text-burnt hover:underline"
          >
            Add your first one.
          </button>
        </div>
      )}

      {/* List */}
      {!loading && experiences.length > 0 && (
        <div className="mt-6 space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="rounded-2xl border border-cream/10 bg-charcoal-700/40 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                {/* Icon */}
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-burnt/15 text-burnt">
                  <Briefcase className="h-5 w-5" />
                </span>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-burnt/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-burnt-400">
                      {exp.type}
                    </span>
                    <span className="text-xs text-cream/30">
                      Order: {exp.displayOrder}
                    </span>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-cream">
                    {exp.position}
                  </h3>
                  <p className="text-sm font-semibold text-burnt-400">
                    {exp.company}
                  </p>

                  <div className="mt-1.5 flex flex-wrap gap-4 text-xs text-cream/50">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {exp.duration}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Responsibilities preview */}
                  {exp.responsibilities?.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {exp.responsibilities.slice(0, 3).map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-cream/55">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-burnt" />
                          {r}
                        </li>
                      ))}
                      {exp.responsibilities.length > 3 && (
                        <li className="text-xs text-cream/30">
                          +{exp.responsibilities.length - 3} more…
                        </li>
                      )}
                    </ul>
                  )}

                  {/* Tech tags */}
                  {exp.technologies?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-cream/8 px-2 py-0.5 text-[11px] text-cream/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 gap-2 sm:flex-col">
                  <button
                    onClick={() => setModal({ experience: exp })}
                    className="flex items-center gap-1.5 rounded-lg bg-cream/8 px-3 py-2 text-xs font-medium text-cream/70 hover:bg-burnt/20 hover:text-burnt"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    disabled={deletingId === exp._id}
                    className="flex items-center gap-1.5 rounded-lg bg-cream/8 px-3 py-2 text-xs font-medium text-cream/70 hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50"
                  >
                    {deletingId === exp._id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <ExperienceFormModal
          experience={modal.experience}
          onClose={() => setModal(null)}
          onSaved={handleSave}
        />
      )}
    </div>
  );
}
