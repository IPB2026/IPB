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
        {/* Header avec progression gamifiée */}
        {step > 0 && step < 999 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-3">
              <div className="flex items-center gap-2">
                <span className="bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-xs">
                  {step} / {totalQuestions}
                </span>
                <span className="text-slate-600 font-medium">
                  {step <= 3 ? '🔍 Analyse du problème' : step <= 6 ? '📊 Évaluation de gravité' : '✅ Finalisation'}
                </span>
              </div>
              <span className="text-slate-500 text-xs">
                {totalQuestions - step === 0 ? '🎉 Dernière question !' : `Plus que ${totalQuestions - step + 1} question${totalQuestions - step > 0 ? 's' : ''}`}
              </span>
            </div>
            
            {/* Barre de progression avec milestones */}
            <div className="relative">
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-green-500 transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(progress, 5)}%` }}
                />
              </div>
              
              {/* Milestones */}
              <div className="absolute top-0 left-0 w-full h-3 flex justify-between px-1">
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow ${step >= 1 ? 'bg-orange-500' : 'bg-slate-300'}`} />
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow ${step > totalQuestions * 0.33 ? 'bg-orange-500' : 'bg-slate-300'}`} />
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow ${step > totalQuestions * 0.66 ? 'bg-orange-500' : 'bg-slate-300'}`} />
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow ${step >= totalQuestions ? 'bg-green-500' : 'bg-slate-300'}`} />
              </div>
            </div>
            
            {/* Encouragements dynamiques */}
            {step === Math.ceil(totalQuestions / 2) && (
              <div className="mt-3 text-center text-sm text-green-600 font-medium animate-bounce">
                👏 Bravo ! Vous êtes à mi-chemin !
              </div>
            )}
            {step === totalQuestions && (
              <div className="mt-3 text-center text-sm text-green-600 font-medium animate-pulse">
                🎯 Dernière question avant votre diagnostic !
              </div>
            )}
          </div>
        )}

        {/* Carte principale */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">
          {/* ÉTAPE 0 : Choix du parcours */}
          {step === 0 && (
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                Évaluez votre problème <span className="text-orange-500">en 2 minutes</span>
              </h1>
              <p className="text-slate-600 text-lg mb-6">
                Répondez à 9 questions simples et recevez un diagnostic personnalisé par un expert
              </p>

              {/* Social Proof - Statistiques */}
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="text-green-500 text-lg">✓</span>
                  <span><strong>2 847</strong> diagnostics ce mois</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span><strong>4.9/5</strong> satisfaction client</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="text-blue-500 text-lg">🏆</span>
                  <span><strong>15 ans</strong> d'expertise</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button
                  onClick={() => selectPath('fissure')}
                  className="group relative bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 border-2 border-orange-200 hover:border-orange-400 rounded-2xl p-8 transition-all transform hover:scale-105 hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    60% des cas
                  </div>
                  <div className="text-6xl mb-4">🏠</div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Fissures & Structure</h2>
                  <p className="text-slate-600 text-sm mb-3">
                    Fissures en façade, tassement, portes qui coincent...
                  </p>
                  <span className="inline-flex items-center gap-1 text-orange-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Commencer le diagnostic →
                  </span>
                </button>

                <button
                  onClick={() => selectPath('humidite')}
                  className="group relative bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 border-2 border-blue-200 hover:border-blue-400 rounded-2xl p-8 transition-all transform hover:scale-105 hover:shadow-xl overflow-hidden"
                >
                  <div className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    40% des cas
                  </div>
                  <div className="text-6xl mb-4">💧</div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Humidité & Infiltrations</h2>
                  <p className="text-slate-600 text-sm mb-3">
                    Salpêtre, moisissures, murs humides...
                  </p>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Commencer le diagnostic →
                  </span>
                </button>
              </div>

              {/* Témoignage */}
              <div className="bg-slate-50 rounded-2xl p-5 text-left max-w-lg mx-auto mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    👨
                  </div>
                  <div>
                    <p className="text-slate-700 text-sm italic mb-2">
                      "J'hésitais à faire appel à un expert. Ce pré-diagnostic en ligne m'a convaincu : en 2 minutes, j'ai compris la gravité de mes fissures. L'intervention a été réalisée en 3 jours."
                    </p>
                    <p className="text-slate-500 text-xs font-medium">
                      Pierre M. — Toulouse (31) • ⭐⭐⭐⭐⭐
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">🔒 Données sécurisées</span>
                <span className="flex items-center gap-1">✓ Sans engagement</span>
                <span className="flex items-center gap-1">⏱️ 2 min chrono</span>
                <span className="flex items-center gap-1">📞 Rappel sous 24h</span>
              </div>
            </div>
          )}

          {/* ÉTAPES 1-N : Questions */}
          {step > 0 && step <= totalQuestions && currentQuestion && (
            <div className="animate-fadeIn">
              {/* Indicateur d'urgence en temps réel */}
              {step > 2 && (
                <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-600">Niveau d'attention requis</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      calculateRisk(path!, answers) >= 40 
                        ? 'bg-red-100 text-red-700' 
                        : calculateRisk(path!, answers) >= 20 
                          ? 'bg-orange-100 text-orange-700' 
                          : 'bg-green-100 text-green-700'
                    }`}>
                      {calculateRisk(path!, answers) >= 40 ? '⚠️ Élevé' : calculateRisk(path!, answers) >= 20 ? '🔶 Modéré' : '✅ Faible'}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        calculateRisk(path!, answers) >= 40 
                          ? 'bg-red-500' 
                          : calculateRisk(path!, answers) >= 20 
                            ? 'bg-orange-500' 
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.max(calculateRisk(path!, answers), 10)}%` }}
                    />
                  </div>
                </div>
              )}

              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                {currentQuestion.text}
              </h2>
              
              {/* Indication multi-sélection */}
              {isMultiQuestion && (
                <p className="text-orange-600 text-sm font-medium mb-6">
                  ✨ Plusieurs réponses possibles
                </p>
              )}
              {!isMultiQuestion && (
                <p className="text-slate-500 text-sm mb-6">
                  Cliquez sur votre réponse pour continuer
                </p>
              )}

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
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
                      style={{ animationDelay: `${idx * 50}ms` }}
                      className={`
                        w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left transform hover:scale-[1.02] active:scale-[0.98] animate-slideUp
                        ${isSelected
                          ? 'bg-gradient-to-r from-orange-50 to-orange-100/50 border-orange-500 shadow-lg ring-2 ring-orange-200'
                          : 'bg-white border-slate-200 hover:border-orange-400 hover:shadow-md hover:bg-orange-50/30'
                        }
                      `}
                    >
                      <span className={`text-3xl transition-transform ${isSelected ? 'scale-110' : ''}`}>{option.icon}</span>
                      <span className={`font-bold text-lg flex-1 ${isSelected ? 'text-orange-600' : 'text-slate-900'}`}>
                        {option.label}
                      </span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'bg-orange-500 border-orange-500' : 'border-slate-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bouton Suivant - toujours visible */}
              <button
                onClick={goToNextQuestion}
                disabled={
                  isMultiQuestion 
                    ? !answers[currentQuestion.id] || (answers[currentQuestion.id] as string[]).length === 0
                    : !answers[currentQuestion.id]
                }
                className="mt-6 w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {step === totalQuestions ? 'Voir mon diagnostic →' : 'Suivant →'}
              </button>

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
              {/* Header avec animation de succès */}
              <div className="text-center mb-8">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                  🎉 Votre diagnostic est prêt !
                </h2>
                <p className="text-slate-600 text-lg mb-4">
                  Renseignez vos coordonnées pour recevoir votre analyse personnalisée
                </p>
                
                {/* Ce que vous allez recevoir */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 mb-4 text-left max-w-md mx-auto border border-orange-100">
                  <p className="text-sm font-bold text-slate-800 mb-2">📋 Votre diagnostic comprend :</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Analyse de gravité personnalisée
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Solution recommandée par l'expert
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Délai d'intervention conseillé
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> Rappel gratuit sous 24h (optionnel)
                    </li>
                  </ul>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-3 text-xs">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full flex items-center gap-1">
                    🔒 Données sécurisées SSL
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full flex items-center gap-1">
                    ✉️ Pas de spam, jamais
                  </span>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full flex items-center gap-1">
                    📞 Rappel gratuit
                  </span>
                </div>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      🏗️ Année de construction
                    </label>
                    <select
                      value={contactInfo.yearBuilt}
                      onChange={(e) => setContactInfo({ ...contactInfo, yearBuilt: e.target.value })}
                      className="w-full p-4 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-lg bg-white"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="avant_1950">Avant 1950</option>
                      <option value="1950_1980">1950 - 1980</option>
                      <option value="1980_2000">1980 - 2000</option>
                      <option value="apres_2000">Après 2000</option>
                      <option value="ne_sais_pas">Je ne sais pas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      🕐 Créneau de rappel préféré
                    </label>
                    <select
                      value={contactInfo.preferredTime}
                      onChange={(e) => setContactInfo({ ...contactInfo, preferredTime: e.target.value })}
                      className="w-full p-4 rounded-lg border-2 border-slate-200 focus:border-orange-500 outline-none text-lg bg-white"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="matin">Matin (9h - 12h)</option>
                      <option value="apres_midi">Après-midi (14h - 18h)</option>
                      <option value="soir">Soir (18h - 20h)</option>
                      <option value="indifferent">Indifférent</option>
                    </select>
                  </div>
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
            <div className="text-center py-8 animate-fadeIn">
              {/* Animation de chargement améliorée */}
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-orange-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-transparent border-t-orange-500 rounded-full animate-spin" />
                <div className="absolute inset-2 border-4 border-transparent border-t-orange-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Notre expert analyse votre situation...</h2>
              
              {/* Étapes d'analyse animées */}
              <div className="max-w-sm mx-auto space-y-3 text-left">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-slate-700 font-medium">Analyse des symptômes</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-slate-700 font-medium">Comparaison avec 10 000+ cas</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-200 animate-pulse" style={{ animationDelay: '1s' }}>
                  <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-slate-700 font-medium">Génération du rapport expert...</span>
                </div>
              </div>
              
              <p className="text-slate-500 text-sm mt-6">
                ⏱️ Quelques secondes...
              </p>
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

              {/* CTA FINAL - Section CRO optimisée */}
              <div className="relative -mx-8 md:-mx-12 px-8 md:px-12 py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-8">
                {/* Effet décoratif */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  {!showCallbackForm ? (
                  <>
                    {/* Urgence basée sur le score */}
                    {riskScore >= 30 && (
                      <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 mb-6 text-center">
                        <p className="text-red-300 font-semibold text-sm">
                          ⚠️ Votre situation nécessite une attention {riskScore >= 40 ? 'urgente' : 'rapide'}. 
                          Plus vous attendez, plus les dégâts risquent de s'aggraver.
                        </p>
                      </div>
                    )}

                    {/* Headline personnalisé */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
                        {riskScore >= 40 
                          ? "Agissez maintenant pour protéger votre bien"
                          : riskScore >= 20 
                            ? "Confirmez votre diagnostic avec un expert"
                            : "Obtenez un avis professionnel"}
                      </h3>
                      <p className="text-white/70">
                        Un expert certifié vous rappelle pour planifier l'intervention
                      </p>
                    </div>

                    {/* Social proof live */}
                    <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span>12 diagnostics cette semaine</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                        <span>⭐ 4.9/5</span>
                        <span className="text-white/60">(127 avis)</span>
                      </div>
                    </div>

                    {/* CTA Principal - Formulaire direct */}
                    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-lg mx-auto">
                      <div className="text-center mb-5">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Créneaux disponibles cette semaine
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-1">Diagnostic expert sur site</h4>
                        <p className="text-slate-500 text-sm">Intervention sous 48h-72h en Haute-Garonne, Tarn et Gers</p>
                      </div>

                      {/* Prix avec ancrage */}
                      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-600">Diagnostic instrumenté complet</p>
                            <p className="text-2xl font-extrabold text-slate-900">149€ <span className="text-base font-normal text-slate-500">HT</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-green-600 font-semibold">✓ DÉDUCTIBLE DES TRAVAUX</p>
                            <p className="text-xs text-slate-500">= Gratuit si vous faites les travaux</p>
                          </div>
                        </div>
                      </div>

                      {/* Formulaire simplifié */}
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        setSelectedNeed('expertise');
                        setShowCallbackForm(true);
                      }}>
                        <div className="space-y-3 mb-4">
                          <input
                            type="text"
                            value={callbackInfo.name || contactInfo.name}
                            onChange={(e) => setCallbackInfo({ ...callbackInfo, name: e.target.value })}
                            placeholder="Votre nom"
                            className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-orange-500 outline-none text-slate-900"
                            required
                          />
                          <input
                            type="tel"
                            value={callbackInfo.phone}
                            onChange={(e) => setCallbackInfo({ ...callbackInfo, phone: e.target.value })}
                            placeholder="Votre téléphone"
                            className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-orange-500 outline-none text-slate-900"
                            required
                          />
                        </div>

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
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg text-lg flex items-center justify-center gap-2"
                        >
                          Être rappelé gratuitement
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </form>

                      {/* Trust elements */}
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-500">
                          <span>🔒 Données sécurisées</span>
                          <span>✓ Sans engagement</span>
                          <span>📋 Rapport remis</span>
                        </div>
                      </div>
                    </div>

                    {/* Ce qui est inclus */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <span className="text-2xl block mb-1">🔬</span>
                        <span className="text-xs">Mesures instrumentées</span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <span className="text-2xl block mb-1">📋</span>
                        <span className="text-xs">Rapport détaillé</span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <span className="text-2xl block mb-1">💰</span>
                        <span className="text-xs">Devis gratuit</span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <span className="text-2xl block mb-1">🛡️</span>
                        <span className="text-xs">Garantie décennale</span>
                      </div>
                    </div>

                    {/* Alternative : Appeler */}
                    <div className="text-center mt-6">
                      <p className="text-white/60 text-sm mb-2">Vous préférez nous appeler directement ?</p>
                      <a
                        href="tel:0582953375"
                        className="inline-flex items-center gap-2 text-white font-semibold hover:text-orange-300 transition"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        05 82 95 33 75
                      </a>
                    </div>
                  </>
                  ) : (
                    <div className="max-w-md mx-auto">
                      <form
                        onSubmit={handleSubmitCallback}
                        className="bg-white rounded-2xl p-6 shadow-2xl"
                      >
                        {/* Confirmation visuelle */}
                        <div className="text-center mb-5">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-slate-900 text-lg">Dernière étape !</h4>
                          <p className="text-sm text-slate-500">Confirmez vos coordonnées pour être rappelé</p>
                        </div>

                        {/* Résumé de ce qu'ils vont recevoir */}
                        <div className="bg-slate-50 rounded-xl p-4 mb-5 text-sm">
                          <p className="font-semibold text-slate-700 mb-2">Vous allez recevoir :</p>
                          <ul className="space-y-1 text-slate-600">
                            <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Un appel sous 24h pour fixer le RDV</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Le diagnostic sur site (149€ HT)</li>
                            <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Un rapport + devis détaillé</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Votre nom</label>
                            <input
                              type="text"
                              value={callbackInfo.name || contactInfo.name}
                              onChange={(e) => setCallbackInfo({ ...callbackInfo, name: e.target.value })}
                              placeholder="Jean Dupont"
                              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-orange-500 outline-none text-slate-900"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Téléphone</label>
                            <input
                              type="tel"
                              value={callbackInfo.phone}
                              onChange={(e) => setCallbackInfo({ ...callbackInfo, phone: e.target.value })}
                              placeholder="06 12 34 56 78"
                              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-orange-500 outline-none text-slate-900"
                              required
                            />
                          </div>

                          {/* Photo optionnelle si pas déjà transmise */}
                          {!photoPreview && (
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4">
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
                              <label
                                htmlFor="callback-photo-upload"
                                className="flex items-center gap-3 cursor-pointer"
                              >
                                {callbackPhotoPreview ? (
                                  <div className="flex items-center gap-3 w-full">
                                    <img src={callbackPhotoPreview} alt="Aperçu" className="w-14 h-14 object-cover rounded-lg" />
                                    <div className="flex-1">
                                      <p className="text-sm text-green-600 font-medium">✓ Photo ajoutée</p>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setCallbackPhotoFile(null);
                                          setCallbackPhotoPreview(null);
                                        }}
                                        className="text-xs text-red-500 hover:underline"
                                      >
                                        Supprimer
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <span className="text-2xl">📷</span>
                                    <span className="text-slate-600">Ajouter une photo <span className="text-slate-400">(optionnel)</span></span>
                                  </>
                                )}
                              </label>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Envoi en cours...
                              </>
                            ) : (
                              <>
                                ✓ Confirmer ma demande
                              </>
                            )}
                          </button>
                        </div>

                        {/* Garantie */}
                        <p className="text-xs text-slate-500 text-center mt-4">
                          🔒 Vos données sont sécurisées et ne seront jamais partagées
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setShowCallbackForm(false);
                            setSelectedNeed(null);
                            setCallbackPhotoFile(null);
                            setCallbackPhotoPreview(null);
                          }}
                          className="mt-3 text-slate-400 hover:text-slate-600 text-sm font-medium w-full text-center"
                        >
                          ← Modifier mes informations
                        </button>
                      </form>
                    </div>
                  )}
                </div>
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
