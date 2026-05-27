/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Globe, Award, Building, Calendar, ArrowRight } from 'lucide-react';
import { TabType } from '../../types';

interface ExhibitionsPageProps {
  onExplore: (tab: TabType) => void;
  lang: 'FR' | 'EN';
}

interface TimelineEvent {
  year: string;
  titleFr: string;
  titleEn: string;
  location: string;
  descFr: string;
  descEn: string;
  type: 'LOCATION' | 'EXHIBITION' | 'INTERNATIONAL' | 'PRIZE';
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: 'Dès Juillet 2024',
    titleFr: 'NOUVEL ÉCRIN — ART GALLERY PONT-NEUF',
    titleEn: 'NEW LOCATION — ART GALLERY PONT-NEUF',
    location: '9 rue Dauphine, Paris 75006',
    descFr: 'Class Gallery Paris s’installe dans un nouvel espace à l’Art Gallery Pont-Neuf (en exposition permanente d\'oeuvres en bronze d\'art contemporains de Serge COUVERT et Dominique RAYOU).',
    descEn: 'Class Gallery Paris opens at its brand-new space in Art Gallery Pont-Neuf (representing permanent exhibitions of contemporary bronze masterworks by Serge COUVERT & Dominique RAYOU).',
    type: 'LOCATION',
  },
  {
    year: '2019 — Décembre 2022',
    titleFr: 'Emplacement Historique',
    titleEn: 'Historical Space Location',
    location: '21, rue Dauphine, Paris 75006',
    descFr: 'Curation de prestige et accueil de nos collectionneurs internationaux au cœur du quartier Saint-Germain-des-Prés.',
    descEn: 'Prestigious curation welcoming international art collectors in the heart of the historic Saint-Germain-des-Prés district.',
    type: 'LOCATION',
  },
  {
    year: '2019',
    titleFr: 'Exposition Serge Couvert — Galerie du Street',
    titleEn: 'Serge Couvert Exhibition — Galerie du Street',
    location: '23 rue des Tournelles, Paris 75004',
    descFr: 'Exposition exceptionnelle des œuvres en bronze et monolithes de l’artiste sculpteur Serge Couvert dans le Marais.',
    descEn: 'Exceptional solo exhibition of bronze and direct carving wood sculptures by resident master Serge Couvert in Saint-Paul.',
    type: 'EXHIBITION',
  },
  {
    year: '2002 — Décembre 2018',
    titleFr: 'Création historique — GALERIE CLASS 41',
    titleEn: 'Historical Founding — GALERIE CLASS 41',
    location: '41, rue Dauphine, Paris 75006',
    descFr: 'L’emplacement fondateur de l’activité de Marc Mneimné à Paris, hébergeant plus de 16 années de créativité artistique et d’expositions d\'antiquités et œuvres d\'art.',
    descEn: 'The original founding headquarters of Marc Mneimné, driving over 16 years of select artistic curation, bronze pieces, and private salon collections.',
    type: 'LOCATION',
  },
  {
    year: '2018',
    titleFr: 'Supervision Artistique — SCOPE Miami Beach',
    titleEn: 'Artistic Supervision — SCOPE Miami Beach',
    location: 'Miami Beach, Floride, USA',
    descFr: 'Activité en tant que superviseur invité à l\'exposition internationale d\'Art Contemporain SCOPE Miami Beach.',
    descEn: 'Acted as guest supervisor and gallery representative at the leading SCOPE Miami Beach International Art Show.',
    type: 'INTERNATIONAL',
  },
  {
    year: '2018',
    titleFr: 'Exposition Serge Couvert — Galerie de Médicis',
    titleEn: 'Serge Couvert Exhibition — Galerie de Médicis',
    location: '18, Place des Vosges, Paris 75004',
    descFr: 'Présentation de statues et bronzes de Serge Couvert au sein de la célèbre Place des Vosges, cœur de l\'histoire artistique parisienne.',
    descEn: 'Highlighting beautiful bronze figures of Serge Couvert inside the legendary Place des Vosges art space.',
    type: 'EXHIBITION',
  },
  {
    year: '2018',
    titleFr: 'Curation Privée — Artiste ARTHUR GAÏDA',
    titleEn: 'Private Exhibition — Fine Art painting category ARTHUR GAÏDA',
    location: 'Class Gallery Paris, France',
    descFr: 'Exposition thématique de prestige mettant en avant l\'art du Trompe l\'œil, le symbolisme existentiel et l\'hyperréalisme d\'Arthur Gaïda.',
    descEn: 'A high-end curated solo event introducing the intellectual symbols, rebus-canvases, and exquisite trompe l’oeil paintings of Arthur Gaïda.',
    type: 'EXHIBITION',
  },
  {
    year: '2016',
    titleFr: 'SCOPE Miami Beach & Art Toronto',
    titleEn: 'SCOPE Miami Beach & Art Toronto Shows',
    location: 'Miami (Floride, USA) & Toronto (Canada)',
    descFr: 'Invité en tant que superviseur artistique lors des foires d\'art majeures américaines SCOPE Miami & Art Toronto.',
    descEn: 'Participated as guest supervisor and academic observer at the prestigious SCOPE Miami Beach & Art Toronto International Art fairs.',
    type: 'INTERNATIONAL',
  },
  {
    year: '2011',
    titleFr: 'Triomphe Institutionnel de Serge COUVERT',
    titleEn: 'Six Prestigious Awards for Sculptor Serge COUVERT',
    location: 'Savoie & Concours Internationaux',
    descFr: 'Six prix officiels prestigieux ont été décernés à notre sculpteur résident permanent Serge COUVERT pour l’excellence technique et l\'émotion pure de ses sculptures.',
    descEn: 'Six outstanding standard awards given to our resident master sculptor Serge COUVERT in recognition of his exquisite direct carvings and bronze works.',
    type: 'PRIZE',
  },
  {
    year: '2006',
    titleFr: 'Beverly Hills Classic Antiques, Fine Art & Jewellery Show',
    titleEn: 'Beverly Hills Classic Antiques, Fine Art & Jewellery Show',
    location: 'Los Angeles, Californie, USA',
    descFr: 'Exposition de notre collection et œuvres contemporaines d\'art au cœur de Los Angeles, USA.',
    descEn: 'Showcasing our select masterworks collection and prestigious bronzes in Los Angeles, USA.',
    type: 'INTERNATIONAL',
  },
  {
    year: '2005',
    titleFr: 'Art Miami & Palm Beach Jewellery Show 2005',
    titleEn: 'Art Miami & Palm Beach Jewellery Show 2005',
    location: 'Floride, USA',
    descFr: 'Double présence floridienne à la foire Art Miami et à l\'historique salon de bijoux et art de Palm Beach.',
    descEn: 'Dual representation showing key sculptures and fine art pieces at Art Miami and Palm Beach Jewellery & Antiques show in Florida.',
    type: 'INTERNATIONAL',
  },
  {
    year: '2004',
    titleFr: 'Saison d’Expositions — USA, Dubaï & EAU',
    titleEn: 'Global Exhibitions Sweep — USA, Dubai & UAE',
    location: 'Miami, Palm Beach, Palm Springs (USA) & Dubaï (EAU)',
    descFr: 'Un rayonnement global sans précédent : booths exclusifs à Art Miami, Palm Beach, Palm Springs International Art Fair (PSIAF - Californie), et à l’Art Index de DUBAÏ en collaboration active avec la Galerie Benchaieb.',
    descEn: 'A landmark year for the gallery: showcasing fine art in Florida (Art Miami), California (PSIAF - Palm Springs), Palm Beach, and Art Index DUBAI (UAE) in collaboration with Galerie Benchaieb.',
    type: 'INTERNATIONAL',
  },
  {
    year: '2003',
    titleFr: 'Art New-York & Art Miami 2003',
    titleEn: 'Art New York & Art Miami 2003 Shows',
    location: 'New York & Miami, USA',
    descFr: 'Présentation de notre catalogue européen sur la côte Est et en Floride durant ces deux foires majeures de niveau mondial.',
    descEn: 'Exhibiting our curated sculpture and paint catalog to institutional collectors in New York City and Miami, USA.',
    type: 'INTERNATIONAL',
  },
  {
    year: '2002',
    titleFr: 'Premier Prix d’Académie — Thierry CHARPENTIER',
    titleEn: 'First Academy Prize — Thierry CHARPENTIER',
    location: 'Académie Jacques Boitiat, Barbizon, France',
    descFr: 'Le prestigieux premier prix de peinture (Grand Prix de l’Académie Jacques Boitiat) décerné à Barbizon à notre artiste peintre Thierry CHARPENTIER.',
    descEn: 'The celebrated First Prize (Grand Prix of Académie Jacques Boitiat) awarded in Barbizon to our featured gallery painter Thierry CHARPENTIER.',
    type: 'PRIZE',
  }
];

