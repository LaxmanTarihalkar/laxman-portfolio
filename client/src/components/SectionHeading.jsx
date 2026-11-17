import { motion } from 'framer-motion';

/**
 * Reusable editorial section heading with an index number, eyebrow label, and
 * large title. Animates into view on scroll.
 */
export default function SectionHeading({ index, eyebrow, title, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mb-14 md:mb-20"
    >
      <div className="flex items-center gap-4">
        {index && (
          <span
            className={`font-mono text-sm ${
              light ? 'text-burnt-400' : 'text-burnt'
            }`}
          >
            {index}
          </span>
        )}
        <span
          className={`h-px w-12 ${
            light ? 'bg-burnt-400/60' : 'bg-burnt/60'
          }`}
        />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2
        className={`display-heading mt-5 text-4xl sm:text-5xl md:text-6xl ${
          light ? 'text-cream' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>
    </motion.div>
  );
}
