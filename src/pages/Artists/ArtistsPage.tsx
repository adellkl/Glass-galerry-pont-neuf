/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ARTISTS, ARTWORKS } from '../../data';
import ArtworkPreviewImage from '../../components/ArtworkPreviewImage';
import { Artist, Artwork } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, MessageCircle, Info, Filter } from 'lucide-react';

interface ArtistsPageProps {
  lang: 'FR' | 'EN';
  onSelectArtwork: (artwork: Artwork) => void;
  onInquire: (subject: string) => void;
  onFilterJumper: (category: 'PAINTERS' | 'SCULPTORS' | 'GLASS') => void;
}

export default function ArtistsPage({ lang, onSelectArtwork, onInquire, onFilterJumper }: ArtistsPageProps) {
  const [filterType, setFilterType] = useState<'ALL' | 'PAINTER' | 'SCULPTOR' | 'GLASS'>('ALL');
  const [selectedArtistId, setSelectedArtistId] = useState<string>(ARTISTS[0]?.id || '');

  // Filtered artists based on selected category tab
  const filteredArtists = ARTISTS.filter(artist => {
    if (filterType === 'ALL') return true;
    return artist.type === filterType;
  });

  const activeArtist = ARTISTS.find(artist => artist.id === selectedArtistId) || ARTISTS[0];

  // Artworks by the active artist
  const activeArtistArtworks = ARTWORKS.filter(artwork => {
    // Exact matching or slug matching
    return artwork.artistId.toLowerCase() === activeArtist.id.toLowerCase() || 
           artwork.artistName.toLowerCase().includes(activeArtist.name.split(' ')[0].toLowerCase());
  });

  // Unique types of art & techniques offered per artist (explicit content)
  const getOfferingsInfo = (id: string) => {
    switch (id) {
      case 'dominique-rayou':
        return {
          titleFr: 'Sculpture Minérale & Métaphysique',
          titleEn: 'Mineral & Metaphysical Sculpture',
          descFr: 'Sculpture d\'art coulée en bronze de fonderie avec patine à la main ou taille directe sur marbres précieux de Carrare d\'une douceur remarquable. Ses créations capturent des formes organiques, des courbes pures et intemporelles symbolisant l\'intimité, la maternité et la paix.',
          descEn: 'Art sculpture cast in foundry bronze with hand-applied patinas or direct-carving on precious, soft-touch Carrara marble. His creations capture organic shapes and pure, timeless curves symbolizing intimacy, motherhood, and serenity.',
          stylesFr: ['Taille Directe', 'Fonderie au Sable', 'Polissage Satiné', 'Marbre Blanc de Carrare Haute Qualité'],
          stylesEn: ['Direct Carving', 'Sand Casting', 'Satin Polishing', 'Premium White Carrara Marble']
        };
      case 'serge-couvert':
        return {
          titleFr: 'Totems Figuratifs Épurés & Fonderie',
          titleEn: 'Refined Figurative Totems & Bronze Foundry',
          descFr: 'Mise en valeur magistrale du bois noble (chêne centenaire brûlé, châtaignier bicolore) allié à la force noble du bronze d\'art. Ses statues épurées révèlent le mouvement, la verticalité sacrée et les émotions pures à travers le grain brut de la matière forestière ou minérale.',
          descEn: 'Masterful representation of noble woods (ancient charred oak, bicolored chestnut) merged with the strength of cast art bronze. His minimalist statues reveal motion, sacred verticality, and raw emotions through the natural textures of timber and mineral.',
          stylesFr: ['Fonderie d\'Art de Haute Facture', 'Ébénisterie Épurée', 'Sculpture Monolithe', 'Alliances d\'Essences Rares'],
          stylesEn: ['Art Foundry Casting', 'Minimalist Cabinetmaking', 'Monolith Sculpting', 'Mixed Rare Wood Species']
        };
      case 'irini':
        return {
          titleFr: 'Expressionnisme Abstrait & Métaphysique de la Perception',
          titleEn: 'Abstract Expressionism & Metaphysics of Perception',
          descFr: 'Toiles d\'expressionnisme abstrait, d\'impressionnisme et de recherches métaphysiques. Ses techniques incorporent l\'huile traditionnelle, des pigments minéraux naturels extraits et des techniques mixtes contrastant des textures appliquées au couteau pour explorer le silence, le paysage urbain et les réalités parallèles.',
          descEn: 'Canvases of abstract expressionism, contemporary impressionism, and metaphysical aesthetics. Her techniques incorporate traditional oil, raw mineral pigments, and mixed media with thick knife-applied textures to explore silence, urban landscapes, and parallel realities.',
          stylesFr: ['Huile au Couteau', 'Pigments Minéraux Naturels', 'Technique Mixte texturée', 'Toiles de lin grand format'],
          stylesEn: ['Knife Palette Oil', 'Natural Mineral Pigments', 'Textured Mixed Media', 'Large-Format Linen Canvases']
        };
      case 'arthur-gaida':
        return {
          titleFr: 'Surréalisme Pictural, Hyperréalisme & Trompe l\'œil',
          titleEn: 'Pictorial Surrealism, Hyperrealism & Trompe l’oeil',
          descFr: 'Œuvres d\'une précision extrême fusionnant le réalisme absolu, le surréalisme poétique et le trompe l\'œil traditionnel. Ses peintures intègrent des rébus intellectuels et symboliques sur l\'existence humaine, le végétal, le vin universel et la vitalité protectrice de la nature face au temps.',
          descEn: 'Canvases of exceptional hyper-precision merging absolute realism, lyrical surrealism, and traditional trompe l’oeil. His works integrate symbolic rebuses on human existence, plant life, universal wine heritage, and the protective vitality of nature vs. time.',
          stylesFr: ['Trompe l\'œil traditionnel', 'Glacis d\'huile fin', 'Symbolique Surréaliste', 'Compositions Rébus'],
          stylesEn: ['Traditional Trompe l’oeil', 'Fine Oil Glazing', 'Surrealist Symbolism', 'Rebus Compositions']
        };
      case 'jean-pierre-umberto':
        return {
          titleFr: 'Prismes Cristallins & Verrerie d\'Art Optique',
          titleEn: 'Crystalline Prisms & Optical Glass Artistry',
          descFr: 'Sculptures de silice fusionnée de forte épaisseur, héritières de l\'art ancestral de Murano. Ses blocs optiques géométriques jouent avec la réfraction lumineuse, emprisonnant un vide parfait et des microsphères d\'air pour figer des instants de lumière pure au cœur de la matière vitreuse.',
          descEn: 'Thick, heavy fused-silica blocks and hand-blown glass sculpture inheriting centuries-old Murano techniques. His geometric optical pieces play with light refraction, trapping sterile vacuums and micro-bubbles to freeze solid streams of pure light.',
          stylesFr: ['Art Verrier Soufflé épais', 'Fusion de silice cristalline', 'Optique géométrique', 'Bullage contrôlé sous vide'],
          stylesEn: ['Thick Hand-Blown Glass', 'Crystalline Silica Fusion', 'Geometric Optics', 'Controlled Vacuum Bubbling']
        };
      default:
        return {
          titleFr: 'Création Contemporaine & Techniques Mixtes',
          titleEn: 'Contemporary Creation & Mixed Techniques',
          descFr: 'Maîtrise complète de médiums contemporains haut de gamme alliant savoir-faire historique et esthétique minimaliste épurée.',
          descEn: 'Complete command over premium contemporary mediums combining historical heritage and sophisticated minimal aesthetics.',
          stylesFr: ['Savoir-faire classique', 'Matériaux Sélectionnés'],
          stylesEn: ['Classical craftsmanship', 'Curated materials']
        };
    }
  };

  const activeOffering = getOfferingsInfo(activeArtist.id);

  const handleArtistSelect = (id: string) => {
    setSelectedArtistId(id);
    const element = document.getElementById('artist-focus-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Decorative top grid lines */}
      <div className="border-b border-black/10 py-16 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] hero-mask pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-left relative z-10">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-8 h-[1px] bg-black/40" />
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.25em] font-bold">
              {lang === 'FR' ? 'Présentation des Créateurs' : 'Creators Showcase'}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-6xl font-extralight text-black tracking-widest uppercase leading-tight mb-4">
            {lang === 'FR' ? 'NOTRE ROSTER D\'ARTISTES' : 'OUR RESIDENT ARTISTS'}
          </h1>
          <p className="max-w-3xl text-sm sm:text-base font-light font-sans text-neutral-600 leading-relaxed">
            {lang === 'FR'
              ? 'La Class Gallery Paris représente de manière permanente des maîtres sculpteurs de taille directe, des fondeurs émérites, des virtuoses de l\'art verrier optique ainsi que des peintres expressionnistes et surréalistes. Découvrez leur vie, leurs techniques d\'art uniques et leur inventaire complet représenté au Pont-Neuf.'
              : 'Class Gallery Paris permanently represents direct-carving sculptors, legendary bronze foundry masters, optical glass blowers, and deep abstract-surrealist painters. Explore their history, professional art techniques, and complete represented inventories near Pont-Neuf.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        
        {/* Navigation & Roster Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/10 pb-6 gap-4">
          <div className="flex items-center space-x-3 text-neutral-800 font-mono text-xs font-bold uppercase tracking-wider">
            <Filter className="w-4 h-4 text-neutral-600" />
            <span>{lang === 'FR' ? 'Filtrer par discipline :' : 'Filter by discipline :'}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { value: 'ALL', labelFr: 'Tous les Artistes', labelEn: 'All Artists' },
              { value: 'PAINTER', labelFr: 'Peinture Contemporaine', labelEn: 'Fine Painting' },
              { value: 'SCULPTOR', labelFr: 'Sculpture Bronze & Marbre', labelEn: 'Sculpture & Bronze' },
              { value: 'GLASS', labelFr: 'Art du Verre Soufflé', labelEn: 'Glass Master' }
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => {
                  setFilterType(tab.value as any);
                  // Auto-select the first artist in the new filtered list if available
                  const matched = ARTISTS.find(a => tab.value === 'ALL' || a.type === tab.value);
                  if (matched) setSelectedArtistId(matched.id);
                }}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors rounded-none cursor-pointer border ${
                  filterType === tab.value
                    ? 'bg-black text-white border-black font-semibold'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:text-black hover:border-black/50'
                }`}
                id={`filter-artist-tab-${tab.value.toLowerCase()}`}
              >
                {lang === 'FR' ? tab.labelFr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Artist Grid Cards (Roster) - Dense dual-column structure on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-6 sm:mt-8">
          {filteredArtists.map(artist => {
            const isSelected = artist.id === selectedArtistId;
            return (
              <div
                key={artist.id}
                onClick={() => handleArtistSelect(artist.id)}
                className={`group border p-4 cursor-pointer transition-all duration-300 flex flex-col justify-between text-center ${
                  isSelected 
                    ? 'border-black bg-neutral-50/50 shadow-md ring-1 ring-black/5' 
                    : 'border-black/10 hover:border-black/40 hover:bg-neutral-50/30 bg-white'
                }`}
                id={`artist-card-${artist.id}`}
              >
                <div>
                  {/* Photo frame with reduced size - Circular Avatar format */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-neutral-100 relative mb-4 mx-auto border border-black/10 shadow-sm">
                    <img
                      src={artist.featuredImage}
                      alt={artist.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isSelected ? 'scale-105 font-medium' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>

                  {/* Classification details */}
                  <div className="space-y-1 text-center px-1">
                    <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase font-bold block">
                      {artist.type === 'PAINTER' ? (lang === 'FR' ? 'PEINTURE' : 'PAINTING') : artist.type === 'SCULPTOR' ? (lang === 'FR' ? 'SCULPTURE' : 'SCULPTURE') : (lang === 'FR' ? 'VERRE D\'ART' : 'GLASS ART')}
                    </span>
                    <h3 className="font-serif text-xs font-semibold tracking-widest text-neutral-900 group-hover:text-black uppercase line-clamp-1">
                      {artist.name}
                    </h3>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-black/5 text-center px-1 flex items-center justify-center space-x-1.5 text-[9px] font-mono tracking-widest text-neutral-500 uppercase font-bold group-hover:text-black">
                  <span>{lang === 'FR' ? 'VOIR LE PROFIL' : 'VIEW PROFILE'}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll anchor focus zone */}
        <div id="artist-focus-anchor" className="h-[2px] bg-black/10 my-12" />

        {/* Selected Artist Narrative Details Showcase */}
        {activeArtist && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            
            {/* COLUMN LEFT: Main Frame, Offerings breakdown (4/12 width) */}
            <div className="lg:col-span-5 space-y-8 max-w-2xl mx-auto lg:max-w-none w-full">
              
              <div className="border border-black/10 p-5 bg-neutral-50/20 shadow-sm relative">
                {/* Decorative brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-black/20" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-black/20" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-black/20" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-black/20" />

                <div className="max-w-[220px] mx-auto aspect-[4/5] overflow-hidden bg-white border border-black/10 relative">
                  <img
                    src={activeArtist.featuredImage}
                    alt={activeArtist.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover shadow-inner opacity-95 transition-all duration-1000"
                  />
                  {activeArtist.id === 'irini' && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-1">
                      {lang === 'FR' ? '✦ EXCLUSIVITÉ INTERNET' : '✦ INTERNET EXCLUSIVE'}
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <span className="inline-block font-mono text-[10px] bg-neutral-900 text-white uppercase font-semibold tracking-widest px-3 py-1 mt-1">
                    {activeArtist.type === 'PAINTER' ? (lang === 'FR' ? 'ARTISTE PEINTRE' : 'FINE PAINTER') : activeArtist.type === 'SCULPTOR' ? (lang === 'FR' ? 'MAÎTRE SCULPTEUR' : 'MASTER SCULPTOR') : (lang === 'FR' ? 'CRÉATEUR EN VERRERIE' : 'GLASS MASTER')}
                  </span>
                </div>
              </div>

              {/* STYLES & ART TECHNIQUES PROPOSED - SPECIFIC ART TYPES FOR THE REQUEST */}
              <div className="border border-black/10 bg-white p-6 space-y-4">
                <div className="flex items-center space-x-2 text-neutral-900 border-b border-black/10 pb-3">
                  <Sparkles className="w-4.5 h-4.5 text-black" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest">
                    {lang === 'FR' ? 'TYPES D\'ART & SAVOIR-FAIRE' : 'TYPES OF ART & MEDIUMS'}
                  </h4>
                </div>

                <div className="space-y-3 font-sans">
                  <h5 className="font-serif text-lg font-medium tracking-wide text-neutral-900">
                    {lang === 'FR' ? activeOffering.titleFr : activeOffering.titleEn}
                  </h5>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    {lang === 'FR' ? activeOffering.descFr : activeOffering.descEn}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400 block">
                    {lang === 'FR' ? 'SIGNATURES TECHNIQUES :' : 'TECHNICAL SIGNATURES :'}
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(lang === 'FR' ? activeOffering.stylesFr : activeOffering.stylesEn).map((style, sidx) => (
                      <span
                        key={sidx}
                        className="bg-neutral-50 text-neutral-800 text-[10px] font-mono px-2.5 py-1 uppercase tracking-wider border border-black/5"
                      >
                        ✓ {style}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inquiry Action Area */}
              <div className="border border-neutral-900/10 bg-neutral-50 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[9px] font-mono uppercase tracking-widest font-bold text-neutral-400">
                    {lang === 'FR' ? 'DISPONIBILITÉ ACQUISITIONS' : 'ACQUISITION INQUIRY'}
                  </div>
                  <h5 className="font-serif text-base font-normal text-black uppercase tracking-wide">
                    {lang === 'FR' ? `Acquérir une œuvre de ${activeArtist.name}` : `Incorporate ${activeArtist.name} into your collection`}
                  </h5>
                  <p className="text-[11px] font-sans text-neutral-600 leading-relaxed font-light">
                    {lang === 'FR'
                      ? 'Pour connaître la disponibilité, les tarifs d\'expédition à l\'international sécurisés ou formuler une commande spéciale, nos services répondent sous 24 heures.'
                      : 'To inquire on original availability, insured worldwide shipping rates or request dedicated commissions, we answer under 24 hours.'}
                  </p>
                </div>

                <button
                  onClick={() => onInquire(lang === 'FR' ? `Demande d'information - Artiste ${activeArtist.name}` : `Collector Inquiry - Artist ${activeArtist.name}`)}
                  className="w-full bg-black hover:bg-neutral-800 text-white text-xs font-mono tracking-widest uppercase py-3.5 px-4 font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  id={`inquire-artist-btn-${activeArtist.id}`}
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{lang === 'FR' ? 'Formuler une demande directe' : 'Contact Gallery Broker'}</span>
                </button>
              </div>

            </div>

            {/* COLUMN RIGHT: Large Bio prose & exact catalog works (7/12 width) */}
            <div className="lg:col-span-7 space-y-10 max-w-2xl mx-auto lg:max-w-none w-full">
              
              {/* Hero Header */}
              <div className="space-y-2 border-b border-black/10 pb-4">
                <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-bold">
                  {lang === 'FR' ? 'VUE ARTISTE EXCLUSIF' : 'FEATURED ARTIST RETROSPECTIVE'}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl font-extralight text-black tracking-widest uppercase">
                  {activeArtist.name}
                </h2>
              </div>

              {/* Poetry Quote bar */}
              {activeArtist.quoteFr && (
                <div className="bg-neutral-50 p-6 border-l-2 border-black/70 relative">
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-black/5 pointer-events-none" />
                  <p className="font-serif italic text-sm sm:text-base text-neutral-800 leading-relaxed pr-6">
                    {lang === 'FR' ? activeArtist.quoteFr : activeArtist.quoteEn}
                  </p>
                </div>
              )}

              {/* Detailed professional biography */}
              <div className="space-y-4">
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-black flex items-center space-x-1.5 pt-2">
                  <Info className="w-4 h-4 text-neutral-500" />
                  <span>{lang === 'FR' ? 'BIOGRAPHIE FRANCOPHONE' : 'CURATORIAL BIOGRAPHY'}</span>
                </h4>
                <div className="text-xs sm:text-sm font-light text-neutral-700 leading-relaxed font-sans space-y-4 pl-1 whitespace-pre-line">
                  {lang === 'FR' ? activeArtist.bioFr : activeArtist.bioEn}
                </div>
              </div>

              {/* Exact Represented Collection of Artist (Dynamic artwork query check) */}
              <div className="space-y-6 pt-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-black/10 pb-3 gap-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-black">
                    {lang === 'FR' 
                      ? `ŒUVRES DISPONIBILITÉ COURANTE (${activeArtistArtworks.length})` 
                      : `REPRESENTED WORKS IN THE GALLERY (${activeArtistArtworks.length})`}
                  </h4>
                  {activeArtistArtworks.length > 0 && (
                    <button
                      onClick={() => onFilterJumper(activeArtist.type === 'PAINTER' ? 'PAINTERS' : activeArtist.type === 'SCULPTOR' ? 'SCULPTORS' : 'GLASS')}
                      className="text-[10px] font-mono tracking-wider font-bold text-neutral-500 hover:text-black uppercase flex items-center transition-colors cursor-pointer"
                      id={`jumper-artist-${activeArtist.id}`}
                    >
                      <span>{lang === 'FR' ? 'Accéder à la discipline →' : 'Jump to this section →'}</span>
                    </button>
                  )}
                </div>

                {activeArtistArtworks.length === 0 ? (
                  <div className="bg-neutral-50 border border-black/10 p-8 text-center text-xs font-sans font-light text-neutral-500">
                    {lang === 'FR'
                      ? 'Toutes les créations de cet artiste sont actuellement installées en collection de musée ou temporairement indisponibles en ligne. Contactez l\'administration pour formuler une commission privée.'
                      : 'All artworks by this creator are currently assigned to private museum collections or online reservations. Speak with our curatorial desk to commission new pieces.'}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {activeArtistArtworks.map(artwork => (
                      <div
                        key={artwork.id}
                        onClick={() => onSelectArtwork(artwork)}
                        className="group bg-white border border-black/10 p-2.5 hover:border-black/30 transition-all duration-300 cursor-pointer text-left relative flex flex-col justify-between"
                        id={`artist-work-card-${artwork.id}`}
                      >
                        <div>
                          <div className="relative mb-2">
                            <ArtworkPreviewImage
                              src={artwork.image}
                              alt={artwork.title}
                              aspect="portrait"
                              size="sm"
                            />
                            {artwork.isOnlineOnly && (
                              <div className="absolute top-2 right-2 z-10 bg-red-600 text-white text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 shadow-sm pointer-events-none">
                                {lang === 'FR' ? 'LIGNE UNIQUE' : 'ONLINE EXCLUSIVE'}
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-serif text-xs font-semibold text-neutral-900 group-hover:text-black transition-colors uppercase tracking-wide line-clamp-2 leading-snug">
                                {artwork.title}
                              </h5>
                              <span className="font-mono text-[9px] text-neutral-400 font-bold shrink-0">{artwork.year}</span>
                            </div>
                            <p className="text-[10px] font-sans text-neutral-500 italic line-clamp-1">
                              {artwork.medium}
                            </p>
                            <p className="text-[9px] font-mono text-neutral-400 line-clamp-1">
                              {artwork.dimensions} • {artwork.material}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 mt-2 border-t border-black/5 flex items-center justify-between text-[9px] font-mono tracking-widest uppercase font-bold text-neutral-600 group-hover:text-black">
                          <span>{lang === 'FR' ? 'Inspecter la fiche' : 'Inspect work details'}</span>
                          <span>→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
