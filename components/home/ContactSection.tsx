"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { submitContactForm } from '@/app/actions/contact';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('subject', 'Demande depuis la page d\u2019accueil');
      fd.append('message', formData.phone ? `T\u00E9l\u00E9phone\u00A0: ${formData.phone}\n\n${formData.message}` : formData.message);
      const result = await submitContactForm(fd);
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setErrorMessage(result.message);
      }
    } catch {
      setErrorMessage('Une erreur est survenue. Veuillez r\u00E9essayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.15em] uppercase text-slate-400 mb-4">
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">
              Parlons de votre situation
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              Chaque bâtiment est un cas particulier. Décrivez-nous votre problème — 
              nos experts vous orienteront vers la bonne démarche.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Téléphone</p>
                <a href="tel:0582953375" className="text-xl font-semibold text-slate-900 hover:text-orange-600 transition-colors">
                  05 82 95 33 75
                </a>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:contact@ipb-expertise.fr" className="text-xl font-semibold text-slate-900 hover:text-orange-600 transition-colors">
                  contact@ipb-expertise.fr
                </a>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Adresse</p>
                <p className="text-slate-600">54 avenue Jean Jaurès, 31170 Tournefeuille</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Zone d&apos;intervention</p>
                <p className="text-slate-600">Haute-Garonne (31), Tarn-et-Garonne (82), Gers (32), Tarn (81)</p>
              </div>
            </div>
          </div>

          <div className="bg-[#fafafa] rounded-2xl p-8 md:p-10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                <p className="text-slate-900 font-semibold text-lg mb-1">Message envoyé</p>
                <p className="text-slate-500 text-sm">Nous vous répondrons sous 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Nom</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-[15px] transition-all" placeholder="Votre nom" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-[15px] transition-all" placeholder="votre@email.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">Téléphone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-[15px] transition-all" placeholder="06 12 34 56 78" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                  <textarea id="message" name="message" rows={4} required value={formData.message} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 resize-none text-[15px] transition-all" placeholder="Décrivez votre situation..." />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-semibold text-[15px] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {isSubmitting ? 'Envoi...' : (<>Envoyer <ArrowRight size={16} /></>)}
                </button>
                {errorMessage && <p className="text-sm text-red-500 text-center">{errorMessage}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
