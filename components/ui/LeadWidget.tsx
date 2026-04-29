'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * LeadWidget — widget flottant bottom-right en 3 étapes.
 *
 * Apparaît après 5 secondes de présence sur la page.
 * Stocke un flag dans sessionStorage pour ne pas réapparaître si l'utilisateur
 * l'a fermé pendant la session.
 *
 * Étapes :
 *  1. Quel est votre projet ? → Fissures / Mur porteur / Autre
 *  2. Depuis combien de temps ? → < 6 mois / 6–12 mois / > 1 an / À venir
 *  3. Message personnalisé selon combinaison + 2 CTA
 *
 * Cf. IPB_Design_Handoff.md §9
 */

type Topic = 'fissures' | 'mur-porteur' | 'autre' | null;
type Timing = 'recent' | 'moyen' | 'ancien' | 'projet' | null;

const topicLabels: Record<Exclude<Topic, null>, string> = {
  fissures: 'Diagnostic de fissures',
  'mur-porteur': 'Ouverture de mur porteur',
  autre: 'Autre demande',
};

const timingLabels: Record<Exclude<Timing, null>, string> = {
  recent: 'Moins de 6 mois',
  moyen: '6 à 12 mois',
  ancien: 'Plus d\'un an',
  projet: 'C\'est un projet à venir',
};

function buildMessage(topic: Topic, timing: Timing): string {
  if (topic === 'fissures') {
    if (timing === 'recent') return "Une fissure récente mérite une mesure précise pour suivre son évolution. Notre institut vient sur place avec un fissuromètre.";
    if (timing === 'moyen') return "Une fissure observée depuis plusieurs mois doit être caractérisée : active ou stable, structurelle ou esthétique. Diagnostic recommandé.";
    if (timing === 'ancien') return "Une fissure ancienne reste à surveiller — elle peut s'aggraver après un cycle sécheresse. Notre rapport documente l'état actuel.";
  }
  if (topic === 'mur-porteur') {
    if (timing === 'projet') return "Pour un projet d'ouverture, un calcul technique préalable est indispensable. Notre institut réalise l'étude et les travaux dans la même mission.";
    return "Notre institut étudie la faisabilité, calcule la poutre et exécute les travaux. Tout est pris en charge en interne.";
  }
  return "Notre institut vous répond sous 24 heures pour préciser ce qui est possible et ce qui ne l'est pas.";
}

export function LeadWidget() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [topic, setTopic] = useState<Topic>(null);
  const [timing, setTiming] = useState<Timing>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('ipb-lead-widget-dismissed') === '1') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Délai très court si motion reduced
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ipb-lead-widget-dismissed', '1');
    }
  };

  if (!visible) return null;

  return (
    <div
      className="hidden lg:block fixed lg:bottom-6 lg:right-6 z-40 w-[290px]"
      style={{
        animation: 'slideUpFade 0.4s cubic-bezier(.16,1,.3,1) both',
      }}
    >
      <style jsx>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="bg-ipb-white border border-ipb-rule rounded-[8px] shadow-[0_20px_64px_rgba(11,24,38,0.14)] overflow-hidden">
        {/* Header */}
        <div className="bg-ipb-navy text-white px-5 py-3.5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/40 font-medium">
              Étape {step} sur 3
            </p>
            <p className="font-serif text-[14px] font-medium leading-tight mt-0.5">
              {!open ? 'Une question ?' : step === 1 ? 'Votre projet' : step === 2 ? 'Le calendrier' : 'Notre réponse'}
            </p>
          </div>
          <button
            onClick={open ? dismiss : () => setOpen(true)}
            className="text-white/60 hover:text-white transition-colors p-1 -mr-1"
            aria-label={open ? 'Fermer' : 'Ouvrir'}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 7L9 12L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Content */}
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="w-full text-left px-5 py-4 hover:bg-ipb-stone/40 transition-colors"
          >
            <p className="text-[13px] text-ipb-text leading-[1.5] mb-2">
              Échangeons en 3 questions sur votre situation.
            </p>
            <span className="text-[12px] text-ipb-orange font-medium">
              Démarrer →
            </span>
          </button>
        ) : (
          <div className="p-5">
            {step === 1 && (
              <div>
                <p className="text-[13px] text-ipb-muted leading-[1.6] mb-4">
                  Sur quoi porte votre demande ?
                </p>
                <div className="space-y-2">
                  {(Object.entries(topicLabels) as [Exclude<Topic, null>, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => { setTopic(key); setStep(2); }}
                      className="w-full text-left px-4 py-3 border border-ipb-rule rounded-[3px] text-[13px] text-ipb-text hover:border-ipb-orange hover:bg-ipb-stone/30 transition-all"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-[13px] text-ipb-muted leading-[1.6] mb-4">
                  {topic === 'mur-porteur'
                    ? "Quand pensez-vous lancer le projet ?"
                    : "Depuis quand observez-vous le problème ?"}
                </p>
                <div className="space-y-2">
                  {(Object.entries(timingLabels) as [Exclude<Timing, null>, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => { setTiming(key); setStep(3); }}
                      className="w-full text-left px-4 py-3 border border-ipb-rule rounded-[3px] text-[13px] text-ipb-text hover:border-ipb-orange hover:bg-ipb-stone/30 transition-all"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-[11px] text-ipb-light hover:text-ipb-muted mt-3 transition-colors"
                >
                  ← Revenir
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="text-[13px] text-ipb-text leading-[1.7] mb-5">
                  {buildMessage(topic, timing)}
                </p>
                <div className="space-y-2">
                  <Link
                    href="/diagnostic"
                    onClick={dismiss}
                    className="block w-full text-center bg-ipb-orange text-white px-4 py-3 rounded-[3px] text-[13px] font-semibold hover:bg-[#b35519] transition-colors"
                  >
                    Décrire ma situation
                  </Link>
                  <a
                    href="tel:0582953375"
                    onClick={dismiss}
                    className="block w-full text-center border border-ipb-rule text-ipb-text px-4 py-3 rounded-[3px] text-[13px] font-medium hover:border-ipb-orange hover:text-ipb-orange transition-all"
                  >
                    05 82 95 33 75
                  </a>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-[11px] text-ipb-light hover:text-ipb-muted mt-3 transition-colors"
                >
                  ← Revenir
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
