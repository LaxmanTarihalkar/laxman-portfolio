import { useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { personal } from '../data/portfolio.js';

export default function AdminLogin() {
  const { admin, login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Already authenticated → send to dashboard.
  if (!loading && admin) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Invalid credentials. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="grid min-h-screen place-items-center bg-charcoal px-6 py-20 text-cream">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-sm text-cream/50 transition-colors hover:text-burnt"
        >
          <ArrowLeft className="h-4 w-4" /> Back to site
        </button>

        <div className="rounded-3xl border border-cream/10 bg-charcoal-700/40 p-8">
          <div className="mb-8 text-center">
            <span className="display-heading text-4xl font-extrabold text-cream">
              LT<span className="text-burnt">.</span>
            </span>
            <h1 className="mt-4 text-2xl font-bold text-cream">Admin Login</h1>
            <p className="mt-2 text-sm text-cream/50">
              Sign in to manage your portfolio
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-400/10 p-3.5 text-sm text-red-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-cream/70">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/30" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-cream/10 bg-charcoal py-3 pl-11 pr-4 text-cream placeholder:text-cream/30 transition-colors focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt/40"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-cream/70">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/30" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-cream/10 bg-charcoal py-3 pl-11 pr-4 text-cream placeholder:text-cream/30 transition-colors focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt/40"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-cream/40">
            Secured with JWT & HTTP-only cookies
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-cream/40">
          © {personal.fullName} — {new Date().getFullYear()}
        </p>
      </motion.div>
    </section>
  );
}
