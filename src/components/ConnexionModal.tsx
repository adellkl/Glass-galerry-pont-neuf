// Private Collector Room login gate in Artistic Flair light theme

import React, { useState, FormEvent } from 'react';
import { Unlock, User, Key, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_INFO } from '../data';

interface ConnexionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'FR' | 'EN';
  onVipAccess: (isVip: boolean) => void;
}

export default function ConnexionModal({ isOpen, onClose, lang, onVipAccess }: ConnexionModalProps) {
  const [accessCode, setAccessCode] = useState('');
  const [collectorName, setCollectorName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!accessCode) return;

    // Elegant zip code of Paris 6e (75006), or simple 123456 code
    if (accessCode.trim() === '75006' || accessCode.trim() === '1234') {
      setSuccess(true);
      setErrorMsg('');
      setTimeout(() => {
        onVipAccess(true);
        onClose();
        setSuccess(false);
        setAccessCode('');
        setCollectorName('');
      }, 2000);
    } else {
      setErrorMsg(
        lang === 'FR' 
          ? 'Code incorrect. Indice : Utilisez "75006" (le code postal de la galerie Dauphine !).' 
          : 'Invalid access key. Hint: Use "75006" (the zip code of Dauphine gallery!).'
      );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Dark overlay backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white border border-black/10 w-full max-w-md p-8 z-10 text-left shadow-2xl overflow-hidden font-sans"
        >
          {/* Decorative background accent */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-neutral-100 rounded-full filter blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-500 hover:text-black transition-colors p-1 cursor-pointer font-bold font-mono"
            id="connexion-close-btn"
          >
            ✕
          </button>

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="login-form-view"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Header branding */}
                <div className="text-center space-y-1.5 pt-4">
                  <div className="w-12 h-12 border border-black/20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-2 text-black shadow-sm">
                    <Key className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg tracking-widest text-black uppercase font-bold">
                    {lang === 'FR' ? 'Accès Collectionneur' : 'Collector VIP Room'}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-sans font-light text-neutral-600 leading-relaxed max-w-xs mx-auto">
                    {lang === 'FR' 
                      ? 'Entrez le code d\'accès de membre de la galerie pour débloquer les œuvres exclusives et archives.' 
                      : 'Provide your gallery access key to unlock private curations and exclusive collection archives.'}
                  </p>
                </div>

                {/* Form fields */}
                <form onSubmit={handleLogin} className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                      {lang === 'FR' ? 'Amateur d\'Art (Optionnel)' : 'Collector Name (Optional)'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="M. Marc..."
                        value={collectorName}
                        onChange={(e) => setCollectorName(e.target.value)}
                        className="w-full bg-neutral-50 border border-black/10 px-4 py-3 text-xs text-black placeholder-neutral-400 outline-none focus:border-black transition-colors rounded-none pl-10"
                      />
                      <User className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-neutral-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                      {lang === 'FR' ? 'Code d\'accès Confidentiel *' : 'Access Code *'}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="••••••"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className="w-full bg-neutral-50 border border-black/10 px-4 py-3 text-xs text-black placeholder-neutral-400 outline-none focus:border-black transition-colors rounded-none"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 block font-semibold leading-relaxed">
                      {lang === 'FR' ? 'Indice : Le code postal de notre espace est 75006.' : 'Hint: The zip code of our gallery room is 75006.'}
                    </span>
                  </div>

                  {/* Errors */}
                  {errorMsg && (
                    <div className="flex items-start space-x-2 text-[11px] text-red-800 font-sans bg-red-50 p-3 border border-red-200 shadow-sm font-semibold">
                      <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-700" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submission */}
                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-neutral-800 text-white font-mono py-3.5 text-xs tracking-widest uppercase transition-colors pt-3 cursor-pointer"
                    id="vip-portal-submit-btn"
                  >
                    {lang === 'FR' ? 'Débloquer le Salon VIP' : 'Unlock VIP Access'}
                  </button>
                </form>

                {/* Subtext info */}
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-[10px] font-mono text-neutral-500 font-bold">
                  <span>CLASS GALLERY PARIS</span>
                  <a
                    href={`https://instagram.com/${GALLERY_INFO.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors text-[10px] underline"
                    id="connexion-help-instagram-link"
                  >
                    {lang === 'FR' ? 'Demander un code' : 'Request code'}
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-5"
              >
                <div className="w-14 h-14 bg-neutral-50 border border-black rounded-full flex items-center justify-center mx-auto text-black shadow-sm">
                  <Unlock className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-lg tracking-widest uppercase text-black font-light">
                    {lang === 'FR' ? 'Accès Privé Autorisé' : 'Private Access Granted'}
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans max-w-xs mx-auto font-semibold">
                    {lang === 'FR' 
                      ? `Bienvenue, cher collectionneur ${collectorName ? collectorName : ''}. Le salon VIP Privilège est déverrouillé.`
                      : `Welcome, fellow collector ${collectorName ? collectorName : ''}. The exclusive VIP suite containing custom curations is now open.`}
                  </p>
                </div>
                <div className="w-12 h-[2px] bg-black mx-auto animate-bounce mt-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
