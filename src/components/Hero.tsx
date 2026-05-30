import { useRef } from 'react';
import { GALLERY_INFO } from '../data';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { TabType } from '../types';

const GALLERY_IMAGE = '/images/gallery/hero-pont-neuf.png';

interface HeroProps {
  onExplore: (tab: TabType) => void;
  lang: 'FR' | 'EN';
}

function HeroGalleryVisual({ lang }: { lang: 'FR' | 'EN' }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backTop = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-18, 14]);
  const backBottom = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [14, -18]);
  const imageShift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [8, -8]);

  const alt =
    lang === 'FR'
      ? 'Façade ART GALLERY Pont-Neuf, 9 rue Dauphine Paris'
      : 'ART GALLERY Pont-Neuf storefront, 9 rue Dauphine Paris';

  return (
    <div
      ref={ref}
      className="relative flex h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] items-center justify-center p-6 sm:p-8 lg:p-10 bg-white"
    >
      {/* Bloc photo + formes calées sur ses coins */}
      <motion.div
        style={{ y: imageShift }}
        className="relative w-full max-w-[560px] mx-auto"
      >
        {/* Forme — coin haut-gauche de la photo (derrière) */}
        <motion.div
          aria-hidden
          style={{ y: backTop }}
          className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 z-0 w-[28%] min-w-[4.5rem] max-w-[7rem] aspect-square border border-black/15 bg-[#f5f0e8] pointer-events-none"
        />

        {/* Forme — coin bas-droite de la photo (derrière) */}
        <motion.div
          aria-hidden
          style={{ y: backBottom }}
          className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 z-0 w-[32%] min-w-[5rem] max-w-[8rem] aspect-square border border-[#b8955a]/40 bg-[#f8f6f2] pointer-events-none"
        />

        <motion.img
          src={GALLERY_IMAGE}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 block w-full h-auto object-contain shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
        />
      </motion.div>
    </div>
  );
}

export default function Hero({ onExplore, lang }: HeroProps) {
  return (
    <div className="relative bg-white text-black py-12 px-4 sm:px-8 border-b border-black/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4 pb-8">

        <div className="hidden lg:flex col-span-1 flex-col justify-between items-center py-4 border-r border-black/5 min-h-[450px]">
          <div className="vertical-text text-[9px] tracking-[0.3em] uppercase opacity-50 font-mono text-black font-medium">
            {GALLERY_INFO.address.toUpperCase()}
          </div>
          <div className="vertical-text text-[9px] tracking-[0.3em] uppercase opacity-50 font-serif italic text-black font-semibold">
            {GALLERY_INFO.space}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-5 flex flex-col justify-center lg:pr-10 text-left space-y-8 py-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase font-bold">
                {lang === 'FR' ? 'EXPOSITION PERMANENTE' : 'PERMANENTLY EXHIBITED'}
              </span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-neutral-950 font-light">
              Serge <br className="hidden sm:inline" />
              <span className="font-normal italic">Couvert</span>
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-sans font-light max-w-sm uppercase tracking-wider">
              {lang === 'FR'
                ? 'Les bronzes d\'art permanents de Serge COUVERT et Dominique RAYOU sont présentés dans notre espace d\'art parisien.'
                : 'The permanent bronze masterworks of Serge COUVERT & Dominique RAYOU are permanently showcased in our Parisian art space.'}
            </p>
          </div>

          <div className="flex items-center space-x-4 pt-1">
            <div className="h-[1px] w-12 bg-black opacity-30" />
            <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-neutral-800">
              {lang === 'FR' ? 'VENTE EN LIGNE EXCLUSIVE : PEINTURES PAR IRINI' : 'ONLINE CATALOGUE: PAINTINGS BY IRINI'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => onExplore('GALLERY')}
              className="group flex items-center justify-between bg-black text-white hover:bg-neutral-800 transition-all duration-300 px-6 py-4 text-xs font-mono uppercase tracking-widest"
              id="btn-hero-explore-collection"
            >
              <span className="mr-6">{lang === 'FR' ? 'Explorer la Collection' : 'Explore Collection'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onExplore('EXHIBITIONS')}
              className="group flex items-center justify-between border border-black/30 hover:border-black text-black hover:bg-neutral-50 transition-all duration-300 px-6 py-4 text-xs font-mono uppercase tracking-widest"
              id="btn-hero-explore-exhibitions"
            >
              <span className="mr-4">{lang === 'FR' ? 'Les Actualités' : 'Latest News'}</span>
              <ChevronRight className="w-4 h-4 opacity-75" />
            </button>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-6 flex flex-col justify-between">
          <div className="flex-grow w-full border border-black/8 overflow-visible">
            <HeroGalleryVisual lang={lang} />
          </div>

          <div className="mt-4 flex justify-between items-end border-t border-black/5 pt-3">
            <div className="text-[9px] uppercase tracking-[0.2em] opacity-60 font-mono">
              {lang === 'FR' ? 'Contact : Marc MNEIMNÉ' : 'Contact: Marc MNEIMNÉ'}
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] opacity-60 font-mono">
              {GALLERY_INFO.phone}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
