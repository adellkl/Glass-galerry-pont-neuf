/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TabType, Artwork } from './types';
import { GALLERY_INFO } from './data';
import Header from './components/Header';
import HomePage from './pages/Home/HomePage';
import GalleryPage from './pages/Gallery/GalleryPage';
import ArtistsPage from './pages/Artists/ArtistsPage';
import ExhibitionsPage from './pages/Exhibitions/ExhibitionsPage';
import ContactPage from './pages/Contact/ContactPage';
import MapPage from './pages/Map/MapPage';
import LegalPage from './pages/Legal/LegalPage';
import SitemapPage from './pages/Sitemap/SitemapPage';
import ArtworkModal from './components/ArtworkModal';
import ConnexionModal from './components/ConnexionModal';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Key, Heart, Printer } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('HOME');
  const [lang, setLang] = useState<'FR' | 'EN'>('FR');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const [prefilledSubject, setPrefilledSubject] = useState('');
  const [vipUnlocked, setVipUnlocked] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Always scroll to top when active tab changes (any page redirection or navigation)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Trigger inquiry contact pre-filling
  const handleInquire = (subjectText: string) => {
    setPrefilledSubject(subjectText);
    setActiveTab('CONTACT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pre-filter gallery searches
  const handleFilterJumper = (category: 'PAINTERS' | 'SCULPTORS' | 'GLASS') => {
    setActiveTab(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-neutral-950 selection:text-white">
      
      {/* Dynamic VIP Status Banner */}
      <AnimatePresence>
        {vipUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-100 border-b border-black/10 text-black py-2.5 px-4 text-center text-xs tracking-[0.2em] font-medium uppercase flex items-center justify-center space-x-2 z-50 shadow-sm relative"
          >
            <Sparkles className="w-4 h-4 animate-spin text-black" />
            <span>
              {lang === 'FR' 
                ? '✦ COMPTE COLLECTEUR PRIVÉ ACTIF — ACCÈS VIP RECONNU' 
                : '✦ MEMBERSHIP ACTIVE — VIP COLLECTOR STATUS GRANTED'}
            </span>
            <button
              onClick={() => {
                setVipUnlocked(false);
                if (lang === 'FR') alert('Vous vous êtes déconnecté du salon VIP.');
              }}
              className="ml-4 underline font-mono text-[10px] uppercase font-bold hover:text-neutral-700 cursor-pointer"
            >
              Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Brand Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        isArtworkDetailOpen={!!selectedArtwork}
        navbarCollapsed={navbarCollapsed}
        setNavbarCollapsed={setNavbarCollapsed}
      />

      {/* Core Dynamic Screen Routing */}
      <main className="flex-grow animate-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === 'HOME' && (
              <HomePage 
                setActiveTab={setActiveTab} 
                lang={lang} 
                handleFilterJumper={handleFilterJumper} 
              />
            )}

            {activeTab === 'GALLERY' && (
              <GalleryPage 
                initialFilter="ALL" 
                onSelectArtwork={setSelectedArtwork} 
                lang={lang} 
              />
            )}

            {activeTab === 'ARTISTS' && (
              <ArtistsPage 
                lang={lang}
                onSelectArtwork={setSelectedArtwork}
                onInquire={handleInquire}
                onFilterJumper={handleFilterJumper}
              />
            )}

            {activeTab === 'PAINTERS' && (
              <GalleryPage 
                initialFilter="PAINTERS" 
                onSelectArtwork={setSelectedArtwork} 
                lang={lang} 
              />
            )}

            {activeTab === 'SCULPTORS' && (
              <GalleryPage 
                initialFilter="SCULPTORS" 
                onSelectArtwork={setSelectedArtwork} 
                lang={lang} 
              />
            )}

            {activeTab === 'GLASS' && (
              <GalleryPage 
                initialFilter="GLASS" 
                onSelectArtwork={setSelectedArtwork} 
                lang={lang} 
              />
            )}

            {activeTab === 'EXHIBITIONS' && (
              <ExhibitionsPage 
                onExplore={setActiveTab} 
                lang={lang} 
              />
            )}

            {activeTab === 'CONTACT' && (
              <ContactPage 
                initialSubject={prefilledSubject} 
                lang={lang} 
              />
            )}

            {activeTab === 'MAP' && (
              <MapPage lang={lang} />
            )}

            {activeTab === 'LEGAL' && (
              <LegalPage onNavigate={setActiveTab} lang={lang} />
            )}

            {activeTab === 'SITEMAP' && (
              <SitemapPage onNavigate={setActiveTab} lang={lang} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Exquisite Sourced Footer mirroring structural layout of design HTML */}
      <footer className="bg-neutral-50 border-t border-black/10 py-12 px-4 sm:px-8 text-neutral-600 text-xs text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Identity column (4/12) */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-serif text-lg font-light text-black tracking-widest uppercase">
              {GALLERY_INFO.name}
            </div>
            <p className="font-sans text-[11px] text-neutral-500 leading-relaxed font-light">
              {lang === 'FR'
                ? 'Une adresse emblématique rive gauche, gardienne de la sculpture de fonderie classique et de l\'avant-garde verrière et abstraite.'
                : 'An iconic Left Bank destination dedicated to physical art foundry sculpture, innovative glassworks, and contemporary abstraction.'}
            </p>
            <div className="pt-2 flex flex-col space-y-1 text-[11px] font-mono">
              <span className="text-black font-semibold uppercase tracking-wider">{GALLERY_INFO.space}</span>
              <span className="opacity-85">{GALLERY_INFO.address}</span>
            </div>
          </div>

          {/* Business details short view (4/12) */}
          <div className="md:col-span-4 col-span-1 space-y-3">
            <div className="text-[10px] font-mono tracking-widest text-black uppercase font-bold">
              {lang === 'FR' ? 'CONTACT & HORAIRES' : 'CONTACTS & VISIT'}
            </div>
            <div className="font-sans text-[11px] leading-relaxed space-y-2">
              <p>
                <strong>{lang === 'FR' ? 'Horaires : ' : 'Hours: '}</strong> <br />
                {lang === 'FR' ? GALLERY_INFO.hoursFr : GALLERY_INFO.hoursEn}
              </p>
              <p>
                <strong>{lang === 'FR' ? 'Directeur : ' : 'Director: '}</strong> {GALLERY_INFO.owner} <br />
                <strong>{lang === 'FR' ? 'WhatsApp / Portable : ' : 'Ph / WhatsApp: '}</strong> <a href={`https://wa.me/${GALLERY_INFO.whatsapp}`} className="text-black hover:underline transition-colors">{GALLERY_INFO.phone}</a>
              </p>
            </div>
          </div>

          {/* Quick legal jump list and Connexion (4/12) */}
          <div className="md:col-span-4 col-span-1 space-y-4">
            <div className="text-[10px] font-mono tracking-widest text-black uppercase font-bold">
              {lang === 'FR' ? 'ACCÈS RAPIDE' : 'QUICK NAVIGATION'}
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-wider">
              <button
                onClick={() => { setActiveTab('LEGAL'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-black transition-colors cursor-pointer"
                id="footer-btn-legal"
              >
                {lang === 'FR' ? 'Mentions Légales' : 'Legal Information'}
              </button>
              <span className="text-black/10">|</span>
              <button
                onClick={() => { window.print(); }}
                className="hover:text-black transition-colors flex items-center cursor-pointer"
                id="footer-btn-print"
              >
                <Printer className="w-3 h-3 mr-1" />
                <span>{lang === 'FR' ? 'Version Imprimable' : 'Printable'}</span>
              </button>
              <span className="text-black/10">|</span>
              <button
                onClick={() => { setActiveTab('SITEMAP'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-black transition-colors cursor-pointer"
                id="footer-btn-sitemap"
              >
                {lang === 'FR' ? 'Plan du Site' : 'Sitemap'}
              </button>
            </div>

            {/* Connexion Button as requested */}
            <div className="pt-2">
              {!vipUnlocked ? (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="inline-flex items-center space-x-1.5 border border-black/15 bg-white hover:bg-black hover:text-white transition-all py-1.5 px-3 uppercase text-[10px] font-mono tracking-wider text-neutral-700 cursor-pointer"
                  id="footer-connexion-trigger"
                >
                  <Key className="w-3 h-3 text-black animate-pulse" />
                  <span>{lang === 'FR' ? 'Connexion Collectionneur' : 'Collector Login'}</span>
                </button>
              ) : (
                <div className="inline-flex items-center space-x-1.5 bg-neutral-200 text-black border border-black/15 py-1.5 px-3 text-[10px] font-mono uppercase font-semibold">
                  <span>● VIP ACTIVE</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Global base footer copyrights */}
        <div className="max-w-7xl mx-auto border-t border-black/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-neutral-500 text-[10px] font-mono uppercase tracking-widest gap-4">
          <span>© {new Date().getFullYear()} CLASS GALLERY-PARIS. ALL RIGHTS RESERVED.</span>
          <span className="flex items-center">
            {lang === 'FR' ? 'Fait à Paris avec' : 'Curated in Paris with'} <Heart className="w-3 h-3 text-red-500 mx-1 animate-pulse" />
          </span>
        </div>
      </footer>

      {/* Dynamic Full Detail Modal layer */}
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => {
          setSelectedArtwork(null);
          setNavbarCollapsed(false);
        }}
        onInquire={handleInquire}
        lang={lang}
        isNavbarCollapsed={navbarCollapsed}
      />

      {/* Private VIP Access Connector Portal layer */}
      <ConnexionModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        lang={lang}
        onVipAccess={setVipUnlocked}
      />

    </div>
  );
}
