import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/portfolio.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(navLinks.map((l) => l.target));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (target) => {
    setOpen(false);
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-charcoal/85 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-wide flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="group flex items-baseline gap-2" aria-label="Laxman Tarihalkar — home">
          <span className="display-heading text-2xl font-extrabold text-cream">
            LT<span className="text-burnt">.</span>
          </span>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.3em] text-cream/50 transition-colors group-hover:text-burnt sm:inline">
            Laxman Tarihalkar
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.target}>
              <button
                onClick={() => go(link.target)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === link.target
                    ? 'text-burnt'
                    : 'text-cream/70 hover:text-cream'
                }`}
              >
                {link.label}
                {active === link.target && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-burnt/15"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => go('contact')} className="btn-primary ml-2 !px-5 !py-2.5">
              Let's Talk
            </button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="container-wide flex flex-col gap-1 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.target}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => go(link.target)}
                    className={`w-full rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                      active === link.target
                        ? 'bg-burnt/15 text-burnt'
                        : 'text-cream/80 hover:bg-cream/5'
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li className="pt-2">
                <button onClick={() => go('contact')} className="btn-primary w-full">
                  Let's Talk
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
