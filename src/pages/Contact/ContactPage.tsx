/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { GALLERY_INFO } from '../../data';
import { Phone, Mail, Instagram, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactPageProps {
  initialSubject?: string;
  lang: 'FR' | 'EN';
}

export default function ContactPage({ initialSubject = '', lang }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: initialSubject || 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: 'general',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <section className="bg-white py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-8 overflow-hidden">

      {/* Editorial Header */}
      <div className="text-left space-y-3 mb-16 border-b border-black/5 pb-6">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-[1px] bg-black" />
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.25em] font-bold">
            {lang === 'FR' ? 'Formulaire de Demande d\'Acquisition' : 'Inquiries & Acquisition Portal'}
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-black tracking-widest uppercase">
          {lang === 'FR' ? 'Contact & Vente' : 'Contact Us'}
        </h2>
        <p className="max-w-2xl text-xs sm:text-sm font-light leading-relaxed text-neutral-600 font-sans">
          {lang === 'FR'
            ? 'Pour toute acquisition d\'œuvre d\'art, estimation, demande concernant les peintures en ligne d\'IRINI ou visite privée, veuillez remplir ce formulaire.'
            : 'For all artwork acquisitions, valuations, inquiries on IRINI\'s online paintings, or private appointments, reach out to our team.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">

        {/* Left Column: Direct Contacts & Marc Mneimné profile (Column 5/12) */}
        <div className="lg:col-span-5 space-y-8 text-left">

          <div className="bg-neutral-50 border border-black/10 p-8 relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-100 rounded-full filter blur-xl pointer-events-none" />

            <div className="space-y-1.5 border-b border-black/10 pb-5">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold">
                {lang === 'FR' ? 'DIRECTION DE LA GALERIE' : 'GALLERY ADMINISTRATION'}
              </span>
              <h3 className="font-serif text-2xl tracking-widest text-black uppercase font-light">
                {GALLERY_INFO.owner}
              </h3>
              <p className="font-serif italic text-xs text-neutral-500">
                {lang === 'FR' ? 'Fondateur & Antiquaire d\'Art' : 'Founder & Fine Art Dealer'}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-neutral-600 leading-relaxed font-sans font-light">
                {lang === 'FR'
                  ? 'La Class Gallery-Paris vous accompagne depuis de nombreuses années dans l\'acquisition de bronzes de créateurs renommés et d\'art contemporain sélectif.'
                  : 'Class Gallery-Paris provides bespoke consulting on bronze acquisitions, marbles, and exclusive abstract paintings for international collections.'}
              </p>

              <div className="space-y-3.5 pt-2">

                {/* Portable direct number */}
                <a
                  href={`tel:${GALLERY_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex items-center space-x-3.5 text-neutral-700 hover:text-black transition-colors py-1 group"
                  id="contact-action-tel"
                >
                  <Phone className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-sans">
                    <span className="text-neutral-500 block text-[9px] font-mono uppercase tracking-widest font-bold">{lang === 'FR' ? 'Téléphone Direct' : 'Direct Line'}</span>
                    <span className="font-sans font-semibold tracking-wide">{GALLERY_INFO.phone}</span>
                  </div>
                </a>

                {/* WhatsApp button and connection */}
                <a
                  href={`https://wa.me/${GALLERY_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3.5 text-neutral-700 hover:text-black transition-colors py-1 group"
                  id="contact-action-whatsapp"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-sans">
                    <span className="text-neutral-500 block text-[9px] font-mono uppercase tracking-widest font-bold">WhatsApp Direct</span>
                    <span className="font-sans font-semibold tracking-wide hover:underline text-emerald-600">
                      +33 (0) 6 16 92 57 53
                    </span>
                  </div>
                </a>

                {/* Instagram Direct Link */}
                <a
                  href={`https://instagram.com/${GALLERY_INFO.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3.5 text-neutral-700 hover:text-black transition-colors py-1 group"
                  id="contact-action-instagram"
                >
                  <Instagram className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-sans">
                    <span className="text-neutral-500 block text-[9px] font-mono uppercase tracking-widest font-bold">Instagram Message</span>
                    <span className="font-sans font-semibold tracking-wide">@{GALLERY_INFO.instagram}</span>
                  </div>
                </a>

                {/* Email direction */}
                <div className="flex items-center space-x-3.5 text-neutral-700 py-1">
                  <Mail className="w-4 h-4 text-black" />
                  <div className="text-xs font-sans">
                    <span className="text-neutral-500 block text-[9px] font-mono uppercase tracking-widest font-bold">Email</span>
                    <span className="font-sans font-semibold">contact@classgalleryparis.com</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-4 border-t border-black/10 space-y-1 text-xs">
              <span className="text-neutral-500 font-mono text-[9px] block uppercase tracking-widest font-bold">ART GALLERY PONT-NEUF</span>
              <span className="text-neutral-700 block font-semibold font-sans">9, RUE DAUPHINE - PARIS 75006</span>
            </div>

          </div>

          {/* Business Hours Sidebar info */}
          <div className="bg-neutral-50 border border-black/10 p-6 text-left text-xs">
            <span className="text-[10px] font-mono tracking-widest text-black block uppercase mb-2 font-bold">
              {lang === 'FR' ? 'HORAIRES DE PONT-NEUF' : 'PONT-NEUF OPENING HOURS'}
            </span>
            <p className="text-neutral-600 leading-relaxed font-sans font-light">
              {lang === 'FR'
                ? 'La galerie physique est ouverte du mardi au samedi de 11h à 19h. Notre portail d\'acquisition pour les peintures d\'IRINI reste actif 24h/24.'
                : 'The physical gallery is open from Tuesday to Saturday, 11 AM to 7 PM. Our online checkout or request desk remains operational 24/7.'}
            </p>
          </div>

        </div>

        {/* Right Column: Interaction Form widget (Column 7/12) */}
        <div className="lg:col-span-7 bg-white border border-black/10 p-8 text-left shadow-sm">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                      {lang === 'FR' ? 'Votre Nom *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-black/10 px-4 py-3.5 text-xs text-black placeholder-neutral-400 outline-none focus:border-black transition-all rounded-none font-sans"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                      {lang === 'FR' ? 'Votre Adresse Email *' : 'Your Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-50 border border-black/10 px-4 py-3.5 text-xs text-black placeholder-neutral-400 outline-none focus:border-black transition-all rounded-none font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Telephone field */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                      {lang === 'FR' ? 'Téléphone' : 'Phone'}
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-50 border border-black/10 px-4 py-3.5 text-xs text-black placeholder-neutral-400 outline-none focus:border-black transition-all rounded-none font-sans"
                    />
                  </div>

                  {/* Interest Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                      {lang === 'FR' ? 'Objet de votre demande' : 'Subject of Interest'}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full bg-neutral-50 border border-black/10 px-4 py-3.5 text-xs text-black outline-none focus:border-black transition-all rounded-none font-semibold uppercase font-mono"
                      >
                        <option value="general">{lang === 'FR' ? 'Demande Générale' : 'General Inquiry'}</option>
                        <option value="visit">{lang === 'FR' ? 'Prise de rendez-vous' : 'Private Visit Scheduling'}</option>
                        <option value="irini">{lang === 'FR' ? 'IRINI - Peintures en ligne' : 'IRINI - Online Paintings'}</option>
                        <option value="rayou">{lang === 'FR' ? 'Dominique RAYOU - Sculptures' : 'Dominique RAYOU - Sculptures'}</option>
                        <option value="couvert">{lang === 'FR' ? 'Serge COUVERT - Bronzes' : 'Serge COUVERT - Bronzes'}</option>
                        <option value="glass">{lang === 'FR' ? 'Jean-Pierre UMBERTO - Verre soufflé' : 'Jean-Pierre UMBERTO - Glass'}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message prose */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                    {lang === 'FR' ? 'Votre Message *' : 'Your Message *'}
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-neutral-50 border border-black/10 px-4 py-3.5 text-xs text-black placeholder-neutral-400 outline-none focus:border-black transition-all rounded-none resize-none font-sans"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full group bg-black hover:bg-neutral-800 text-white font-semibold transition-all duration-300 py-4 text-xs font-mono uppercase tracking-[0.2em] flex items-center justify-center cursor-pointer"
                  id="contact-form-submit-btn"
                >
                  <span>{lang === 'FR' ? 'Envoyer la demande d\'information' : 'Send Inquiry Request'}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="submission-feedback"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-neutral-100 border border-black rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-black" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl tracking-widest uppercase text-black font-light">
                    {lang === 'FR' ? 'Message Transmis' : 'Message Sent'}
                  </h3>
                  <p className="max-w-md mx-auto text-xs text-neutral-600 leading-relaxed font-sans font-light">
                    {lang === 'FR'
                      ? 'Cher collectionneur, votre demande a bien été transmise à Marc Mneimné. Un membre de la galerie vous contactera sous 24 heures.'
                      : 'Dear collector, your inquiry has been forwarded to Marc Mneimné. A gallery representative will verify and correspond under 24 hours.'}
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-black/10 hover:border-black text-black transition-colors text-[10px] tracking-widest font-mono uppercase cursor-pointer font-bold"
                    id="submit-another-btn"
                  >
                    {lang === 'FR' ? 'Envoyer un autre message' : 'New Message'}
                  </button>
                  <a
                    href={`https://wa.me/${GALLERY_INFO.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white transition-colors text-[10px] tracking-widest font-sans font-semibold uppercase flex items-center justify-center"
                    id="submit-success-whatsapp-cta"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-2" />
                    <span>WhatsApp Urgent</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
