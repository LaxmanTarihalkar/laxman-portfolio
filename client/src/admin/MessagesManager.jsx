import { useEffect, useState } from 'react';
import {
  Mail,
  MailOpen,
  Trash2,
  Loader2,
  X,
  Reply,
} from 'lucide-react';
import {
  getContacts,
  updateContactStatus,
  deleteContact,
} from '../services/api.js';

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getContacts();
      setMessages(res.data?.data?.messages ?? []);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openMessage = async (msg) => {
    setSelected(msg);
    if (msg.status === 'unread') {
      setBusy(msg._id);
      try {
        const res = await updateContactStatus(msg._id, 'read');
        const updated = res.data?.data?.message ?? { ...msg, status: 'read' };
        setMessages((list) =>
          list.map((m) => (m._id === updated._id ? updated : m))
        );
        setSelected(updated);
      } catch {
        /* ignore — message still readable */
      } finally {
        setBusy(null);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    setBusy(id);
    try {
      await deleteContact(id);
      setMessages((list) => list.filter((m) => m._id !== id));
      setSelected((s) => (s?._id === id ? null : s));
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete message.');
    } finally {
      setBusy(null);
    }
  };

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cream">Messages</h2>
          <p className="mt-1 text-sm text-cream/50">
            {unreadCount} unread of {messages.length} total
          </p>
        </div>
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

      {!loading && !error && messages.length === 0 && (
        <div className="mt-6 rounded-2xl border border-cream/10 bg-charcoal-700/40 p-10 text-center text-cream/50">
          No messages yet. They'll appear here when visitors use the contact form.
        </div>
      )}

      {!loading && messages.length > 0 && (
        <div className="mt-6 space-y-3">
          {messages.map((m) => (
            <button
              key={m._id}
              onClick={() => openMessage(m)}
              className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
                m.status === 'unread'
                  ? 'border-burnt/30 bg-burnt/5 hover:bg-burnt/10'
                  : 'border-cream/10 bg-charcoal-700/40 hover:border-cream/20'
              }`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream/8 text-burnt">
                {m.status === 'unread' ? (
                  <Mail className="h-4 w-4" />
                ) : (
                  <MailOpen className="h-4 w-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-cream">{m.subject}</span>
                  <span className="shrink-0 text-xs text-cream/40">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-cream/50">{m.name} · {m.email}</span>
                  {m.status === 'unread' && (
                    <span className="shrink-0 rounded-full bg-burnt px-2 py-0.5 text-[10px] font-semibold text-cream">
                      New
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Message detail modal */}
      {selected && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-cream/10 bg-charcoal p-6 md:p-8">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-cream">{selected.subject}</h3>
                <p className="mt-1 text-sm text-cream/50">
                  {selected.name} · {selected.email}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="grid h-9 w-9 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="whitespace-pre-wrap text-sm leading-relaxed text-cream/75">
              {selected.message}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${selected.email}`}
                className="btn-primary !py-2.5"
              >
                <Reply className="h-4 w-4" /> Reply
              </a>
              <button
                onClick={() => handleDelete(selected._id)}
                disabled={busy === selected._id}
                className="btn-outline !py-2.5 disabled:opacity-70"
              >
                {busy === selected._id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
