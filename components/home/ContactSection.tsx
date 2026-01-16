"use client";

import Link from 'next/link';
import { Phone, MapPin, Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <section className="bg-white border-t border-slate-200 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Colonne gauche : Informations de contact */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 font-bold mb-6 px-4 py-2 rounded-full uppercase text-xs tracking-wider border border-orange-100">
              <MapPin size={14} />
              Zone d'intervention
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Nous intervenons dans un <span className="text-orange-600">rayon de 50 km autour de Toulouse</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Basés à Saubens, nos experts se déplacent rapidement dans toute la région pour diagnostiquer et traiter vos problèmes de fissures et d'humidité.
            </p>

            {/* Coordonnées */}
            <div className="space-y-4">
              <a
                href="tel:0582953375"
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-orange-50 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Téléphone</p>
                  <p className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">05 82 95 33 75</p>
                </div>
              </a>

              <a
                href="mailto:contact@ipb-expertise.fr"
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-orange-50 transition-all group"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Email</p>
                  <p className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">contact@ipb-expertise.fr</p>
                </div>
              </a>
            </div>
          </div>

          {/* Colonne droite : Formulaire de contact */}
          <div>
            {/* Formulaire de contact */}
            <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Contactez-nous</h3>
              <p className="text-slate-600 mb-6">
                Une question ? Un projet ? Nos experts sont à votre écoute pour vous conseiller.
              </p>

              {/* Formulaire simple */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                    Nom & Prénom
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="Décrivez votre problème ou votre demande..."
                  />
                </div>
                <Link
                  href="/contact"
                  className="block w-full bg-orange-600 text-white text-center px-6 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Envoyer le message
                </Link>
                <p className="text-xs text-slate-500 text-center">
                  Ou appelez-nous directement au <a href="tel:0582953375" className="text-orange-600 font-bold hover:underline">05 82 95 33 75</a>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Badge de disponibilité */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-orange-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Disponible 7j/7 pour les urgences</p>
                <p className="text-slate-600 text-sm">Intervention rapide dans un rayon de 50 km autour de Toulouse</p>
              </div>
            </div>
            <Link
              href="/diagnostic"
              className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg whitespace-nowrap"
            >
              Diagnostic gratuit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
