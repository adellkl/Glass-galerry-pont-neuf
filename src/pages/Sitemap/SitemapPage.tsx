/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TabType } from '../../types';
import { ARTISTS, GALLERY_INFO } from '../../data';
import { Compass, Eye, Layers, MapPin, Clock, Phone, Printer } from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (tab: TabType) => void;
  lang: 'FR' | 'EN';
}

export default function SitemapPage({ onNavigate, lang }: SitemapPageProps) {
  const triggerPrint = () => {
    window.print();
  };

  const mainPages = [
    { tab: 'HOME' as TabType, nameFr: 'Accueil', nameEn: 'Home', descFr: 'Présentation de la galerie, diaporamas immersifs et parcours de visite.', descEn: 'Gallery introduction, slideshow, and walk-around path' },
    { tab: 'GALLERY' as TabType, nameFr: 'La Collection Complète', nameEn: 'Full Art Collection', descFr: 'Moteur de recherche multicritère et grille interactive d\'œuvres.', descEn: 'Multi-criteria search engine and live catalog' },
    { tab: 'ARTISTS' as TabType, nameFr: 'Nos Artistes Résidents', nameEn: 'Our Resident Artists', descFr: 'Profils complets, biographies, médailles et portfolios d\'art.', descEn: 'Artist resumes, direct carving background, and statements' },
    { tab: 'EXHIBITIONS' as TabType, nameFr: 'Expositions & Actualités', nameEn: 'Exhibitions & News', descFr: 'Agenda chronologique bidécennal des salons (Paris, Miami, Dubaï).', descEn: 'Chronological list of shows over two decades (Paris, Miami)' },
    { tab: 'MAP' as TabType, nameFr: 'Plan de l\'Espace & Accès Métro', nameEn: 'Map & Underground Directions', descFr: 'Itinéraires interactifs dans Paris 6, stations Odéon et Pont-Neuf.', descEn: 'Interactive routes, travel details, and nearest metro lines' },
    { tab: 'CONTACT' as TabType, nameFr: 'Contact & Formulaire de Demande', nameEn: 'Contact & Inquiry Request', descFr: 'Messagerie directe d\'achat d\'œuvres et coordonnées de visite.', descEn: 'Purchase inquiries and direct messaging portal' },
    { tab: 'LEGAL' as TabType, nameFr: 'Mentions Légales & Propriété', nameEn: 'Legal Information', descFr: 'Droits d\'auteur, crédits photos et mentions de responsabilité.', descEn: 'Terms, photo credits, and responsibility declarations' }
  ];

  const categories = [
    { tab: 'PAINTERS' as TabType, nameFr: 'Peintures (IRINI & Arthur Gaïda)', nameEn: 'Paintings (IRINI & Arthur Gaïda)', countFr: 'Toiles abstraites et trompe-l\'œil (Ventes en ligne uniquement)', countEn: 'Abstract canvases (Available for online order only)' },
    { tab: 'SCULPTORS' as TabType, nameFr: 'Bronze & Sculpture (Couvert, Rayou)', nameEn: 'Bronze & Sculptures (Couvert, Rayou)', countFr: 'Taille directe sur marbre et bronzes permanents de fonderie', countEn: 'Direct carving white marble and permanent bronzes' },
    { tab: 'GLASS' as TabType, nameFr: 'Verrerie Contemporaine (JP Umberto)', nameEn: 'Blown Glass Art (JP Umberto)', countFr: 'Prismes cristallins et sculptures optiques de silice', countEn: 'Translucent optical crystal and silica prisms' }
  ];

  return (
    <section className="bg-white py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-8 overflow-hidden" id="sitemap-page-section">
      
      {/* Editorial Header - Hides on Print */}
      <div className="text-left space-y-4 mb-12 border-b border-black/5 pb-6 print:hidden">
        <div className="space-y-1">
          <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-bold text-neutral-500">
            {lang === 'FR' ? 'INDEX CRISTALLIN DU PORTAIL' : 'CLEAN DIRECTORY MAP'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-black tracking-widest uppercase">
            {lang === 'FR' ? 'Plan du Site' : 'Sitemap'}
          </h1>
        </div>
        <p className="font-sans text-xs sm:text-sm text-neutral-500 font-light max-w-3xl leading-relaxed">
          {lang === 'FR'
            ? 'Retrouvez ci-dessous l’organisation hiérarchique complète de notre galerie en ligne. Parcourez nos pages principales, accédez directement aux portfolios de nos sculpteurs et peintres résidents, ou utilisez les options d’impression de votre navigateur.'
            : 'Below is the clean structural map of our online gallery. Access our primary directories, dive into specific artwork mediums, or use our physical record printing utility to preserve information.'}
        </p>

        {/* Action Controls */}
        <div className="pt-4 flex flex-wrap gap-3">
          <button
            onClick={triggerPrint}
            className="inline-flex items-center space-x-2 bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold uppercase tracking-widest py-3 px-6 shadow-sm transition-colors cursor-pointer"
            id="sitemap-print-btn-top"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === 'FR' ? 'Imprimer cette page' : 'Print this guide'}</span>
          </button>
        </div>
      </div>

      {/* DEDICATED VISUAL PRINT MASTER - Visible ONLY on physical paper */}
      <div className="hidden print:block text-black bg-white font-sans p-2 space-y-6 text-left border-b border-black/20 pb-8 mb-8">
        <div className="flex justify-between items-start border-b-2 border-black pb-4">
          <div>
            <h1 className="font-serif text-2xl tracking-widest font-semibold uppercase">{GALLERY_INFO.name}</h1>
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mt-1">SITEMAP & PRACTICAL DOCUMENTS — PARIS VI</p>
          </div>
          <div className="text-right text-[10px] font-mono leading-relaxed">
            <p><strong>{lang === 'FR' ? 'Date d\'impression :' : 'Printed on :'}</strong> {new Date().toLocaleDateString(lang === 'FR' ? 'fr-FR' : 'en-US')}</p>
            <p>{GALLERY_INFO.address}</p>
            <p>{GALLERY_INFO.phone}</p>
          </div>
        </div>

        <div className="space-y-2 mt-4 text-[11px] font-sans">
          <h2 className="font-serif text-sm font-bold uppercase tracking-wider text-black border-b border-black/10 pb-1 font-bold">
            {lang === 'FR' ? '1. Coordonnées de Visite' : '1. Travel & Contact Details'}
          </h2>
          <p><strong>{lang === 'FR' ? 'Espace d\'Exposition :' : 'Art Room :'}</strong> {GALLERY_INFO.space}</p>
          <p><strong>{lang === 'FR' ? 'Horaires d\'Ouverture :' : 'Opening Hours :'}</strong> {lang === 'FR' ? GALLERY_INFO.hoursFr : GALLERY_INFO.hoursEn}</p>
          <p><strong>{lang === 'FR' ? 'Directeur :' : 'Director :'}</strong> {GALLERY_INFO.owner}</p>
          <p><strong>{lang === 'FR' ? 'Moyens d\'Accès :' : 'Directions :'}</strong> Métro Odéon (Lignes 4, 10), Station Pont-Neuf (Ligne 7)</p>
        </div>
      </div>

      {/* Main Structural Directories - Styled for both screen & paper */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Navigation Pages (7/12 width) */}
        <div className="md:col-span-7 space-y-8">
          
          <div className="border border-black/10 p-5 md:p-6 bg-neutral-50/20 shadow-sm relative rounded-none print:border-none print:p-0">
            {/* Visual aesthetics */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-black/20 print:hidden" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-black/20 print:hidden" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-black/20 print:hidden" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-black/20 print:hidden" />

            <div className="space-y-6">
              <div className="border-b border-black/10 pb-3 flex items-center justify-between">
                <h3 className="font-serif text-sm sm:text-base font-semibold tracking-wider text-black uppercase flex items-center space-x-2 font-bold">
                  <Compass className="w-4 h-4 text-black print:hidden" />
                  <span>{lang === 'FR' ? 'Arborescence des Directions' : 'Main Site Navigation'}</span>
                </h3>
                <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-widest font-bold">{mainPages.length} PAGES</span>
              </div>

              <div className="space-y-4">
                {mainPages.map((page) => (
                  <div 
                    key={page.tab}
                    onClick={() => {
                      onNavigate(page.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group flex items-start space-x-4 p-3 bg-white hover:bg-neutral-50 border border-black/5 hover:border-black/20 transition-all cursor-pointer rounded-none print:border-black/10 print:bg-white"
                  >
                    <div className="mt-0.5 bg-neutral-100 group-hover:bg-black group-hover:text-white w-7 h-7 flex items-center justify-center shrink-0 border border-black/5 transition-colors print:bg-neutral-50 print:text-black">
                      <span className="text-[10px] font-mono font-bold uppercase">Go</span>
                    </div>
                    <div className="space-y-1 text-left">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-sans text-xs font-bold tracking-wider text-neutral-900 group-hover:text-black uppercase font-bold">
                          {lang === 'FR' ? page.nameFr : page.nameEn}
                        </h4>
                        <span className="text-[8px] font-mono px-1.5 py-0.5 border border-black/10 bg-neutral-50 text-neutral-400 rounded-none uppercase print:hidden font-bold">
                          {page.tab}
                        </span>
                      </div>
                      <p className="text-[11px] font-sans text-neutral-500 font-light leading-relaxed">
                        {lang === 'FR' ? page.descFr : page.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Core Art Portfolios & Collections */}
          <div className="border border-black/10 p-5 md:p-6 bg-neutral-50/20 shadow-sm relative rounded-none print:border-none print:p-0">
            <div className="space-y-6">
              <div className="border-b border-black/10 pb-3 flex items-center justify-between">
                <h3 className="font-serif text-sm sm:text-base font-semibold tracking-wider text-black uppercase flex items-center space-x-2 font-bold">
                  <Layers className="w-4 h-4 text-black print:hidden" />
                  <span>{lang === 'FR' ? 'Thématiques & Médiums' : 'Specific Art Portfolios'}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat.tab}
                    onClick={() => {
                      onNavigate(cat.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group border border-black/5 hover:border-black/20 p-4 bg-white hover:bg-neutral-50/40 transition-all cursor-pointer flex justify-between items-center text-left"
                  >
                    <div className="space-y-1">
                      <h4 className="font-sans text-xs font-bold tracking-wider text-neutral-900 uppercase font-bold">
                        {lang === 'FR' ? cat.nameFr : cat.nameEn}
                      </h4>
                      <p className="text-[10px] font-sans text-neutral-500 font-light">
                        {lang === 'FR' ? cat.countFr : cat.countEn}
                      </p>
                    </div>
                    <span className="text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-1 print:hidden">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Artists Index & High-Fi Contact coordinates (5/12 width) */}
        <div className="md:col-span-5 space-y-8">
          
          {/* List of active master painters/sculptors */}
          <div className="border border-black/10 p-5 md:p-6 bg-white shadow-sm relative rounded-none print:border-none print:p-0">
            <div className="space-y-6">
              <div className="border-b border-black/10 pb-3 flex items-center justify-between">
                <h3 className="font-serif text-sm sm:text-base font-semibold tracking-wider text-black uppercase flex items-center space-x-2 font-bold">
                  <Eye className="w-4 h-4 text-black print:hidden" />
                  <span>{lang === 'FR' ? 'Index des Artistes Élite' : 'Elite Artists Checklist'}</span>
                </h3>
                <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-widest font-bold">{ARTISTS.length} ARTISTS</span>
              </div>

              <div className="space-y-3 font-sans">
                {ARTISTS.map((artist) => (
                  <div
                    key={artist.id}
                    onClick={() => {
                      onNavigate('ARTISTS');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group flex items-center justify-between p-3 border border-black/5 hover:border-black/20 bg-neutral-50/30 hover:bg-white cursor-pointer transition-all"
                  >
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-black/10 shadow-sm leading-none flex items-center justify-center shrink-0">
                        <img 
                          src={artist.featuredImage} 
                          alt={artist.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-xs font-semibold text-neutral-900 group-hover:text-black uppercase font-bold">
                          {artist.name}
                        </h4>
                        <span className="text-[8px] font-mono tracking-wider text-neutral-400 block uppercase font-bold">
                          {artist.type === 'PAINTER' ? (lang === 'FR' ? 'PEINTRE' : 'PAINTER') : artist.type === 'SCULPTOR' ? (lang === 'FR' ? 'SCULPTEUR' : 'SCULPTOR') : (lang === 'FR' ? 'ART DU VERRE' : 'GLASS ART')}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400 group-hover:text-neutral-700 tracking-wider font-bold uppercase print:hidden">
                      {lang === 'FR' ? 'VOIR' : 'PROFILE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Legal Notices & Printable specifications */}
          <div className="border border-black/10 p-5 md:p-6 bg-neutral-50/20 shadow-sm relative rounded-none print:border-none print:p-0">
            <div className="space-y-6 text-left">
              <div className="border-b border-black/10 pb-3 flex items-center justify-between">
                <h3 className="font-serif text-sm sm:text-base font-semibold tracking-wider text-black uppercase flex items-center space-x-2 font-bold">
                  <Clock className="w-4 h-4 text-black print:hidden" />
                  <span>{lang === 'FR' ? 'Pratique & Local' : 'Hours & Ingress Details'}</span>
                </h3>
              </div>

              <div className="space-y-4 text-[11px] sm:text-xs leading-relaxed text-neutral-600 font-light font-sans">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-black shrink-0 mt-0.5 print:hidden" />
                  <div>
                    <strong className="text-black uppercase font-bold text-[10px] block font-mono">{lang === 'FR' ? 'Adresse de la Galerie' : 'Art Room Address'}</strong>
                    <span>Class Gallery Paris — 9, rue Dauphine, Paris 6e Arrondissement.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-black shrink-0 mt-0.5 print:hidden" />
                  <div>
                    <strong className="text-black uppercase font-bold text-[10px] block font-mono">{lang === 'FR' ? 'Horaires d\'accueil' : 'Regular Hours'}</strong>
                    <span>{lang === 'FR' ? GALLERY_INFO.hoursFr : GALLERY_INFO.hoursEn}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-black shrink-0 mt-0.5 print:hidden" />
                  <div>
                    <strong className="text-black uppercase font-bold text-[10px] block font-mono">TÉLÉPHONE / PORTABLE</strong>
                    <span>{GALLERY_INFO.phone} — {lang === 'FR' ? 'Disponible par WhatsApp' : 'Available on WhatsApp'}</span>
                  </div>
                </div>

                <div className="border-t border-black/10 pt-4 text-center print:hidden">
                  <button 
                    onClick={triggerPrint}
                    className="w-full inline-flex items-center justify-center space-x-2 border border-black px-4 py-2 bg-white hover:bg-neutral-50 text-black text-[10px] font-mono uppercase tracking-widest font-bold cursor-pointer transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{lang === 'FR' ? 'Version papier / PDF' : 'PDF printed sheet'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Exquisite Footer notice for Sitemap Print */}
      <div className="hidden print:block text-center text-[8px] font-mono text-neutral-400 border-t border-black/10 pt-8 mt-12 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} CLASS GALLERY PARIS — 9 RUE DAUPHINE 75006 — DOCUMENT IMPRIMÉ DEPUIS LE PORTAIL</span>
      </div>

    </section>
  );
}
