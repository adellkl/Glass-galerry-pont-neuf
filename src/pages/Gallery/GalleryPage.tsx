// Master Showroom Collection in Artistic Flair style

import { useState, useMemo } from 'react';
import { ARTWORKS } from '../../data';
import { Artwork } from '../../types';
import { motion } from 'motion/react';
import { Search, ArrowUpRight, ArrowRight } from 'lucide-react';

interface GalleryPageProps {
  initialFilter?: 'ALL' | 'PAINTERS' | 'SCULPTORS' | 'GLASS';
  onSelectArtwork: (artwork: Artwork) => void;
  lang: 'FR' | 'EN';
}

export default function GalleryPage({ initialFilter = 'ALL', onSelectArtwork, lang }: GalleryPageProps) {
  const [filter, setFilter] = useState<'ALL' | 'PAINTERS' | 'SCULPTORS' | 'GLASS'>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter((art) => {
      const matchFilter = filter === 'ALL' ? true : art.category === filter;
      const matchSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lang === 'FR' ? art.medium : art.medium).toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [filter, searchQuery, lang]);

  return (
    <section className="bg-white py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-8 overflow-hidden">
      
      {/* Editorial Title */}
      <div className="text-left space-y-3 mb-12 border-b border-black/5 pb-6">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-[1px] bg-black" />
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.25em] font-bold">
            {lang === 'FR' ? 'Collection Principale' : 'Master Collection'}
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-black tracking-widest uppercase">
          {lang === 'FR' ? 'Œuvres Exposées' : 'Exhibited Works'}
        </h2>
        <p className="max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-neutral-600 font-sans">
          {lang === 'FR' 
            ? 'Une sélection intemporelle de sculptures en bronze coulé, marbres polis de Carrare, verres soufflés fusionnés et toiles de caractère d\'artistes de renom.' 
            : 'A timeless catalog of cast bronze sculptures, hand-polished Carrara marble, thick custom blown-glass, and painterly masterpieces from renowned European creators.'}
        </p>
      </div>

      {/* Control panel: Filters, Search Counter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-black/10 mb-10">
        
        {/* Dynamic Filters bar */}
        <div className="flex flex-wrap gap-2 text-left">
          {(['ALL', 'PAINTERS', 'SCULPTORS', 'GLASS'] as const).map((cat) => {
            const labels = {
              ALL: lang === 'FR' ? 'TOUT' : 'ALL WORKS',
              PAINTERS: lang === 'FR' ? 'PEINTRES' : 'PAINTERS',
              SCULPTORS: lang === 'FR' ? 'SCULPTEURS' : 'SCULPTORS',
              GLASS: lang === 'FR' ? 'VERRE D\'ART' : 'GLASS ART'
            };
            const isSelected = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2.5 text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all font-bold border cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white border-black font-semibold'
                    : 'text-neutral-500 hover:text-black border-black/10 hover:border-black/30'
                }`}
                id={`filter-btn-${cat.toLowerCase()}`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>

        {/* Elegant Search bar */}
        <div className="relative w-full md:max-w-xs text-left">
          <input
            type="text"
            placeholder={lang === 'FR' ? 'Rechercher un artiste, titre...' : 'Search artist, title...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 text-black placeholder-neutral-500 border border-black/10 px-10 py-3.5 text-xs tracking-wider focus:outline-none focus:border-black transition-colors rounded-none"
            id="gallery-search-input"
          />
          <Search className="absolute left-3.5 top-4 w-3.5 h-3.5 text-neutral-500" />
        </div>

      </div>

      {/* Results Count Summary */}
      <div className="flex justify-between items-center mb-6 text-left">
        <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
          {filteredArtworks.length} {lang === 'FR' ? 'œuvre(s) trouvée(s)' : 'artwork(s) found'}
        </span>
        {filter === 'PAINTERS' && (
          <span className="text-[10px] font-mono font-bold text-black animate-pulse uppercase tracking-wider">
            {lang === 'FR' ? '✦ Vente exclusive en ligne d\'IRINI' : '✦ Exclusive Online Sales for IRINI'}
          </span>
        )}
      </div>

      {/* Grid of Artworks */}
      {filteredArtworks.length === 0 ? (
        <div className="border border-dashed border-black/15 py-24 text-center rounded-none">
          <p className="text-sm text-neutral-500 font-sans tracking-wider">
            {lang === 'FR' ? 'Aucune œuvre ne correspond à votre recherche.' : 'No artworks match your query.'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setFilter('ALL'); }}
            className="mt-4 text-xs tracking-widest text-black underline font-mono hover:opacity-60 uppercase font-bold"
            id="clear-search-btn"
          >
            {lang === 'FR' ? 'Réinitialiser' : 'Reset filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredArtworks.map((art, idx) => {
            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.08, 0.4) }}
                className="group flex flex-col bg-white border border-black/10 hover:border-black/30 transition-all duration-500 overflow-hidden text-left shadow-sm"
              >
                {/* Image Block */}
                <div 
                  onClick={() => onSelectArtwork(art)}
                  className="aspect-square relative overflow-hidden bg-neutral-50 cursor-pointer"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover art-image-zoom transition-all duration-700"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
                    {art.isOnlineOnly ? (
                      <span className="bg-red-50 text-red-700 border border-red-200 text-[8px] font-mono font-bold tracking-widest px-2.5 py-0.5 uppercase shadow-sm">
                        {lang === 'FR' ? 'Vente En Ligne' : 'Online Order Only'}
                      </span>
                    ) : (
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[8px] font-mono tracking-widest font-bold px-2 py-0.5 uppercase shadow-sm">
                        {lang === 'FR' ? 'En Galerie' : 'In Gallery'}
                      </span>
                    )}

                    {art.onExhibit && (
                      <span className="bg-neutral-100 text-neutral-800 border border-black/15 text-[8px] font-mono tracking-widest font-bold px-2 py-0.5 uppercase shadow-sm">
                        {lang === 'FR' ? 'Exposition Permanente' : 'Permanent Exhibit'}
                      </span>
                    )}
                  </div>

                  {/* Elegant Quick View Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 backdrop-blur-[1px]">
                    <div className="flex items-center space-x-2 border border-black/30 text-black bg-white px-4.5 py-2.5 text-[10px] tracking-widest uppercase font-mono font-bold">
                      <span>{lang === 'FR' ? 'DÉTAILS COMPLETS' : 'VIEW DETAIL'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                    </div>
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-5 flex flex-col justify-between flex-grow self-stretch">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-medium">
                        {art.category === 'PAINTERS' 
                          ? (lang === 'FR' ? 'Peinture' : 'Painting') 
                          : art.category === 'SCULPTORS' 
                            ? (lang === 'FR' ? 'Sculpture' : 'Sculpture')
                            : (lang === 'FR' ? 'Art du Verre' : 'Glass Art')
                        } — {art.year}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 font-semibold">
                        {art.dimensions}
                      </span>
                    </div>

                    <h3 
                      onClick={() => onSelectArtwork(art)}
                      className="font-serif text-xl font-light tracking-wide text-neutral-900 group-hover:text-black transition-colors cursor-pointer"
                    >
                      {art.title}
                    </h3>

                    <div className="flex items-center space-x-1.5 border-y border-black/5 py-1 my-2 bg-neutral-50/60 px-2 rounded-none">
                      <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase font-bold shrink-0">
                        {lang === 'FR' ? 'Artiste :' : 'Artist :'}
                      </span>
                      <p className="text-[11px] font-serif italic text-neutral-900 tracking-wider font-bold uppercase transition-colors group-hover:text-black">
                        {art.artistName}
                      </p>
                    </div>

                    <p className="text-[11px] font-sans text-neutral-600 leading-relaxed line-clamp-2">
                      {lang === 'FR' ? art.descriptionFr : art.descriptionEn}
                    </p>
                  </div>

                  {/* Order Details Line */}
                  <div className="pt-4 mt-4 border-t border-black/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-neutral-900 uppercase tracking-wider">
                      {art.isOnlineOnly ? (
                        <span className="text-neutral-800 flex items-center gap-1.5 font-sans font-semibold">
                          <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
                          {lang === 'FR' ? 'Acquisition en ligne' : 'Online Acquisition'}
                        </span>
                      ) : (
                        <span className="text-emerald-800 flex items-center gap-1.5 font-sans font-semibold">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                          {lang === 'FR' ? 'Présent en galerie' : 'In Gallery'}
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => onSelectArtwork(art)}
                      className="text-[10px] tracking-widest font-mono font-bold text-black hover:opacity-60 flex items-center transition-colors uppercase cursor-pointer"
                      id={`view-art-btn-${art.id}`}
                    >
                      {lang === 'FR' ? 'En savoir plus' : 'Learn more'}
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