type FilterType = 'ALL' | 'LOCATION' | 'EXHIBITION' | 'INTERNATIONAL' | 'PRIZE';

export default function ExhibitionsPage({ onExplore, lang }: ExhibitionsPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  const filteredEvents = TIMELINE_EVENTS.filter(event => {
    if (activeFilter === 'ALL') return true;
    return event.type === activeFilter;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'LOCATION':
        return <Building className="w-5 h-5 text-black" />;
      case 'EXHIBITION':
        return <Calendar className="w-5 h-5 text-amber-600" />;
      case 'INTERNATIONAL':
        return <Globe className="w-5 h-5 text-emerald-700" />;
      case 'PRIZE':
        return <Award className="w-5 h-5 text-red-600" />;
      default:
        return <Calendar className="w-5 h-5 text-black" />;
    }
  };

  const getFilterStyles = (filter: FilterType) => {
    return activeFilter === filter
      ? 'bg-black text-white border-black font-semibold'
      : 'bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-black/50';
  };

  return (
    <section className="bg-white py-16 max-w-7xl mx-auto px-4 sm:px-8 overflow-hidden">
      
      {/* Editorial Page Header */}
      <div className="text-left space-y-4 mb-16 border-b border-black/5 pb-8">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-[1px] bg-black" />
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.25em] font-bold">
            {lang === 'FR' ? 'Parcours historique depuis 2002' : 'Historical milestones since 2002'}
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-black tracking-widest uppercase">
          {lang === 'FR' ? 'EXPOSITIONS INTERNATIONALES & PRIX' : 'INTERNATIONAL EXHIBITIONS & PRIZES'}
        </h2>
        <p className="max-w-3xl text-xs sm:text-sm font-light leading-relaxed text-neutral-600 font-sans pl-1">
          {lang === 'FR' 
            ? 'Fondée en 2002 sous la direction de Marc Mneimné, la Class Gallery Paris s’impose comme une référence d’excellence à Paris et à l’international. Parcourez notre frise chronologique interactive pour revivre plus de deux décennies d\'expositions prestigieuses, de foires majeures (Miami, New York, Dubaï) et de distinctions artistiques.' 
            : 'Founded in 2002 under the directorship of Marc Mneimné, Class Gallery Paris maintains a legacy of curatorial excellence. Dive into our interactive chronological diary showcasing over two decades of global art show exhibitions (Miami, New York, Dubai), studio events, and fine arts prizes.'}
        </p>
      </div>

      {/* Focus: New Location Highlight Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-neutral-50 border border-black/10 p-6 sm:p-8 mb-16 text-left flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute right-0 bottom-0 opacity-[0.02] transform translate-y-1/4 translate-x-1/4 pointer-events-none">
          <MapPin className="w-96 h-96 text-black" />
        </div>
        
        <div className="space-y-3 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-red-600 text-white font-mono text-[9px] uppercase tracking-widest font-bold">
              {lang === 'FR' ? 'Nouvelle Location' : 'New Main Location'}
            </span>
            <span className="font-mono text-[10px] text-neutral-400 font-bold">JUILLET 2024 — PRESENT</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-light text-black tracking-wider uppercase">
            CLASS GALLERY-PARIS @ ART GALLERY PONT-NEUF
          </h3>
          <p className="text-xs sm:text-sm font-light font-sans text-neutral-600 max-w-2xl leading-relaxed">
            {lang === 'FR'
              ? 'Depuis juillet 2024, nous sommes très heureux de vous accueillir à notre nouvelle adresse permanente au 9, rue Dauphine 75006 Paris. Profitez d\'un accrochage permanent de nos sculptures de bronze d’art contemporains d’une finesse exceptionnelle.'
              : 'Starting July 2024, our new permanent coordinates are established at 9, rue Dauphine 75006 Paris under Art Gallery Pont-Neuf. Join us in viewing our exclusive curation including monumental bronze creations.'}
          </p>
          <div className="flex items-center space-x-2 text-xs text-neutral-900 font-medium">
            <MapPin className="w-4 h-4 text-neutral-800" />
            <span className="font-bold underline">9, Rue Dauphine — Paris 75006</span>
          </div>
        </div>

        <button 
          onClick={() => onExplore('CONTACT')}
          className="w-full md:w-auto justify-center bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase py-3.5 px-6 font-bold tracking-widest shrink-0 cursor-pointer flex items-center gap-2 transition-all"
          id="timeline-go-contact"
        >
          <span>{lang === 'FR' ? 'Préparer ma visite' : 'Plan your visit'}</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </motion.div>

      {/* Interactive Timeline Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 border-b border-black/10 pb-6 text-left">
        <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase tracking-wider pl-1 font-bold">
          {lang === 'FR' ? 'Filtrer les jalons historiques :' : 'Filter chronological type :'}
        </span>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            { value: 'ALL', labelFr: 'Tous les événements', labelEn: 'All Events' },
            { value: 'LOCATION', labelFr: 'Espaces & Galeries', labelEn: 'Gallery Spaces' },
            { value: 'EXHIBITION', labelFr: 'Expositions Ciblées', labelEn: 'Local Shows' },
            { value: 'INTERNATIONAL', labelFr: 'Salons Internationaux', labelEn: 'Global Art Fairs' },
            { value: 'PRIZE', labelFr: 'Prix & Récompenses', labelEn: 'Awards & Prizes' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value as any)}
              className={`px-3 py-1.5 text-[10px] sm:text-xs font-mono tracking-wider uppercase transition-colors rounded-none border cursor-pointer ${getFilterStyles(tab.value as any)}`}
              id={`filter-timeline-${tab.value.toLowerCase()}`}
            >
              {lang === 'FR' ? tab.labelFr : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Immersive Vertical Timeline Stream */}
      <div className="relative border-l-2 border-black/10 ml-4 md:ml-[25%] space-y-12 py-4 pl-6 md:pl-10 text-left">
        
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event, index) => {
            return (
              <motion.div
                key={`${event.year}-${index}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                className="relative group pb-4"
              >
                
                {/* Year tag sticking out to the left for desk sizing */}
                <div className="absolute left-0 top-0 transform -translate-x-[2.2rem] md:-translate-x-[9.5rem] flex items-center justify-end w-6 md:w-32 z-10">
                  <span className="hidden md:block font-serif italic text-base lg:text-xl font-extrabold text-black tracking-wide pr-5 text-right w-full">
                    {event.year}
                  </span>
                  
                  {/* Circular Node centered on the timeline axis */}
                  <div className="w-10 h-10 rounded-full bg-neutral-50 hover:bg-neutral-900 text-black hover:text-white border border-black/15 flex items-center justify-center transition-colors shadow-sm cursor-help relative group">
                    {getEventIcon(event.type)}
                    
                    {/* Tooltip hovering tag detail */}
                    <span className="absolute bottom-11 bg-black text-white text-[9px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none z-30">
                      {event.year}
                    </span>
                  </div>
                </div>

                {/* Main Content Box Card */}
                <div className="bg-white border border-black/10 hover:border-black/35 p-6 hover:shadow-md transition-all duration-300 relative rounded-none flex flex-col justify-between">
                  <div className="space-y-2">
                    
                    {/* Small category tag and mobile year */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[9px] font-mono tracking-widest uppercase font-bold bg-neutral-100 border border-black/5 text-neutral-800 px-2 py-0.5">
                        {event.type === 'LOCATION' 
                          ? (lang === 'FR' ? '✦ ESPACE PERMANENT' : '✦ PERMANENT ROOM') 
                          : event.type === 'EXHIBITION' 
                            ? (lang === 'FR' ? '✦ EXPOSITION SPECIALE' : '✦ SPECIAL SHOW') 
                            : event.type === 'INTERNATIONAL' 
                              ? (lang === 'FR' ? '✦ FOIRE INTERNATIONALE' : '✦ INTERNATIONAL FAIR') 
                              : (lang === 'FR' ? '✦ PRIX & DISTINCTION' : '✦ ACADEMY AWARD')}
                      </span>
                      
                      {/* Year displayed exclusively for portable sizing */}
                      <span className="inline-block md:hidden font-serif italic font-bold text-sm text-black">
                        {event.year}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg tracking-wide font-normal text-black uppercase leading-snug">
                      {lang === 'FR' ? event.titleFr : event.titleEn}
                    </h4>

                    <p className="text-xs sm:text-xs font-sans text-neutral-600 leading-relaxed font-light font-display">
                      {lang === 'FR' ? event.descFr : event.descEn}
                    </p>

                  </div>

                  {/* Metadata address info footer */}
                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center space-x-1.5 text-[10px] font-mono tracking-wider text-neutral-400 font-bold">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 select-none shrink-0" />
                    <span className="uppercase text-neutral-500">{event.location}</span>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>

      </div>

      {/* Retro bottom card pointing back inline */}
      <div className="mt-16 bg-neutral-50/50 border border-neutral-900/10 p-6 text-center text-xs font-sans font-light max-w-lg mx-auto">
        <p className="text-neutral-600 leading-relaxed">
          {lang === 'FR'
            ? 'Toutes les archives exposées et décisions de curation sont vérifiées auprès de la direction de la Class Gallery-Paris et certifiées par Marc Mneimné.'
            : 'All historic listings, award nominations, and international representations are curated directly by Class Gallery-Paris management.'}
        </p>
        <button
          onClick={() => onExplore('GALLERY')}
          className="mt-3 inline-flex items-center space-x-1.5 font-mono text-[10px] font-bold text-black uppercase hover:opacity-60 transition-opacity tracking-widest cursor-pointer"
        >
          <span>{lang === 'FR' ? 'Parcourir les œuvres d\'aujourd\'hui' : 'Browse active collection'}</span>
          <span>→</span>
        </button>
      </div>

    </section>
  );
}
