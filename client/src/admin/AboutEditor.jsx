import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { getAbout, updateAbout } from '../services/api.js';

export default function AboutEditor() {
  const [paragraphs, setParagraphs] = useState(['']);
  const [facts, setFacts] = useState([{ label: '', value: '' }]);
  const [profileImage, setProfileImage] = useState('/images/Laxman-Tarihalkar-img.png');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await getAbout();
        const data = res.data?.data?.about;
        if (data) {
          if (data.paragraphs?.length) setParagraphs(data.paragraphs);
          if (data.facts?.length) setFacts(data.facts);
          if (data.profileImage) setProfileImage(data.profileImage);
        }
      } catch { /* use defaults */ }
      finally { setLoading(false); }
    })();
  }, []);

  /* ---- Paragraph helpers ---- */
  const updatePara = (i, v) => setParagraphs((p) => { const a = [...p]; a[i] = v; return a; });
  const addPara = () => setParagraphs((p) => [...p, '']);
  const removePara = (i) => setParagraphs((p) => p.filter((_, idx) => idx !== i));

  /* ---- Fact helpers ---- */
  const updateFact = (i, field, v) =>
    setFacts((f) => { const a = [...f]; a[i] = { ...a[i], [field]: v }; return a; });
  const addFact = () => setFacts((f) => [...f, { label: '', value: '' }]);
  const removeFact = (i) => setFacts((f) => f.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      await updateAbout({
        paragraphs: paragraphs.map((p) => p.trim()).filter(Boolean),
        facts: facts.filter((f) => f.label?.trim() && f.value?.trim()),
        profileImage: profileImage.trim(),
      });
      setStatus('success');
      setMsg('About section saved successfully.');
    } catch (err) {
      setStatus('error');
      setMsg(err?.response?.data?.message || 'Failed to save.');
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  const inputCls = 'w-full rounded-xl border border-cream/10 bg-charcoal px-4 py-2.5 text-cream placeholder:text-cream/30 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt/40';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-burnt" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-cream">About Me</h2>
          <p className="mt-1 text-sm text-cream/50">Edit your bio, quick facts, and profile image path.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary !py-2.5 disabled:opacity-70">
          {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : <><Save className="h-4 w-4" /> Save Changes</>}
        </button>
      </div>

      {/* Status toast */}
      {status === 'success' && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3.5 text-sm text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> {msg}
        </div>
      )}
      {status === 'error' && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 p-3.5 text-sm text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" /> {msg}
        </div>
      )}

      <div className="mt-8 space-y-10">

        {/* Profile image path */}
        <div>
          <h3 className="mb-3 text-base font-semibold text-cream">Profile Image Path</h3>
          <input
            type="text"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            placeholder="/images/Laxman-Tarihalkar-img.png"
            className={inputCls}
          />
          {profileImage && (
            <div className="mt-3 flex items-center gap-4">
              <img
                src={profileImage}
                alt="Profile preview"
                className="h-20 w-16 rounded-xl object-cover object-top"
                onError={(e) => { e.currentTarget.style.opacity = '0.3'; }}
              />
              <span className="text-xs text-cream/40">Preview (from public folder)</span>
            </div>
          )}
        </div>

        {/* Bio paragraphs */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-cream">Bio Paragraphs</h3>
            <button onClick={addPara} className="flex items-center gap-1.5 rounded-lg bg-burnt/15 px-3 py-1.5 text-xs font-medium text-burnt hover:bg-burnt/25">
              <Plus className="h-3.5 w-3.5" /> Add Paragraph
            </button>
          </div>
          <div className="space-y-3">
            {paragraphs.map((para, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-burnt/15 text-xs font-bold text-burnt">
                  {i + 1}
                </span>
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => updatePara(i, e.target.value)}
                  placeholder={`Paragraph ${i + 1}`}
                  className={`${inputCls} flex-1 resize-none`}
                />
                {paragraphs.length > 1 && (
                  <button onClick={() => removePara(i)} className="mt-2 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/30">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick facts */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-cream">Quick Facts</h3>
            <button onClick={addFact} className="flex items-center gap-1.5 rounded-lg bg-burnt/15 px-3 py-1.5 text-xs font-medium text-burnt hover:bg-burnt/25">
              <Plus className="h-3.5 w-3.5" /> Add Fact
            </button>
          </div>
          <div className="space-y-3">
            {facts.map((fact, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={fact.label}
                  onChange={(e) => updateFact(i, 'label', e.target.value)}
                  placeholder="Label (e.g. CGPA)"
                  className={`${inputCls} flex-1`}
                />
                <input
                  type="text"
                  value={fact.value}
                  onChange={(e) => updateFact(i, 'value', e.target.value)}
                  placeholder="Value (e.g. 8.0)"
                  className={`${inputCls} flex-1`}
                />
                {facts.length > 1 && (
                  <button onClick={() => removeFact(i)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/30">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-cream/40">
            Max 3 facts are shown on the site. The first 3 use GraduationCap, Award, and MapPin icons.
          </p>
        </div>

        {/* Save again at bottom */}
        <div className="border-t border-cream/10 pt-6">
          <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-70">
            {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : <><Save className="h-4 w-4" /> Save Changes</>}
          </button>
        </div>

      </div>
    </div>
  );
}
