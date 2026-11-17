import { motion } from 'framer-motion';
import { Download, GraduationCap, Award, MapPin } from 'lucide-react';
import { aboutParagraphs, aboutFacts, personal } from '../data/portfolio.js';
import SectionHeading from '../components/SectionHeading.jsx';

const factIcons = [GraduationCap, Award, MapPin];

export default function About() {
  return (
    <section id="about" className="section-pad bg-cream text-charcoal">
      <div className="container-wide">
        <SectionHeading index="01" eyebrow="About Me" title="Who I Am" />

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-burnt-200 to-sand">
              <img
                src="/images/Laxman-Tarihalkar-img.png"
                alt="Portrait of Laxman Tarihalkar"
                className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/images/profile.jpg';
                }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/10" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/60 to-transparent p-5">
                <p className="text-sm font-semibold text-cream">
                  {personal.fullName}
                </p>
                <p className="text-xs text-cream/70">{personal.title}</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="space-y-5">
              {aboutParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-charcoal/75 md:text-lg"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Facts */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {aboutFacts.map((fact, i) => {
                const Icon = factIcons[i];
                return (
                  <div
                    key={fact.label}
                    className="rounded-xl border border-charcoal/10 bg-white/40 p-4 backdrop-blur-sm"
                  >
                    <Icon className="h-5 w-5 text-burnt" />
                    <p className="mt-3 text-xs font-medium uppercase tracking-wider text-charcoal/50">
                      {fact.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-charcoal">
                      {fact.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Resume download */}
            <div className="mt-10">
              <a
                href={personal.resumeUrl}
                download
                className="btn-primary"
                aria-label="Download resume PDF"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
