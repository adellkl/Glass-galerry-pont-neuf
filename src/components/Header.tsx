/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TabType } from '../types';
import { Menu, X, Globe, Instagram, ChevronDown } from 'lucide-react';
import { GALLERY_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  lang: 'FR' | 'EN';
  setLang: (lang: 'FR' | 'EN') => void;
  isArtworkDetailOpen?: boolean;
  navbarCollapsed: boolean;
  setNavbarCollapsed: (collapsed: boolean) => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  lang, 
  setLang, 
  isArtworkDetailOpen,
  navbarCollapsed,
  setNavbarCollapsed
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'COLLECTIONS' | 'INFOS' | null>(null);

  // Close dropdowns and set up defaults when artwork detail opens
  useEffect(() => {
    if (isArtworkDetailOpen) {
      setOpenDropdown(null);
      setMobileMenuOpen(false);
    } else {
      setNavbarCollapsed(false);
    }
  }, [isArtworkDetailOpen, setNavbarCollapsed]);

  const handleNavClick = (tab: TabType) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setTimeout(() => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 250);
  };

  // Group definitions for intelligence rendering
  const worksGroup: { labelFr: string; labelEn: string; value: TabType; descFr: string; descEn: string }[] = [
    { labelFr: 'Toutes les Œuvres', labelEn: 'All Artworks', value: 'GALLERY', descFr: 'Le catalogue complet de la galerie', descEn: 'Complete gallery catalog' },
    { labelFr: 'Peintres Contemporains', labelEn: 'Painters Category', value: 'PAINTERS', descFr: 'Expressionnisme et surréalisme', descEn: 'Expressionism & surrealism' },
    { labelFr: 'Sculpteurs sur Bois & Bronze', labelEn: 'Sculptors Category', value: 'SCULPTORS', descFr: 'Monolithes totémiques de taille directe', descEn: 'Direct-carved totemic monoliths' },
    { labelFr: 'Art du Verre Soufflé', labelEn: 'Art Glass Category', value: 'GLASS', descFr: 'Cristal de silice de forte épaisseur', descEn: 'Thick heavy fused optical silica' },
  ];

  const infoGroup: { labelFr: string; labelEn: string; value: TabType; descFr: string; descEn: string }[] = [
    { labelFr: 'Nous Contacter', labelEn: 'Inquire & Contact', value: 'CONTACT', descFr: 'Contacter la galerie ou réserver une œuvre', descEn: 'Inquire about availability & acquisition terms' },
    { labelFr: 'Plan d\'Accès & Infos', labelEn: 'Directions & Map', value: 'MAP', descFr: 'Accès Pont-Neuf, horaires de visite', descEn: 'Access near Pont-Neuf, opening hours' },
    { labelFr: 'Mentions Légales', labelEn: 'Legal Notice', value: 'LEGAL', descFr: 'Crédits, RGPD et mentions éditeurs', descEn: 'Credits, privacy GDPR & publishing notes' },
    { labelFr: 'Plan du Site', labelEn: 'Sitemap Catalog', value: 'SITEMAP', descFr: 'Arborescence du site et fiches imprimables', descEn: 'Site map, visual portfolios, and printed sheets' },
  ];

  // Underline check for the general theme
  const isCollectionsActive = ['GALLERY', 'PAINTERS', 'SCULPTORS', 'GLASS'].includes(activeTab);
  const isInfosActive = ['CONTACT', 'MAP', 'LEGAL', 'SITEMAP'].includes(activeTab);

  return (
    <>
      <motion.header
        className="sticky top-0 z-[110] bg-white/95 backdrop-blur-md border-b border-black/10 py-4 px-4 sm:px-8"
        animate={{ y: navbarCollapsed ? '-100%' : '0%' }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Gallery Identity logo */}
        <button
          onClick={() => handleNavClick('HOME')}
          className="text-left group cursor-pointer"
          id="btn-logo-home"
        >
          <div className="font-serif text-lg sm:text-2xl font-light tracking-widest text-black group-hover:opacity-60 transition-opacity duration-300 uppercase">
            CLASS GALLERY
            <span className="block text-[9px] tracking-widest-xl uppercase mt-0.5 text-neutral-500">PARIS</span>
          </div>
          <div className="font-sans text-[8px] tracking-[0.25em] text-black/40 uppercase mt-0.5">
            {GALLERY_INFO.space}
          </div>
        </button>

        {/* Desktop Navigation Grouped */}
        <nav className="hidden lg:flex items-center space-x-2">
          
          {/* HOME LINK */}
          <button
            onClick={() => handleNavClick('HOME')}
            className={`px-3 py-2 text-xs tracking-widest font-sans font-medium uppercase transition-colors relative cursor-pointer ${
              activeTab === 'HOME' ? 'text-black' : 'text-neutral-500 hover:text-black'
            }`}
            id="nav-home"
          >
            {lang === 'FR' ? 'ACCUEIL' : 'HOME'}
            {activeTab === 'HOME' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-3 right-3 h-[1px] bg-black"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>

          {/* DROPDOWN 1: ŒUVRES & SÉLECTIONS */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setOpenDropdown('COLLECTIONS')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className={`px-3 py-2 flex items-center space-x-1 text-xs tracking-widest font-sans font-medium uppercase transition-colors relative cursor-pointer ${
                isCollectionsActive ? 'text-black' : 'text-neutral-500 hover:text-black'
              }`}
              id="nav-group-collections"
            >
              <span>{lang === 'FR' ? 'COLLECTIONS' : 'ARTWORKS'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 text-neutral-400 ${openDropdown === 'COLLECTIONS' ? 'rotate-180' : ''}`} />
              {isCollectionsActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-3 right-3 h-[1px] bg-black"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            {/* Dropdown Card */}
            <AnimatePresence>
              {openDropdown === 'COLLECTIONS' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute left-[50%] -translate-x-[50%] top-full pt-2 w-72 z-50 pointer-events-auto"
                >
                  <div className="bg-white border border-black/15 shadow-xl p-4 space-y-1.5 rounded-none text-left">
                    <div className="text-[9px] font-mono font-bold tracking-wider text-neutral-400 uppercase border-b border-black/5 pb-1.5 mb-2 px-2">
                      {lang === 'FR' ? 'Explorer l\'inventaire' : 'Browse inventory'}
                    </div>
                    {worksGroup.map(item => (
                      <button
                        key={item.value}
                        onClick={() => handleNavClick(item.value)}
                        className={`w-full text-left px-3 py-2 text-xs transition-all flex flex-col hover:bg-neutral-50 border-l border-transparent ${
                          activeTab === item.value 
                            ? 'border-black bg-neutral-50 text-black font-semibold' 
                            : 'text-neutral-600 hover:text-black'
                        }`}
                      >
                        <span className="font-sans tracking-wide">{lang === 'FR' ? item.labelFr : item.labelEn}</span>
                        <span className="text-[10px] text-neutral-400 font-light mt-0.5">{lang === 'FR' ? item.descFr : item.descEn}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DIRECT LINK: ARTISTS */}
          <button
            onClick={() => handleNavClick('ARTISTS')}
            className={`px-3 py-2 text-xs tracking-widest font-sans font-medium uppercase transition-colors relative cursor-pointer ${
              activeTab === 'ARTISTS' ? 'text-black' : 'text-neutral-500 hover:text-black'
            }`}
            id="nav-artists"
          >
            {lang === 'FR' ? 'ARTISTES' : 'ARTISTS'}
            {activeTab === 'ARTISTS' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-3 right-3 h-[1px] bg-black"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>

          {/* DIRECT LINK: EXHIBITIONS */}
          <button
            onClick={() => handleNavClick('EXHIBITIONS')}
            className={`px-3 py-2 text-xs tracking-widest font-sans font-medium uppercase transition-colors relative cursor-pointer ${
              activeTab === 'EXHIBITIONS' ? 'text-black' : 'text-neutral-500 hover:text-black'
            }`}
            id="nav-exhibitions"
          >
            {lang === 'FR' ? 'EXPOSITIONS' : 'EXHIBITIONS'}
            {activeTab === 'EXHIBITIONS' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-3 right-3 h-[1px] bg-black"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>

          {/* DROPDOWN 2: INFORMATIONS PRATIQUES */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setOpenDropdown('INFOS')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className={`px-3 py-2 flex items-center space-x-1 text-xs tracking-widest font-sans font-medium uppercase transition-colors relative cursor-pointer ${
                isInfosActive ? 'text-black' : 'text-neutral-500 hover:text-black'
              }`}
              id="nav-group-infos"
            >
              <span>{lang === 'FR' ? 'ART GALLERY' : 'VISIT'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-250 text-neutral-400 ${openDropdown === 'INFOS' ? 'rotate-180' : ''}`} />
              {isInfosActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-3 right-3 h-[1px] bg-black"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            {/* Dropdown Card */}
            <AnimatePresence>
              {openDropdown === 'INFOS' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute right-0 top-full pt-2 w-72 z-50 pointer-events-auto"
                >
                  <div className="bg-white border border-black/15 shadow-xl p-4 space-y-1.5 rounded-none text-left">
                    <div className="text-[9px] font-mono font-bold tracking-wider text-neutral-400 uppercase border-b border-black/5 pb-1.5 mb-2 px-2">
                      {lang === 'FR' ? 'Accès & Services' : 'Services & Location'}
                    </div>
                    {infoGroup.map(item => (
                      <button
                        key={item.value}
                        onClick={() => handleNavClick(item.value)}
                        className={`w-full text-left px-3 py-2 text-xs transition-all flex flex-col hover:bg-neutral-50 border-l border-transparent ${
                          activeTab === item.value 
                            ? 'border-black bg-neutral-50 text-black font-semibold' 
                            : 'text-neutral-600 hover:text-black'
                        }`}
                      >
                        <span className="font-sans tracking-wide">{lang === 'FR' ? item.labelFr : item.labelEn}</span>
                        <span className="text-[10px] text-neutral-400 font-light mt-0.5">{lang === 'FR' ? item.descFr : item.descEn}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </nav>

        {/* Global Controls & Socials */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Instagram shortcut */}
          <a
            href={`https://instagram.com/${GALLERY_INFO.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-black transition-colors p-1"
            title="Instagram Class Gallery Paris"
            id="social-instagram-header"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Elegant Language Selector */}
          <div className="flex items-center border border-black/10 rounded-full px-2.5 py-1 text-[10px] tracking-wider text-neutral-500">
            <Globe className="w-3 h-3 mr-1.5 text-neutral-800" />
            <button
              onClick={() => setLang('FR')}
              className={`hover:text-black transition-colors mr-1 font-semibold cursor-pointer ${
                lang === 'FR' ? 'text-black font-bold' : ''
              }`}
            >
              FR
            </button>
            <span className="text-black/10">|</span>
            <button
              onClick={() => setLang('EN')}
              className={`hover:text-black transition-colors ml-1 font-semibold cursor-pointer ${
                lang === 'EN' ? 'text-black font-bold' : ''
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile controls & toggle */}
        <div className="flex items-center lg:hidden space-x-3">
          {/* Mob language toggle */}
          <button
            onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')}
            className="flex items-center space-x-1 text-[10px] tracking-wider border border-black/10 rounded-full py-1.5 px-3 text-neutral-700 bg-white hover:text-black cursor-pointer transition-colors"
            id="mobile-lang-toggle"
          >
            <Globe className="w-3 animate-none" />
            <span className="font-mono font-bold">{lang}</span>
          </button>

          {/* Simple clean interactive spring burger trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-black hover:text-neutral-600 focus:outline-none cursor-pointer relative z-[120]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            id="mobile-menu-burger"
          >
            <div className="w-5 h-3.5 flex flex-col justify-between relative">
              <motion.span
                className="block h-0.5 w-5 bg-black"
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              />
              <motion.span
                className="block h-0.5 w-5 bg-black"
                animate={mobileMenuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block h-0.5 w-5 bg-black"
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Modern, Immersive Slide-Down Mobile Menu Dropdown Overlay (positioned below header) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-[77px] md:top-[81px] z-[100] overflow-y-auto bg-white/98 backdrop-blur-md border-t border-black/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Scrolling navigation content with elegant layout list */}
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.04,
                    delayChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
              className="flex-grow flex flex-col space-y-8 py-8 px-6 sm:px-12 text-left justify-center max-w-xl mx-auto w-full"
            >
              
              {/* PRIMARY LINKS SECTION */}
              <div className="space-y-1">
                <div className="text-[9px] font-mono font-bold tracking-widest text-neutral-400 uppercase pb-2 border-b border-black/5 mb-3">
                  {lang === 'FR' ? 'SECTIONS DE LA GALERIE' : 'GALLERY NAVIGATION'}
                </div>

                <motion.div variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}>
                  <button
                    onClick={() => handleNavClick('HOME')}
                    className={`group w-full text-left py-2 px-1 text-sm font-sans tracking-widest uppercase transition-all flex items-center justify-between cursor-pointer ${
                      activeTab === 'HOME' ? 'text-black font-extrabold pl-3 border-l-2 border-black' : 'text-neutral-500 hover:text-black font-light'
                    }`}
                  >
                    <span className="flex items-center space-x-3.5">
                      <span className="font-mono text-[9px] text-neutral-400 font-bold">01 —</span>
                      <span>{lang === 'FR' ? 'ACCUEIL / HOME' : 'HOME / ACCUEIL'}</span>
                    </span>
                    <span className="text-neutral-300">→</span>
                  </button>
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}>
                  <button
                    onClick={() => handleNavClick('ARTISTS')}
                    className={`group w-full text-left py-2 px-1 text-sm font-sans tracking-widest uppercase transition-all flex items-center justify-between cursor-pointer ${
                      activeTab === 'ARTISTS' ? 'text-black font-extrabold pl-3 border-l-2 border-black' : 'text-neutral-500 hover:text-black font-light'
                    }`}
                  >
                    <span className="flex items-center space-x-3.5">
                      <span className="font-mono text-[9px] text-neutral-400 font-bold">02 —</span>
                      <span>{lang === 'FR' ? 'NOS ARTISTES' : 'OUR ARTISTS'}</span>
                    </span>
                    <span className="text-neutral-300">→</span>
                  </button>
                </motion.div>

                <motion.div variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}>
                  <button
                    onClick={() => handleNavClick('EXHIBITIONS')}
                    className={`group w-full text-left py-2 px-1 text-sm font-sans tracking-widest uppercase transition-all flex items-center justify-between cursor-pointer ${
                      activeTab === 'EXHIBITIONS' ? 'text-black font-extrabold pl-3 border-l-2 border-black' : 'text-neutral-500 hover:text-black font-light'
                    }`}
                  >
                    <span className="flex items-center space-x-3.5">
                      <span className="font-mono text-[9px] text-neutral-400 font-bold">03 —</span>
                      <span>{lang === 'FR' ? 'EXPOSITIONS & PRIX' : 'EXHIBITIONS & PRIZES'}</span>
                    </span>
                    <span className="text-neutral-300">→</span>
                  </button>
                </motion.div>
              </div>

              {/* GROUP 1: WORKS BY SPECIFIC CATEGORY */}
              <div className="space-y-1">
                <div className="text-[9px] font-mono font-bold tracking-widest text-neutral-400 uppercase pb-2 border-b border-black/5 mb-2">
                  {lang === 'FR' ? 'ŒUVRES PAR JALON' : 'PORTFOLIOS & MEDIUMS'}
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {worksGroup.map((item) => (
                    <motion.div key={item.value} variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}>
                      <button
                        onClick={() => handleNavClick(item.value)}
                        className={`w-full text-left py-1.5 px-3 text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-between border-l-2 ${
                          activeTab === item.value 
                            ? 'text-black font-bold border-black bg-neutral-50' 
                            : 'text-neutral-500 hover:text-black border-transparent hover:bg-neutral-50/50'
                        }`}
                      >
                        <span>✦ {lang === 'FR' ? item.labelFr : item.labelEn}</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* GROUP 2: VISITING & LEGAL DETAILS */}
              <div className="space-y-1">
                <div className="text-[9px] font-mono font-bold tracking-widest text-neutral-400 uppercase pb-2 border-b border-black/5 mb-2">
                  {lang === 'FR' ? 'PRATIQUE & CONTACT' : 'VISITOR INFORMATION'}
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {infoGroup.map((item) => (
                    <motion.div key={item.value} variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}>
                      <button
                        onClick={() => handleNavClick(item.value)}
                        className={`w-full text-left py-1.5 px-3 text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-between border-l-2 ${
                          activeTab === item.value 
                            ? 'text-black font-bold border-black bg-neutral-50' 
                            : 'text-neutral-500 hover:text-black border-transparent hover:bg-neutral-50/50'
                        }`}
                      >
                        <span>• {lang === 'FR' ? item.labelFr : item.labelEn}</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>

            {/* Premium, elegant bottom footer */}
            <div className="bg-neutral-50 border-t border-black/10 py-6 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-left shrink-0">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[9px] text-neutral-400 font-mono tracking-widest block uppercase font-bold">
                  Class Gallery — ART GALLERY PONT-NEUF
                </span>
                <span className="text-[10px] text-neutral-600 block leading-relaxed font-light">
                  9 rue Dauphine, Paris 6 — +33 (0) 6 16 92 57 53
                </span>
              </div>
              
              <a
                href={`https://instagram.com/${GALLERY_INFO.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-xs text-neutral-600 hover:text-black transition-colors border border-black/10 rounded-full py-1.5 px-3 bg-white"
              >
                <Instagram className="w-4 h-4 text-black shrink-0" />
                <span className="text-[10px] tracking-wider font-mono font-bold">@{GALLERY_INFO.instagram}</span>
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>

    {/* Interactive Lamp-style Pull-Cord for Desktop when Artwork detail is open */}
    <AnimatePresence>
      {isArtworkDetailOpen && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 185, damping: 15 }}
          className="fixed right-16 top-0 z-[160] hidden md:flex flex-col items-center cursor-pointer select-none group"
          onClick={() => setNavbarCollapsed(!navbarCollapsed)}
          title={navbarCollapsed 
            ? (lang === 'FR' ? 'Tirer pour afficher la navigation' : 'Pull to show navigation') 
            : (lang === 'FR' ? 'Tirer pour masquer la navigation' : 'Pull to hide navigation')}
        >
          {/* The string line */}
          <motion.div 
            className="w-[1.5px] bg-neutral-400 group-hover:bg-neutral-600 transition-colors"
            animate={{ 
              height: navbarCollapsed ? 45 : 110 
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          />
          
          {/* The gold/brass heavy lamp string pull-bob/bead */}
          <motion.div 
            className="w-3.5 h-7 rounded-sm shadow-md border bg-neutral-900 border-neutral-700 flex flex-col justify-between p-1 items-center hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, #262626 0%, #171717 100%)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)'
            }}
            animate={{
              y: [0, 4, -2, 0] // subtle cute elastic bounce on change
            }}
            key={navbarCollapsed ? 'collapsed' : 'expanded'}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Little gold metallic groove detail at the bottom */}
            <div className="w-1.5 h-1 px-1 bg-gradient-to-r from-neutral-400 to-neutral-200 rounded-full" />
            <div className="w-1 h-3/5" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
