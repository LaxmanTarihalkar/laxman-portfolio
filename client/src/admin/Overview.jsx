import { useEffect, useState } from 'react';
import { Folder, Star, Mail, MailOpen, Loader2 } from 'lucide-react';
import { getProjects, getContacts } from '../services/api.js';

export default function Overview() {
  const [stats, setStats] = useState({
    projects: 0,
    featured: 0,
    messages: 0,
    unread: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [projRes, msgRes] = await Promise.all([
          getProjects(),
          getContacts(),
        ]);
        const projects = projRes.data?.data?.projects ?? [];
        const messages = msgRes.data?.data?.messages ?? [];
        setStats({
          projects: projects.length,
          featured: projects.filter((p) => p.featured).length,
          messages: messages.length,
          unread: messages.filter((m) => m.status === 'unread').length,
        });
      } catch {
        setStats({ projects: 0, featured: 0, messages: 0, unread: 0 });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cards = [
    { label: 'Total Projects', value: stats.projects, icon: Folder },
    { label: 'Featured Projects', value: stats.featured, icon: Star },
    { label: 'Total Messages', value: stats.messages, icon: Mail },
    { label: 'Unread Messages', value: stats.unread, icon: MailOpen },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-cream/60">
        <Loader2 className="h-6 w-6 animate-spin text-burnt" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-cream">Dashboard Overview</h2>
      <p className="mt-1 text-sm text-cream/50">A snapshot of your portfolio.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-cream/10 bg-charcoal-700/40 p-5"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-burnt/15 text-burnt">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-3xl font-extrabold text-cream">{value}</p>
            <p className="mt-1 text-sm text-cream/50">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
