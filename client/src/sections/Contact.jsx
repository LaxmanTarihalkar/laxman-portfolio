import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Linkedin } from 'lucide-react';
import { personal } from '../data/portfolio.js';
import { submitContact } from '../services/api.js';
import SectionHeading from '../components/SectionHeading.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [statusMsg, setStatusMsg] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.trim()) e.email = 'Please enter your email';
    else if (!EMAIL_RE.test(form.email)) e.email = 'Please enter a valid email';
    if (!form.subject.trim()) e.subject = 'Please add a subject';
    if (!form.message.trim()) e.message = 'Please write a message';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setStatusMsg('');

    try {
      const res = await submitContact(form);
      setStatus('success');
      setStatusMsg(
        res.data?.message || 'Your message has been received. Thank you!'
      );
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setStatusMsg(
        err?.response?.data?.message ||
          'Something went wrong. Please try again or email me directly.'
      );
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-charcoal-700/40 px-4 py-3 text-cream placeholder:text-cream/30 transition-colors focus:outline-none focus:ring-2 focus:ring-burnt/50 ${
      errors[field] ? 'border-red-400/60' : 'border-cream/10'
    }`;

  return (
    <section id="contact" className="section-pad bg-charcoal text-cream">
      <div className="container-wide">
        <SectionHeading index="05" eyebrow="Get In Touch" title="Let's Build Something Together" light />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <p className="max-w-md text-lg leading-relaxed text-cream/70">
              Have an idea, an opportunity, or a project in mind? I'd love to
              connect and explore what we can create.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${personal.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-cream/10 bg-charcoal-700/40 p-4 transition-colors hover:border-burnt/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-burnt/15 text-burnt">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-cream/40">
                    Email
                  </span>
                  <span className="block text-sm font-medium text-cream group-hover:text-burnt">
                    {personal.email}
                  </span>
                </span>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-cream/10 bg-charcoal-700/40 p-4 transition-colors hover:border-burnt/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-burnt/15 text-burnt">
                  <Github className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-cream/40">
                    GitHub
                  </span>
                  <span className="block text-sm font-medium text-cream group-hover:text-burnt">
                    /LaxmanTarihalkar
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-cream/10 bg-charcoal-700/40 p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-burnt/15 text-burnt">
                  <Linkedin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-cream/40">
                    LinkedIn
                  </span>
                  <span className="block text-sm font-medium text-cream/50">
                    Link coming soon
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-cream/10 bg-charcoal-700/40 p-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-burnt/15 text-burnt">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-cream/40">
                    Location
                  </span>
                  <span className="block text-sm font-medium text-cream">
                    {personal.location}
                  </span>
                </span>
              </div>
            </div>

            <p className="mt-10 text-lg font-medium italic text-burnt-300">
              "Have an idea? Let's turn it into something meaningful."
            </p>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-cream/10 bg-charcoal-700/30 p-6 md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-cream/70">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Your name"
                    className={inputClass('name')}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-cream/70">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="you@example.com"
                    className={inputClass('email')}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-cream/70">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange('subject')}
                  placeholder="What's this about?"
                  className={inputClass('subject')}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>}
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-cream/70">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Tell me about your idea, opportunity, or project…"
                  className={`${inputClass('message')} resize-none`}
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary mt-6 w-full disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>

              {/* Notifications */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-300"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{statusMsg}</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{statusMsg}</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
