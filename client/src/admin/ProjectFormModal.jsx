import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

/**
 * Modal for creating or editing a project. Empty `project` prop means "create".
 */
export default function ProjectFormModal({ project, onClose, onSaved }) {
  const isEdit = Boolean(project);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    technologies: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    displayOrder: 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || '',
        slug: project.slug || '',
        description: project.description || '',
        technologies: (project.technologies || []).join(', '),
        image: project.image || '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        featured: project.featured || false,
        displayOrder: project.displayOrder || 0,
      });
    }
  }, [project]);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      technologies: form.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      displayOrder: Number(form.displayOrder) || 0,
    };

    try {
      await onSaved(payload);
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Failed to save project.'
      );
    } finally {
      setSaving(false);
    }
  };

  const field = (name, label, type = 'text') => (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-cream/70">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={handleChange(name)}
        className="w-full rounded-xl border border-cream/10 bg-charcoal px-4 py-2.5 text-cream placeholder:text-cream/30 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt/40"
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-cream/10 bg-charcoal p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-cream">
            {isEdit ? 'Edit Project' : 'Add Project'}
          </h3>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {field('title', 'Title')}
            {field('slug', 'Slug (lowercase, hyphens)')}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-cream/70">
              Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={handleChange('description')}
              className="w-full resize-none rounded-xl border border-cream/10 bg-charcoal px-4 py-2.5 text-cream placeholder:text-cream/30 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt/40"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-cream/70">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={form.technologies}
              onChange={handleChange('technologies')}
              placeholder="React.js, Node.js, MongoDB"
              className="w-full rounded-xl border border-cream/10 bg-charcoal px-4 py-2.5 text-cream placeholder:text-cream/30 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt/40"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {field('image', 'Image path (e.g. /images/projects/x.svg)')}
            {field('githubUrl', 'GitHub URL')}
            {field('liveUrl', 'Live demo URL')}
            {field('displayOrder', 'Display order', 'number')}
          </div>

          <label className="flex items-center gap-3 text-sm font-medium text-cream/70">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={handleChange('featured')}
              className="h-4 w-4 rounded accent-burnt"
            />
            Mark as featured
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-70">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                </>
              ) : (
                'Save Project'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
