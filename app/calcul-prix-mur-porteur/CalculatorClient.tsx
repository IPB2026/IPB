'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { trackCalculatorStart, trackCalculatorComplete, trackCalculatorLeadCapture } from '@/lib/analytics';
import { submitCalculatorLead } from '@/app/actions/calculator';
import { validatePhoneOrError } from '@/lib/validations/phone';
import { FormError } from '@/components/ui/FormError';

/**
 * Calculateur prix mur porteur — outil interactif lead gen.
 *
 * 4 étapes : Type de projet · Dimensions · Type de mur · Étage
 * Résultat : fourchette estimée + capture email pour devis détaillé
 *
 * Cf. PLAN_LEADGEN.md §3.2
 */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

type ProjectType = 'cuisine_ouverte' | 'baie_jardin' | 'suite_parentale' | 'autre';
type MurType = 'brique' | 'parpaing' | 'pierre' | 'inconnu';
type EtageType = 'rdc_combles' | 'rdc_etage' | 'etage_etage';

const projectLabels: Record<ProjectType, string> = {
  cuisine_ouverte: 'Cuisine ouverte sur séjour',
  baie_jardin: 'Baie vitrée sur jardin / terrasse',
  suite_parentale: 'Suite parentale étendue (entre 2 chambres)',
  autre: 'Autre projet',
};

const murLabels: Record<MurType, string> = {
  brique: 'Brique foraine',
  parpaing: 'Parpaing',
  pierre: 'Pierre ou béton',
  inconnu: 'Je ne sais pas',
};

const etageLabels: Record<EtageType, string> = {
  rdc_combles: 'RDC sous combles non habitables',
  rdc_etage: 'RDC sous un étage habité',
  etage_etage: 'Étage avec étage(s) au-dessus',
};

interface Estimate {
  min: number;
  max: number;
  detail: { etude: number; etaiement: number; ouverture: number; finitions: number };
  poutreType: string;
  duree: string;
}

function calculateEstimate(opts: {
  largeur: number;
  hauteur: number;
  mur: MurType;
  etage: EtageType;
}): Estimate {
  const { largeur, hauteur, mur, etage } = opts;

  // ─────────────────────────────────────────────────────────────────
  // Calibrage tarifaire IPB
  // ─────────────────────────────────────────────────────────────────
  // Coefficient appliqué au total et à chaque poste pour refléter
  // la position tarifaire IPB : en moyenne 15 % en dessous des prix
  // marché constatés sur Toulouse / Occitanie. Ce coefficient garantit
  // que l'estimation calculée reflète les devis réellement facturés.
  // À ajuster si la politique tarifaire évolue.
  const IPB_PRICE_FACTOR = 0.85;

  // Coefficient nature du mur (effort de découpe + scellement)
  const murCoef: Record<MurType, number> = {
    brique: 1.0,
    parpaing: 0.85,
    pierre: 1.4,
    inconnu: 1.15,
  };

  // Coefficient charges reprises selon étage (impact dimensionnement poutre)
  const etageCoef: Record<EtageType, number> = {
    rdc_combles: 0.85,
    rdc_etage: 1.0,
    etage_etage: 1.3,
  };

  const surface = largeur * hauteur;

  // Postes calculés en prix marché, puis multipliés par IPB_PRICE_FACTOR
  // pour la cohérence entre les postes individuels affichés et le total.
  const etudeMarche = 500 + (etageCoef[etage] - 0.85) * 1000 + (murCoef[mur] - 0.85) * 500;
  const etaiementMarche = 300 + largeur * 130;
  const prixMl = mur === 'pierre' ? 1800 : mur === 'brique' ? 1400 : mur === 'parpaing' ? 1100 : 1500;
  const ouvertureMarche = prixMl * largeur * etageCoef[etage];
  const finitionsMarche = 600 + surface * 350;

  const etude = Math.round(etudeMarche * IPB_PRICE_FACTOR);
  const etaiement = Math.round(etaiementMarche * IPB_PRICE_FACTOR);
  const ouverture = Math.round(ouvertureMarche * IPB_PRICE_FACTOR);
  const finitions = Math.round(finitionsMarche * IPB_PRICE_FACTOR);

  const total = etude + etaiement + ouverture + finitions;
  // Fourchette ±20% autour du total IPB
  const min = Math.round((total * 0.85) / 100) * 100;
  const max = Math.round((total * 1.20) / 100) * 100;

  // Type de poutre selon largeur et étage
  let poutreType = 'IPN 160';
  if (largeur > 3 || etage === 'etage_etage') poutreType = 'HEB 220';
  else if (largeur > 2.5) poutreType = 'IPN 200';
  else if (largeur > 2) poutreType = 'IPN 180';

  // Durée
  let duree = '3 jours';
  if (largeur > 3.5 || mur === 'pierre') duree = '5 à 7 jours';
  else if (largeur > 2.5) duree = '4 à 5 jours';

  return { min, max, detail: { etude, etaiement, ouverture, finitions }, poutreType, duree };
}

