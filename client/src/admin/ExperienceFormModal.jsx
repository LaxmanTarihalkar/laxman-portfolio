import { useState, useEffect } from 'react';
import { X, Loader2, Plus, Trash2 } from 'lucide-react';

/**
 * Modal for adding or editing an experience entry.
 * Empty `experience` prop = create mode.
 */
export default function ExperienceFormModal({ experience, onClose, onSaved }) {
  const isEdit = Boolean(experience);

  const [form, setForm] = useState({
    company: '',
    position: '',
    type: 'Internship',
    location: '',
    duration: '',
    responsibilities: [''],
    technologies: '',
    displayOrder: 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (experience) {
      setForm({
        company: experience.company || '',
        position: experience.position || '',
        type: experience.type || 'Internship',
        location: experience.location || '',
        duration: experience.duration || '',
        responsibilities:
          experience.responsibilities?.length > 0
            ? experience.responsibilities
            : [''],
        technologies: (experience.technologies || []).join(', '),
        displayOrder: experience.displayOrder ?? 0,
      });
    }
  }, [experience]);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  // ---- Responsibilities list helpers ----
  const updateResp = (idx, val) =>
    setForm((f) => {
      const r = [...f.responsibilities];
      r[idx] = val;
      return { ...f, responsibilities: r };
    });

  const addResp = () =>
    setForm((f) => ({ ...f, responsibilities: [...f.responsibilities, ''] }));

  const removeResp = (idx) =>
    setForm((f) => ({
      ...f,
      responsibilities: f.responsibilities.filter((_, i) => i !== idx),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      company: form.company.trim(),
      position: form.position.trim(),
      type: form.type.trim(),
      location: form.location.trim(),
      duration: form.duration.trim(),
      responsibilities: form.responsibilities.map((r) => r.trim()).filter(Boolean),
      technologies: form.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      displayOrder: Number(form.displayOrder) || 0,
    };

    try {
      await onSaved(payload);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save experience.');
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    'w-full rounded-xl border border-cream/10 bg-charcoal px-4 py-2.5 text-cream placeholder:text-cream/30 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt/40';

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-cream/10 bg-charcoal p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-cream">
            {isEdit ? 'Edit Experience' : 'Add Experience'}
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company + Position */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-cream/70">
                Company <span className="text-burnt">*</span>
              </label>
              <input
                type="text"
                value={form.company}
                onChange={handleChange('company')}
                placeholder="e.g. iFutureTech"
                required
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-cream/70">
                Position <span className="text-burnt">*</span>
              </label>
              <input
                type="text"
                value={form.position}
                onChange={handleChange('position')}
                placeholder="e.g. Data Analytics Intern"
                required
                className={inputCls}
              />
            </div>
          </div>

          {/* Type + Duration */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-cream/70">
                Employment Type <span className="text-burnt">*</span>
              </label>
              <select
                value={form.type}
                onChange={handleChange('type')}
                className={inputCls}
              >
                <option value="Internship">Internship</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-cream/70">
                Duration <span className="text-burnt">*</span>
              </label>
              <input
                type="text"
                value={form.duration}
                onChange={handleChange('duration')}
                placeholder="e.g. February 2026 – May 2026"
                required
                className={inputCls}
              />
            </div>
          </div>

          {/* Location + Display Order */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-cream/70">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={handleChange('location')}
                placeholder="e.g. Hybrid, Belagavi"
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-cream/70">
                Display Order
              </label>
              <input
                type="number"
                min="0"
                value={form.displayOrder}
                onChange={handleChange('displayOrder')}
                className={inputCls}
              />
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-cream/70">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={form.technologies}
              onChange={handleChange('technologies')}
              placeholder="Python, React.js, Tailwind CSS"
              className={inputCls}
            />
          </div>

          {/* Responsibilities */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-cream/70">
                Responsibilities
              </label>
              <button
                type="button"
                onClick={addResp}
                className="flex items-center gap-1 rounded-lg bg-burnt/15 px-3 py-1.5 text-xs font-medium text-burnt hover:bg-burnt/25"
              >
                <Plus className="h-3.5 w-3.5" /> Add Point
              </button>
            </div>
            <div className="space-y-2.5">
              {form.responsibilities.map((r, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-burnt" />
                  <textarea
                    rows={2}
                    value={r}
                    onChange={(e) => updateResp(idx, e.target.value)}
                    placeholder={`Responsibility ${idx + 1}`}
                    className={`${inputCls} flex-1 resize-none`}
                  />
                  {form.responsibilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResp(idx)}
                      className="mt-2 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/30"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1 disabled:opacity-70"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                </>
              ) : (
                isEdit ? 'Update Experience' : 'Add Experience'
              )}
            </button>
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
