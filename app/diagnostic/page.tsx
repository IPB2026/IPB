"use client"

import React, { useState, useEffect } from 'react';
import { submitDiagnosticCallback, submitDiagnosticLead } from '@/app/actions/diagnostic';
import { useRecaptcha } from '@/hooks/useRecaptcha';

// Types
type PathType = 'fissure' | 'humidite' | null;

interface Question {
  id: string;
  text: string;
  options: { value: string; label: string; icon?: string }[];
  multiSelect?: boolean;
}

// Questions par parcours
const questionsData: Record<'fissure' | 'humidite', Question[]> = {
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
  humidite: [
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
      text: 'Où se situe l\'humidité ?',
      options: [
        { value: 'bas_mur', label: 'Bas des murs', icon: '⬇️' },
        { value: 'haut_mur', label: 'Haut des murs / Plafond', icon: '⬆️' },
        { value: 'angle', label: 'Angles / Coins', icon: '📐' },
        { value: 'partout', label: 'Partout', icon: '💧' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
      multiSelect: true,
    },
    {
      id: 'MANIFESTATION',
      text: 'Comment se manifeste l\'humidité ?',
      options: [
        { value: 'salpetre', label: 'Salpêtre (poudre blanche)', icon: '❄️' },
        { value: 'moisissure', label: 'Moisissures noires', icon: '🦠' },
        { value: 'peinture', label: 'Peinture qui cloque', icon: '🎨' },
        { value: 'odeur', label: 'Odeur de moisi', icon: '👃' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
      multiSelect: true,
    },
    {
      id: 'ANCIENNETE',
      text: 'Depuis quand ce problème existe-t-il ?',
      options: [
        { value: 'recent', label: 'Moins de 6 mois', icon: '🆕' },
        { value: 'moyen', label: '6 mois à 2 ans', icon: '📅' },
        { value: 'ancien', label: 'Plus de 2 ans', icon: '📆' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'SAISONNALITE',
      text: 'Le problème est-il saisonnier ?',
      options: [
        { value: 'hiver', label: 'Pire en hiver', icon: '❄️' },
        { value: 'ete', label: 'Pire en été / après pluie', icon: '☀️' },
        { value: 'permanent', label: 'Présent toute l\'année', icon: '🔄' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'VENTILATION',
      text: 'Avez-vous une VMC / ventilation ?',
      options: [
        { value: 'oui_fonctionne', label: 'Oui, elle fonctionne', icon: '✓' },
        { value: 'oui_panne', label: 'Oui, mais en panne', icon: '⚠️' },
        { value: 'non', label: 'Non', icon: '✗' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
    {
      id: 'TENTATIVES',
      text: 'Avez-vous déjà tenté de traiter ?',
      options: [
        { value: 'peinture', label: 'Peinture anti-humidité', icon: '🎨' },
        { value: 'deshu', label: 'Déshumidificateur', icon: '💨' },
        { value: 'travaux', label: 'Travaux (injection, cuvelage...)', icon: '🔧' },
        { value: 'rien', label: 'Rien pour l\'instant', icon: '✗' },
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
        { value: 'immediate', label: 'Très urgent, ça empire', icon: '🔴' },
        { value: 'modere', label: 'Gênant, à traiter rapidement', icon: '🟠' },
        { value: 'surveille', label: 'À surveiller, pas d\'urgence', icon: '🟢' },
        { value: 'ne_sais_pas', label: 'Je ne sais pas', icon: '❓' },
      ],
    },
  ],
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
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackInfo, setCallbackInfo] = useState({ name: '', phone: '', email: '' });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedNeed, setSelectedNeed] = useState<'expertise' | 'travaux' | null>(null);
  const [callbackPhotoFile, setCallbackPhotoFile] = useState<File | null>(null);
  const [callbackPhotoPreview, setCallbackPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  // reCAPTCHA v3 protection
  const { getToken } = useRecaptcha();

  const currentQuestions = path ? questionsData[path] : [];
  const totalQuestions = currentQuestions.length;
  const progress = path ? (step / totalQuestions) * 100 : 0;

  // Calcul du score de risque en temps réel
  const calculateRisk = (pathType: 'fissure' | 'humidite', ans: Record<string, any>) => {
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
      if (ans.MANIFESTATION?.includes('salpetre')) score += 20;
      if (ans.MANIFESTATION?.includes('moisissure')) score += 15;
      if (ans.SAISONNALITE === 'permanent') score += 15;
      if (ans.VENTILATION === 'non') score += 10;
      if (ans.TENTATIVES?.includes('peinture')) score += 5;
      if (ans.URGENCE === 'immediate') score += 10;
      else if (ans.URGENCE === 'modere') score += 5;
    }
    return Math.min(score, 100);
  };

  const liveRisk = path ? calculateRisk(path, answers) : 0;
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
  const getExpertReport = (pathType: 'fissure' | 'humidite', score: number) => {
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
          urgency: 'Urgent',
          urgencyIcon: '🔴',
          urgencyColor: 'red',
          diagnosis: 'Vous présentez les signes caractéristiques de remontées capillaires importantes. L\'humidité ascensionnelle dégrade vos murs et crée un environnement malsain (moisissures, salpêtre, allergènes).',
          solution: 'Injection de résine hydrophobe en pied de mur + traitement curatif (assèchement, cuvelage si cave). Installation d\'une VMI recommandée en complément pour assainir l\'air intérieur.',
          delay: 'Sous 4 à 6 semaines',
        };
      } else if (score >= 20) {
        return {
          urgency: 'À traiter',
          urgencyIcon: '🟠',
          urgencyColor: 'orange',
          diagnosis: 'Votre problème d\'humidité est significatif et nécessite un traitement adapté. Il peut s\'agir de remontées capillaires, de condensation excessive ou d\'infiltrations localisées.',
          solution: 'Un diagnostic précis permettra d\'identifier la cause exacte. Selon le cas : injection résine, amélioration de la ventilation (VMC/VMI), ou réparation des infiltrations.',
          delay: 'Sous 2 à 3 mois',
        };
      } else {
        return {
          urgency: 'Surveillance',
          urgencyIcon: '🟢',
          urgencyColor: 'green',
          diagnosis: 'Votre problème d\'humidité semble modéré et probablement lié à un défaut de ventilation (condensation) plutôt qu\'à une infiltration structurelle.',
          solution: 'Amélioration de la ventilation (une VMC simple flux suffit souvent). Si le problème persiste, un diagnostic confirmera l\'absence de remontées capillaires.',
          delay: 'Pas d\'urgence immédiate',
        };
      }
    }
  };

  // Scroll vers le haut de la carte à chaque changement d'étape
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [step, isAnalyzing, showResult, submitted]);

  // Gestion du choix de parcours
  const selectPath = (selectedPath: 'fissure' | 'humidite') => {
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
    if (!contactInfo.name.trim()) { alert('Veuillez saisir votre nom'); return; }
    if (!contactInfo.email.trim() && !contactInfo.phone.trim()) { alert('Veuillez saisir au moins un email ou un téléphone'); return; }
    if (!contactInfo.address.trim()) { alert('Veuillez saisir l\'adresse du bien'); return; }

    setIsAnalyzing(true);
    const score = calculateRisk(path!, answers);
    setRiskScore(score);

    const recaptchaToken = await getToken('diagnostic_lead');

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
      if (photoPreview && photoFile) {
        formData.append('photo', photoPreview);
        formData.append('photoName', photoFile.name);
      }
      await submitDiagnosticLead(formData);
    } catch (error) {
      console.error('Erreur envoi lead:', error);
    }

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
      setCallbackInfo({ name: contactInfo.name, phone: contactInfo.phone, email: contactInfo.email });
    }, 3500);
  };

  // Callback
  const handleSubmitCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackInfo.name.trim() || !callbackInfo.phone.trim()) {
      alert('Merci de renseigner votre nom et votre téléphone.');
      return;
    }
    setIsSubmitting(true);
    const recaptchaToken = await getToken('diagnostic_callback');
    try {
      const formData = new FormData();
      formData.append('name', callbackInfo.name);
      formData.append('phone', callbackInfo.phone);
      formData.append('email', callbackInfo.email || contactInfo.email || '');
      formData.append('path', path || 'fissure');
      formData.append('answers', JSON.stringify(answers));
      formData.append('riskScore', String(riskScore));
      formData.append('needType', 'diagnostic');
      if (recaptchaToken) formData.append('recaptchaToken', recaptchaToken);
      if (callbackPhotoPreview && callbackPhotoFile) {
        formData.append('photo', callbackPhotoPreview);
        formData.append('photoName', callbackPhotoFile.name);
      } else if (photoPreview && photoFile) {
        formData.append('photo', photoPreview);
        formData.append('photoName', photoFile.name);
      }
      const result = await submitDiagnosticCallback(formData);
      if (result.success) {
        setSubmitted(true);
        setShowCallbackForm(false);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Erreur lors de la demande. Appelez-nous au 05 82 95 33 75.');
    }
    setIsSubmitting(false);
  };

  const currentQuestion = currentQuestions[step - 1];
  const isMultiQuestion = currentQuestion?.multiSelect;
  const expertReport = showResult && path ? getExpertReport(path, riskScore) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex justify-center px-4 pt-8 pb-12 md:pt-16">
      <div className="w-full max-w-2xl">

        {/* ===== BARRE DE PROGRESSION + INDICATEUR DE RISQUE ===== */}
        {step > 0 && step <= totalQuestions && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-slate-800 text-white font-bold px-2.5 py-1 rounded-full text-xs tracking-wide">
                  {step}/{totalQuestions}
                </span>
                <span className="text-slate-500 text-xs font-medium">
                  {step <= 3 ? 'Analyse du problème' : step <= 6 ? 'Évaluation de gravité' : 'Finalisation'}
                </span>
              </div>
              {step > 2 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  riskColor === 'red' ? 'bg-red-100 text-red-700' :
                  riskColor === 'orange' ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {riskColor === 'red' ? '⚠️' : riskColor === 'orange' ? '🔶' : '✅'} Risque {riskLabel}
                </span>
              )}
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(progress, 8)}%` }}
              />
            </div>
            {/* Jauge de risque en temps réel */}
            {step > 2 && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Criticité</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      riskColor === 'red' ? 'bg-red-500' :
                      riskColor === 'orange' ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.max(liveRisk * 2, 5)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== CARTE PRINCIPALE ===== */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden min-h-[420px]">
          <div className="p-6 md:p-8">

            {/* ===== ÉTAPE 0 : ACCUEIL ===== */}
            {step === 0 && (
              <div>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                    Diagnostic en ligne gratuit
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 leading-tight">
                    Votre bâtiment présente<br />
                    <span className="text-orange-500">des signes inquiétants ?</span>
                  </h1>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Répondez à 9 questions et obtenez immédiatement l'avis d'un expert en pathologie du bâtiment.
                  </p>
                </div>

                {/* Boutons de choix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <button
                    onClick={() => selectPath('fissure')}
                    className="group relative bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 hover:border-orange-400 rounded-xl p-5 transition-all text-left hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">🏠</span>
                      <div>
                        <h2 className="font-bold text-slate-900 text-base mb-0.5">Fissures & Structure</h2>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          Fissures en façade, murs, tassement, portes qui coincent...
                        </p>
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 text-orange-400 group-hover:text-orange-600 text-sm font-semibold transition-colors">
                      Commencer →
                    </span>
                  </button>

                  <button
                    onClick={() => selectPath('humidite')}
                    className="group relative bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:border-blue-400 rounded-xl p-5 transition-all text-left hover:shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">💧</span>
                      <div>
                        <h2 className="font-bold text-slate-900 text-base mb-0.5">Humidité & Infiltrations</h2>
                        <p className="text-slate-500 text-xs leading-relaxed">
                          Salpêtre, moisissures, murs humides, odeur de moisi...
                        </p>
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 text-blue-400 group-hover:text-blue-600 text-sm font-semibold transition-colors">
                      Commencer →
                    </span>
                  </button>
                </div>

                {/* Réassurance */}
                <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mb-5">
                  <span className="flex items-center gap-1">⏱️ 2 min</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="flex items-center gap-1">🔒 Sécurisé</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="flex items-center gap-1">✓ Sans engagement</span>
                </div>

                {/* Social proof */}
                <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-base flex-shrink-0">
                    👨
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs italic leading-relaxed">
                      "En 2 minutes j'ai compris la gravité de mes fissures. L'expert m'a rappelé le lendemain, intervention réalisée en 3 jours."
                    </p>
                    <p className="text-slate-400 text-[10px] mt-1 font-medium">
                      Pierre M. — Toulouse • ⭐⭐⭐⭐⭐
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ===== ÉTAPES 1-N : QUESTIONNAIRE ===== */}
            {step > 0 && step <= totalQuestions && currentQuestion && (
              <div key={`question-${step}`} className="min-h-[320px] flex flex-col">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 leading-snug">
                    {currentQuestion.text}
                  </h2>
                  <p className="text-slate-400 text-xs mb-4">
                    {isMultiQuestion ? 'Plusieurs réponses possibles' : 'Sélectionnez votre réponse'}
                  </p>

                  <div className="space-y-2">
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
                            w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-150 text-left
                            ${isSelected
                              ? 'bg-orange-50 border-orange-500 shadow-sm'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }
                          `}
                        >
                          <span className="text-lg flex-shrink-0">{option.icon}</span>
                          <span className={`font-medium flex-1 text-sm ${isSelected ? 'text-orange-700' : 'text-slate-700'}`}>
                            {option.label}
                          </span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected ? 'bg-orange-500 border-orange-500' : 'border-slate-300'
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
                    className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {step === totalQuestions ? 'Voir mon diagnostic' : 'Suivant'} →
                  </button>
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="w-full text-slate-400 hover:text-slate-600 text-sm py-1 transition-colors"
                    >
                      ← Question précédente
                    </button>
                  )}
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
                  <h2 className="text-xl font-bold text-slate-900 mb-1">
                    Vos réponses sont enregistrées !
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Dernière étape : renseignez vos coordonnées pour recevoir votre diagnostic personnalisé.
                  </p>
                </div>

                {/* Ce que vous allez recevoir */}
                <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
                  <p className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Votre rapport comprend :</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Niveau de gravité</span>
                    <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Solution adaptée</span>
                    <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Délai recommandé</span>
                    <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Avis expert gratuit</span>
                  </div>
                </div>

                <form onSubmit={handleSubmitContact} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Nom & Prénom *</label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        placeholder="jean@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Téléphone</label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="06 12 34 56 78"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Adresse du bien *</label>
                    <input
                      type="text"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                      placeholder="12 rue des Lilas, 31000 Toulouse"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Année construction</label>
                      <select
                        value={contactInfo.yearBuilt}
                        onChange={(e) => setContactInfo({ ...contactInfo, yearBuilt: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all"
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
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Créneau de rappel</label>
                      <select
                        value={contactInfo.preferredTime}
                        onChange={(e) => setContactInfo({ ...contactInfo, preferredTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all"
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
                  <div className="border border-dashed border-slate-200 rounded-xl p-3 hover:border-slate-300 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) { alert('La photo ne doit pas dépasser 5 Mo'); return; }
                          setPhotoFile(file);
                          const reader = new FileReader();
                          reader.onloadend = () => setPhotoPreview(reader.result as string);
                          reader.readAsDataURL(file);
                        }
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
                        <span className="text-slate-400 text-xs">📷 Ajouter une photo du problème <span className="text-slate-300">(optionnel, aide l'expert)</span></span>
                      )}
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-xl hover:bg-slate-800 transition-colors text-sm"
                  >
                    Accéder à mon diagnostic →
                  </button>

                  <p className="text-[10px] text-slate-400 text-center leading-relaxed">
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
                    <div className="absolute inset-0 border-[3px] border-slate-200 rounded-full" />
                    <div className="absolute inset-0 border-[3px] border-transparent border-t-orange-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl">🔍</span>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mb-1">Notre expert analyse vos réponses</h2>
                  <p className="text-slate-400 text-xs">Veuillez patienter quelques instants...</p>
                </div>

                <div className="space-y-2.5 max-w-sm mx-auto">
                  {analysisSteps.map((s, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all duration-500 ${
                        analysisStep > i
                          ? 'bg-green-50 border-green-200'
                          : analysisStep === i
                            ? 'bg-orange-50 border-orange-200'
                            : 'bg-slate-50 border-slate-100 opacity-40'
                      }`}
                    >
                      {analysisStep > i ? (
                        <span className="text-green-500 text-sm font-bold">✓</span>
                      ) : analysisStep === i ? (
                        <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300" />
                      )}
                      <span className={`text-sm ${analysisStep > i ? 'text-green-700 font-medium' : analysisStep === i ? 'text-orange-700 font-medium' : 'text-slate-400'}`}>
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
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Votre diagnostic</p>
                    <h2 className="text-xl font-bold text-slate-900">Rapport d'analyse</h2>
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    expertReport.urgencyColor === 'red' ? 'bg-red-100 text-red-700' :
                    expertReport.urgencyColor === 'orange' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {expertReport.urgencyIcon} {expertReport.urgency}
                  </div>
                </div>

                {/* Score bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium">Score de risque</span>
                    <span className="font-bold text-slate-700">{riskScore}/50</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        riskScore >= 40 ? 'bg-red-500' : riskScore >= 20 ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${riskScore * 2}%` }}
                    />
                  </div>
                </div>

                {/* Diagnostic + Solution */}
                <div className="space-y-3 mb-5">
                  <div className={`rounded-xl p-4 border-l-4 ${
                    expertReport.urgencyColor === 'red' ? 'bg-red-50 border-red-500' :
                    expertReport.urgencyColor === 'orange' ? 'bg-orange-50 border-orange-500' :
                    'bg-green-50 border-green-500'
                  }`}>
                    <p className="font-bold text-slate-800 text-sm mb-1">Diagnostic</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{expertReport.diagnosis}</p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p className="font-bold text-slate-800 text-sm mb-1">Solution recommandée</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{expertReport.solution}</p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Délai d'intervention conseillé</span>
                    <span className="font-bold text-slate-800 text-sm">{expertReport.delay}</span>
                  </div>
                </div>

                {/* Séparateur */}
                <div className="border-t border-slate-100 my-5" />

                {/* ===== CTA PASSAGE À L'ACTION ===== */}
                <div>
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {riskScore >= 40
                        ? "Votre situation nécessite une intervention rapide"
                        : riskScore >= 20
                          ? "Confirmez ce diagnostic avec un expert terrain"
                          : "Besoin d'un avis professionnel sur place ?"}
                    </h3>
                    <p className="text-slate-500 text-xs">
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
                        <p className="font-extrabold text-lg">149€ <span className="text-xs font-normal text-white/60">HT</span></p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-semibold">✓ Déductible des travaux</span>
                      <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full">📋 Rapport remis</span>
                      <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded-full">💰 Devis gratuit inclus</span>
                    </div>
                  </div>

                  {/* Formulaire de rappel */}
                  {!showCallbackForm ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={callbackInfo.name || contactInfo.name}
                          onChange={(e) => setCallbackInfo({ ...callbackInfo, name: e.target.value })}
                          placeholder="Votre nom"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                        />
                        <input
                          type="tel"
                          value={callbackInfo.phone}
                          onChange={(e) => setCallbackInfo({ ...callbackInfo, phone: e.target.value })}
                          placeholder="Votre téléphone"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!callbackInfo.name && !contactInfo.name) { alert('Merci de renseigner votre nom'); return; }
                          if (!callbackInfo.phone) { alert('Merci de renseigner votre téléphone'); return; }
                          setCallbackInfo({ ...callbackInfo, name: callbackInfo.name || contactInfo.name });
                          setSelectedNeed('expertise');
                          setShowCallbackForm(true);
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors"
                      >
                        Être rappelé sous 24h
                      </button>

                      <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400">
                        <span>✓ Sans engagement</span>
                        <span>✓ Rappel gratuit</span>
                        <span>✓ Intervention 48-72h</span>
                      </div>

                      <div className="text-center pt-2 border-t border-slate-100">
                        <a href="tel:0582953375" className="text-slate-500 text-xs hover:text-slate-700 transition-colors font-medium">
                          📞 Appel direct : 05 82 95 33 75
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitCallback} className="space-y-3">
                      <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center mb-1">
                        <p className="text-green-700 text-xs font-medium">
                          Confirmez vos coordonnées pour que notre expert vous rappelle
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Nom</label>
                        <input
                          type="text"
                          value={callbackInfo.name || contactInfo.name}
                          onChange={(e) => setCallbackInfo({ ...callbackInfo, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Téléphone</label>
                        <input
                          type="tel"
                          value={callbackInfo.phone}
                          onChange={(e) => setCallbackInfo({ ...callbackInfo, phone: e.target.value })}
                          placeholder="06 12 34 56 78"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none text-sm transition-all"
                          required
                        />
                      </div>

                      {/* Photo optionnelle si pas déjà transmise */}
                      {!photoPreview && (
                        <div className="border border-dashed border-slate-200 rounded-xl p-3 hover:border-slate-300 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 5 * 1024 * 1024) { alert('La photo ne doit pas dépasser 5 Mo'); return; }
                                setCallbackPhotoFile(file);
                                const reader = new FileReader();
                                reader.onloadend = () => setCallbackPhotoPreview(reader.result as string);
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                            id="callback-photo-upload"
                          />
                          <label htmlFor="callback-photo-upload" className="flex items-center gap-2.5 cursor-pointer text-xs">
                            {callbackPhotoPreview ? (
                              <div className="flex items-center gap-2.5 w-full">
                                <img src={callbackPhotoPreview} alt="Aperçu" className="w-10 h-10 object-cover rounded-lg" />
                                <span className="text-green-600 font-medium flex-1">Photo ajoutée</span>
                                <button
                                  type="button"
                                  onClick={(e) => { e.preventDefault(); setCallbackPhotoFile(null); setCallbackPhotoPreview(null); }}
                                  className="text-red-400 hover:text-red-600"
                                >✕</button>
                              </div>
                            ) : (
                              <span className="text-slate-400">📷 Ajouter une photo (optionnel)</span>
                            )}
                          </label>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          'Confirmer ma demande de rappel'
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => { setShowCallbackForm(false); setCallbackPhotoFile(null); setCallbackPhotoPreview(null); }}
                        className="w-full text-slate-400 hover:text-slate-600 text-xs py-1 transition-colors"
                      >
                        ← Retour
                      </button>

                      <p className="text-[10px] text-slate-400 text-center">
                        🔒 Données sécurisées et confidentielles
                      </p>
                    </form>
                  )}
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
                <h2 className="text-xl font-bold text-slate-900 mb-2">Demande envoyée avec succès !</h2>
                <p className="text-slate-500 text-sm mb-4">
                  Un expert IPB vous rappellera sous 24h pour organiser votre diagnostic sur site.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 text-left max-w-sm mx-auto">
                  <p className="text-xs font-bold text-slate-700 mb-2">Prochaines étapes :</p>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <span className="bg-orange-100 text-orange-600 font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                      <span>Appel de notre expert sous 24h</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-orange-100 text-orange-600 font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                      <span>Diagnostic instrumenté sur site (149€ HT)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-orange-100 text-orange-600 font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                      <span>Rapport + devis détaillé gratuit</span>
                    </div>
                  </div>
                </div>
                <a
                  href="tel:0582953375"
                  className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors"
                >
                  📞 05 82 95 33 75
                </a>
              </div>
            )}

          </div>
        </div>

        {/* Footer info */}
        {step > 0 && step <= totalQuestions && (
          <p className="text-center text-slate-400 text-xs mt-4">
            ⏱️ Encore {totalQuestions - step + 1} question{totalQuestions - step > 0 ? 's' : ''} • Réponses confidentielles
          </p>
        )}
      </div>
    </div>
  );
}
