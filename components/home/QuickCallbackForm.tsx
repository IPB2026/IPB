"use client";

import { useState } from 'react';
import { Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { submitQuickCallback } from '@/app/actions/quickCallback';

export function QuickCallbackForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitQuickCallback(name.trim(), phone.trim());
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.message);
      }
    } catch {
      setError('Une erreur est survenue. Appelez-nous au 05 82 95 33 75.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="text-green-800 font-bold text-lg mb-1">Demande envoyée !</p>
            <p className="text-green-700 text-sm">Un expert IPB vous rappelle dans les prochaines heures.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="md:flex md:items-center md:gap-8">
            {/* Texte */}
            <div className="flex-1 mb-5 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Rappel gratuit</span>
              </div>
              <h2 className="text-white text-xl md:text-2xl font-bold mb-1">
                Un expert vous rappelle sous 2h
              </h2>
              <p className="text-slate-400 text-sm">
                Fissures ou humidité ? Décrivez votre situation par téléphone à un spécialiste.
              </p>
            </div>

            {/* Formulaire */}
            <div className="flex-1 max-w-md">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 outline-none text-sm transition-all"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 outline-none text-sm transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    <>
                      <Phone size={16} />
                      Être rappelé gratuitement
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
                {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                <p className="text-slate-500 text-[10px] text-center">
                  Sans engagement • Vos données restent confidentielles
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