export function CalculatorClient() {
  const [step, setStep] = useState<Step>(0);
  const [project, setProject] = useState<ProjectType | null>(null);
  const [largeur, setLargeur] = useState(2.5);
  const [hauteur, setHauteur] = useState(2.2);
  const [mur, setMur] = useState<MurType | null>(null);
  const [etage, setEtage] = useState<EtageType | null>(null);

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCity, setLeadCity] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const estimate = useMemo<Estimate | null>(
    () => mur && etage ? calculateEstimate({ largeur, hauteur, mur, etage }) : null,
    [largeur, hauteur, mur, etage]
  );

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleStart = () => {
    trackCalculatorStart();
    setStep(1);
  };

  const handleViewResult = () => {
    if (estimate) {
      trackCalculatorComplete(estimate.min, estimate.max);
    }
    setStep(5);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !estimate || !project || !mur || !etage) return;
    setLeadError(null);

    // Validation locale avant envoi
    if (!leadEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) {
      setLeadError("Adresse email invalide. Vérifiez qu'elle contient un \"@\" et un domaine.");
      return;
    }
    const phoneError = validatePhoneOrError(leadPhone);
    if (phoneError) { setLeadError(phoneError); return; }

    setSubmitting(true);
    try {
      const result = await submitCalculatorLead({
        email: leadEmail,
        phone: leadPhone,
        city: leadCity,
        project,
        largeur,
        hauteur,
        mur,
        etage,
        estimateMin: estimate.min,
        estimateMax: estimate.max,
        poutreType: estimate.poutreType,
      });
      if (result.success) {
        trackCalculatorLeadCapture(leadEmail);
        setSubmitted(true);
      } else {
        setLeadError(result.message || 'Une erreur est survenue. Vous pouvez nous appeler au 05 82 95 33 75.');
      }
    } catch {
      setLeadError('Connexion impossible. Réessayez ou appelez le 05 82 95 33 75.');
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────
  // Rendu — écran d'accueil (step 0)
  // ─────────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-6 md:p-10 lg:p-12 text-center">
        <p className="text-[10px] text-ipb-light uppercase tracking-[0.18em] mb-4">
          Outil interactif · sans inscription
        </p>
        <h2 className="font-serif text-ipb-text mb-6" style={{ fontSize: 'clamp(28px, 2.6vw, 40px)', lineHeight: 1.15, letterSpacing: '-0.022em', fontWeight: 700 }}>
          Estimez le prix de votre<br /><em>ouverture de mur porteur.</em>
        </h2>
        <p className="text-[15px] leading-[1.85] font-light text-ipb-muted max-w-xl mx-auto mb-10">
          Quatre questions, deux minutes. Vous obtenez une fourchette précise basée sur les chantiers récents de l’institut à Toulouse et alentour.
        </p>
        <MagneticButton onClick={handleStart} variant="primary">
          Démarrer l'estimation
        </MagneticButton>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // Écran résultat (step 5)
  // ─────────────────────────────────────────────────────────────
  if (step === 5 && estimate && project) {
    if (submitted) {
      return (
        <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-6 md:p-10 lg:p-12 text-center">
          <div className="w-12 h-12 rounded-full border border-ipb-orange flex items-center justify-center mx-auto mb-6">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 10L8.5 13.5L15 7" stroke="var(--ipb-orange)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="font-serif text-ipb-text font-bold text-[28px] leading-tight mb-3">
            Estimation envoyée.
          </h2>
          <p className="text-[14px] leading-[1.85] font-light text-ipb-muted max-w-md mx-auto">
            Vous recevez le détail par email dans quelques minutes. Notre institut vous contactera sous 24 heures pour un échange technique si vous le souhaitez.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Bandeau résultat */}
        <div className="bg-ipb-navy text-white rounded-[6px] p-6 md:p-8 lg:p-10 text-center">
          <p className="text-[10px] text-white/75 uppercase tracking-[0.18em] mb-4">
            Estimation pour votre projet · Tarifs IPB
          </p>
          <p
            className="font-serif text-white font-bold leading-none mb-3"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.025em' }}
          >
            {estimate.min.toLocaleString('fr-FR')} – {estimate.max.toLocaleString('fr-FR')} €
          </p>
          <p className="text-[12px] text-white/75 uppercase tracking-[0.14em] mb-4">TTC · finitions comprises</p>

          {/* Argument de vente : positionnement tarifaire IPB vs marché */}
          <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full bg-ipb-orange/15 border border-ipb-orange/40">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#E89763" aria-hidden="true">
              <path d="M8 1l1.95 4.31L14.5 6 11.25 9.36 12 14l-4-2.27L4 14l.75-4.64L1.5 6l4.55-.69L8 1z" />
            </svg>
            <span className="text-[12px] text-ipb-orange-l font-medium">
              En moyenne 15 % sous les prix marché toulousain
            </span>
          </div>
        </div>

        {/* Détail */}
        <div className="bg-ipb-white border border-ipb-rule rounded-[6px] p-6 md:p-8">
          <h3 className="font-serif text-ipb-text font-bold text-[18px] md:text-[20px] mb-6">Détail de l'estimation</h3>
          <dl className="space-y-3 text-[13px] md:text-[14px] mb-6">
            {[
              ['Projet', projectLabels[project]],
              ['Ouverture', `${largeur.toFixed(1)} m × ${hauteur.toFixed(1)} m`],
              ['Type de mur', murLabels[mur!]],
              ['Configuration', etageLabels[etage!]],
              ['Poutre dimensionnée', estimate.poutreType],
              ['Durée chantier estimée', estimate.duree],
            ].map(([label, val]) => (
              <div key={label} className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 pb-3 border-b border-ipb-rule">
                <dt className="text-ipb-muted text-[12px] sm:text-inherit uppercase sm:normal-case tracking-wider sm:tracking-normal sm:text-[14px]">{label}</dt>
                <dd className="text-ipb-text font-medium sm:text-right">{val}</dd>
              </div>
            ))}
          </dl>

          <h4 className="font-serif text-ipb-text font-bold text-[16px] mb-4">Postes inclus</h4>
          <dl className="space-y-2 text-[13px]">
            {[
              ['Étude technique signée', estimate.detail.etude],
              ['Étaiement provisoire', estimate.detail.etaiement],
              ['Ouverture + pose poutre', estimate.detail.ouverture],
              ['Finitions (enduit, jonctions)', estimate.detail.finitions],
            ].map(([label, val]) => (
              <div key={label as string} className="flex justify-between gap-4 text-ipb-muted">
                <dt>{label}</dt>
                <dd className="font-medium">{(val as number).toLocaleString('fr-FR')} €</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 pt-6 border-t border-ipb-rule text-[12px] text-ipb-light leading-[1.6]">
            Cette fourchette est indicative, basée sur des paramètres saisis. Un devis ferme nécessite une visite technique sur site.
          </p>
        </div>

        {/* Capture lead */}
        {!showLeadForm ? (
          <div className="bg-ipb-cream border border-ipb-rule rounded-[6px] p-6 md:p-8 text-center">
            <h3 className="font-serif text-ipb-text font-bold text-[20px] md:text-[22px] leading-tight mb-3">
              Recevez le détail et un devis précis sous 24h
            </h3>
            <p className="text-[14px] font-light text-ipb-muted mb-6 max-w-md mx-auto">
              Notre ingénieur vous contacte pour valider l'étude et planifier la visite si vous le souhaitez. Sans engagement.
            </p>
            <MagneticButton onClick={() => setShowLeadForm(true)} variant="primary">
              Recevoir l'estimation par email
            </MagneticButton>
          </div>
        ) : (
          <form onSubmit={handleLeadSubmit} className="bg-ipb-cream border border-ipb-rule rounded-[6px] p-6 md:p-8 space-y-4">
            <h3 className="font-serif text-ipb-text font-bold text-[22px] leading-tight mb-2">
              Vos coordonnées
            </h3>
            <p className="text-[12px] font-light text-ipb-muted mb-4">
              Vos données ne sont utilisées que pour vous répondre. Aucune relance commerciale.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="calc-lead-email" className="block text-[10px] uppercase tracking-[0.14em] text-ipb-muted font-medium mb-2">Email</label>
                <input id="calc-lead-email" type="email" required value={leadEmail} onChange={e => setLeadEmail(e.target.value)} autoComplete="email"
                  className="w-full px-4 py-3 border border-ipb-rule rounded-[3px] bg-ipb-white text-ipb-text text-[14px] font-light focus:outline-none focus:border-ipb-orange transition-colors" />
              </div>
              <div>
                <label htmlFor="calc-lead-phone" className="block text-[10px] uppercase tracking-[0.14em] text-ipb-muted font-medium mb-2">Téléphone (optionnel)</label>
                <input id="calc-lead-phone" type="tel" value={leadPhone} onChange={e => setLeadPhone(e.target.value)} autoComplete="tel"
                  className="w-full px-4 py-3 border border-ipb-rule rounded-[3px] bg-ipb-white text-ipb-text text-[14px] font-light focus:outline-none focus:border-ipb-orange transition-colors" />
              </div>
            </div>
            <div>
              <label htmlFor="calc-lead-city" className="block text-[10px] uppercase tracking-[0.14em] text-ipb-muted font-medium mb-2">Commune du chantier</label>
              <input id="calc-lead-city" type="text" required value={leadCity} onChange={e => setLeadCity(e.target.value)} placeholder="Toulouse, Saint-Cyprien, Pamiers..." autoComplete="address-level2"
                className="w-full px-4 py-3 border border-ipb-rule rounded-[3px] bg-ipb-white text-ipb-text text-[14px] font-light focus:outline-none focus:border-ipb-orange transition-colors" />
            </div>
            <MagneticButton type="submit" variant="primary" className="w-full">
              {submitting ? 'Envoi…' : "Envoyer mon estimation"}
            </MagneticButton>
            {leadError && <FormError message={leadError} />}
          </form>
        )}

        {/* Réinitialiser */}
        <div className="text-center">
          <button
            onClick={() => { setStep(0); setProject(null); setMur(null); setEtage(null); setShowLeadForm(false); setSubmitted(false); }}
            className="text-[12px] text-ipb-light hover:text-ipb-muted transition-colors"
          >
            ← Refaire une autre simulation
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // Étapes 1 à 4
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="bg-ipb-white border border-ipb-rule rounded-[6px] overflow-hidden">
      {/* Barre de progression */}
      <div className="bg-ipb-cream border-b border-ipb-rule px-5 md:px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] text-ipb-light uppercase tracking-[0.16em] font-medium">
            Étape {step} sur {totalSteps}
          </p>
          <button
            onClick={() => step > 1 ? setStep((step - 1) as Step) : setStep(0)}
            className="text-[12px] text-ipb-muted hover:text-ipb-orange transition-colors px-2 py-1 -mr-2 min-h-[32px]"
            aria-label="Revenir à l'étape précédente"
          >
            ← Revenir
          </button>
        </div>
        <div className="h-1 bg-ipb-rule rounded-full overflow-hidden">
          <div
            className="h-full bg-ipb-orange rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-5 md:p-8 lg:p-10">
        {step === 1 && (
          <div>
            <h2 className="font-serif text-ipb-text font-bold text-[20px] md:text-[24px] leading-tight mb-6">
              Quel est votre projet&nbsp;?
            </h2>
            <div className="space-y-3">
              {(Object.entries(projectLabels) as [ProjectType, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setProject(key); setStep(2); }}
                  className={`w-full text-left px-5 py-4 border rounded-[3px] transition-all ${
                    project === key ? 'border-ipb-orange bg-ipb-cream' : 'border-ipb-rule hover:border-ipb-orange hover:bg-ipb-cream'
                  } text-ipb-text text-[14px]`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-serif text-ipb-text font-bold text-[20px] md:text-[24px] leading-tight mb-6">
              Dimensions de l'ouverture
            </h2>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label htmlFor="calc-largeur" className="text-[12px] uppercase tracking-[0.14em] text-ipb-muted font-medium">Largeur</label>
                  <span className="font-serif text-ipb-text text-[24px] font-bold" aria-hidden="true">{largeur.toFixed(1)} m</span>
                </div>
                <input id="calc-largeur" type="range" min="1" max="5" step="0.1" value={largeur} onChange={e => setLargeur(parseFloat(e.target.value))}
                  aria-valuemin={1} aria-valuemax={5} aria-valuenow={largeur} aria-valuetext={`${largeur.toFixed(1)} mètres`}
                  className="w-full accent-ipb-orange" />
                <div className="flex justify-between text-[11px] text-ipb-muted mt-1" aria-hidden="true">
                  <span>1 m</span><span>5 m</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-3">
                  <label htmlFor="calc-hauteur" className="text-[12px] uppercase tracking-[0.14em] text-ipb-muted font-medium">Hauteur</label>
                  <span className="font-serif text-ipb-text text-[24px] font-bold" aria-hidden="true">{hauteur.toFixed(1)} m</span>
                </div>
                <input id="calc-hauteur" type="range" min="2" max="3" step="0.1" value={hauteur} onChange={e => setHauteur(parseFloat(e.target.value))}
                  aria-valuemin={2} aria-valuemax={3} aria-valuenow={hauteur} aria-valuetext={`${hauteur.toFixed(1)} mètres`}
                  className="w-full accent-ipb-orange" />
                <div className="flex justify-between text-[11px] text-ipb-muted mt-1" aria-hidden="true">
                  <span>2 m</span><span>3 m</span>
                </div>
              </div>
            </div>

            <div className="mt-10 text-right">
              <MagneticButton onClick={() => setStep(3)} variant="primary">Étape suivante →</MagneticButton>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-serif text-ipb-text font-bold text-[20px] md:text-[24px] leading-tight mb-6">
              Type de mur à ouvrir
            </h2>
            <div className="space-y-3">
              {(Object.entries(murLabels) as [MurType, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setMur(key); setStep(4); }}
                  className={`w-full text-left px-5 py-4 border rounded-[3px] transition-all ${
                    mur === key ? 'border-ipb-orange bg-ipb-cream' : 'border-ipb-rule hover:border-ipb-orange hover:bg-ipb-cream'
                  } text-ipb-text text-[14px]`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="font-serif text-ipb-text font-bold text-[20px] md:text-[24px] leading-tight mb-6">
              Configuration de l'étage
            </h2>
            <p className="text-[13px] font-light text-ipb-muted mb-6 leading-[1.7]">
              Ce qui se trouve au-dessus du mur change le calcul de la poutre et le coût des travaux.
            </p>
            <div className="space-y-3 mb-10">
              {(Object.entries(etageLabels) as [EtageType, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setEtage(key); }}
                  className={`w-full text-left px-5 py-4 border rounded-[3px] transition-all ${
                    etage === key ? 'border-ipb-orange bg-ipb-cream' : 'border-ipb-rule hover:border-ipb-orange hover:bg-ipb-cream'
                  } text-ipb-text text-[14px]`}
                >
                  {label}
                </button>
              ))}
            </div>
            {etage && (
              <div className="text-right">
                <MagneticButton onClick={handleViewResult} variant="primary">
                  Voir mon estimation →
                </MagneticButton>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
