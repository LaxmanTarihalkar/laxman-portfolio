import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Loader2, AlertTriangle, FolderOpen } from 'lucide-react';
import { useProjects } from '../hooks/useProjects.js';
import SectionHeading from '../components/SectionHeading.jsx';
import { assetUrl } from '../utils/assetUrl.js';

function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, '0');
  const hasGithub = Boolean(project.githubUrl);
  const hasLive = Boolean(project.liveUrl);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
      className="group grid overflow-hidden rounded-3xl border border-cream/10 bg-charcoal-700/40 transition-colors duration-300 hover:border-burnt/40 md:grid-cols-12"
    >
      {/* Cover graphic */}
      <div className="relative aspect-video overflow-hidden md:col-span-5 md:aspect-auto">
        {project.image ? (
          <img
            src={assetUrl(project.image)}
            alt={`${project.title} cover`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = assetUrl('/images/projects/fallback.svg');
            }}
          />
        ) : (
          <img
            src={assetUrl('/images/projects/fallback.svg')}
            alt={`${project.title} cover`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 font-mono text-sm font-semibold text-cream/80">
          {num}
        </span>
        {project.featured && (
          <span className="absolute right-5 top-5 rounded-full bg-burnt px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-6 md:col-span-7 md:p-8">
        <div>
          <h3 className="display-heading text-2xl text-cream md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-cream/65 md:text-base">
            {project.description}
          </p>

          {project.technologies?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-cream/10 bg-charcoal px-2.5 py-1 text-xs font-medium text-cream/75"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {hasGithub ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm font-medium text-cream/80 transition-colors hover:border-burnt hover:text-burnt"
            >
              <Github className="h-4 w-4" /> Code
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/10 px-4 py-2 text-sm text-cream/30">
              <Github className="h-4 w-4" /> Repo coming soon
            </span>
          )}

          {hasLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm font-medium text-cream/80 transition-colors hover:border-burnt hover:text-burnt"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/10 px-4 py-2 text-sm text-cream/30">
              <ExternalLink className="h-4 w-4" /> Demo coming soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { projects, loading, error } = useProjects();

  return (
    <section id="projects" className="section-pad bg-charcoal text-cream">
      <div className="container-wide">
        <SectionHeading index="04" eyebrow="Selected Work" title="Projects" light />

        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-cream/60">
            <Loader2 className="h-8 w-8 animate-spin text-burnt" />
            <p>Loading projects…</p>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-burnt/30 bg-burnt/5 py-16 text-center">
            <AlertTriangle className="h-8 w-8 text-burnt" />
            <p className="text-cream/70">{error}</p>
            <p className="text-sm text-cream/40">
              Make sure the backend server is running and MongoDB is connected.
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-cream/60">
            <FolderOpen className="h-8 w-8 text-burnt" />
            <p>No projects have been published yet.</p>
            <p className="text-sm text-cream/40">
              Run <code className="text-burnt-300">npm run seed</code> on the server to add initial projects.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="space-y-6">
            {projects.map((project, i) => (
              <ProjectCard key={project._id || project.slug} project={project} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="https://github.com/LaxmanTarihalkar"
            target="_blank"
            rel="noreferrer"
            className="btn-outline group"
          >
            View More On GitHub
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
