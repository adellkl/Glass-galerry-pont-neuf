// Artwork metadata inspection sheet in Artistic Flair light theme

import { Artwork } from '../types';
import { X, MessageCircle, Mail, Share2, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { GALLERY_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onInquire: (subject: string) => void;
  lang: 'FR' | 'EN';
  isNavbarCollapsed?: boolean;
}

export default function ArtworkModal({ artwork, onClose, onInquire, lang, isNavbarCollapsed }: ArtworkModalProps) {
  const [copied, setCopied] = useState(false);

  // Block background scrolling when artwork is opened
  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [artwork]);

  // Prefilled WhatsApp message
  const waMessage = artwork
    ? (lang === 'FR'
      ? `Bonjour Marc, je suis très intéressé(e) par l'œuvre "${artwork.title}" de l'artiste ${artwork.artistName}. Est-elle toujours disponible à l'acquisition ?`
      : `Hello Marc, I am very interested in the artwork "${artwork.title}" by ${artwork.artistName}. Is it currently available for purchase?`)
    : '';
  const waUrl = artwork ? `https://wa.me/${GALLERY_INFO.whatsapp}?text=${encodeURIComponent(waMessage)}` : '';

  // Handle fine sharing link copying
  const handleShare = () => {
    if (!artwork) return;
    const textToCopy = `${GALLERY_INFO.name}: "${artwork.title}" - ${artwork.artistName} (${artwork.dimensions}, ${artwork.year})`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // Fallback
    });
  };

  return (
    <AnimatePresence>
      {artwork && (
        <div className={`fixed inset-y-0 inset-x-0 z-[100] flex items-center justify-center p-4 overflow-hidden transition-all duration-300 ${isNavbarCollapsed ? 'mt-0' : 'mt-[77px] md:mt-[81px]'}`}>
          {/* Backdrop overlay - sits below the navbar unless collapsed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 bg-black/55 backdrop-blur-sm cursor-pointer z-0 transition-all duration-300 ${isNavbarCollapsed ? 'mt-0' : 'mt-[77px] md:mt-[81px]'}`}
          />

          {/* Modal Core paper card - centered, responsive max-height, absolutely no page or double scrollbars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative bg-white border border-black/10 w-full max-w-4xl max-h-[80vh] md:max-h-[85vh] rounded-none shadow-2xl flex flex-col md:flex-row z-10 text-left overflow-hidden pointer-events-auto"
          >
          {/* Close trigger button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-black text-black hover:text-white border border-black/15 hover:border-black transition-all rounded-full cursor-pointer shadow-sm"
            id="artwork-modal-close-bracket"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left panel: High-Fidelity Artwork Presentation Frame */}
          <div className="w-full h-[32vh] sm:h-[38vh] md:h-full md:w-1/2 relative bg-neutral-50/80 flex items-center justify-center p-4 sm:p-6 select-none border-b md:border-b-0 md:border-r border-black/10">
            <img
              src={artwork.image}
              alt={artwork.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain max-h-full drop-shadow-md transition-all duration-700 hover:scale-[1.01]"
            />
            {/* Ambient dimensions tag */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 border border-black/10 text-[9px] font-mono text-neutral-800 font-bold tracking-widest uppercase shadow-sm">
              {artwork.dimensions}
            </div>
          </div>

          {/* Right panel: Meta specs, and actions with elegant custom overflow handling if viewport is tight */}
          <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-between bg-white self-stretch overflow-y-auto">
            <div className="space-y-4">
              
              {/* Category tag */}
              <div className="flex items-center space-x-2">
                <span className="bg-neutral-100 text-neutral-800 text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest">
                  {artwork.category === 'PAINTERS' 
                    ? (lang === 'FR' ? 'Peinture Unique' : 'Unique Canvas Painting') 
                    : artwork.category === 'SCULPTORS' 
                    ? (lang === 'FR' ? 'Sculpture Haute Fonderie' : 'Art Foundry Sculpture')
                    : (lang === 'FR' ? 'Pièce de Verre soufflé' : 'Blown Glass Art')}
                </span>
                {artwork.isOnlineOnly && (
                  <span className="bg-red-50 text-red-700 text-[8px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest border border-red-200">
                    {lang === 'FR' ? 'Vente en ligne exclusive' : 'Exclusive Online Order'}
                  </span>
                )}
              </div>

              {/* Title & Artist name */}
              <div className="space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl tracking-widest text-black leading-tight uppercase font-light">
                  {artwork.title}
                </h3>
                <p className="font-sans text-sm sm:text-base font-semibold text-neutral-800 tracking-wider">
                  {artwork.artistName}
                </p>
              </div>

              {/* Specs detailed table */}
              <div className="bg-neutral-50 border border-black/10 p-4.5 space-y-2.5">
                <div className="grid grid-cols-3 text-xs border-b border-black/5 pb-2">
                  <span className="text-neutral-500 font-mono tracking-wider font-semibold">{lang === 'FR' ? 'Artiste :' : 'Artist:'}</span>
                  <span className="text-neutral-900 font-serif italic font-bold uppercase text-left col-span-2 pl-2">{artwork.artistName}</span>
                </div>
                <div className="grid grid-cols-3 text-xs border-b border-black/5 pb-2">
                  <span className="text-neutral-500 font-mono tracking-wider font-semibold">{lang === 'FR' ? 'Matière :' : 'Material:'}</span>
                  <span className="text-neutral-900 font-sans font-semibold text-left col-span-2 pl-2">{artwork.material}</span>
                </div>
                <div className="grid grid-cols-3 text-xs border-b border-black/5 pb-2">
                  <span className="text-neutral-500 font-mono tracking-wider font-semibold">{lang === 'FR' ? 'Technique :' : 'Medium:'}</span>
                  <span className="text-neutral-900 font-sans font-semibold text-left col-span-2 pl-2">{artwork.medium}</span>
                </div>
                <div className="grid grid-cols-3 text-xs border-b border-black/5 pb-2">
                  <span className="text-neutral-500 font-mono tracking-wider font-semibold">{lang === 'FR' ? 'Dimensions :' : 'Dimensions:'}</span>
                  <span className="text-neutral-900 font-mono text-left col-span-2 pl-2">{artwork.dimensions}</span>
                </div>
                <div className="grid grid-cols-3 text-xs border-b border-black/5 pb-2">
                  <span className="text-neutral-500 font-mono tracking-wider font-semibold">{lang === 'FR' ? 'Année :' : 'Year:'}</span>
                  <span className="text-neutral-900 font-mono text-left col-span-2 pl-2">{artwork.year}</span>
                </div>
                <div className="grid grid-cols-3 text-xs">
                  <span className="text-neutral-500 font-mono tracking-wider font-semibold">{lang === 'FR' ? 'Statut :' : 'Availability:'}</span>
                  <span className="text-left col-span-2 pl-2">
                    {artwork.isOnlineOnly ? (
                      <span className="text-neutral-800 font-sans text-xs flex items-center font-semibold">
                        <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full mr-1.5" />
                        {lang === 'FR' ? 'Disponible en ligne' : 'Available online'}
                      </span>
                    ) : (
                      <span className="text-emerald-800 font-sans text-xs flex items-center font-semibold">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-1.5" />
                        {lang === 'FR' ? 'Exposé à la galerie Pont-Neuf' : 'Exhibited at Pont-Neuf room'}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Complete artistic description */}
              <div className="pt-2 font-display">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 block uppercase mb-1.5 font-bold">
                  {lang === 'FR' ? 'NOTE DE L\'ARTISTE ET CONTEXTE :' : 'ARTIST STATEMENT & HISTORY :'}
                </span>
                <p className="text-xs text-neutral-700 leading-relaxed font-sans font-light">
                  {lang === 'FR' ? artwork.descriptionFr : artwork.descriptionEn}
                </p>
              </div>

            </div>

            {/* Action buttons stack */}
            <div className="pt-4 border-t border-black/10 space-y-3">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Immediate WhatsApp chat inquiry with Marc */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-4 text-xs font-mono tracking-wide uppercase transition-colors"
                  id={`wa-acquire-btn-${artwork.id}`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>WhatsApp Marc</span>
                </a>

                {/* Email Inquiry form jumper */}
                <button
                  onClick={() => {
                    onInquire(artwork.title);
                    onClose();
                  }}
                  className="flex items-center justify-center bg-black text-white hover:bg-neutral-800 font-semibold py-3 px-4 text-xs font-mono tracking-wide uppercase transition-colors cursor-pointer animate-none"
                  id={`email-acquire-btn-${artwork.id}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{lang === 'FR' ? 'Demander par Mail' : 'Email Inquiry'}</span>
                </button>
              </div>

              {/* Miscellaneous link actions */}
              <div className="flex items-center justify-between pt-1 font-mono">
                {/* Print/Copy specs shortcut for collectors */}
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-1.5 text-[10px] tracking-wider text-neutral-500 hover:text-black transition-colors cursor-pointer font-bold"
                  id="btn-copy-specs-artwork"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-black" />
                      <span className="text-black uppercase">{lang === 'FR' ? 'Copié !' : 'Copied to clipboard !'}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{lang === 'FR' ? 'Partager les détails' : 'Share description specs'}</span>
                    </>
                  )}
                </button>

                <span className="text-[9px] text-neutral-500 font-bold">CLASS GALLERY PARIS</span>
              </div>

            </div>
          </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
