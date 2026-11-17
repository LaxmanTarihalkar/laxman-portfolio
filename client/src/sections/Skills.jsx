import { motion } from 'framer-motion';
import { Layout, Server, Database, GitBranch, BarChart3, Loader2 } from 'lucide-react';
import { useSkills } from '../hooks/useSkills.js';
import SectionHeading from '../components/SectionHeading.jsx';

const iconMap = { Layout, Server, Database, GitBranch, BarChart3 };

export default function Skills() {
  const { skills, loading } = useSkills();

  return (
    <section id="skills" className="section-pad bg-charcoal text-cream">
      <div className="container-wide">
        <SectionHeading index="03" eyebrow="Toolbox" title="Technical Skills" light />

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-burnt" />
          </div>
        )}

        {!loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group, i) => {
              const Icon = iconMap[group.icon] || Layout;
              return (
                <motion.div
                  key={group._id || group.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-cream/10 bg-charcoal-700/50 p-6 transition-colors duration-300 hover:border-burnt/40"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-burnt/15 text-burnt transition-colors duration-300 group-hover:bg-burnt group-hover:text-cream">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-base font-semibold text-cream">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-cream/10 bg-charcoal px-3 py-1.5 text-sm font-medium text-cream/80 transition-all duration-300 hover:border-burnt/50 hover:text-burnt-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
