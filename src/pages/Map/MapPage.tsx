/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GALLERY_INFO } from '../../data';
import { Compass, Navigation, Train, ExternalLink } from 'lucide-react';

interface MapPageProps {
  lang: 'FR' | 'EN';
}

type DirectionStop = 'PONT-NEUF' | 'ODEON' | 'CHATELET';

export default function MapPage({ lang }: MapPageProps) {
  const [activeStop, setActiveStop] = useState<DirectionStop>('PONT-NEUF');

  const directions = {
    'PONT-NEUF': {
      titleFr: 'Depuis Métro Pont-Neuf (Ligne 7) - 3 min',
      titleEn: 'From Métro Pont-Neuf (Line 7) - 3 min walk',
      descFr: 'Traversez le magnifique Pont Neuf historique vers la Rive Gauche, continuez tout droit sur la rue Dauphine. La galerie se trouve au numéro 9 sur la droite, juste avant la rue de Nesle.',
      descEn: 'Cross the beautiful, historic Pont-Neuf bridge toward the Left Bank, and walk straight into Rue Dauphine. The gallery is located at number 9 on your right-hand side, right before Rue de Nesle.'
    },
    'ODEON': {
      titleFr: 'Depuis Métro Odéon (Lignes 4, 10) - 5 min',
      titleEn: 'From Métro Odéon (Lines 4, 10) - 5 min walk',
      descFr: 'Remontez la rue de l\'Ancienne Comédie puis continuez tout droit en traversant le carrefour de la rue de Buci pour rejoindre la rue Dauphine. Continuez à descendre jusqu\'au numéro 9.',
      descEn: 'Walk up Rue de l\'Ancienne Comédie, cross the active Rue de Buci crossroads to enter Rue Dauphine directly. Continue down toward the Seine to reach number 9.'
    },
    'CHATELET': {
      titleFr: 'Depuis RER Châtelet - Les Halles - 12 min',
      titleEn: 'From RER Châtelet - Les Halles - 12 min walk',
      descFr: 'Dirigez-vous vers le sud en direction de la Seine, traversez le Pont au Change pour rejoindre l\'Île de la Cité, traversez l\'île vers le Pont Neuf, puis engagez-vous sur la rue Dauphine.',
      descEn: 'Walk south toward the Seine, cross Pont au Change onto Île de la Cité, head west toward Pont-Neuf bridge, cross onto the Left Bank and walk up Rue Dauphine.'
    }
  };

  return (
    <section className="bg-white py-16 max-w-7xl mx-auto overflow-hidden px-4 sm:px-8">
      
      {/* Editorial Header */}
      <div className="text-left space-y-3 mb-12 border-b border-black/5 pb-6">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-[1px] bg-black" />
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.25em] font-bold">
            {lang === 'FR' ? 'Situation Géographique' : 'Location & Access'}
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-black tracking-widest uppercase">
          {lang === 'FR' ? 'Accès à la Galerie' : 'Interactive Map'}
        </h2>
        <p className="max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-neutral-600 font-sans">
          {lang === 'FR' 
            ? 'Situé au 9, rue Dauphine dans le 6ème arrondissement de Paris, notre espace Art Gallery Pont-Neuf flanque les quais mythiques de la Seine.' 
            : 'Nestled at 9 rue Dauphine in the refined 6th arrondissement of Paris, our Art Gallery Pont-Neuf matches the prestige of the Left Bank art scene.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch font-sans">
        
        {/* Column 1: Custom Artistic Vector Map (Column 7/12) */}
        <div className="lg:col-span-7 bg-neutral-50 border border-black/10 relative flex flex-col justify-between p-6 overflow-hidden shadow-sm">
          
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3 py-1.5 border border-black/15 text-[9px] font-mono tracking-widest text-neutral-800 uppercase font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>SAINT-GERMAIN-DES-PRÉS / SEINE</span>
          </div>

          {/* Bespoke interactive vector map illustration */}
          <div className="relative w-full aspect-[4/3] flex items-center justify-center py-10 my-4 select-none">
            
            <svg 
              viewBox="0 0 800 600" 
              className="w-full h-full text-black"
              style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
            >
              {/* Grid Background accents */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                </pattern>
                <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0, 0, 0, 0.04)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <circle cx="340" cy="380" r="250" fill="url(#map-glow)" />

              {/* Seine River Block */}
              <path 
                d="M 50 150 Q 300 130 500 110 T 750 100 L 750 180 Q 500 190 300 210 T 50 230 Z" 
                fill="#f1f5f9" 
                stroke="rgba(0,0,0,0.05)" 
                strokeWidth="2" 
              />
              <text x="120" y="185" className="font-sans font-extralight text-[11px] uppercase tracking-[0.4em] fill-neutral-400">
                La Seine
              </text>

              {/* Pont-Neuf Bridge */}
              <g className="opacity-80">
                <path d="M 460 115 L 490 200" stroke="#e2e8f0" strokeWidth="14" strokeOpacity="1" />
                <path d="M 460 115 L 490 200" stroke="#475569" strokeWidth="1" />
                <text x="490" y="145" transform="rotate(71, 490, 145)" className="font-sans text-[9px] uppercase tracking-widest fill-neutral-500 font-bold">
                  Pont-Neuf
                </text>
              </g>

              {/* Île de la Cité fragment */}
              <path 
                d="M 530 110 C 600 105 700 95 760 90 L 760 160 C 700 165 580 170 530 110 Z" 
                fill="#f8fafc" 
                stroke="rgba(0,0,0,0.06)" 
                strokeWidth="1" 
              />
              <text x="610" y="130" className="font-sans text-[9px] uppercase tracking-wider fill-neutral-400 font-semibold">
                Île de la Cité
              </text>

              {/* Main Streets Grid */}
              {/* Rue Dauphine */}
              <g>
                <path d="M 488 198 Q 440 310 340 380" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="3 3" className="opacity-40" />
                <path d="M 488 198 Q 440 310 340 380" fill="none" stroke="#000000" strokeWidth="1.5" />
                <text x="460" y="270" transform="rotate(-40, 460, 270)" className="font-serif italic text-[10px] tracking-wide fill-neutral-800 font-bold">
                  Rue Dauphine
                </text>
              </g>

              {/* Quai des Grands Augustins */}
              <path d="M 100 220 L 485 198 L 740 185" fill="none" stroke="#cbd5e1" strokeWidth="4" />
              <text x="210" y="240" className="font-sans text-[8px] uppercase tracking-widest fill-neutral-500 font-semibold">
                Quai des Grands Augustins
              </text>

              {/* Rue de Nesle */}
              <path d="M 350 373 L 260 310" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              <text x="265" y="335" transform="rotate(28, 265, 335)" className="font-sans text-[8px] tracking-wider fill-neutral-500">
                R. de Nesle
              </text>

              {/* Rue Christine */}
              <path d="M 334 397 C 350 430 380 430 450 420" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              <text x="380" y="440" className="font-sans text-[8px] tracking-wider fill-neutral-500">
                R. Christine
              </text>

              {/* Rue de Buci / St-Germain junction */}
              <path d="M 340 380 C 265 420 200 480 180 520" fill="none" stroke="#cbd5e1" strokeWidth="3" />
              <text x="220" y="470" className="font-sans text-[8px] uppercase tracking-wider fill-neutral-500 font-semibold">
                St-Germain-des-Prés
              </text>

              {/* Metro Stations */}
              {/* Pont-Neuf Métro */}
              <g className="cursor-pointer" onClick={() => setActiveStop('PONT-NEUF')}>
                <circle cx="445" cy="100" r="6" fill="#fff" stroke="#000" strokeWidth="2" />
                <text x="445" y="85" textAnchor="middle" className="font-sans font-bold text-[9px] tracking-wider fill-black">
                  Ⓜ Pont-Neuf (L7)
                </text>
              </g>

              {/* Odéon Métro */}
              <g className="cursor-pointer" onClick={() => setActiveStop('ODEON')}>
                <circle cx="180" cy="520" r="6" fill="#fff" stroke="#000" strokeWidth="2" />
                <text x="180" y="505" textAnchor="middle" className="font-sans font-bold text-[9px] tracking-wider fill-black">
                  Ⓜ Odéon (L4, L10)
                </text>
              </g>

              {/* GALLERY TARGET PIN */}
              <g className="cursor-pointer">
                {/* Ping waves */}
                <circle cx="420" cy="305" r="30" fill="rgba(0, 0, 0, 0.05)" className="animate-pulse" />
                <circle cx="420" cy="305" r="14" fill="rgba(0, 0, 0, 0.05)" />
                {/* Core Location Point */}
                <path d="M420 285 C410 285 405 293 420 315 C435 293 430 285 419.99 285 Z" fill="#000000" />
                <circle cx="420" cy="295" r="3" fill="#ffffff" />
                
                {/* Dynamic tag overlay */}
                <rect x="445" y="280" width="168" height="38" fill="rgba(255,255,255,0.95)" stroke="#000000" strokeWidth="1.5" />
                <text x="455" y="295" className="font-serif text-[10px] font-bold tracking-wider fill-black">
                  CLASS GALLERY-PARIS
                </text>
                <text x="455" y="308" className="font-sans text-[8px] fill-neutral-600 font-semibold uppercase">
                  Art Gallery Pont-Neuf
                </text>
              </g>
            </svg>

          </div>

          {/* Interactive instruction ticker footer */}
          <div className="pt-4 border-t border-black/10 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
            <span>* {lang === 'FR' ? 'Cliquez sur les icones métro pour recalculer les trajets' : 'Click metro icons above to refresh directions'}</span>
            <span className="font-bold text-black">PONT-NEUF SEINE</span>
          </div>

        </div>

        {/* Column 2: Directions and Google Maps metadata (Column 5/12) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          
          {/* Top Panel: Actual Adress Card & Transit info */}
          <div className="bg-neutral-50 border border-black/10 p-6 space-y-6 text-left shadow-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block font-bold">
                {lang === 'FR' ? 'NOTRE ADRESSE HISTORIQUE' : 'HISTORIC ADDRESS'}
              </span>
              
              <div className="space-y-2">
                <h3 className="font-serif text-xl tracking-widest text-black uppercase font-light">
                  {GALLERY_INFO.name}
                </h3>
                <p className="font-mono text-neutral-700 text-xs tracking-wider font-semibold">
                  {GALLERY_INFO.space} <br />
                  {GALLERY_INFO.address}
                </p>
                <div className="pt-2 flex flex-col space-y-1 text-xs text-neutral-600 font-sans font-medium">
                  <span className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2" />
                    {lang === 'FR' ? 'Entrée Libre' : 'Free Admission'}
                  </span>
                  <span>
                    <strong>{lang === 'FR' ? 'Horaires : ' : 'Hours: '}</strong>
                    {lang === 'FR' ? GALLERY_INFO.hoursFr : GALLERY_INFO.hoursEn}
                  </span>
                </div>
              </div>
            </div>

            {/* Metro controls list */}
            <div className="space-y-3 pt-4 border-t border-black/10">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block font-bold">
                {lang === 'FR' ? 'CHOISIR VOTRE TRAJET :' : 'CHOOSE YOUR STATION:'}
              </span>
              <div className="flex flex-col space-y-1.5">
                {(['PONT-NEUF', 'ODEON', 'CHATELET'] as const).map((stop) => {
                  const label = stop === 'PONT-NEUF' ? 'Ⓜ Pont-Neuf (L7)' : stop === 'ODEON' ? 'Ⓜ Odéon (L4, L10)' : 'Ⓜ Châtelet (RER A, B, D)';
                  const isSelected = activeStop === stop;
                  return (
                    <button
                      key={stop}
                      onClick={() => setActiveStop(stop)}
                      className={`text-left text-xs px-3.5 py-3 flex items-center justify-between border cursor-pointer font-bold ${
                        isSelected 
                          ? 'border-black bg-black text-white font-semibold' 
                          : 'border-black/10 bg-neutral-50 text-neutral-600 hover:text-black hover:border-black/30'
                      }`}
                      id={`stop-selector-${stop.toLowerCase()}`}
                    >
                      <span className="font-mono uppercase tracking-wider text-[10px]">{label}</span>
                      <Navigation className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-white rotate-45' : 'text-neutral-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Panel: Dynamic directions description based on selection */}
          <div className="bg-neutral-50 border border-black/10 p-6 text-left space-y-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <Train className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
              <div className="space-y-1.5 font-sans">
                <h4 className="font-sans font-bold text-xs text-black uppercase tracking-wider">
                  {lang === 'FR' ? directions[activeStop].titleFr : directions[activeStop].titleEn}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans font-light">
                  {lang === 'FR' ? directions[activeStop].descFr : directions[activeStop].descEn}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10">
              <a
                href={`https://maps.google.com/?q=9+Rue+Dauphine,+75006+Paris,+France`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-black text-white hover:bg-neutral-800 transition-colors duration-300 py-3.5 text-xs font-mono tracking-widest font-semibold uppercase"
                id="btn-external-google-maps"
              >
                <span>{lang === 'FR' ? 'Ouvrir sur Google Maps' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
