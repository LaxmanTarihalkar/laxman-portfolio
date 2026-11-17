import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { Layout, Server, Database, GitBranch, BarChart3 } from 'lucide-react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../services/api.js';

const ICON_OPTIONS = ['Layout', 'Server', 'Database', 'GitBranch', 'BarChart3'];
const iconMap = { Layout, Server, Database, GitBranch, BarChart3 };

function SkillModal({ skill, onClose, onSaved }) {
  const isEdit = Boolean(skill);
  const [form, setForm] = useState({
    title: skill?.title || '',
    icon: skill?.icon || 'Layout',
    skills: skill?.skills?.join(', ') || '',
    displayOrder: skill?.displayOrder ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const inputCls = 'w-full rounded-xl border border-cream/10 bg-charcoal px-4 py-2.5 text-cream placeholder:text-cream/30 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt/40';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: form.title.trim(),
        icon: form.icon,
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
        displayOrder: Number(form.displayOrder) || 0,
      };
      await onSaved(payload);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-cream/10 bg-charcoal p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-cream">
            {isEdit ? 'Edit Skill Group' : 'Add Skill Group'}
          </h3>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"><X className="h-5 w-5" /></button>
        </div>
        {error && <div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-300">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-cream/70">Group Title <span className="text-burnt">*</span></label>
            <input type="text" required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Frontend Development" className={inputCls} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-cream/70">Icon</label>
              <select value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} className={inputCls}>
                {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-cream/70">Display Order</label>
              <input type="number" min="0" value={form.displayOrder} onChange={(e) => setForm((f) => ({ ...f, displayOrder: e.target.value }))} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-cream/70">Skills (comma separated) <span className="text-burnt">*</span></label>
            <textarea rows={3} value={form.skills} onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))} placeholder="HTML5, CSS3, JavaScript, React.js" className={`${inputCls} resize-none`} />
          </div>

          {/* Icon preview */}
          {form.skills && (
            <div className="rounded-xl border border-cream/10 bg-charcoal-700/40 p-4">
              <p className="mb-3 text-xs text-cream/40">Preview</p>
              <div className="flex items-center gap-3">
                {(() => { const Icon = iconMap[form.icon] || Layout; return <span className="grid h-10 w-10 place-items-center rounded-xl bg-burnt/15 text-burnt"><Icon className="h-5 w-5" /></span>; })()}
                <span className="text-sm font-semibold text-cream">{form.title || 'Group Title'}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {form.skills.split(',').map((s) => s.trim()).filter(Boolean).map((s) => (
                  <span key={s} className="rounded-lg border border-cream/10 bg-charcoal px-2.5 py-1 text-xs text-cream/70">{s}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-70">
              {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : <><Save className="h-4 w-4" /> {isEdit ? 'Update' : 'Add Group'}</>}
            </button>
            <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SkillsManager() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const load = async () => {
    setLoading(true);
    try {
      const res = await getSkills();
      setGroups(res.data?.data?.skills ?? []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load skills.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (payload) => {
    if (modal?.skill) {
      await updateSkill(modal.skill._id, payload);
      showToast('success', 'Skill group updated.');
    } else {
      await createSkill(payload);
      showToast('success', 'Skill group added.');
    }
    await load();
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill group?')) return;
    setDeletingId(id);
    try {
      await deleteSkill(id);
      setGroups((g) => g.filter((x) => x._id !== id));
      showToast('success', 'Skill group deleted.');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-cream">Technical Skills</h2>
          <p className="mt-1 text-sm text-cream/50">Manage skill groups and individual skills.</p>
        </div>
        <button onClick={() => setModal({ skill: null })} className="btn-primary !py-2.5">
          <Plus className="h-4 w-4" /> Add Skill Group
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`mt-4 flex items-center gap-2 rounded-xl border p-3.5 text-sm ${toast.type === 'success' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border-red-400/30 bg-red-400/10 text-red-300'}`}>
          {toast.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          {toast.message}
        </div>
      )}

      {loading && <div className="flex items-center justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-burnt" /></div>}
      {error && !loading && <div className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">{error}</div>}

      {!loading && !error && groups.length === 0 && (
        <div className="mt-6 rounded-2xl border border-cream/10 bg-charcoal-700/40 p-10 text-center text-cream/50">
          No skill groups yet.{' '}
          <button onClick={() => setModal({ skill: null })} className="text-burnt hover:underline">Add your first group.</button>
        </div>
      )}

      {!loading && groups.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {groups.map((group) => {
            const Icon = iconMap[group.icon] || Layout;
            return (
              <div key={group._id} className="rounded-2xl border border-cream/10 bg-charcoal-700/40 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-burnt/15 text-burnt">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-cream">{group.title}</h3>
                      <p className="text-xs text-cream/40">Order: {group.displayOrder} · {group.skills.length} skills</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <button onClick={() => setModal({ skill: group })} className="grid h-8 w-8 place-items-center rounded-lg bg-cream/8 text-cream/60 hover:bg-burnt/20 hover:text-burnt">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(group._id)} disabled={deletingId === group._id} className="grid h-8 w-8 place-items-center rounded-lg bg-cream/8 text-cream/60 hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50">
                      {deletingId === group._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <span key={s} className="rounded-lg border border-cream/10 bg-charcoal px-2.5 py-1 text-xs text-cream/70">{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modal && <SkillModal skill={modal.skill} onClose={() => setModal(null)} onSaved={handleSave} />}
    </div>
  );
}
