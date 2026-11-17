import { motion } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress.js';

/** Thin burnt-orange progress bar fixed to the top of the viewport. */
export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-burnt-400 to-burnt"
      style={{ width: '100%', scaleX: progress / 100 }}
      aria-hidden="true"
    />
  );
}
