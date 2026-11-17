import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star, Loader2, ExternalLink, Github } from 'lucide-react';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../services/api.js';
import ProjectFormModal from './ProjectFormModal.jsx';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null); // null | { project? }
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getProjects();
      setProjects(res.data?.data?.projects ?? []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      if (modal?.project) {
        await updateProject(modal.project._id, payload);
      } else {
        await createProject(payload);
      }
      await load();
      setModal(null);
    } catch (err) {
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
      setProjects((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete project.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-cream">Projects</h2>
          <p className="mt-1 text-sm text-cream/50">Add, edit, and remove your work.</p>
        </div>
        <button onClick={() => setModal({ project: null })} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16 text-cream/60">
          <Loader2 className="h-6 w-6 animate-spin text-burnt" />
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="mt-6 rounded-2xl border border-cream/10 bg-charcoal-700/40 p-10 text-center text-cream/50">
          No projects yet. Click <span className="text-burnt">Add Project</span> to create your first one.
        </div>
      )}

      {!loading && projects.length > 0 && (
        <div className="mt-6 space-y-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="flex flex-col gap-4 rounded-2xl border border-cream/10 bg-charcoal-700/40 p-5 sm:flex-row sm:items-center"
            >
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-sm text-cream/40">{String(p.displayOrder).padStart(2, '0')}</span>
                {p.featured && <Star className="h-4 w-4 fill-burnt text-burnt" />}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold text-cream">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-cream/50">{p.description}</p>
                {p.technologies?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 6).map((t) => (
                      <span key={t} className="rounded bg-cream/8 px-2 py-0.5 text-[11px] text-cream/60">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg bg-cream/8 text-cream/60 hover:text-burnt" aria-label="GitHub">
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg bg-cream/8 text-cream/60 hover:text-burnt" aria-label="Live demo">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <button
                  onClick={() => setModal({ project: p })}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-cream/8 text-cream/60 hover:text-burnt"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  disabled={deletingId === p._id}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-cream/8 text-cream/60 hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50"
                  aria-label="Delete"
                >
                  {deletingId === p._id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <ProjectFormModal
          project={modal.project}
          saving={saving}
          onClose={() => setModal(null)}
          onSaved={handleSave}
        />
      )}
    </div>
  );
}
