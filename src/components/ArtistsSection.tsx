// Resident creators section matching Artistic Flair light-theme aesthetics

import { ARTISTS } from '../data';
import { motion } from 'motion/react';
import { Quote, ArrowRight } from 'lucide-react';

interface ArtistsSectionProps {
  onFilterChange: (category: 'PAINTERS' | 'SCULPTORS' | 'GLASS') => void;
  lang: 'FR' | 'EN';
}

export default function ArtistsSection({ onFilterChange, lang }: ArtistsSectionProps) {
  return (
    <section className="bg-white py-16 max-w-7xl mx-auto overflow-hidden">
      
      {/* Editorial Header */}
      <div className="text-left space-y-3 mb-16 border-b border-black/5 pb-6">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-[1px] bg-black" />
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.25em] font-bold">
            {lang === 'FR' ? 'Les Créateurs de la Galerie' : 'The Gallery Creators'}
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-900 tracking-widest uppercase">
          {lang === 'FR' ? 'Artistes Résidents' : 'Resident Artists'}
        </h2>
        <p className="max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-neutral-600 font-sans">
          {lang === 'FR' 
            ? 'Découvrez les biographies et les philosophies de création des artistes représentés en permanence à la Class Gallery Paris de Pont-Neuf.' 
            : 'Explore the backgrounds, styles, and creative philosophies of the resident masters permanently represented at Class Gallery Paris near Pont-Neuf.'}
        </p>
      </div>

      {/* List of Artists */}
      <div className="space-y-24">
        {ARTISTS.map((artist, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-center ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              
              {/* Left Column: Photo Frame with floating details (reduced to 1/3 size) */}
              <div className="w-full lg:w-1/3 max-w-[280px] relative group mx-auto lg:mx-0 shrink-0">
                <div className="aspect-[4/5] overflow-hidden bg-neutral-50 relative border border-black/10 group-hover:border-black/30 transition-all duration-700 shadow-sm">
                  <img
                    src={artist.featuredImage}
                    alt={artist.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-[1.01]"
                  />
                  {/* Subtle greyed overlay */}
                  <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                {/* Floating medium summary badge */}
                <div className="absolute -bottom-4 right-4 sm:right-6 bg-white border border-black/10 px-5 py-3 shadow-md rounded-none text-left">
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase font-bold block mb-1">
                    {lang === 'FR' ? 'CATÉGORIE' : 'MEDIUM'}
                  </span>
                  <span className="text-[11px] font-sans text-neutral-900 font-semibold uppercase">
                    {artist.type === 'PAINTER' ? (lang === 'FR' ? 'Peintre' : 'Painter') : artist.type === 'SCULPTOR' ? (lang === 'FR' ? 'Sculpteur' : 'Sculptor') : (lang === 'FR' ? 'Artiste Verrier' : 'Glass Master')}
                  </span>
                </div>
              </div>

              {/* Right Column: Bio details (expanded to 2/3 size) */}
              <div className="w-full lg:w-2/3 flex flex-col space-y-6 text-left max-w-2xl mx-auto lg:max-w-none">
                {/* Name & Title */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase font-bold">
                    {artist.type === 'PAINTER' ? (lang === 'FR' ? 'PEINTURE EXCLUSIVE' : 'EXCLUSIVE PAINTING') : (lang === 'FR' ? 'FONDEUR & TAILLE DIRECTE' : 'FOUNDRY & CARVING')}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-normal text-black uppercase tracking-widest">
                    {artist.name}
                  </h3>
                </div>

                {/* Sub-quote banner */}
                {artist.quoteFr && (
                  <div className="bg-neutral-50 border-l-2 border-black p-4 relative">
                    <Quote className="absolute top-2 right-4 w-12 h-12 text-black/5 pointer-events-none" />
                    <p className="text-xs sm:text-xs font-serif italic text-neutral-700 leading-relaxed pl-1">
                      {lang === 'FR' ? artist.quoteFr : artist.quoteEn}
                    </p>
                  </div>
                )}

                {/* Biography prose */}
                <p className="text-xs sm:text-sm font-light text-neutral-700 leading-relaxed font-sans pl-1 whitespace-pre-line">
                  {lang === 'FR' ? artist.bioFr : artist.bioEn}
                </p>

                {/* Materials & Medium list details */}
                <div className="space-y-2 pl-1">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block font-semibold">
                    {lang === 'FR' ? 'TECHNIQUES ET SIGNATURES :' : 'MATERIALS & SIGNATURES :'}
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(lang === 'FR' ? artist.mediumsFr : artist.mediumsEn).map((med, mIdx) => (
                      <span
                        key={mIdx}
                        className="bg-neutral-50 border border-black/10 text-neutral-800 px-3 py-1.5 text-[10px] font-mono rounded-none uppercase tracking-wider font-medium"
                      >
                        ✓ {med}
                      </span>
                    ))}
                    {artist.id === 'irini' && (
                      <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 text-[10px] font-mono rounded-none uppercase tracking-wider font-bold">
                        {lang === 'FR' ? '✦ VENTE EN LIGNE UNIQUEMENT' : '✦ ONLINE SALE ONLY'}
                      </span>
                    )}
                  </div>
                </div>

                {/* View Category Artworks CTA */}
                <div className="pt-4 pl-1">
                  <button
                    onClick={() => onFilterChange(artist.type === 'PAINTER' ? 'PAINTERS' : artist.type === 'SCULPTOR' ? 'SCULPTORS' : 'GLASS')}
                    className="group inline-flex items-center space-x-2 text-xs font-mono uppercase font-bold text-black hover:opacity-60 transition-opacity tracking-widest cursor-pointer"
                    id={`view-artist-works-${artist.id}`}
                  >
                    <span>
                      {lang === 'FR' 
                        ? `Voir la collection de ${artist.name.split(' ')[0]}` 
                        : `Show original works by ${artist.name.split(' ')[0]}`}
                    </span>
                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
