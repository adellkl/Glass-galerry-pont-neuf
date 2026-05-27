/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TabType } from '../../types';
import Hero from '../../components/Hero';
import ArtistsSection from '../../components/ArtistsSection';
import { MapPin } from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: TabType) => void;
  lang: 'FR' | 'EN';
  handleFilterJumper: (category: 'PAINTERS' | 'SCULPTORS' | 'GLASS') => void;
}

export default function HomePage({ setActiveTab, lang, handleFilterJumper }: HomePageProps) {
  return (
    <div className="space-y-12">
      {/* 1. Immersive Hero Crossfade Slideshow & Title */}
      <Hero onExplore={setActiveTab} lang={lang} />

      {/* 2. Structured Home Sections for Easy On-Page Discovery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-24">
        
        {/* Curated Previews of Artworks Category Selection */}
        <section className="text-left space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-bold">
                {lang === 'FR' ? 'NOTRE ESPACE EXPOSITION' : 'CURATED PORTFOLIOS'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-black tracking-widest uppercase">
                {lang === 'FR' ? 'Parcourir par médium' : 'Browse by Medium'}
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('GALLERY')}
              className="text-xs font-mono font-bold tracking-widest text-black hover:opacity-60 uppercase flex items-center shrink-0 cursor-pointer"
              id="home-btn-all-artworks"
            >
              {lang === 'FR' ? 'Voir toute la collection →' : 'Show full collection →'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { 
                titleFr: 'Peintures (IRINI)', 
                titleEn: 'Paintings (IRINI)', 
                img: 'https://images.unsplash.com/photo-1549887552-cb1331d50baf?auto=format&fit=crop&q=80&w=800', 
                tab: 'PAINTERS',
                descFr: 'Toiles d\'IRINI épurées, exclusivement commandées en ligne.',
                descEn: 'Minimal abstract canvases by IRINI, sold online only.'
              },
              { 
                titleFr: 'Bronze & Sculpture', 
                titleEn: 'Bronze & Sculptures', 
                img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800', 
                tab: 'SCULPTORS',
                descFr: 'Les marbres lisses de Dominique Rayou et monolithes de Serge Couvert.',
                descEn: 'Stunning direct-carvings by Rayou and totemic wood by Couvert.'
              },
              { 
                titleFr: 'Verrerie Contemporaine', 
                titleEn: 'Blown Glass Art', 
                img: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800', 
                tab: 'GLASS',
                descFr: 'Prismes cristallins et sculptures optiques de Jean-Pierre Umberto.',
                descEn: 'Translucent optical blocks and silica shapes by Umberto.'
              }
            ].map((card, cidx) => (
              <div
                key={cidx}
                onClick={() => handleFilterJumper(card.tab as any)}
                className="group bg-white border border-black/10 hover:border-black/30 transition-all duration-500 overflow-hidden text-left cursor-pointer flex flex-col justify-between p-4"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-50 relative mb-4">
                  <img
                    src={card.img}
                    alt={card.titleFr}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-750 transform group-hover:scale-[1.02]"
                  />
                </div>
                <div className="space-y-1.5 px-1">
                  <h3 className="font-serif text-lg tracking-wide text-neutral-900 group-hover:text-black transition-colors uppercase font-medium">
                    {lang === 'FR' ? card.titleFr : card.titleEn}
                  </h3>
                  <p className="text-[11px] font-sans text-neutral-500 leading-relaxed font-light">
                    {lang === 'FR' ? card.descFr : card.descEn}
                  </p>
                </div>
                <div className="pt-3 mt-3 px-1 border-t border-black/10 flex items-center justify-between text-[10px] tracking-widest font-mono text-black uppercase font-bold">
                  <span>{lang === 'FR' ? 'Accéder' : 'Enter'}</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Curated Artists Segment */}
        <ArtistsSection onFilterChange={handleFilterJumper} lang={lang} />

        {/* Highlights Banner for Relocation */}
        <section className="bg-neutral-50 border border-black/10 p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-neutral-100/40 rounded-full filter blur-3xl pointer-events-none" />
          
          {/* Embedded striped motif inside banner */}
          <div className="absolute inset-0 opacity-10 pointer-events-none hero-mask" />

          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="flex items-center space-x-1 font-mono text-[10px] tracking-[0.2em] text-neutral-800 uppercase font-bold">
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span>ART GALLERY PONT-NEUF</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-black uppercase leading-snug">
              {lang === 'FR' ? 'NOTRE NOUVEL EMPLACEMENT À PARIS 6' : 'VISIT OUR REFINED PARISIAN SPACE'}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-neutral-700 font-light leading-relaxed">
              {lang === 'FR'
                ? 'Nous sommes fiers de vous retrouver au 9, rue Dauphine, à deux pas du plus vieux pont de pierre de Paris. Venez déambuler parmi nos bronzes permanents de Couvert et Rayou, visibles sur pied dans un espace minimaliste exceptionnel.'
                : 'Join us at 9, rue Dauphine near the legendary Seine riverside banks. Walk around the permanent physical carvings of Dominique Rayou and Serge Couvert in our custom art room.'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('MAP')}
            className="w-full md:w-auto text-center whitespace-nowrap px-6 py-4 bg-black hover:bg-neutral-800 text-white font-semibold text-xs font-mono tracking-widest uppercase transition-colors shrink-0 shadow-sm cursor-pointer relative z-10"
            id="visit-map-home-banner-btn"
          >
            {lang === 'FR' ? 'Planifier Route' : 'Find Directions'}
          </button>
        </section>

      </div>
    </div>
  );
}
