/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GALLERY_INFO } from '../../data';
import { ShieldCheck, Printer, Network, Scale, Copyright, Heart } from 'lucide-react';
import { TabType } from '../../types';

interface LegalPageProps {
  onNavigate: (tab: TabType) => void;
  lang: 'FR' | 'EN';
}

export default function LegalPage({ onNavigate, lang }: LegalPageProps) {
  
  const handlePrint = () => {
    window.print();
  };

  const mapSitemap = [
    { labelFr: 'Accueil & Actualités', labelEn: 'Home & Announcement', tab: 'HOME' },
    { labelFr: 'Collection Complète (Galerie)', labelEn: 'Full Collection Gallery', tab: 'GALLERY' },
    { labelFr: 'Espace Peintures (IRINI & GAÏDA)', labelEn: 'Painters Showcase (IRINI & GAÏDA)', tab: 'PAINTERS' },
    { labelFr: 'Espace Sculptures (Rayou & Couvert)', labelEn: 'Sculptors Showcase (Rayou & Couvert)', tab: 'SCULPTORS' },
    { labelFr: 'Art du Verre Soufflé', labelEn: 'Contemporary Glass Art', tab: 'GLASS' },
    { labelFr: 'Actualités & Expositions temporaires', labelEn: 'Agenda & Ephemeral Shows', tab: 'EXHIBITIONS' },
    { labelFr: 'Formulaire de Vente & Accès WhatsApp', labelEn: 'Sales Inquiries & Contacts', tab: 'CONTACT' },
    { labelFr: 'Plan d\'accès Métro Pont-Neuf', labelEn: 'Interactive Map & Access', tab: 'MAP' },
    { labelFr: 'Plan du site (Guide global)', labelEn: 'Sitemap Guide', tab: 'SITEMAP' },
    { labelFr: 'Mentions Légales', labelEn: 'Legal Information', tab: 'LEGAL' }
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-8 max-w-4xl mx-auto overflow-hidden text-left font-sans">
      
      {/* Editorial Header */}
      <div className="space-y-3 mb-16 pb-6 border-b border-black/10">
        <div className="flex items-center space-x-2">
          <span className="w-8 h-[1px] bg-black" />
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.25em] font-bold">
            {lang === 'FR' ? 'Transparence & Mentions' : 'Regulatory & Governance'}
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-black tracking-widest uppercase">
          {lang === 'FR' ? 'Mentions Légales' : 'Legal Information'}
        </h2>
        
        {/* Interactive Utility Options toolbar */}
        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-neutral-50 border border-black/10 hover:border-black text-neutral-700 hover:text-black transition-colors py-2 px-4 text-[10px] font-mono uppercase tracking-widest cursor-pointer font-bold"
            id="btn-print-legal"
          >
            <Printer className="w-3.5 h-3.5 text-black" />
            <span>{lang === 'FR' ? 'Version printable / imprimer' : 'Printable Version / Print'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-10 font-sans">
        
        {/* Main Brand and Representive Details */}
        <div className="bg-neutral-50/50 p-8 border border-black/10 space-y-6">
          <h3 className="font-serif text-lg tracking-widest text-black uppercase font-bold border-b border-black/10 pb-3">
            CLASS GALLERY-PARIS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider font-bold block">
                CONTACT DIRECT
              </span>
              <p className="text-neutral-800 font-light">
                <strong>Téléphone :</strong> <br />
                <a href="tel:+33616925753" className="hover:underline text-black font-semibold">+33 (0) 6 16 92 57 53</a>
              </p>
              <p className="text-neutral-800 font-light">
                <strong>Représentant légal :</strong> <br />
                <span className="text-black font-semibold text-base font-serif">Marc MNEIMNE</span>
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider font-bold block">
                IMMATRICULATION & PROPRIÉTÉ
              </span>
              <p className="text-neutral-800 font-light leading-relaxed">
                <strong>Immatriculation Siège Social :</strong> <br />
                Immatriculation au Registre du commerce et des sociétés de Nanterre.
              </p>
              <p className="text-neutral-800 font-light leading-relaxed">
                Le site <a href="https://www.classgalleryparis.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-black font-semibold">www.classgalleryparis.com</a> est la propriété de la société <strong>A.C.G.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Legal and Intellectual Property Text in full verbatim */}
        <div className="space-y-6 border border-black/10 p-8 bg-white">
          <h3 className="font-serif text-[15px] sm:text-lg tracking-widest text-black uppercase font-bold border-b border-black/10 pb-3 flex items-center">
            <Copyright className="w-4 h-4 text-black mr-2 shrink-0" />
            PROPRIÉTÉ INTELLECTUELLE & REPRODUCTION
          </h3>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed font-light pl-1 font-sans">
            <p className="border-l-2 border-slate-900 pl-4 py-1 bg-neutral-50 font-medium text-neutral-900">
              Toute reproduction du site ou d’œuvres qui s’y trouve est impérativement interdite.
            </p>

            <p>
              Tout utilisateur ayant accès à la présente page reconnaît que les œuvres présentes ou représentées sur celle-ci sont protégées par les dispositions du Code de la propriété intellectuelle concernant les œuvres de l’esprit.
            </p>

            <p>
              Dans ces conditions, la reproduction des dites œuvres est spécifiquement autorisée sous la condition impérative du strict respect des dispositions du Code de la propriété intellectuelle.
            </p>

            <p>
              Chaque utilisateur s’interdit dès lors de prendre l’initiative de toute utilisation et/ou de toute manipulation de quelque nature de l’image que ce soit susceptible de porter atteinte aux droits des auteurs sur leur œuvre et au respect de celle-ci.
            </p>

            <p className="bg-neutral-50 p-4 border-l border-neutral-900 text-neutral-800">
              CLASS GALLERY-PARIS et les auteurs des œuvres reproduites se réservent le droit de mettre en œuvre toute mesure y compris judiciaire qui se révèlerait nécessaire afin de faire respecter leurs droits notamment en cas de compilation, de décompilation, de représentation et/ou de reproduction partielle, illicite ou frauduleuse et de manière générale lors de toute atteinte qui serait portée à l’un quelconque des elements de l’œuvre.
            </p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch border-t border-black/10 pt-10 mt-12">
        
        {/* Sitemap plan du site */}
        <div className="space-y-4 text-left">
          <h3 className="font-serif text-sm tracking-[0.2em] text-black uppercase font-bold flex items-center border-b border-black/5 pb-2">
            <Network className="w-4 h-4 text-black mr-2 shrink-0" />
            {lang === 'FR' ? 'Plan du site' : 'Sitemap'}
          </h3>
          <div className="flex flex-col space-y-2">
            {mapSitemap.map((node) => (
              <button
                key={node.tab}
                onClick={() => onNavigate(node.tab as TabType)}
                className="text-left text-xs font-mono text-neutral-600 hover:text-black hover:border-black transition-colors py-1.5 pl-1 border-l border-black/15 flex items-center justify-between uppercase tracking-wider cursor-pointer font-bold"
                id={`sitemap-node-${node.tab.toLowerCase()}`}
              >
                <span>{lang === 'FR' ? node.labelFr : node.labelEn}</span>
                <span className="text-[9px] text-neutral-400">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Protection information */}
        <div className="bg-neutral-50/50 border border-black/10 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2 text-left">
            <h4 className="font-sans font-bold text-xs text-black uppercase tracking-wider flex items-center">
              <ShieldCheck className="w-4 h-4 text-neutral-800 mr-1.5 shrink-0" />
              CONFIDENTIALITÉ & GARANTIES
            </h4>
            <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed">
              Le site respecte scrupuleusement la vie privée des collectionneurs. Les coordonnées transmises lors des demandes d'acquisition restent strictement confidentielles et ne sont jamais communiquées à des intervenants tiers.
            </p>
          </div>
          <div className="pt-4 border-t border-black/10 text-[10px] font-mono text-neutral-500 uppercase flex items-center justify-between font-bold">
            <span>© {new Date().getFullYear()} CLASS GALLERY-PARIS</span>
            <span className="flex items-center">
              PARIS <Heart className="w-3 h-3 text-neutral-700 ml-1.5 fill-current" />
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
