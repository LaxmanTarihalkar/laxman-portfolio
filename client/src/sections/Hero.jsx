import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { personal } from '../data/portfolio.js';
import { assetUrl } from '../utils/assetUrl.js';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => setVideoFailed(true));
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-charcoal">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={assetUrl('/images/hero-poster.svg')}
        onError={() => setVideoFailed(true)}
        onLoadedData={() => setVideoReady(true)}
        aria-hidden="true"
      >
        <source src={assetUrl('/videos/hero-video.mp4')} type="video/mp4" />
      </video>

      {/* Gradient overlays — burnt orange + dark for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/40" />
      <div className="absolute inset-0 bg-burnt/10 mix-blend-overlay" />

      {/* Fallback poster if the video fails */}
      {!videoReady && !videoFailed && (
        <div className="absolute inset-0 bg-charcoal" />
      )}
      {videoFailed && (
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-700 to-burnt-700" />
      )}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container-wide max-w-3xl"
        >
          <motion.p
            variants={item}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-burnt-400"
          >
            {personal.intro}
          </motion.p>

          <motion.h1
            variants={item}
            className="display-heading text-5xl text-cream sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {personal.fullName.split(' ').map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-xl font-semibold text-cream/90 md:text-2xl"
          >
            {personal.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-3 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg"
          >
            {personal.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-6 flex items-center gap-2 text-sm text-cream/60">
            <MapPin className="h-4 w-4 text-burnt" />
            <span>{personal.locationShort}</span>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <button onClick={scrollToAbout} className="btn-primary">
              Explore My Work
            </button>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline">
              Let's Connect
            </button>
          </motion.div>

          {/* Open to opportunities indicator */}
          <motion.div variants={item} className="mt-10 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-cream/70">
              Open to Opportunities
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/60 transition-colors hover:text-burnt"
        aria-label="Scroll to about"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
