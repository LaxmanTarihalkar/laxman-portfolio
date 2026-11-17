import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Loader2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { useExperiences } from '../hooks/useExperiences.js';

export default function Experience() {
  const { experiences, loading } = useExperiences();

  return (
    <section id="experience" className="section-pad bg-sand text-charcoal">
      <div className="container-wide">
        <SectionHeading index="02" eyebrow="Career So Far" title="Experience" />

        {loading && (
          <div className="flex items-center justify-center py-16 text-charcoal/50">
            <Loader2 className="h-6 w-6 animate-spin text-burnt" />
          </div>
        )}

        {!loading && (
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-charcoal/20 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp._id || exp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                  className={`relative pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  {/* Timeline dot */}
                  <span
                    className={`absolute top-1.5 left-0 grid h-9 w-9 place-items-center rounded-full bg-burnt text-cream shadow-lg md:left-auto ${
                      i % 2 === 0 ? 'md:-right-[18px]' : 'md:-left-[18px]'
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                  </span>

                  {/* Card */}
                  <div className="rounded-2xl border border-charcoal/10 bg-cream/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-xl md:p-8">
                    <span className="inline-block rounded-full bg-burnt/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-burnt-600">
                      {exp.type}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-charcoal md:text-2xl">
                      {exp.position}
                    </h3>
                    <p className="mt-1 text-lg font-semibold text-burnt-600">
                      {exp.company}
                    </p>

                    <div
                      className={`mt-3 flex flex-wrap items-center gap-4 text-sm text-charcoal/60 ${
                        i % 2 === 0 ? 'md:justify-end' : ''
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-burnt" />
                        {exp.duration}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-burnt" />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    {exp.responsibilities?.length > 0 && (
                      <ul
                        className={`mt-5 space-y-2.5 text-sm leading-relaxed text-charcoal/75 md:text-base ${
                          i % 2 === 0 ? 'md:text-right' : ''
                        }`}
                      >
                        {exp.responsibilities.map((r, j) => (
                          <li key={j} className={`flex gap-2.5 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-burnt" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.technologies?.length > 0 && (
                      <div
                        className={`mt-5 flex flex-wrap gap-2 ${
                          i % 2 === 0 ? 'md:justify-end' : ''
                        }`}
                      >
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-charcoal/8 px-2.5 py-1 text-xs font-medium text-charcoal/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
