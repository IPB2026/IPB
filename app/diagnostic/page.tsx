"use client"

import React, { useState, useEffect } from 'react';
import { submitDiagnosticCallback, submitDiagnosticLead } from '@/app/actions/diagnostic';
import { submitQuickCallback } from '@/app/actions/quickCallback';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { trackEvent, trackDiagnosticLeadSubmit } from '@/lib/analytics';
import { validatePhoneOrError } from '@/lib/validations/phone';
import { FormError } from '@/components/ui/FormError';

function trackPhoneClick() {
  trackEvent('conversion', { send_to: 'AW-17902440600/0aY8COSl6JccEJlhxthC' });
}

function trackFormSubmit() {
  trackEvent('diagnostic_form_submit', { send_to: 'AW-17902440600' });
}

function trackCallbackRequest() {
  trackEvent('callback_request', { send_to: 'AW-17902440600' });
}

// Types
type PathType = 'fissure' | 'mur-porteur' | null;

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string; icon?: string }[];
  multiSelect?: boolean;
}

// Questions par parcours
const questionsData: Record<'fissure' | 'mur-porteur', Question[]> = {
  fissure: [
    {
      id: 'TYPE_BATIMENT',
      text: 'Quel type de bâtiment ?',
      options: [
        { value: 'maison', label: 'Maison individuelle', icon: '🏠' },
        { value: 'immeuble', label: 'Immeuble / Appartement', icon: '🏢' },
        { value: 'local', label: 'Local professionnel', icon: '🏭' },
      ],
    },
    {
      id: 'LOCALISATION',
      text: 'Où se situent les fissures ?',
      options: [
        { value: 'facade', label: 'Façade extérieure', icon: '🏛️' },
        { value: 'interieur', label: 'Murs intérieurs', icon: '🧱' },
        { value: 'plafond', label: 'Plafond', icon: '⬆️' },
        { value: 'sol', label: 'Sol / Dalle', icon: '⬇️' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
      multiSelect: true,
    },
    {
      id: 'FORME_FISSURE',
      text: 'Quelle est la forme des fissures ?',
      options: [
        { value: 'escalier', label: 'En escalier (joints)', icon: '📐' },
        { value: 'verticale', label: 'Verticales', icon: '📏' },
        { value: 'horizontale', label: 'Horizontales', icon: '➖' },
        { value: 'faience', label: 'Toile d\'araignée (faïençage)', icon: '🕸️' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'LARGEUR',
      text: 'Quelle est leur largeur approximative ?',
      options: [
        { value: 'fine', label: 'Très fine (< 0.2mm)', icon: '—' },
        { value: 'moyenne', label: 'Moyenne (0.2-2mm)', icon: '━' },
        { value: 'large', label: 'Large (> 2mm)', icon: '═' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'ANCIENNETE',
      text: 'Depuis quand sont-elles apparues ?',
      options: [
        { value: 'recent', label: 'Moins de 6 mois', icon: '🆕' },
        { value: 'moyen', label: '6 mois à 2 ans', icon: '📅' },
        { value: 'ancien', label: 'Plus de 2 ans', icon: '📆' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'EVOLUTION',
      text: 'Les fissures évoluent-elles ?',
      options: [
        { value: 'rapide', label: 'Oui, rapidement', icon: '⚠️' },
        { value: 'lente', label: 'Oui, lentement', icon: '⏳' },
        { value: 'stable', label: 'Stables', icon: '✓' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'SIGNES_ASSOCIES',
      text: 'Avez-vous d\'autres signes ?',
      options: [
        { value: 'portes', label: 'Portes qui coincent', icon: '🚪' },
        { value: 'carrelage', label: 'Carrelage fissuré', icon: '◽' },
        { value: 'infiltration', label: 'Infiltrations d\'eau', icon: '💧' },
        { value: 'aucun', label: 'Aucun autre signe', icon: '✓' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
      multiSelect: true,
    },
    {
      id: 'STATUT',
      text: 'Vous êtes... ?',
      options: [
        { value: 'proprietaire', label: 'Propriétaire occupant', icon: '🏠' },
        { value: 'bailleur', label: 'Propriétaire bailleur', icon: '🔑' },
        { value: 'locataire', label: 'Locataire', icon: '👤' },
        { value: 'achat', label: 'En projet d\'achat', icon: '📝' },
      ],
    },
    {
      id: 'URGENCE',
      text: 'Comment ressentez-vous l\'urgence ?',
      options: [
        { value: 'immediate', label: 'Très urgent, je m\'inquiète', icon: '🔴' },
        { value: 'modere', label: 'Préoccupant, à traiter rapidement', icon: '🟠' },
        { value: 'surveille', label: 'À surveiller, pas d\'urgence', icon: '🟢' },
      ],
    },
  ],
  'mur-porteur': [
    {
      id: 'TYPE_BATIMENT',
      text: 'Quel type de bâtiment ?',
      options: [
        { value: 'maison', label: 'Maison individuelle', icon: '🏠' },
        { value: 'immeuble', label: 'Immeuble / Appartement', icon: '🏢' },
        { value: 'local', label: 'Local professionnel', icon: '🏭' },
      ],
    },
    {
      id: 'PROJET',
      text: 'Quel est votre projet ?',
      options: [
        { value: 'abattre', label: 'Abattre un mur porteur', icon: '🔨' },
        { value: 'agrandir', label: 'Agrandir une ouverture existante', icon: '↔️' },
        { value: 'baie', label: 'Créer une baie vitrée', icon: '🪟' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas encore', icon: '❓' },
      ],
    },
    {
      id: 'PORTEE',
      text: 'Quelle ouverture souhaitez-vous ?',
      options: [
        { value: 'petite', label: 'Petite (≤ 1,5 m)', icon: '▪️' },
        { value: 'moyenne', label: 'Moyenne (1,5 à 3 m)', icon: '▬' },
        { value: 'grande', label: 'Grande (> 3 m)', icon: '▬▬' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'NATURE_MUR',
      text: 'De quoi est fait le mur ?',
      options: [
        { value: 'pierre', label: 'Pierre / Brique ancienne', icon: '🧱' },
        { value: 'beton', label: 'Béton armé', icon: '🏗️' },
        { value: 'parpaing', label: 'Parpaing', icon: '⬛' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'ETAGE',
      text: 'Le mur se situe à quel niveau ?',
      options: [
        { value: 'rdc_plancher', label: 'RDC avec étage au-dessus', icon: '🏠' },
        { value: 'rdc_combles', label: 'RDC sous combles / toiture', icon: '🔺' },
        { value: 'etage', label: 'Étage intermédiaire', icon: '🏢' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'PLANS',
      text: 'Avez-vous les plans de la maison ?',
      options: [
        { value: 'oui', label: 'Oui, je les ai', icon: '📐' },
        { value: 'non', label: 'Non', icon: '✗' },
        { value: 'recherche', label: 'En cours de recherche', icon: '🔍' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'DEVIS_EXISTANT',
      text: 'Avez-vous déjà un devis ou un avis ?',
      options: [
        { value: 'oui_structure', label: 'Oui, étude structure faite', icon: '✓' },
        { value: 'oui_devis', label: 'Oui, devis d\'un artisan', icon: '📄' },
        { value: 'non', label: 'Non, je commence', icon: '🆕' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'STATUT',
      text: 'Vous êtes... ?',
      options: [
        { value: 'proprietaire', label: 'Propriétaire occupant', icon: '🏠' },
        { value: 'bailleur', label: 'Propriétaire bailleur', icon: '🔑' },
        { value: 'achat', label: 'En projet d\'achat', icon: '📝' },
        { value: 'autre', label: 'Autre', icon: '👤' },
      ],
    },
    {
      id: 'HORIZON',
      text: 'Quel est votre horizon de travaux ?',
      options: [
        { value: 'urgent', label: 'Le plus tôt possible', icon: '🔴' },
        { value: 'trimestre', label: 'Dans les 3 prochains mois', icon: '🟠' },
        { value: 'annee', label: 'D\'ici 6 à 12 mois', icon: '🟢' },
        { value: 'reflexion', label: 'Encore en réflexion', icon: '💭' },
      ],
    },
  ],
};

// Conseils expert contextuels — renforce l'autorité à chaque étape
const expertTips: Record<string, string> = {
  // FISSURES
  'fissure:TYPE_BATIMENT:maison': '💡 En Haute-Garonne, 70% des maisons individuelles sur sol argileux développent des fissures dans les 15 premières années.',
  'fissure:TYPE_BATIMENT:immeuble': '💡 Les immeubles anciens de Toulouse (briques foraines) sont particulièrement sensibles aux mouvements de terrain.',
  'fissure:TYPE_BATIMENT:local': '💡 Les locaux professionnels ont des obligations réglementaires strictes en matière de solidité structurelle.',
  'fissure:LOCALISATION:facade': '💡 Les fissures en façade sont les plus fréquentes et souvent liées à un tassement différentiel des fondations.',
  'fissure:LOCALISATION:interieur': '💡 Des fissures intérieures qui traversent le mur de part en part indiquent généralement un mouvement structurel.',
  'fissure:LOCALISATION:plafond': '💡 Les fissures au plafond peuvent révéler une déformation de la charpente ou un affaissement de plancher.',
  'fissure:LOCALISATION:sol': '💡 Les fissures au sol sont souvent dues à un retrait-gonflement des argiles sous les fondations.',
  'fissure:FORME_FISSURE:escalier': '⚠️ Les fissures en escalier suivant les joints de maçonnerie sont le signe classique d\'un tassement différentiel — c\'est le cas le plus fréquent que nous traitons.',
  'fissure:FORME_FISSURE:verticale': '💡 Une fissure verticale nette peut indiquer un défaut de chaînage ou une rupture dans la structure.',
  'fissure:FORME_FISSURE:horizontale': '💡 Les fissures horizontales en partie basse signalent souvent une poussée des terres ou un problème de fondation.',
  'fissure:FORME_FISSURE:faience': '✅ Le faïençage (toile d\'araignée) est généralement superficiel et lié au retrait de l\'enduit. Moins grave mais à surveiller.',
  'fissure:LARGEUR:fine': '✅ Les microfissures < 0.2mm sont souvent d\'origine thermique. Rarement structurelles, mais à surveiller si elles évoluent.',
  'fissure:LARGEUR:moyenne': '⚠️ Entre 0.2 et 2mm, on parle de fissure active. Un diagnostic instrumenté (fissuromètre) est recommandé.',
  'fissure:LARGEUR:large': '🔴 Au-delà de 2mm, il s\'agit d\'une lézarde. L\'intervention est généralement urgente pour stabiliser la structure.',
  'fissure:ANCIENNETE:recent': '⚠️ Des fissures récentes qui apparaissent rapidement sont souvent liées à un épisode de sécheresse. C\'est le cas de la majorité de nos interventions depuis 2022.',
  'fissure:ANCIENNETE:moyen': '💡 Si les fissures sont apparues il y a 6 mois à 2 ans, elles ont probablement continué à évoluer. Un relevé précis permettra de quantifier cette évolution.',
  'fissure:ANCIENNETE:ancien': '💡 Des fissures de plus de 2 ans peuvent être stabilisées naturellement. Un fissuromètre confirme si le mouvement est terminé.',
  'fissure:EVOLUTION:rapide': '🔴 Une évolution rapide signifie que le sol continue de bouger sous vos fondations. Une intervention de stabilisation est prioritaire.',
  'fissure:EVOLUTION:lente': '⚠️ Une évolution lente indique un mouvement en cours mais progressif. Il est encore temps d\'intervenir avant aggravation.',
  'fissure:EVOLUTION:stable': '✅ Des fissures stables sont bon signe. L\'agrafage pourra se faire sereinement après confirmation par diagnostic.',
  'fissure:SIGNES_ASSOCIES:portes': '⚠️ Des portes qui coincent confirment un mouvement de la structure. C\'est un signe que nous prenons très au sérieux.',
  'fissure:SIGNES_ASSOCIES:carrelage': '⚠️ Un carrelage fissuré au sol indique un mouvement du plancher bas, souvent lié au tassement des fondations.',
  'fissure:SIGNES_ASSOCIES:infiltration': '⚠️ Fissures + infiltrations : la combinaison aggrave les deux problèmes. L\'eau accélère la dégradation structurelle.',
  'fissure:URGENCE:immediate': '🔴 Nous comprenons votre inquiétude. Nos experts interviennent sous 48-72h pour les situations urgentes.',
  'fissure:URGENCE:modere': '💡 Vous avez raison d\'agir maintenant. Plus tôt on traite, moins les travaux sont importants (et coûteux).',

  // MUR PORTEUR
  'mur-porteur:TYPE_BATIMENT:maison': '💡 Pour une maison individuelle, l\'ouverture de mur porteur est généralement réalisable en 2 à 5 jours. L\'étude structure est l\'étape clé.',
  'mur-porteur:TYPE_BATIMENT:immeuble': '⚠️ En immeuble, l\'accord de la copropriété est obligatoire. Nous vous aidons à constituer le dossier technique pour l\'AG.',
  'mur-porteur:TYPE_BATIMENT:local': '💡 Dans un local professionnel, le mur porteur peut avoir des charges importantes. L\'ingénieur structure calcule la poutre adaptée.',
  'mur-porteur:PROJET:abattre': '⚠️ Abattre un mur porteur sans étude structure est illégal et dangereux. Notre ingénieur dimensionne la poutre de reprise avant tout chantier.',
  'mur-porteur:PROJET:agrandir': '💡 Agrandir une ouverture existante est souvent plus simple — le linteau est déjà en place. L\'étude vérifie si la portée peut être étendue.',
  'mur-porteur:PROJET:baie': '💡 Une baie vitrée nécessite l\'ouverture du mur ET la pose du dormant. Nous coordonnons les deux corps de métier.',
  'mur-porteur:PORTEE:grande': '⚠️ Au-delà de 3 m, la poutre est plus massive (HEB 200+ ou béton armé) et le coût augmente significativement. Un calcul précis est indispensable.',
  'mur-porteur:PORTEE:moyenne': '💡 Entre 1,5 et 3 m, la solution la plus fréquente est un IPN ou HEB standard. C\'est la portée que nous réalisons le plus souvent.',
  'mur-porteur:PORTEE:petite': '✅ Pour une petite ouverture (< 1,5 m), un linteau préfabriqué suffit souvent. Moins coûteux, chantier de 1 à 2 jours.',
  'mur-porteur:NATURE_MUR:pierre': '⚠️ Les murs en pierre ou brique ancienne sont souvent porteurs. L\'étaiement provisoire est crucial pour éviter tout mouvement pendant les travaux.',
  'mur-porteur:NATURE_MUR:beton': '💡 Le béton armé peut contenir des aciers. Nous réalisons un sondage avant découpe pour éviter de sectionner les armatures porteuses.',
  'mur-porteur:ETAGE:rdc_plancher': '⚠️ Un mur en RDC avec un étage au-dessus reprend des charges importantes. L\'étude structure est non négociable — la poutre doit être parfaitement dimensionnée.',
  'mur-porteur:ETAGE:rdc_combles': '💡 Sous combles, les charges sont moindres qu\'avec un étage habité. Mais un mur sous ferme ou sous panne reste porteur — à vérifier.',
  'mur-porteur:PLANS:non': '⚠️ Sans plans, nous réalisons un sondage pour identifier les aciers et la nature exacte du mur. C\'est une étape indispensable avant tout devis.',
  'mur-porteur:PLANS:oui': '✅ Avoir les plans accélère l\'étude structure. Notre ingénieur peut souvent dimensionner la poutre sans déplacement préalable.',
  'mur-porteur:DEVIS_EXISTANT:oui_devis': '⚠️ Un devis d\'artisan sans étude structure est incomplet. Sans note de calcul, l\'artisan ne peut pas garantir le dimensionnement de la poutre.',
  'mur-porteur:HORIZON:urgent': '💡 Pour les travaux urgents, nous pouvons mobiliser notre ingénieur sous 48h pour l\'étude préalable.',
};

// Étapes de l'animation d'analyse
const analysisSteps = [
  { text: 'Analyse de vos symptômes...', delay: 0 },
  { text: 'Comparaison avec notre base de 10 000+ cas...', delay: 800 },
  { text: 'Évaluation du niveau de risque...', delay: 1600 },
  { text: 'Génération de votre rapport expert...', delay: 2400 },
];

export default function DiagnosticPage() {
  const [step, setStep] = useState(0);
  const [path, setPath] = useState<PathType>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', address: '', yearBuilt: '', preferredTime: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [riskScore, setRiskScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [callbackInfo, setCallbackInfo] = useState({ name: '', phone: '', email: '' });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [callbackPhotoFile, setCallbackPhotoFile] = useState<File | null>(null);
  const [callbackPhotoPreview, setCallbackPhotoPreview] = useState<string | null>(null);

  const resizeImage = (file: File, maxWidth = 1200, quality = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }));
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  };

  const handlePhotoSelect = async (file: File, target: 'main' | 'callback') => {
    if (file.size > 10 * 1024 * 1024) { setFormError('La photo ne doit pas dépasser 10 Mo'); return; }
    const resized = await resizeImage(file);
    const previewUrl = URL.createObjectURL(resized);
    if (target === 'main') {
      setPhotoFile(resized);
      setPhotoPreview(previewUrl);
    } else {
      setCallbackPhotoFile(resized);
      setCallbackPhotoPreview(previewUrl);
    }
  };
  const [submitted, setSubmitted] = useState(false);
  const [earlyPhone, setEarlyPhone] = useState('');
  const [earlyPhoneCaptured, setEarlyPhoneCaptured] = useState(false);
  const [earlyPhoneDismissed, setEarlyPhoneDismissed] = useState(false);
  
  // reCAPTCHA v3 protection
  const { getToken } = useRecaptcha();

  const currentQuestions = path ? questionsData[path] : [];
  const totalQuestions = currentQuestions.length;
  const progress = path ? (step / totalQuestions) * 100 : 0;

  // Calcul du score de risque en temps réel
  const calculateRisk = (pathType: 'fissure' | 'mur-porteur', ans: Record<string, any>) => {
    let score = 0;
    if (pathType === 'fissure') {
      if (ans.LARGEUR === 'large') score += 25;
      else if (ans.LARGEUR === 'moyenne') score += 15;
      if (ans.EVOLUTION === 'rapide') score += 20;
      else if (ans.EVOLUTION === 'lente') score += 10;
      if (ans.FORME_FISSURE === 'escalier') score += 15;
      if (ans.SIGNES_ASSOCIES?.includes('portes')) score += 10;
      if (ans.SIGNES_ASSOCIES?.includes('carrelage')) score += 10;
      if (ans.URGENCE === 'immediate') score += 10;
      else if (ans.URGENCE === 'modere') score += 5;
    } else {
      if (ans.PORTEE === 'grande') score += 25;
      else if (ans.PORTEE === 'moyenne') score += 15;
      else if (ans.PORTEE === 'petite') score += 5;
      if (ans.ETAGE === 'rdc_plancher') score += 20;
      else if (ans.ETAGE === 'rdc_combles') score += 10;
      if (ans.NATURE_MUR === 'beton') score += 10;
      else if (ans.NATURE_MUR === 'pierre') score += 10;
      if (ans.PLANS === 'non') score += 10;
      if (ans.DEVIS_EXISTANT === 'oui_devis') score += 5;
      if (ans.HORIZON === 'urgent') score += 10;
      else if (ans.HORIZON === 'trimestre') score += 5;
    }
    return Math.min(score, 100);
  };

  const liveRisk = path ? calculateRisk(path as 'fissure' | 'mur-porteur', answers) : 0;
  const riskLabel = liveRisk >= 40 ? 'Élevé' : liveRisk >= 20 ? 'Modéré' : 'Faible';
  const riskColor = liveRisk >= 40 ? 'red' : liveRisk >= 20 ? 'orange' : 'green';

  // Animation de l'analyse
  useEffect(() => {
    if (isAnalyzing) {
      const timers = analysisSteps.map((s, i) =>
        setTimeout(() => setAnalysisStep(i + 1), s.delay)
      );
      return () => timers.forEach(clearTimeout);
    } else {
      setAnalysisStep(0);
    }
  }, [isAnalyzing]);

  // Diagnostic expert
  const getExpertReport = (pathType: 'fissure' | 'mur-porteur', score: number) => {
    if (pathType === 'fissure') {
      if (score >= 40) {
        return {
          urgency: 'Urgent',
          urgencyIcon: '🔴',
          urgencyColor: 'red',
          diagnosis: 'Les signes que vous décrivez indiquent un tassement différentiel actif. La structure de votre bâtiment est en mouvement, ce qui nécessite une intervention rapide pour stopper l\'évolution et prévenir des dommages irréversibles.',
          solution: 'Agrafage structurel avec renfort des façades. Dans certains cas, un calage des fondations peut être nécessaire. Un diagnostic instrumenté sur site permettra de dimensionner précisément l\'intervention.',
          delay: 'Sous 2 à 4 semaines',
        };
      } else if (score >= 20) {
        return {
          urgency: 'À surveiller',
          urgencyIcon: '🟠',
          urgencyColor: 'orange',
          diagnosis: 'Vos fissures présentent des signes d\'évolution modérée. Sans être critique, la situation mérite une surveillance active et probablement une intervention à moyen terme pour éviter une aggravation.',
          solution: 'Agrafage localisé ou surveillance instrumentée (fissuromètre) pendant 6 à 12 mois pour confirmer l\'évolution avant travaux définitifs.',
          delay: 'Sous 1 à 2 mois',
        };
      } else {
        return {
          urgency: 'Surveillance',
          urgencyIcon: '🟢',
          urgencyColor: 'green',
          diagnosis: 'Les fissures décrites semblent stables et superficielles. Elles ne présentent pas de danger immédiat pour la structure de votre bâtiment.',
          solution: 'Surveillance visuelle régulière. Si évolution constatée, un diagnostic instrumenté sera nécessaire. Possibilité de rebouchage esthétique après confirmation de stabilité.',
          delay: 'Pas d\'urgence immédiate',
        };
      }
    } else {
      if (score >= 40) {
        return {
          urgency: 'Projet complexe',
          urgencyIcon: '🔴',
          urgencyColor: 'red',
          diagnosis: 'Votre projet implique une grande portée et/ou des charges importantes (étage au-dessus, mur béton). Une étude structure approfondie est indispensable avant tout chantier — c\'est la sécurité de votre bâtiment qui est en jeu.',
          solution: 'Étude structure complète par notre ingénieur, note de calcul officielle, dimensionnement de la poutre HEB/IPN. Coordination de l\'ensemble du chantier avec étaiement et finitions inclus.',
          delay: 'Étude sous 48h — travaux sous 3 à 6 semaines',
        };
      } else if (score >= 20) {
        return {
          urgency: 'Projet standard',
          urgencyIcon: '🟠',
          urgencyColor: 'orange',
          diagnosis: 'Votre projet est réalisable mais nécessite une étude structure pour dimensionner correctement la poutre. L\'intervention est de complexité modérée selon la portée et la nature du mur.',
          solution: 'Visite technique de notre ingénieur pour confirmer la faisabilité, sondage si nécessaire, devis détaillé. Travaux réalisables en 2 à 4 jours selon la portée.',
          delay: 'Devis sous 24h — travaux sous 2 à 4 semaines',
        };
      } else {
        return {
          urgency: 'Projet accessible',
          urgencyIcon: '🟢',
          urgencyColor: 'green',
          diagnosis: 'Votre projet semble de faible complexité (petite portée, charges modérées). Une étude structure rapide permettra de confirmer la faisabilité et de dimensionner le linteau.',
          solution: 'Étude structure simplifiée, pose d\'un linteau préfabriqué ou IPN léger. Chantier propre en 1 à 2 jours. Devis gratuit établi après visite technique.',
          delay: 'Devis sous 24h — travaux sous 1 à 3 semaines',
        };
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, isAnalyzing, showResult, submitted]);

  // Gestion du choix de parcours
  const selectPath = (selectedPath: 'fissure' | 'mur-porteur') => {
    setPath(selectedPath);
    setStep(1);
  };

  // Gestion des réponses
  const handleAnswer = (questionId: string, value: string | string[], isMulti: boolean) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  // Passer à la question suivante
  const goToNextQuestion = () => {
    if (step < totalQuestions) {
      setStep(step + 1);
    } else {
      setStep(999);
    }
  };

  // Soumission coordonnées + génération résultat
  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!contactInfo.name.trim()) { setFormError('Veuillez saisir votre nom'); return; }
    if (!contactInfo.email.trim() && !contactInfo.phone.trim()) { setFormError('Veuillez saisir au moins un email ou un téléphone'); return; }
    if (!contactInfo.address.trim()) { setFormError('Veuillez saisir l\'adresse du bien'); return; }

    // Validation locale téléphone + email (helpers partagés)
    const phoneError = validatePhoneOrError(contactInfo.phone);
    if (phoneError) { setFormError(phoneError); return; }

    const rawEmail = contactInfo.email.trim();
    if (rawEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
      setFormError("L'adresse email semble invalide. Vérifiez qu'elle contient un \"@\" et un domaine.");
      return;
    }

    setIsAnalyzing(true);
    trackFormSubmit();
    const score = calculateRisk(path! as 'fissure' | 'mur-porteur', answers);
    setRiskScore(score);

    const recaptchaToken = await getToken('diagnostic_lead');

    let leadSucceeded = false;
    try {
      const formData = new FormData();
      formData.append('name', contactInfo.name);
      formData.append('email', contactInfo.email);
      formData.append('phone', contactInfo.phone);
      formData.append('address', contactInfo.address);
      formData.append('yearBuilt', contactInfo.yearBuilt);
      formData.append('preferredTime', contactInfo.preferredTime);
      formData.append('path', path!);
      formData.append('answers', JSON.stringify(answers));
      formData.append('riskScore', String(score));
      if (recaptchaToken) formData.append('recaptchaToken', recaptchaToken);
      if (photoFile) {
        formData.append('photoFile', photoFile);
      }
      const result = await submitDiagnosticLead(formData);
      leadSucceeded = result.success;
      if (!result.success) {
        // Erreur backend : on NE simule PAS un succès — l'utilisateur doit savoir
        setIsAnalyzing(false);
        setFormError(result.message || "Une erreur est survenue lors de l'envoi. Vérifiez vos coordonnées ou appelez le 05 82 95 33 75.");
        if (process.env.NODE_ENV === 'development') {
          console.error('Erreur lead:', result.message);
        }
        return;
      }
    } catch (error) {
      setIsAnalyzing(false);
      setFormError("Connexion impossible. Réessayez ou appelez-nous directement au 05 82 95 33 75.");
      if (process.env.NODE_ENV === 'development') {
        console.error('Erreur envoi lead:', error);
      }
      return;
    }

    if (leadSucceeded) {
      // Conversion Google Ads — déclenchée une seule fois, au succès du lead
      trackDiagnosticLeadSubmit(path! as 'fissure' | 'mur-porteur', score);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResult(true);
        setCallbackInfo({ name: contactInfo.name, phone: contactInfo.phone, email: contactInfo.email });
      }, 3500);
    }
  };

  // Callback
  const handleSubmitCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = (callbackInfo.name || contactInfo.name).trim();
    const phone = (callbackInfo.phone || contactInfo.phone).trim();
    setFormError('');
    if (!name || !phone) {
      setFormError('Merci de renseigner votre téléphone pour être rappelé.');
      return;
    }
    const phoneError = validatePhoneOrError(phone);
    if (phoneError) { setFormError(phoneError); return; }
    setIsSubmitting(true);
    trackCallbackRequest();
    const recaptchaToken = await getToken('diagnostic_callback');
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('email', callbackInfo.email || contactInfo.email || '');
      formData.append('path', path || 'fissure');
      formData.append('answers', JSON.stringify(answers));
      formData.append('riskScore', String(riskScore));
      formData.append('needType', 'diagnostic');
      if (recaptchaToken) formData.append('recaptchaToken', recaptchaToken);
      if (callbackPhotoFile) {
        formData.append('photoFile', callbackPhotoFile);
      } else if (photoFile) {
        formData.append('photoFile', photoFile);
      }
      const result = await submitDiagnosticCallback(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setFormError(result.message);
      }
    } catch {
      setFormError('Erreur lors de la demande. Appelez-nous au 05 82 95 33 75.');
    }
    setIsSubmitting(false);
  };

  const currentQuestion = currentQuestions[step - 1];
  const isMultiQuestion = currentQuestion?.multiSelect;
  const expertReport = showResult && path ? getExpertReport(path as 'fissure' | 'mur-porteur', riskScore) : null;

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex justify-center">

      <div className="w-full max-w-2xl md:max-w-3xl px-4 pt-6 pb-10 md:pt-8">

        {step > 0 && (
          <div className="flex items-center mb-4">
            <a href="/" className="flex items-center gap-2 text-ipb-light hover:text-ipb-text transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span className="text-xs font-medium">Retour au site</span>
            </a>
          </div>
        )}

        {/* ===== BARRE DE PROGRESSION + INDICATEUR DE RISQUE ===== */}
        {step > 0 && step <= totalQuestions && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-ipb-navy-2 text-white font-bold px-2.5 py-1 rounded-full text-xs tracking-wide">
                  {step}/{totalQuestions}
                </span>
                <span className="text-ipb-muted text-xs font-medium">
                  {step <= 3 ? 'Analyse du problème' : step <= 6 ? 'Évaluation de gravité' : 'Finalisation'}
                </span>
              </div>
              {step > 2 && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-ipb-stone/60 text-ipb-muted uppercase tracking-wider">
                  Étape {step + 1} sur {totalQuestions + 1}
                </span>
              )}
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-ipb-orange rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(progress, 8)}%` }}
              />
            </div>
            {/* Jauge de risque en temps réel */}
            {step > 2 && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-ipb-light uppercase tracking-wider font-semibold">Criticité</span>
                <div className="flex-1 h-1.5 bg-ipb-stone rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      riskColor === 'red' ? 'bg-red-500' :
                      riskColor === 'orange' ? 'bg-ipb-orange' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.max(liveRisk * 2, 5)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== CARTE PRINCIPALE ===== */}
        <div className="bg-white rounded-2xl shadow-lg border border-ipb-rule">
          <div className="p-5 md:p-8">

            {/* ===== ÉTAPE 0 : ACCUEIL ===== */}
            {step === 0 && (
              <div>
                <div className="text-center mb-10">
                  <p className="text-ipb-orange text-[10px] uppercase tracking-[0.18em] font-medium mb-4">
                    Échange technique avec l’institut
                  </p>
                  <h1 className="font-serif text-ipb-text mb-4" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.022em', fontWeight: 700 }}>
                    Décrivez-nous<br /><em>votre situation.</em>
                  </h1>
                  <p className="text-[15px] leading-[1.85] font-light text-ipb-muted max-w-xl mx-auto">
                    Quelques minutes pour nous donner les éléments essentiels. Notre institut vous répond sous 24 heures, par téléphone ou par mail.
                  </p>
                </div>

                {/* 3 cartes égales — Fissures (en 1er, priorité) · Mur porteur · Autre */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {/* Carte 1 — Fissures (priorité) */}
                  <button
                    onClick={() => selectPath('fissure')}
                    className="group relative bg-ipb-cream border border-ipb-rule hover:border-ipb-orange rounded-[6px] p-7 transition-all text-left hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] hover:-translate-y-0.5 flex flex-col h-full"
                  >
                    <span className="font-serif text-ipb-rule group-hover:text-ipb-orange transition-colors text-[12px] font-bold tracking-wider mb-6">01</span>
                    <h2 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-3">
                      J'ai des fissures<br />qui m'inquiètent
                    </h2>
                    <p className="text-[13px] leading-[1.7] font-light text-ipb-muted flex-1 mb-6">
                      Fissures en façade, murs intérieurs, plafond. Évolution dans le temps, portes qui coincent, carrelage qui se fend.
                    </p>
                    <span className="inline-flex items-center gap-2 text-ipb-orange text-[13px] font-medium border-b border-ipb-orange pb-1 self-start group-hover:gap-3 transition-all">
                      Commencer →
                    </span>
                  </button>

                  {/* Carte 2 — Mur porteur */}
                  <button
                    onClick={() => selectPath('mur-porteur')}
                    className="group relative bg-ipb-cream border border-ipb-rule hover:border-ipb-orange rounded-[6px] p-7 transition-all text-left hover:shadow-[0_12px_36px_rgba(11,24,38,0.07)] hover:-translate-y-0.5 flex flex-col h-full"
                  >
                    <span className="font-serif text-ipb-rule group-hover:text-ipb-orange transition-colors text-[12px] font-bold tracking-wider mb-6">02</span>
                    <h2 className="font-serif text-ipb-text font-bold text-[20px] leading-tight mb-3">
                      Je veux ouvrir un mur<br />ou poser une baie vitrée
                    </h2>
                    <p className="text-[13px] leading-[1.7] font-light text-ipb-muted flex-1 mb-6">
                      Abattre un mur, créer une cuisine ouverte, agrandir une fenêtre en baie. Maison ou appartement.
                    </p>
                    <span className="inline-flex items-center gap-2 text-ipb-orange text-[13px] font-medium border-b border-ipb-orange pb-1 self-start group-hover:gap-3 transition-all">
                      Commencer →
                    </span>
                  </button>

                  {/* Carte 3 — Échange direct */}
                  <a
                    href="tel:0582953375"
                    className="group relative bg-ipb-navy text-white rounded-[6px] p-7 transition-all hover:shadow-[0_12px_36px_rgba(11,24,38,0.15)] hover:-translate-y-0.5 flex flex-col h-full text-left"
                  >
                    <span className="font-serif text-white/60 group-hover:text-ipb-orange-l transition-colors text-[12px] font-bold tracking-wider mb-6">03</span>
                    <h2 className="font-serif text-white font-bold text-[20px] leading-tight mb-3">
                      Je préfère expliquer<br />de vive voix
                    </h2>
                    <p className="text-[13px] leading-[1.7] font-light text-white/65 flex-1 mb-6">
                      Appelez Ludovic directement. Il pourra mieux comprendre votre situation à l'oral et orienter le rendez-vous.
                    </p>
                    <span className="inline-flex items-center gap-2 text-ipb-orange-l text-[13px] font-medium border-b border-ipb-orange-l pb-1 self-start group-hover:gap-3 transition-all">
                      05 82 95 33 75 →
                    </span>
                  </a>
                </div>

                {/* Réassurance discrète */}
                <p className="text-center text-[11px] text-ipb-light uppercase tracking-[0.14em] mb-4">
                  Confidentiel · Réponse sous 24 heures · Sans engagement
                </p>

                {/* Trust signals pour trafic froid (Google Ads) */}
                <div className="bg-white border border-ipb-rule rounded-xl p-3.5 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <div>
                        <span className="font-bold text-ipb-text text-sm">4.9</span>
                        <span className="text-yellow-500 text-xs ml-1">★★★★★</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-ipb-light font-medium">Avis vérifiés sur Google</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-ipb-cream rounded-lg py-2">
                      <p className="text-base font-extrabold text-ipb-text">850+</p>
                      <p className="text-[9px] text-ipb-light font-medium">clients accompagnés</p>
                    </div>
                    <div className="bg-ipb-cream rounded-lg py-2">
                      <p className="text-base font-extrabold text-ipb-text">10 ans</p>
                      <p className="text-[9px] text-ipb-light font-medium">garantie décennale</p>
                    </div>
                    <div className="bg-ipb-cream rounded-lg py-2">
                      <p className="text-base font-extrabold text-ipb-text">AXA</p>
                      <p className="text-[9px] text-ipb-light font-medium">assurance décennale</p>
                    </div>
                  </div>
                </div>

                {/* Social proof — 2 témoignages */}
                <div className="space-y-2 mb-4">
                  <div className="bg-ipb-cream rounded-xl p-3 flex items-start gap-3">
                    <div className="w-8 h-8 bg-ipb-stone rounded-full flex items-center justify-center text-sm flex-shrink-0">P</div>
                    <div>
                      <p className="text-ipb-muted text-xs italic leading-relaxed">
                        &quot;J&apos;ai compris la gravité de mes fissures. L&apos;expert m&apos;a rappelé le lendemain, intervention réalisée en 3 jours.&quot;
                      </p>
                      <p className="text-ipb-light text-[10px] mt-1 font-medium">Pierre M. — Castres <span className="text-yellow-500">★★★★★</span></p>
                    </div>
                  </div>
                  <div className="bg-ipb-cream rounded-xl p-3 flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm flex-shrink-0">S</div>
                    <div>
                      <p className="text-ipb-muted text-xs italic leading-relaxed">
                        &quot;Diagnostic très complet, rapport détaillé avec photos. On voit que c&apos;est un vrai professionnel, pas un commercial.&quot;
                      </p>
                      <p className="text-ipb-light text-[10px] mt-1 font-medium">Sophie L. — Colomiers <span className="text-yellow-500">★★★★★</span></p>
                    </div>
                  </div>
                </div>

                {/* Appel direct */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold">Besoin d&apos;un avis immédiat ?</p>
                    <p className="text-ipb-light text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                      Expert disponible — réponse rapide
                    </p>
                  </div>
                  <a
                    href="tel:0582953375"
                    onClick={trackPhoneClick}
                    className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex-shrink-0"
                  >
                    Appeler
                  </a>
                </div>
              </div>
            )}

            {/* ===== ÉTAPES 1-N : QUESTIONNAIRE ===== */}
            {step > 0 && step <= totalQuestions && currentQuestion && (
              <div key={`question-${step}`} className="min-h-[320px] md:min-h-[360px] flex flex-col">
                {/* Micro-conversion : capture téléphone après Q3 */}
                {step === 4 && !earlyPhoneCaptured && !earlyPhoneDismissed && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 flex items-center gap-3">
                    <span className="text-lg flex-shrink-0">📱</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-ipb-text text-xs font-medium">Recevez votre diagnostic par SMS</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <input
                          type="tel"
                          value={earlyPhone}
                          onChange={(e) => setEarlyPhone(e.target.value)}
                          placeholder="06 12 34 56 78"
                          className="flex-1 min-w-0 px-3 py-1.5 rounded-lg border border-blue-200 text-sm outline-none focus:border-blue-400 bg-white"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            if (earlyPhone.trim().length >= 8) {
                              setContactInfo(prev => ({ ...prev, phone: earlyPhone.trim() }));
                              setEarlyPhoneCaptured(true);
                              try {
                                await submitQuickCallback('Prospect diagnostic', earlyPhone.trim());
                              } catch { /* silently handle */ }
                            }
                          }}
                          className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                    <button type="button" onClick={() => setEarlyPhoneDismissed(true)} className="text-ipb-light hover:text-ipb-muted text-sm flex-shrink-0">✕</button>
                  </div>
                )}
                {step === 4 && earlyPhoneCaptured && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-2.5 mb-4 flex items-center gap-2 text-xs text-green-700 font-medium">
                    <span>✓</span> Numéro enregistré — vous recevrez votre diagnostic
                  </div>
                )}

                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-ipb-text mb-1 leading-snug">
                    {currentQuestion.text}
                  </h2>
                  <p className="text-ipb-light text-xs md:text-sm mb-4 md:mb-5">
                    {isMultiQuestion ? 'Plusieurs réponses possibles' : 'Sélectionnez votre réponse'}
                  </p>

                  <div className="space-y-2 md:space-y-2.5">
                    {currentQuestion.options.map((option) => {
                      const isSelected = isMultiQuestion
                        ? (answers[currentQuestion.id] as string[] || []).includes(option.value)
                        : answers[currentQuestion.id] === option.value;

                      return (
                        <button
                          key={option.value}
                          onClick={() => {
                            if (isMultiQuestion) {
                              const current = (answers[currentQuestion.id] as string[]) || [];
                              const newValue = current.includes(option.value)
                                ? current.filter(v => v !== option.value)
                                : [...current, option.value];
                              handleAnswer(currentQuestion.id, newValue, true);
                            } else {
                              handleAnswer(currentQuestion.id, option.value, false);
                            }
                          }}
                          className={`
                            w-full flex items-center gap-3 px-4 py-3 md:px-5 md:py-3.5 rounded-xl border-2 transition-all duration-150 text-left
                            ${isSelected
                              ? 'bg-ipb-stone border-ipb-orange shadow-sm'
                              : 'bg-white border-ipb-rule hover:border-ipb-rule hover:bg-ipb-cream'
                            }
                          `}
                        >
                          <span className={`font-medium flex-1 text-sm ${isSelected ? 'text-ipb-orange' : 'text-ipb-text'}`}>
                            {option.label}
                          </span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? 'bg-ipb-orange border-ipb-orange' : 'border-ipb-rule'
                          }`}>
                            {isSelected && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Conseil expert contextuel */}
                  {(() => {
                    const answer = answers[currentQuestion.id];
                    if (!answer || !path) return null;
                    // Pour les multi-select, on prend le premier tip trouvé
                    const values = Array.isArray(answer) ? answer : [answer];
                    const tip = values.reduce<string | null>((found, val) => {
                      if (found) return found;
                      return expertTips[`${path}:${currentQuestion.id}:${val}`] || null;
                    }, null);
                    if (!tip) return null;
                    return (
                      <div className="mt-3 bg-ipb-cream border border-ipb-rule rounded-xl p-3 flex items-start gap-2.5">
                        <div className="flex-shrink-0 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                          <span className="text-xs">🎓</span>
                        </div>
                        <div>
                          <p className="text-[10px] text-ipb-light font-bold uppercase tracking-wider mb-0.5">Avis expert IPB</p>
                          <p className="text-ipb-muted text-xs leading-relaxed">{tip}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Navigation */}
                <div className="mt-5 space-y-2">
                  <button
                    onClick={goToNextQuestion}
                    disabled={
                      isMultiQuestion
                        ? !answers[currentQuestion.id] || (answers[currentQuestion.id] as string[]).length === 0
                        : !answers[currentQuestion.id]
                    }
                    className="w-full bg-ipb-navy text-white font-semibold py-3.5 rounded-xl hover:bg-ipb-navy-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {step === totalQuestions ? 'Voir mon diagnostic' : 'Suivant'} →
                  </button>
                  <button
                    onClick={() => setStep(step === 1 ? 0 : step - 1)}
                    className="w-full text-ipb-light hover:text-ipb-muted text-sm py-1 transition-colors"
                  >
                    ← {step === 1 ? 'Revenir au choix' : 'Question précédente'}
                  </button>
                </div>
              </div>
            )}

            {/* ===== ÉTAPE 999 : FORMULAIRE DE CONTACT ===== */}
            {step === 999 && !isAnalyzing && !showResult && (
              <div>
                <div className="text-center mb-5">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-ipb-text mb-1">
                    Vos réponses sont enregistrées !
                  </h2>
                  <p className="text-ipb-muted text-sm">
                    Dernière étape : renseignez vos coordonnées pour recevoir votre diagnostic personnalisé.
                  </p>
                </div>

                {/* Ce que vous allez recevoir */}
                <div className="bg-ipb-cream rounded-xl p-4 mb-5 border border-ipb-rule">
                  <p className="text-xs font-bold text-ipb-text mb-2 uppercase tracking-wide">Votre rapport comprend :</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-ipb-muted">
                    <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Niveau de gravité</span>
                    <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Solution adaptée</span>
                    <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Délai recommandé</span>
                    <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Avis expert gratuit</span>
                  </div>
                </div>

                <form onSubmit={handleSubmitContact} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-ipb-muted mb-1">Nom & Prénom *</label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-3 rounded-xl border border-ipb-rule focus:border-ipb-orange focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                      required
                    />
                  </div>

                  <p className="text-ipb-orange text-[11px] font-medium bg-ipb-stone border border-ipb-rule rounded-lg px-3 py-1.5">
                    Renseignez au moins votre email ou téléphone pour recevoir le diagnostic
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-ipb-muted mb-1">Email {!contactInfo.phone.trim() ? '*' : ''}</label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        placeholder="jean@email.com"
                        required={!contactInfo.phone.trim()}
                        className={`w-full px-4 py-3 rounded-xl border focus:border-ipb-orange focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all ${
                          !contactInfo.email.trim() && !contactInfo.phone.trim() ? 'border-orange-300 bg-ipb-stone/30' : 'border-ipb-rule'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ipb-muted mb-1">Téléphone {!contactInfo.email.trim() ? '*' : ''}</label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="06 12 34 56 78"
                        required={!contactInfo.email.trim()}
                        className={`w-full px-4 py-3 rounded-xl border focus:border-ipb-orange focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all ${
                          !contactInfo.email.trim() && !contactInfo.phone.trim() ? 'border-orange-300 bg-ipb-stone/30' : 'border-ipb-rule'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ipb-muted mb-1">Adresse du bien *</label>
                    <input
                      type="text"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                      placeholder="12 rue des Lilas, votre commune"
                      className="w-full px-4 py-3 rounded-xl border border-ipb-rule focus:border-ipb-orange focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-ipb-muted mb-1">Année construction</label>
                      <select
                        value={contactInfo.yearBuilt}
                        onChange={(e) => setContactInfo({ ...contactInfo, yearBuilt: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-ipb-rule focus:border-ipb-orange focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all"
                      >
                        <option value="">Choisir</option>
                        <option value="avant_1950">Avant 1950</option>
                        <option value="1950_1980">1950 - 1980</option>
                        <option value="1980_2000">1980 - 2000</option>
                        <option value="apres_2000">Après 2000</option>
                        <option value="ne_sais_pas">Je ne sais pas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ipb-muted mb-1">Créneau de rappel</label>
                      <select
                        value={contactInfo.preferredTime}
                        onChange={(e) => setContactInfo({ ...contactInfo, preferredTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-ipb-rule focus:border-ipb-orange focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all"
                      >
                        <option value="">Choisir</option>
                        <option value="matin">Matin (9h-12h)</option>
                        <option value="apres_midi">Après-midi (14h-18h)</option>
                        <option value="soir">Soir (18h-20h)</option>
                        <option value="indifferent">Indifférent</option>
                      </select>
                    </div>
                  </div>

                  {/* Photo */}
                  <div className="border border-dashed border-ipb-rule rounded-xl p-3 hover:border-ipb-rule transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handlePhotoSelect(file, 'main');
                      }}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="flex items-center gap-2.5 cursor-pointer">
                      {photoPreview ? (
                        <div className="flex items-center gap-2.5 w-full">
                          <img src={photoPreview} alt="Aperçu" className="w-11 h-11 object-cover rounded-lg" />
                          <span className="text-green-600 text-xs font-medium flex-1">Photo ajoutée</span>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); setPhotoFile(null); setPhotoPreview(null); }}
                            className="text-red-400 hover:text-red-600 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <span className="text-ipb-light text-xs">📷 Ajouter une photo du problème <span className="text-white/70">(optionnel, aide l'expert)</span></span>
                      )}
                    </label>
                  </div>

                  <FormError message={formError} />
                  {/* keep original spacing */}

                  <button
                    type="submit"
                    className="w-full bg-ipb-navy text-white font-semibold py-3.5 rounded-xl hover:bg-ipb-navy-2 transition-colors text-sm"
                  >
                    Accéder à mon diagnostic →
                  </button>

                  <p className="text-[10px] text-ipb-light text-center leading-relaxed">
                    🔒 Vos données sont protégées et ne seront jamais partagées. En validant, vous acceptez d'être recontacté par IPB.
                  </p>
                </form>
              </div>
            )}

            {/* ===== ANIMATION D'ANALYSE ===== */}
            {isAnalyzing && (
              <div className="py-4">
                <div className="text-center mb-6">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 border-[3px] border-ipb-rule rounded-full" />
                    <div className="absolute inset-0 border-[3px] border-transparent border-t-orange-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl">🔍</span>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-ipb-text mb-1">Notre expert analyse vos réponses</h2>
                  <p className="text-ipb-light text-xs">Veuillez patienter quelques instants...</p>
                </div>

                <div className="space-y-2.5 max-w-sm mx-auto">
                  {analysisSteps.map((s, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all duration-500 ${
                        analysisStep > i
                          ? 'bg-green-50 border-green-200'
                          : analysisStep === i
                            ? 'bg-ipb-stone border-ipb-rule'
                            : 'bg-ipb-cream border-ipb-rule opacity-40'
                      }`}
                    >
                      {analysisStep > i ? (
                        <span className="text-green-500 text-sm font-bold">✓</span>
                      ) : analysisStep === i ? (
                        <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-ipb-rule" />
                      )}
                      <span className={`text-sm ${analysisStep > i ? 'text-green-700 font-medium' : analysisStep === i ? 'text-ipb-orange font-medium' : 'text-ipb-light'}`}>
                        {s.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== RÉSULTAT DU DIAGNOSTIC ===== */}
            {showResult && expertReport && !submitted && (
              <div>
                {/* Header résultat */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-ipb-light font-semibold uppercase tracking-wider mb-0.5">Votre diagnostic</p>
                    <h2 className="text-xl font-bold text-ipb-text">Rapport d'analyse</h2>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    expertReport.urgencyColor === 'red' ? 'bg-red-100 text-red-700' :
                    expertReport.urgencyColor === 'orange' ? 'bg-ipb-stone text-ipb-orange' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {expertReport.urgencyIcon} {expertReport.urgency}
                  </div>
                </div>

                {/* Score bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-ipb-light font-medium">Score de risque</span>
                    <span className="font-bold text-ipb-text">{riskScore}/100</span>
                  </div>
                  <div className="h-2.5 bg-ipb-stone rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        riskScore >= 40 ? 'bg-red-500' : riskScore >= 20 ? 'bg-ipb-orange' : 'bg-green-500'
                      }`}
                      style={{ width: `${riskScore}%` }}
                    />
                  </div>
                </div>

                {/* Diagnostic + Solution */}
                <div className="space-y-3 mb-5">
                  <div className={`rounded-xl p-4 border-l-4 ${
                    expertReport.urgencyColor === 'red' ? 'bg-red-50 border-red-500' :
                    expertReport.urgencyColor === 'orange' ? 'bg-ipb-stone border-ipb-orange' :
                    'bg-green-50 border-green-500'
                  }`}>
                    <p className="font-bold text-ipb-text text-sm mb-1">Diagnostic</p>
                    <p className="text-ipb-muted text-sm leading-relaxed">{expertReport.diagnosis}</p>
                  </div>

                  <div className="bg-ipb-cream rounded-xl p-4 border border-ipb-rule">
                    <p className="font-bold text-ipb-text text-sm mb-1">Solution recommandée</p>
                    <p className="text-ipb-muted text-sm leading-relaxed">{expertReport.solution}</p>
                  </div>

                  <div className="bg-ipb-cream rounded-xl p-3 border border-ipb-rule flex items-center justify-between">
                    <span className="text-xs text-ipb-muted font-medium">Délai d'intervention conseillé</span>
                    <span className="font-bold text-ipb-text text-sm">{expertReport.delay}</span>
                  </div>
                </div>

                {/* Séparateur */}
                <div className="border-t border-ipb-rule my-5" />

                {/* ===== CTA PASSAGE À L'ACTION ===== */}
                <div>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-ipb-text mb-1">
                      {riskScore >= 40
                        ? "Votre situation nécessite une intervention rapide"
                        : riskScore >= 20
                          ? "Confirmez ce diagnostic avec un expert terrain"
                          : "Besoin d'un avis professionnel sur place ?"}
                    </h3>
                    <p className="text-ipb-muted text-xs">
                      Un expert certifié vous rappelle pour organiser l'intervention.
                    </p>
                  </div>

                  {/* Offre */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 mb-4 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-bold text-sm">Diagnostic expert sur site</p>
                        <p className="text-white/60 text-xs">Instrumenté + rapport détaillé</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-400 bg-green-500/20 px-3 py-1 rounded-full">Déduit à 100% des travaux</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-semibold">✓ Déductible des travaux</span>
                      <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full">📋 Rapport remis</span>
                      <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full">💰 Devis gratuit inclus</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitCallback} className="space-y-3">
                    {(contactInfo.phone || callbackInfo.phone) ? (
                      <div className="bg-ipb-cream rounded-xl p-3 text-center">
                        <p className="text-xs text-ipb-muted mb-1">Nous vous rappelons au</p>
                        <p className="font-bold text-ipb-text">{callbackInfo.phone || contactInfo.phone}</p>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-semibold text-ipb-muted mb-1">Votre téléphone pour être rappelé *</label>
                        <input
                          type="tel"
                          value={callbackInfo.phone}
                          onChange={(e) => setCallbackInfo({ ...callbackInfo, phone: e.target.value })}
                          placeholder="06 12 34 56 78"
                          className="w-full px-4 py-3 rounded-xl border border-ipb-rule focus:border-ipb-orange focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                    )}

                    {formError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-2.5">
                        {formError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-ipb-orange hover:bg-ipb-orange text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        'Être rappelé sous 24h →'
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-4 text-[10px] text-ipb-light">
                      <span>✓ Sans engagement</span>
                      <span>✓ Rappel gratuit</span>
                      <span>✓ Intervention 48-72h</span>
                    </div>

                    <div className="text-center pt-2 border-t border-ipb-rule">
                      <a href="tel:0582953375" onClick={trackPhoneClick} className="text-ipb-muted text-xs hover:text-ipb-text transition-colors font-medium">
                        📞 Appel direct : 05 82 95 33 75
                      </a>
                    </div>

                    <p className="text-[10px] text-ipb-light text-center">
                      🔒 Données sécurisées et confidentielles
                    </p>
                  </form>
                </div>
              </div>
            )}

            {/* ===== CONFIRMATION FINALE ===== */}
            {submitted && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-ipb-text mb-2">Demande envoyée avec succès !</h2>
                <p className="text-ipb-muted text-sm mb-4">
                  Un expert IPB vous rappellera sous 24h pour organiser votre diagnostic sur site.
                </p>
                <div className="bg-ipb-cream rounded-xl p-4 text-left max-w-sm mx-auto">
                  <p className="text-xs font-bold text-ipb-text mb-2">Prochaines étapes :</p>
                  <div className="space-y-2 text-xs text-ipb-muted">
                    <div className="flex items-start gap-2">
                      <span className="bg-ipb-stone text-ipb-orange font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                      <span>Appel de notre expert sous 24h</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-ipb-stone text-ipb-orange font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                      <span>Diagnostic instrumenté sur site (déduit des travaux)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-ipb-stone text-ipb-orange font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                      <span>Rapport + devis détaillé gratuit</span>
                    </div>
                  </div>
                </div>
                <a
                  href="tel:0582953375"
                  onClick={trackPhoneClick}
                  className="inline-flex items-center gap-2 mt-5 text-ipb-muted hover:text-ipb-text text-sm font-medium transition-colors"
                >
                  📞 05 82 95 33 75
                </a>
              </div>
            )}

          </div>
        </div>

        {/* Footer info */}
        {step > 0 && step <= totalQuestions && (
          <div className="mt-4">
            <p className="text-center text-ipb-light text-xs">
              ⏱️ Encore {totalQuestions - step + 1} question{totalQuestions - step > 0 ? 's' : ''} • Réponses confidentielles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
