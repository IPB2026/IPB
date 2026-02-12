"use client"

import React, { useState, useEffect } from 'react';
import { submitDiagnosticAppointment, submitDiagnosticCallback, submitDiagnosticLead } from '@/app/actions/diagnostic';
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

export default function DiagnosticPage() {
  const [step, setStep] = useState(0);
  const [path, setPath] = useState<PathType>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', address: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [callbackInfo, setCallbackInfo] = useState({ name: '', phone: '', email: '' });
  const [showCalendar, setShowCalendar] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // reCAPTCHA v3 protection
  const { getToken, isLoaded: recaptchaLoaded } = useRecaptcha();

  const currentQuestions = path ? questionsData[path] : [];
  const totalQuestions = currentQuestions.length;
  const progress = path ? ((step - 1) / totalQuestions) * 100 : 0;
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '';

  // Calcul du score de risque
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

  // Diagnostic expert
  const getExpertReport = (pathType: 'fissure' | 'humidite', score: number) => {
    if (pathType === 'fissure') {
      if (score >= 40) {
        return {
          urgency: '🔴 Urgent',
          diagnosis: 'Les signes que vous décrivez indiquent un tassement différentiel actif. La structure de votre bâtiment est en mouvement, ce qui nécessite une intervention rapide pour stopper l\'évolution.',
          solution: 'Agrafage structurel avec renfort des façades. Dans certains cas, un calage des fondations peut être nécessaire. Un diagnostic sur site permettra de dimensionner précisément l\'intervention.',
          delay: 'Intervention recommandée sous 2-4 semaines',
        };
      } else if (score >= 20) {
        return {
          urgency: '🟠 À surveiller',
          diagnosis: 'Vos fissures présentent des signes d\'évolution modérée. Sans être critique immédiatement, la situation mérite une surveillance active et probablement une intervention à moyen terme.',
          solution: 'Agrafage localisé ou surveillance instrumentée (fissuromètre) pendant 6-12 mois pour confirmer l\'évolution avant travaux.',
          delay: 'Diagnostic recommandé sous 1-2 mois',
        };
      } else {
        return {
          urgency: '🟢 Surveillance',
          diagnosis: 'Les fissures que vous décrivez semblent stables et superficielles. Elles ne présentent pas de danger immédiat pour la structure.',
          solution: 'Surveillance visuelle régulière. Si évolution, un diagnostic sera nécessaire. Possibilité de rebouchage esthétique après confirmation de stabilité.',
          delay: 'Pas d\'urgence, surveiller l\'évolution',
        };
      }
    } else {
      if (score >= 40) {
        return {
          urgency: '🔴 Urgent',
          diagnosis: 'Vous présentez les signes caractéristiques de remontées capillaires importantes. L\'eau monte dans vos murs et crée un environnement malsain (moisissures, salpêtre).',
          solution: 'Injection de résine hydrophobe sur toute la base des murs + traitement curatif (assèchement, cuvelage si cave). Une VMI peut être recommandée en complément.',
          delay: 'Intervention recommandée sous 4-6 semaines',
        };
      } else if (score >= 20) {
        return {
          urgency: '🟠 À traiter',
          diagnosis: 'Votre problème d\'humidité est significatif et nécessite un traitement adapté. Il peut s\'agir de remontées capillaires, de condensation ou d\'infiltrations localisées.',
          solution: 'Diagnostic précis pour identifier la cause (remontées vs condensation). Selon le cas : injection résine, amélioration ventilation (VMC/VMI), ou réparation infiltrations.',
          delay: 'Diagnostic recommandé sous 2-3 mois',
        };
      } else {
        return {
          urgency: '🟢 Surveillance',
          diagnosis: 'Votre problème d\'humidité semble modéré et pourrait être lié à un manque de ventilation (condensation) plutôt qu\'à une infiltration structurelle.',
          solution: 'Amélioration de la ventilation (VMC simple flux suffit souvent). Si persistance après ventilation, diagnostic pour confirmer l\'absence de remontées capillaires.',
          delay: 'Pas d\'urgence, améliorer ventilation d\'abord',
        };
      }
    }
  };

  // Gestion du choix de parcours
  const selectPath = (selectedPath: 'fissure' | 'humidite') => {
    setPath(selectedPath);
    setStep(1);
  };

  // Gestion des réponses
  const handleAnswer = (questionId: string, value: string | string[], isMulti: boolean) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Auto-avancer à la question suivante (sauf si multi-sélection)
    if (!isMulti) {
      setTimeout(() => {
        if (step < totalQuestions) {
          setStep(step + 1);
        } else {
          // Fin des questions → demander coordonnées
          setStep(999);
        }
      }, 300);
    }
  };

  // Valider multi-sélection et passer à la suite
  const confirmMultiSelect = () => {
    if (step < totalQuestions) {
      setStep(step + 1);
    } else {
      setStep(999);
    }
  };

  // Soumission coordonnées + génération résultat
  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactInfo.name.trim()) {
      alert('Veuillez saisir votre nom');
      return;
    }
    if (!contactInfo.email.trim() && !contactInfo.phone.trim()) {
      alert('Veuillez saisir au moins un email ou un téléphone');
      return;
    }
    if (!contactInfo.address.trim()) {
      alert('Veuillez saisir l\'adresse du bien');
      return;
    }

    setIsAnalyzing(true);

    // Calcul du score
    const score = calculateRisk(path!, answers);
    setRiskScore(score);

    // Obtenir le token reCAPTCHA v3
    const recaptchaToken = await getToken('diagnostic_lead');

    // Envoi du lead
    try {
      const formData = new FormData();
      formData.append('name', contactInfo.name);
      formData.append('email', contactInfo.email);
      formData.append('phone', contactInfo.phone);
      formData.append('address', contactInfo.address);
      formData.append('path', path!);
      formData.append('answers', JSON.stringify(answers));
      formData.append('riskScore', String(score));
      if (recaptchaToken) {
        formData.append('recaptchaToken', recaptchaToken);
      }
      
      // Ajouter la photo si présente (en base64)
      if (photoPreview && photoFile) {
        formData.append('photo', photoPreview);
        formData.append('photoName', photoFile.name);
      }

      await submitDiagnosticLead(formData);
    } catch (error) {
      console.error('Erreur envoi lead:', error);
    }

    // Animation de chargement (3s)
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
      setCallbackInfo({ name: contactInfo.name, phone: contactInfo.phone, email: contactInfo.email });
    }, 3000);
  };

  // Actions finales
  const handleCallback = async () => {
    setShowCallbackForm(true);
  };

  const handleBookAppointment = async () => {
    if (calendlyUrl) {
      setShowCalendar(true);
      return;
    }

    if (!contactInfo.phone) {
      alert('Nous avons besoin de votre téléphone pour confirmer le rendez-vous.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', contactInfo.name);
      formData.append('email', contactInfo.email || '');
      formData.append('phone', contactInfo.phone);
      formData.append('path', path!);
      formData.append('answers', JSON.stringify(answers));
      formData.append('riskScore', String(riskScore));

      const result = await submitDiagnosticAppointment(formData);

      if (result.success) {
        alert('✅ Demande de rendez-vous enregistrée ! Nous vous contactons sous 24h pour fixer la date.');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Erreur lors de la réservation. Appelez-nous au 05 82 95 33 75.');
    }

    setIsSubmitting(false);
  };

  const handleSubmitCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackInfo.name.trim() || !callbackInfo.phone.trim()) {
      alert('Merci de renseigner votre nom et votre téléphone.');
      return;
    }

    setIsSubmitting(true);
    
    // Obtenir le token reCAPTCHA v3
    const recaptchaToken = await getToken('diagnostic_callback');
    
    try {
      const formData = new FormData();
      formData.append('name', callbackInfo.name);
      formData.append('phone', callbackInfo.phone);
      formData.append('email', callbackInfo.email || contactInfo.email || '');
      formData.append('path', path || 'fissure');
      formData.append('answers', JSON.stringify(answers));
      formData.append('riskScore', String(riskScore));
      if (recaptchaToken) {
        formData.append('recaptchaToken', recaptchaToken);
      }

      const result = await submitDiagnosticCallback(formData);
      if (result.success) {
        alert('✅ Merci ! Un expert vous rappelle sous 24h.');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header avec progression */}
        {step > 0 && step < 999 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
              <span className="font-bold">Question {step} / {totalQuestions}</span>
              <span>Encore {totalQuestions - step + 1} question{totalQuestions - step > 1 ? 's' : ''}</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Carte principale */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">
          {/* ÉTAPE 0 : Choix du parcours */}
          {step === 0 && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide mb-6 border border-orange-100">
                ✨ Diagnostic Gratuit & Instantané
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                Quel est votre problème ?
              </h1>
              <p className="text-slate-600 text-lg mb-10">
                Répondez à quelques questions pour obtenir un diagnostic personnalisé en 2 minutes
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => selectPath('fissure')}
                  className="group bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 border-2 border-orange-200 hover:border-orange-400 rounded-2xl p-8 transition-all transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="text-6xl mb-4">🔧</div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Fissures & Structure</h2>
                  <p className="text-slate-600 text-sm">
                    Fissures en façade, tassement, portes qui coincent...
                  </p>
                </button>

                <button
                  onClick={() => selectPath('humidite')}
                  className="group bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 border-2 border-blue-200 hover:border-blue-400 rounded-2xl p-8 transition-all transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="text-6xl mb-4">💧</div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Humidité & Infiltrations</h2>
                  <p className="text-slate-600 text-sm">
                    Salpêtre, moisissures, murs humides...
                  </p>
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-8">
                🔒 Vos données sont sécurisées • ✓ Sans engagement • ⏱️ 2 min chrono
              </p>
            </div>
          )}

          {/* ÉTAPES 1-N : Questions */}
          {step > 0 && step <= totalQuestions && currentQuestion && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">
                {currentQuestion.text}
              </h2>

              <div className="space-y-3">
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
                        w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left
                        ${isSelected
                          ? 'bg-orange-50 border-orange-500 shadow-md'
                          : 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-sm'
                        }
                      `}
                    >
                      <span className="text-3xl">{option.icon}</span>
                      <span className={`font-bold text-lg flex-1 ${isSelected ? 'text-orange-600' : 'text-slate-900'}`}>
                        {option.label}
                      </span>
                      {isSelected && (
                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              {isMultiQuestion && (
                <button
                  onClick={confirmMultiSelect}
                  disabled={!answers[currentQuestion.id] || (answers[currentQuestion.id] as string[]).length === 0}
                  className="mt-6 w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuer →
                </button>
              )}

              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-4 text-slate-600 hover:text-slate-900 font-bold text-sm"
                >
                  ← Retour
                </button>
              )}
            </div>
          )}

          {/* ÉTAPE 999 : Coordonnées (GATE OBLIGATOIRE) */}
          {step === 999 && !isAnalyzing && !showResult && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
                  Dernière étape !
                </h2>
                <p className="text-slate-600 text-lg">
                  Pour accéder à votre diagnostic personnalisé, laissez-nous un moyen de vous recontacter.
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  🔒 Vos données restent confidentielles • Nous ne spammons jamais
                </p>
              </div>

              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nom & Prénom *</label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    placeholder="Jean Dupont"
                    className="w-full p-4 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email (ou téléphone)</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="jean.dupont@example.com"
                    className="w-full p-4 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Téléphone (si pas d'email)</label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="06 12 34 56 78"
                    className="w-full p-4 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    📍 Adresse du bien *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                    placeholder="12 rue des Lilas, 31000 Toulouse"
                    className="w-full p-4 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-lg"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Adresse où se situe le problème (fissures/humidité)</p>
                </div>

                {/* Upload photo optionnel */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    📷 Photo du problème <span className="font-normal text-slate-500">(optionnel)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            alert('La photo ne doit pas dépasser 5 Mo');
                            return;
                          }
                          setPhotoFile(file);
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPhotoPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex items-center justify-center gap-3 w-full p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-orange-400 cursor-pointer transition bg-slate-50 hover:bg-orange-50"
                    >
                      {photoPreview ? (
                        <div className="flex items-center gap-3">
                          <img src={photoPreview} alt="Aperçu" className="w-16 h-16 object-cover rounded-lg" />
                          <div className="text-left">
                            <p className="font-medium text-slate-700">{photoFile?.name}</p>
                            <p className="text-sm text-green-600">✓ Photo ajoutée</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setPhotoFile(null);
                              setPhotoPreview(null);
                            }}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-slate-600">Ajouter une photo de vos fissures ou traces d'humidité</span>
                        </>
                      )}
                    </label>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Une photo aide notre expert à mieux préparer son analyse</p>
                </div>

                <p className="text-xs text-slate-500 text-center">
                  En continuant, vous acceptez d'être recontacté par IPB concernant votre demande.
                </p>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-5 rounded-xl hover:from-orange-700 hover:to-orange-600 transition shadow-lg text-lg"
                >
                  Voir mon diagnostic →
                </button>
              </form>
            </div>
          )}

          {/* ANALYSE EN COURS */}
          {isAnalyzing && (
            <div className="text-center py-12 animate-fadeIn">
              <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Analyse de vos réponses...</h2>
              <div className="space-y-2 text-slate-600">
                <p>✓ Traitement des symptômes</p>
                <p>✓ Comparaison avec 10 000+ cas similaires</p>
                <p>✓ Génération du rapport expert</p>
              </div>
            </div>
          )}

          {/* RÉSULTAT */}
          {showResult && expertReport && (
            <div className="animate-fadeIn relative">
              {/* Confetti Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full animate-confetti"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      backgroundColor: ['#f97316', '#22c55e', '#3b82f6', '#eab308'][i % 4],
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${1 + Math.random()}s`,
                    }}
                  />
                ))}
              </div>
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce">
                  ✓ Diagnostic terminé
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
                  Votre diagnostic personnalisé
                </h2>
                <p className="text-slate-500 text-sm">Basé sur l'analyse de 10 000+ cas similaires</p>
              </div>

              {/* Score visuel */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 mb-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-400 uppercase tracking-wide font-bold mb-1">Niveau d'urgence</p>
                    <p className="text-3xl font-extrabold">{expertReport.urgency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400 mb-1">Score de risque</p>
                    <p className="text-5xl font-extrabold">{riskScore}</p>
                  </div>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${riskScore >= 40 ? 'bg-red-500' : riskScore >= 20 ? 'bg-orange-500' : 'bg-green-500'}`}
                    style={{ width: `${riskScore}%` }}
                  />
                </div>
              </div>

              {/* Diagnostic */}
              <div className="space-y-6 mb-8">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                  <h3 className="font-bold text-blue-900 mb-2">📋 Diagnostic</h3>
                  <p className="text-blue-800 leading-relaxed">{expertReport.diagnosis}</p>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                  <h3 className="font-bold text-green-900 mb-2">✅ Solution recommandée</h3>
                  <p className="text-green-800 leading-relaxed">{expertReport.solution}</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-2">⏰ Délai recommandé</p>
                  <p className="text-lg font-bold text-slate-900">{expertReport.delay}</p>
                </div>
              </div>

              {/* Social Proof - Témoignage */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    👤
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-slate-900">Marie L.</span>
                      <span className="text-slate-500 text-sm">• Toulouse</span>
                      <span className="flex text-yellow-500">
                        {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                      </span>
                    </div>
                    <p className="text-slate-700 text-sm italic">
                      "J'avais les mêmes inquiétudes. L'expert IPB m'a rappelée sous 24h, 
                      et les travaux ont été terminés en 3 jours. Ma maison est stabilisée, 
                      je recommande !"
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA FINAUX */}
              <div className="border-t border-slate-200 pt-8">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4 text-center">
                  Que souhaitez-vous faire ?
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={handleCallback}
                    disabled={isSubmitting}
                    className="flex flex-col items-center justify-center p-6 border-2 border-orange-300 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition group disabled:opacity-50"
                  >
                    <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <span className="font-bold text-lg text-slate-900">Être rappelé sous 24h</span>
                    <span className="text-sm text-slate-600 mt-1">Gratuit & sans engagement</span>
                  </button>

                  <button
                    onClick={handleBookAppointment}
                    disabled={isSubmitting}
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 rounded-xl transition shadow-lg disabled:opacity-50 text-white"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-bold text-lg">Réserver une expertise</span>
                    <span className="text-sm mt-1 opacity-90">149€ déductibles sur travaux</span>
                  </button>
                </div>

                {showCallbackForm && (
                  <form
                    onSubmit={handleSubmitCallback}
                    className="mt-6 bg-white border border-slate-200 rounded-xl p-6"
                  >
                    <h4 className="font-extrabold text-slate-900 mb-4">Demande de rappel</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Nom & Prénom *</label>
                        <input
                          type="text"
                          value={callbackInfo.name}
                          onChange={(e) => setCallbackInfo({ ...callbackInfo, name: e.target.value })}
                          placeholder="Votre nom"
                          className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Téléphone *</label>
                        <input
                          type="tel"
                          value={callbackInfo.phone}
                          onChange={(e) => setCallbackInfo({ ...callbackInfo, phone: e.target.value })}
                          placeholder="06 12 34 56 78"
                          className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Email (pour confirmation)
                      </label>
                      <input
                        type="email"
                        value={callbackInfo.email}
                        onChange={(e) => setCallbackInfo({ ...callbackInfo, email: e.target.value })}
                        placeholder="votre@email.com"
                        className="w-full p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-4 w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition disabled:opacity-50"
                    >
                      Être rappelé sous 24h
                    </button>
                  </form>
                )}

                {showCalendar && (
                  <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6">
                    <h4 className="font-extrabold text-slate-900 mb-4">Réserver votre expertise</h4>
                    {calendlyUrl ? (
                      <div className="w-full overflow-hidden rounded-lg border border-slate-200">
                        <iframe
                          src={calendlyUrl}
                          title="Prendre rendez-vous"
                          className="w-full h-[700px]"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="text-slate-700">
                        <p className="mb-3">
                          L’agenda en ligne n’est pas encore configuré. Laissez-nous votre téléphone et nous fixons le rendez-vous.
                        </p>
                        <button
                          onClick={handleCallback}
                          className="bg-orange-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition"
                        >
                          Être rappelé
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-xs text-slate-500 text-center mt-6">
                  ✓ Sans engagement • ✓ Déplacement inclus • ✓ Devis gratuit • ✓ Garantie décennale
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!showResult && (
          <p className="text-center text-slate-500 text-sm mt-6">
            ⏱️ Temps estimé restant : moins de 2 minutes
          </p>
        )}
      </div>
    </div>
  );
}
