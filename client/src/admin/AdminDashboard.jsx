import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Mail, LogOut, ExternalLink, Briefcase, Layers, Github } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { personal } from '../data/portfolio.js';
import Overview from './Overview.jsx';
import ProjectsManager from './ProjectsManager.jsx';
import MessagesManager from './MessagesManager.jsx';
import ExperienceManager from './ExperienceManager.jsx';
import SkillsManager from './SkillsManager.jsx';

const tabs = [
  { id: 'overview',   label: 'Overview',   icon: LayoutDashboard },
  { id: 'skills',     label: 'Skills',     icon: Layers },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects',   label: 'Projects',   icon: FolderKanban },
  { id: 'messages',   label: 'Messages',   icon: Mail },
];

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');

  const handleLogout = async () => {
    await logout();
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-charcoal text-cream">
      <div className="container-wide flex min-h-screen flex-col lg:flex-row lg:gap-8 lg:py-8">
        {/* Sidebar */}
        <aside className="lg:w-64 lg:shrink-0">
          <div className="sticky top-8 rounded-2xl border border-cream/10 bg-charcoal-700/40 p-5">
            <div className="flex items-center justify-between lg:block">
              <span className="display-heading text-2xl font-extrabold text-cream">
                LT<span className="text-burnt">.</span>
              </span>
              <p className="mt-1 hidden text-xs text-cream/40 lg:block">
                Admin Dashboard
              </p>
            </div>

            <div className="mt-5 hidden rounded-xl bg-charcoal p-3 lg:block">
              <p className="text-xs text-cream/40">Signed in as</p>
              <p className="truncate text-sm font-medium text-cream">
                {admin?.email}
              </p>
            </div>

            <nav className="mt-5 flex gap-2 lg:flex-col">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActive(tab.id)}
                    className={`flex flex-1 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors lg:flex-none lg:w-full ${
                      active === tab.id
                        ? 'bg-burnt text-cream'
                        : 'text-cream/60 hover:bg-cream/5 hover:text-cream'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 flex gap-2 border-t border-cream/10 pt-5 lg:flex-col">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-cream/60 transition-colors hover:bg-cream/5 hover:text-cream lg:w-full"
              >
                <Github className="h-4 w-4" />
                <span className="hidden lg:inline">GitHub</span>
              </a>
              <button
                onClick={() => navigate('/')}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-cream/60 transition-colors hover:bg-cream/5 hover:text-cream lg:w-full"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden lg:inline">View Site</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-cream/60 transition-colors hover:bg-red-500/20 hover:text-red-400 lg:w-full"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 py-8 lg:py-0">
          {active === 'overview'   && <Overview />}
          {active === 'skills'     && <SkillsManager />}
          {active === 'experience' && <ExperienceManager />}
          {active === 'projects'   && <ProjectsManager />}
          {active === 'messages'   && <MessagesManager />}
        </main>
      </div>
    </div>
  );
}
