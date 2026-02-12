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

export default function DiagnosticPage() {
  const [step, setStep] = useState(0);
  const [path, setPath] = useState<PathType>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', address: '', yearBuilt: '', preferredTime: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
  
  // reCAPTCHA v3 protection
  const { getToken } = useRecaptcha();

  const currentQuestions = path ? questionsData[path] : [];
  const totalQuestions = currentQuestions.length;
  const progress = path ? ((step - 1) / totalQuestions) * 100 : 0;

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

  // Gestion des réponses (sélection sans auto-avance)
  const handleAnswer = (questionId: string, value: string | string[], isMulti: boolean) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    // Ne pas auto-avancer, attendre le clic sur "Suivant"
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
      formData.append('yearBuilt', contactInfo.yearBuilt);
      formData.append('preferredTime', contactInfo.preferredTime);
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

  // Actions finales - Simplifié

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
      formData.append('needType', 'diagnostic');
      if (recaptchaToken) {
        formData.append('recaptchaToken', recaptchaToken);
      }
      
      // Ajouter la photo du callback si présente (et pas de photo initiale)
      if (callbackPhotoPreview && callbackPhotoFile) {
        formData.append('photo', callbackPhotoPreview);
        formData.append('photoName', callbackPhotoFile.name);
      } else if (photoPreview && photoFile) {
        // Sinon utiliser la photo du diagnostic initial
        formData.append('photo', photoPreview);
        formData.append('photoName', photoFile.name);
      }

      const result = await submitDiagnosticCallback(formData);
      if (result.success) {
        alert('✅ Merci ! Un expert vous rappelle sous 24h.');
        setShowCallbackForm(false);
        setCallbackPhotoFile(null);
        setCallbackPhotoPreview(null);
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
        {/* Header compact */}
        {step > 0 && step < 999 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-orange-500 text-white font-bold px-2.5 py-0.5 rounded-full text-xs">
                {step}/{totalQuestions}
              </span>
              <span className="text-slate-400 text-xs">
                {step === totalQuestions ? 'Dernière !' : `Encore ${totalQuestions - step}`}
              </span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${Math.max(progress, 5)}%` }}
              />
            </div>
          </div>
        )}

        {/* Carte principale */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-5 md:p-8">
          {/* ÉTAPE 0 : Choix du parcours */}
          {step === 0 && (
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Évaluez votre problème <span className="text-orange-500">en 2 min</span>
              </h1>
              <p className="text-slate-500 text-sm mb-4">
                9 questions simples → diagnostic personnalisé
              </p>

              {/* Social Proof compact */}
              <div className="flex justify-center gap-4 mb-4 text-xs text-slate-500">
                <span>⭐ <strong>4.9/5</strong></span>
                <span>🏆 <strong>15 ans</strong> d'expertise</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => selectPath('fissure')}
                  className="bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 hover:border-orange-400 rounded-xl p-4 transition-all text-center"
                >
                  <div className="text-4xl mb-2">🏠</div>
                  <h2 className="font-bold text-slate-900 text-sm">Fissures</h2>
                  <p className="text-slate-500 text-xs">Structure & façade</p>
                </button>

                <button
                  onClick={() => selectPath('humidite')}
                  className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400 rounded-xl p-4 transition-all text-center"
                >
                  <div className="text-4xl mb-2">💧</div>
                  <h2 className="font-bold text-slate-900 text-sm">Humidité</h2>
                  <p className="text-slate-500 text-xs">Murs & infiltrations</p>
                </button>
              </div>

              {/* Trust badges compact */}
              <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-400">
                <span>🔒 Sécurisé</span>
                <span>✓ Sans engagement</span>
                <span>📞 Rappel 24h</span>
              </div>
            </div>
          )}

          {/* ÉTAPES 1-N : Questions */}
          {step > 0 && step <= totalQuestions && currentQuestion && (
            <div key={`q-${step}`}>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                {currentQuestion.text}
              </h2>
              
              <p className="text-slate-400 text-xs mb-3">
                {isMultiQuestion ? '✨ Plusieurs réponses possibles' : 'Sélectionnez une réponse'}
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
                        w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-colors text-left
                        ${isSelected
                          ? 'bg-orange-50 border-orange-500'
                          : 'bg-white border-slate-200 hover:border-orange-300'
                        }
                      `}
                    >
                      <span className="text-xl">{option.icon}</span>
                      <span className={`font-medium flex-1 text-sm ${isSelected ? 'text-orange-600' : 'text-slate-800'}`}>
                        {option.label}
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
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

              {/* Bouton Suivant */}
              <button
                onClick={goToNextQuestion}
                disabled={
                  isMultiQuestion 
                    ? !answers[currentQuestion.id] || (answers[currentQuestion.id] as string[]).length === 0
                    : !answers[currentQuestion.id]
                }
                className="mt-4 w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === totalQuestions ? 'Voir mon diagnostic →' : 'Suivant →'}
              </button>

              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-2 text-slate-400 hover:text-slate-600 text-xs w-full text-center"
                >
                  ← Retour
                </button>
              )}
            </div>
          )}

          {/* ÉTAPE 999 : Coordonnées (GATE OBLIGATOIRE) */}
          {step === 999 && !isAnalyzing && !showResult && (
            <div>
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Diagnostic prêt !</h2>
                <p className="text-slate-500 text-sm">Renseignez vos coordonnées pour le recevoir</p>
              </div>

              <form onSubmit={handleSubmitContact} className="space-y-3">
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  placeholder="Nom & Prénom *"
                  className="w-full p-3 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-sm"
                  required
                />

                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="Email"
                  className="w-full p-3 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-sm"
                />

                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  placeholder="Téléphone"
                  className="w-full p-3 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-sm"
                />

                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  placeholder="Adresse du bien *"
                  className="w-full p-3 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-sm"
                  required
                />

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={contactInfo.yearBuilt}
                    onChange={(e) => setContactInfo({ ...contactInfo, yearBuilt: e.target.value })}
                    className="w-full p-3 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-sm bg-white"
                  >
                    <option value="">Année construction</option>
                    <option value="avant_1950">Avant 1950</option>
                    <option value="1950_1980">1950 - 1980</option>
                    <option value="1980_2000">1980 - 2000</option>
                    <option value="apres_2000">Après 2000</option>
                    <option value="ne_sais_pas">Je ne sais pas</option>
                  </select>

                  <select
                    value={contactInfo.preferredTime}
                    onChange={(e) => setContactInfo({ ...contactInfo, preferredTime: e.target.value })}
                    className="w-full p-3 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-sm bg-white"
                  >
                    <option value="">Créneau rappel</option>
                    <option value="matin">Matin (9h-12h)</option>
                    <option value="apres_midi">Après-midi (14h-18h)</option>
                    <option value="soir">Soir (18h-20h)</option>
                    <option value="indifferent">Indifférent</option>
                  </select>
                </div>

                {/* Upload photo optionnel */}
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-3">
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
                  <label htmlFor="photo-upload" className="flex items-center gap-2 cursor-pointer text-sm">
                    {photoPreview ? (
                      <div className="flex items-center gap-2 w-full">
                        <img src={photoPreview} alt="Aperçu" className="w-10 h-10 object-cover rounded" />
                        <span className="text-green-600 text-xs">✓ Photo ajoutée</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setPhotoFile(null);
                            setPhotoPreview(null);
                          }}
                          className="ml-auto text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">📷 Photo du problème (optionnel)</span>
                    )}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition"
                >
                  Voir mon diagnostic →
                </button>

                <p className="text-xs text-slate-400 text-center">
                  🔒 Données sécurisées • Sans spam
                </p>
              </form>
            </div>
          )}

          {/* ANALYSE EN COURS */}
          {isAnalyzing && (
            <div className="text-center py-6">
              <div className="w-12 h-12 border-3 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
              <h2 className="text-lg font-bold text-slate-900 mb-1">Analyse en cours...</h2>
              <p className="text-slate-400 text-sm">Quelques secondes</p>
            </div>
          )}

          {/* RÉSULTAT */}
          {showResult && expertReport && (
            <div>
              {/* En-tête compact */}
              <div className="text-center mb-4">
                <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full mb-2">
                  ✓ Diagnostic terminé
                </span>
                <h2 className="text-xl font-bold text-slate-900">Votre diagnostic</h2>
              </div>

              {/* Score compact */}
              <div className={`rounded-xl p-4 mb-4 text-white ${riskScore >= 40 ? 'bg-red-500' : riskScore >= 20 ? 'bg-orange-500' : 'bg-green-500'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold">{expertReport.urgency}</span>
                  <span className="text-2xl font-bold">{riskScore}/50</span>
                </div>
              </div>

              {/* Résumé compact */}
              <div className="space-y-3 mb-4 text-sm">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-bold text-slate-800 mb-1">📋 Diagnostic</p>
                  <p className="text-slate-600">{expertReport.diagnosis}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-bold text-slate-800 mb-1">✅ Solution</p>
                  <p className="text-slate-600">{expertReport.solution}</p>
                </div>
                <div className="flex gap-3">
                  <div className="bg-slate-50 rounded-lg p-3 flex-1">
                    <p className="text-xs text-slate-500">⏰ Délai</p>
                    <p className="font-bold text-slate-800 text-sm">{expertReport.delay}</p>
                  </div>
                </div>
              </div>

              {/* CTA FINAL - Simplifié */}
              <div className="bg-orange-500 rounded-2xl p-5 mt-6 text-white">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-1">
                    Être rappelé par un expert
                  </h3>
                  <p className="text-white/80 text-sm">
                    Diagnostic sur site : 149€ HT (déductible des travaux)
                  </p>
                </div>

                {!showCallbackForm ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={callbackInfo.name || contactInfo.name}
                      onChange={(e) => setCallbackInfo({ ...callbackInfo, name: e.target.value })}
                      placeholder="Votre nom"
                      className="w-full p-3 rounded-lg border-0 outline-none text-slate-900 text-sm"
                    />
                    <input
                      type="tel"
                      value={callbackInfo.phone}
                      onChange={(e) => setCallbackInfo({ ...callbackInfo, phone: e.target.value })}
                      placeholder="Votre téléphone"
                      className="w-full p-3 rounded-lg border-0 outline-none text-slate-900 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!callbackInfo.name && !contactInfo.name) {
                          alert('Merci de renseigner votre nom');
                          return;
                        }
                        if (!callbackInfo.phone) {
                          alert('Merci de renseigner votre téléphone');
                          return;
                        }
                        setCallbackInfo({ ...callbackInfo, name: callbackInfo.name || contactInfo.name });
                        setSelectedNeed('expertise');
                        setShowCallbackForm(true);
                      }}
                      className="w-full bg-white text-orange-600 font-bold py-3 rounded-lg transition-all"
                    >
                      Être rappelé sous 24h →
                    </button>
                    
                    <div className="flex justify-center gap-4 text-xs text-white/70 pt-2">
                      <span>✓ Sans engagement</span>
                      <span>✓ Devis gratuit</span>
                    </div>

                    <div className="text-center pt-2 border-t border-white/20 mt-2">
                      <a href="tel:0582953375" className="text-white/90 text-sm hover:text-white">
                        📞 Ou appelez : 05 82 95 33 75
                      </a>
                    </div>
                  </div>

                ) : (
                  <form onSubmit={handleSubmitCallback} className="space-y-3">
                    <p className="text-white/80 text-sm text-center mb-2">Confirmez vos coordonnées</p>
                    
                    <input
                      type="text"
                      value={callbackInfo.name || contactInfo.name}
                      onChange={(e) => setCallbackInfo({ ...callbackInfo, name: e.target.value })}
                      placeholder="Votre nom"
                      className="w-full p-3 rounded-lg border-0 outline-none text-slate-900 text-sm"
                      required
                    />
                    <input
                      type="tel"
                      value={callbackInfo.phone}
                      onChange={(e) => setCallbackInfo({ ...callbackInfo, phone: e.target.value })}
                      placeholder="Votre téléphone"
                      className="w-full p-3 rounded-lg border-0 outline-none text-slate-900 text-sm"
                      required
                    />

                    {/* Photo optionnelle si pas déjà transmise */}
                    {!photoPreview && (
                      <div className="bg-white/10 rounded-lg p-3">
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
                              setCallbackPhotoFile(file);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setCallbackPhotoPreview(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                          id="callback-photo-upload"
                        />
                        <label htmlFor="callback-photo-upload" className="flex items-center gap-2 cursor-pointer text-sm">
                          {callbackPhotoPreview ? (
                            <div className="flex items-center gap-2 w-full">
                              <img src={callbackPhotoPreview} alt="Aperçu" className="w-10 h-10 object-cover rounded" />
                              <span className="text-white/90">Photo ajoutée</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCallbackPhotoFile(null);
                                  setCallbackPhotoPreview(null);
                                }}
                                className="text-xs text-white/60 hover:text-white ml-auto"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span className="text-white/70">📷 Ajouter une photo (optionnel)</span>
                          )}
                        </label>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-green-600 font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Envoi...' : '✓ Confirmer'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowCallbackForm(false);
                        setCallbackPhotoFile(null);
                        setCallbackPhotoPreview(null);
                      }}
                      className="w-full text-white/60 text-xs py-1"
                    >
                      ← Retour
                    </button>

                    <p className="text-xs text-white/50 text-center">
                      🔒 Données sécurisées
                    </p>
                  </form>
                )}
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
