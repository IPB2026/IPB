"use client";

import { useState } from 'react';
import { TopBar } from '@/components/home/TopBar';
import { Navbar } from '@/components/home/Navbar';
import { SmartBackBar } from "@/components/ui/SmartBackBar";
import { Footer } from '@/components/home/Footer';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { CrackSVG } from '@/components/ui/CrackSVG';
import { submitContactForm } from '@/app/actions/contact';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      const result = await submitContactForm(formDataToSend);

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        alert(result.message);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.error(error);
      alert("Une erreur est survenue. Vous pouvez nous appeler au 05 82 95 33 75.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans bg-ipb-cream text-ipb-text antialiased">
      <TopBar />
      <Navbar />
      <SmartBackBar />

      <main id="main-content">
        {/* HERO + FORM (split éditorial) */}
        <section className="bg-ipb-cream">
          <div className="max-w-ipb mx-auto grid lg:grid-cols-[42fr_58fr] gap-12 lg:gap-16 px-6 lg:px-12 pt-16 lg:pt-24 pb-20 lg:pb-28">
            {/* Colonne gauche : informations institut */}
            <RevealOnScroll>
              <Eyebrow>Écrire à l’institut</Eyebrow>
              <h1
                className="font-serif text-ipb-text mb-8"
                style={{
                  fontSize: 'clamp(40px, 4vw, 62px)',
                  lineHeight: 1.06,
                  letterSpacing: '-0.025em',
                  fontWeight: 700,
                }}
              >
                Une question,<br /><em>une réponse posée.</em>
              </h1>

              <p className="text-[15px] leading-[1.9] font-light text-ipb-muted mb-10">
                Notre institut répond à tous les messages sous 24 heures ouvrées. Pour les situations qui demandent un échange de vive voix, le téléphone reste le moyen le plus direct.
              </p>

              <div className="space-y-7">
                {/* Téléphone */}
                <div>
                  <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-2">Téléphone</p>
                  <a
                    href="tel:0582953375"
                    className="block font-serif text-ipb-text hover:text-ipb-orange transition-colors leading-none mb-1"
                    style={{ fontSize: 'clamp(28px, 2.6vw, 36px)', letterSpacing: '-0.02em', fontWeight: 700 }}
                  >
                    05 82 95 33 75
                  </a>
                  <p className="text-[12px] font-light text-ipb-muted leading-[1.7]">
                    Lundi au vendredi · 8h&nbsp;–&nbsp;19h
                  </p>
                </div>

                {/* Adresses */}
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-2">Siège social</p>
                    <p className="font-serif text-ipb-text font-medium text-[16px] mb-1">
                      13 rue du Recteur Dottin
                    </p>
                    <p className="text-[14px] font-light text-ipb-muted">
                      31100 Toulouse — Occitanie
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-2">Bureau IPB Expertise</p>
                    <p className="font-serif text-ipb-text font-medium text-[16px] mb-1">
                      54 avenue Jean Jaurès
                    </p>
                    <p className="text-[14px] font-light text-ipb-muted">
                      31170 Tournefeuille — Occitanie
                    </p>
                  </div>
                </div>

                {/* Zone */}
                <div>
                  <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-2">Zone d'intervention</p>
                  <p className="text-[14px] font-light text-ipb-muted leading-[1.85]">
                    Haute-Garonne (31) · Tarn-et-Garonne (82) · Gers (32) · Tarn (81). 50 communes couvertes en moyenne.
                  </p>
                </div>

                {/* Decoration crack */}
                <div className="pt-4 border-t border-ipb-rule">
                  <div className="flex items-center gap-3 text-[11px] text-ipb-light uppercase tracking-[0.14em]">
                    <CrackSVG variant="mini" />
                    <span>Institut de pathologie du bâtiment · Depuis 2019</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Colonne droite : formulaire */}
            <RevealOnScroll direction="right" delay={0.1}>
              <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-7 lg:p-10">
                <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-6">
                  Formulaire de contact
                </p>

                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 rounded-full border border-ipb-orange flex items-center justify-center mx-auto mb-6">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M5 10L8.5 13.5L15 7" stroke="var(--ipb-orange)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h2 className="font-serif text-ipb-text font-bold text-[24px] leading-tight mb-3">
                      Message reçu.
                    </h2>
                    <p className="text-[14px] leading-[1.85] font-light text-ipb-muted max-w-sm mx-auto">
                      Notre institut vous répond sous 24 heures ouvrées. Si votre demande est urgente, le téléphone reste le moyen le plus direct.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.14em] text-ipb-light font-medium mb-2">
                        Votre nom
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-[13px] border border-ipb-rule rounded-[3px] bg-ipb-white text-ipb-text text-[14px] font-light focus:outline-none focus:border-ipb-orange transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.14em] text-ipb-light font-medium mb-2">
                        Adresse email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-[13px] border border-ipb-rule rounded-[3px] bg-ipb-white text-ipb-text text-[14px] font-light focus:outline-none focus:border-ipb-orange transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-[10px] uppercase tracking-[0.14em] text-ipb-light font-medium mb-2">
                        Sujet
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Fissure sur ma façade, projet d'ouverture de mur, demande d'attestation…"
                        className="w-full px-4 py-[13px] border border-ipb-rule rounded-[3px] bg-ipb-white text-ipb-text text-[14px] font-light placeholder-ipb-light/70 focus:outline-none focus:border-ipb-orange transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.14em] text-ipb-light font-medium mb-2">
                        Votre message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre situation. Vous pouvez préciser la commune, l'âge du bâtiment, les désordres observés…"
                        className="w-full px-4 py-3 border border-ipb-rule rounded-[3px] bg-ipb-white text-ipb-text text-[14px] font-light leading-[1.7] placeholder-ipb-light/70 focus:outline-none focus:border-ipb-orange transition-colors resize-none"
                      />
                    </div>

                    <p className="text-[11px] text-ipb-light leading-[1.6] pt-2">
                      Vos données sont traitées uniquement pour répondre à votre demande. L’institut ne pratique aucune relance commerciale.
                    </p>

                    <MagneticButton type="submit" variant="primary" className="w-full">
                      {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
                    </MagneticButton>
                  </form>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
