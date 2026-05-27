import { GALLERY_INFO } from '../data';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { TabType } from '../types';

const GALLERY_IMAGE = 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80&w=1200';

interface HeroProps {
  onExplore: (tab: TabType) => void;
  lang: 'FR' | 'EN';
}

export default function Hero({ onExplore, lang }: HeroProps) {

  return (
    <div className="relative bg-white text-black py-12 px-4 sm:px-8 border-b border-black/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4 pb-8">
        
        {/* Left Column: Vertical details (Col-span 1) */}
        <div className="hidden lg:flex col-span-1 flex-col justify-between items-center py-4 border-r border-black/5 min-h-[450px]">
          <div className="vertical-text text-[9px] tracking-[0.3em] uppercase opacity-50 font-mono text-black font-medium">
            {GALLERY_INFO.address.toUpperCase()}
          </div>
          <div className="vertical-text text-[9px] tracking-[0.3em] uppercase opacity-50 font-serif italic text-black font-semibold">
            {GALLERY_INFO.space}
          </div>
        </div>

        {/* Middle Column: Typography identity & interactive CTAs (Col-span 5) */}
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
            <div className="h-[1px] w-12 bg-black opacity-30"></div>
            <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-neutral-800">
              {lang === 'FR' ? 'VENTE EN LIGNE EXCLUSIVE : PEINTURES PAR IRINI' : 'ONLINE CATALOGUE: PAINTINGS BY IRINI'}
            </span>
          </div>

          {/* Core Interactive Actions */}
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

        {/* Right Column: Hero Art Mask with rotated slide border matching Artistic Flair (Col-span 6) */}
        <div className="col-span-1 lg:col-span-6 h-[400px] sm:h-[480px] lg:h-auto flex flex-col justify-between">
          <div className="hero-mask flex-grow w-full border border-black/10 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
            {/* Gallery Image Ambient BG */}
            <div className="absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-center filter contrast-125 opacity-15"
                style={{ backgroundImage: `url(${GALLERY_IMAGE})` }}
              />
            </div>

            {/* Rotated frame displaying active gallery image in high fidelity */}
            <div className="relative w-full h-full border border-black/10 flex flex-col items-center justify-center z-10 p-4">
              <div className="w-3/4 h-5/6 border border-black/25 transform rotate-3 relative overflow-hidden bg-white shadow-md flex items-center justify-center">
                <motion.img
                  src={GALLERY_IMAGE}
                  alt="Class Gallery Paris"
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2 }}
                  className="w-full h-full object-cover contrast-105"
                />
              </div>
              <div className="absolute text-[48px] sm:text-[72px] font-serif italic text-black opacity-5 uppercase select-none pointer-events-none tracking-widest z-0">
                GALLERY
              </div>
            </div>
          </div>

          {/* Subtle details strip */}
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
