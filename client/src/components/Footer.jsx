import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personal, navLinks } from '../data/portfolio.js';

export default function Footer() {
  const year = new Date().getFullYear();

  const go = (target) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-cream/10 bg-charcoal">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Link to="/" className="display-heading text-3xl font-extrabold text-cream">
            LT<span className="text-burnt">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            {personal.title} crafting modern web experiences from {personal.locationShort}.
          </p>
          <p className="mt-4 text-sm text-burnt-400">{personal.tagline}</p>
        </div>

        {/* Nav */}
        <div>
          <h3 className="eyebrow">Navigate</h3>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {navLinks.map((link) => (
              <li key={link.target}>
                <button
                  onClick={() => go(link.target)}
                  className="text-sm text-cream/60 transition-colors hover:text-burnt"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="eyebrow">Connect</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-3 text-cream/60 transition-colors hover:text-burnt"
              >
                <Mail className="h-4 w-4 text-burnt" /> {personal.email}
              </a>
            </li>
            <li>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-cream/60 transition-colors hover:text-burnt"
              >
                <Github className="h-4 w-4 text-burnt" /> GitHub
              </a>
            </li>
            <li>
              <span className="flex items-center gap-3 text-cream/60">
                <MapPin className="h-4 w-4 text-burnt" /> {personal.locationShort}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/40 sm:flex-row">
          <p>© {year} Laxman Tarihalkar. All rights reserved.</p>
          <p>Designed & built with React, Node.js & MongoDB.</p>
        </div>
      </div>
    </footer>
  );
}
