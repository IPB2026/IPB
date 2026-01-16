"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// --- JEU D'ICÔNES (SVG Épurés et Optimisés) ---
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconInfo = ({className = ""}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const IconBack = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const IconCamera = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>;
const IconDownload = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const IconLock = ({size = 16}: {size?: number}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconCreditCard = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;

export default function DiagnosticPage() {
  const router = useRouter();
  
  // --- GESTION D'ÉTAT ---
  const [step, setStep] = useState(0); 
  const [path, setPath] = useState<'fissure' | 'humidite' | null>(null); 
  const [answers, setAnswers] = useState<any>({});
  const [multiSelection, setMultiSelection] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isResultReady, setIsResultReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'rdv' | 'report'>('rdv');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [toast, setToast] = useState<{message: string; type: 'success' | 'info' | 'warning'} | null>(null);

  const totalProgressSteps = 11; // 9 questions + 2 nouvelles questions (statut + urgence)
  
  // Afficher un toast
  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }; 

  // --- SAUVEGARDE AUTOMATIQUE ---
  useEffect(() => {
    // Sauvegarder les réponses dans localStorage
    if (Object.keys(answers).length > 0 || step > 0) {
      localStorage.setItem('ipb_diagnostic_progress', JSON.stringify({
        step,
        path,
        answers,
        riskScore,
        photos: photos.length
      }));
    }
  }, [step, path, answers, riskScore, photos]);

  // Restaurer la progression au chargement
  useEffect(() => {
    const saved = localStorage.getItem('ipb_diagnostic_progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.step && data.answers && Object.keys(data.answers).length > 0) {
          // Demander confirmation avant de restaurer
          if (window.confirm('Nous avons détecté une progression sauvegardée. Voulez-vous reprendre où vous vous êtes arrêté ?')) {
            setStep(data.step);
            setPath(data.path);
            setAnswers(data.answers);
            setRiskScore(data.riskScore || 0);
          } else {
            localStorage.removeItem('ipb_diagnostic_progress');
          }
        }
      } catch (e) {
        console.error('Erreur lors de la restauration:', e);
      }
    }
  }, []);

  // --- CALCUL TEMPS ESTIMÉ ---
  const getEstimatedTime = () => {
    const totalTimeMinutes = 2; // Temps total estimé : 2 minutes
    const remainingSteps = totalProgressSteps - step;
    const progressRatio = step / totalProgressSteps;
    const remainingTime = Math.ceil(totalTimeMinutes * (1 - progressRatio));
    return remainingTime;
  };

  // --- MOTEUR D'ANALYSE EXPERT ---
  const generateExpertConclusion = () => {
    let diagnosis = "";
    let solution = "";

    if (path === 'fissure') {
        const shape = answers['F_SHAPE'] || [];
        const shapeStr = Array.isArray(shape) ? shape.join(' ') : shape;
        
        const isEscalier = shapeStr.includes("En Escalier");
        const isVertical = shapeStr.includes("Verticale");
        
        if (isEscalier) {
            diagnosis = "La morphologie en escalier (suivant les joints) est caractéristique d'un tassement différentiel des fondations. Une partie de la structure s'enfonce plus vite que l'autre, créant un cisaillement.";
            solution = "Un simple rebouchage cosmétique sera inefficace. Nous préconisons une redondance mécanique par agrafage (couture de la maçonnerie) pour stabiliser les vecteurs de force.";
        } else if (isVertical) {
            diagnosis = "La rupture linéaire verticale suggère une dilatation thermique ou un défaut de chaînage. La cohésion du mur est rompue.";
            solution = "Il est nécessaire de rétablir le monolithisme de la façade par insertion d'aciers hélicoïdaux et injection de résine de scellement.";
        } else {
            diagnosis = "Les micro-fissures observées (faïençage) traduisent une fatigue des matériaux de surface, souvent liée aux variations hydriques.";
            solution = "Un ravalement technique armé (D3/I4) est recommandé pour imperméabiliser le support et éviter l'infiltration.";
        }
    } else {
        const symp = answers['H_SYMP'] || [];
        const sympStr = Array.isArray(symp) ? symp.join(' ') : symp;
        const hasSalpetre = sympStr.includes("Salpêtre");
        
        if (hasSalpetre) {
            diagnosis = "La présence de sels hygroscopiques (salpêtre) valide l'hypothèse de remontées capillaires. L'eau du sol migre dans la porosité des murs.";
            solution = "La seule solution pérenne est la création d'une arase étanche chimique par injection de résine hydrophobe à la base des murs.";
        } else {
            diagnosis = "Les symptômes relevés indiquent une saturation des matériaux, potentiellement aggravée par un défaut de renouvellement d'air (condensation).";
            solution = "Une expertise sur site permettra de trancher entre un traitement par injection (si infiltration) ou l'installation d'une VMI (si condensation).";
        }
    }
    return { diagnosis, solution };
  };

  const expertReport = isResultReady ? generateExpertConclusion() : { diagnosis: "", solution: "" };
  
  const getUrgencyLevel = () => {
      if (riskScore >= 25) return { label: "INTERVENTION PRIORITAIRE", color: "bg-orange-600", text: "text-orange-700" };
      if (riskScore >= 15) return { label: "NÉCESSITE UNE EXPERTISE", color: "bg-orange-500", text: "text-orange-600" };
      return { label: "SITUATION À SURVEILLER", color: "bg-blue-500", text: "text-blue-600" };
  };

  // --- LOGIQUE MÉTIER ---

  const handleSingleChoice = (key: string, value: string, nextStepIncrement = 1, score = 0) => {
    // Ne pas ajouter le score si on a déjà répondu à cette question
    if (!answers[key]) {
      setRiskScore((prev: number) => prev + score);
    }
    setAnswers((prev: any) => ({ ...prev, [key]: value }));
    if (key === 'TYPE') setPath(value as 'fissure' | 'humidite');
    
    // Feedback visuel et toast
    showToast('Réponse enregistrée', 'success');
    const button = document.activeElement as HTMLElement;
    if (button) {
      button.classList.add('ring-2', 'ring-green-500', 'ring-offset-2');
      setTimeout(() => button.classList.remove('ring-2', 'ring-green-500', 'ring-offset-2'), 300);
    }
    
    setTimeout(() => {
        setStep((prev: number) => prev + nextStepIncrement);
    }, 250);
  };

  const toggleMultiChoice = (opt: any) => {
    const value = opt.label;
    const currentAnswers = answers[opt.key || 'CURRENT'] || [];
    const wasAlreadySelected = Array.isArray(currentAnswers) ? currentAnswers.includes(value) : false;
    
    if (multiSelection.includes(value)) {
      setMultiSelection(multiSelection.filter((v: string) => v !== value));
      if (!wasAlreadySelected) {
        setRiskScore((prev: number) => prev - opt.score);
      }
    } else {
      setMultiSelection([...multiSelection, value]);
      if (!wasAlreadySelected) {
        setRiskScore((prev: number) => prev + opt.score);
      }
    }
  };

  const validateMultiChoice = (key: string) => {
    const finalValue = multiSelection.length > 0 ? multiSelection : ["Non précisé"];
    setAnswers((prev: any) => ({ ...prev, [key]: finalValue }));
    setMultiSelection([]);
    
    // Feedback visuel et toast
    showToast(`${finalValue.length} réponse(s) enregistrée(s)`, 'success');
    const button = document.activeElement as HTMLElement;
    if (button) {
      button.classList.add('ring-2', 'ring-green-500', 'ring-offset-2');
      setTimeout(() => button.classList.remove('ring-2', 'ring-green-500', 'ring-offset-2'), 300);
    }
    
    setStep((prev: number) => prev + 1);
  };
  
  // Restaurer les sélections quand on revient en arrière
  useEffect(() => {
    if (step === 2 && path === 'fissure' && answers['LOC_FISSURE']) {
      setMultiSelection(Array.isArray(answers['LOC_FISSURE']) ? answers['LOC_FISSURE'] : []);
    } else if (step === 3 && path === 'fissure' && answers['FORME_FISSURE']) {
      setMultiSelection(Array.isArray(answers['FORME_FISSURE']) ? answers['FORME_FISSURE'] : []);
    } else if (step === 4 && path === 'fissure' && answers['SIGNES']) {
      setMultiSelection(Array.isArray(answers['SIGNES']) ? answers['SIGNES'] : []);
    } else if (step === 2 && path === 'humidite' && answers['SYMP_HUM']) {
      setMultiSelection(Array.isArray(answers['SYMP_HUM']) ? answers['SYMP_HUM'] : []);
    } else if (step === 6 && answers['CONTEXTE']) {
      setMultiSelection(Array.isArray(answers['CONTEXTE']) ? answers['CONTEXTE'] : []);
    } else if (step < 2 || step > 10) {
      setMultiSelection([]);
    }
  }, [step, path, answers]);

  const handlePhotoUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
        // Vérifier la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          showToast('La photo est trop volumineuse (max 5MB)', 'warning');
          return;
        }
        const newPhoto = URL.createObjectURL(file);
        setPhotos((prev: string[]) => [...prev, newPhoto]);
        showToast('Photo ajoutée avec succès', 'success');
    }
  };

  // Fonction pour générer le résumé des réponses
  const getSummary = () => {
    const summary: {[key: string]: any} = {};
    
    if (path === 'fissure') {
      summary['Type'] = 'Fissures & Mouvements';
      if (answers['LOC_FISSURE']) summary['Localisation'] = Array.isArray(answers['LOC_FISSURE']) ? answers['LOC_FISSURE'].join(', ') : answers['LOC_FISSURE'];
      if (answers['FORME_FISSURE']) summary['Morphologie'] = Array.isArray(answers['FORME_FISSURE']) ? answers['FORME_FISSURE'].join(', ') : answers['FORME_FISSURE'];
      if (answers['SIGNES']) summary['Signes collatéraux'] = Array.isArray(answers['SIGNES']) ? answers['SIGNES'].join(', ') : answers['SIGNES'];
    } else if (path === 'humidite') {
      summary['Type'] = 'Humidité & Infiltrations';
      if (answers['SYMP_HUM']) summary['Symptômes'] = Array.isArray(answers['SYMP_HUM']) ? answers['SYMP_HUM'].join(', ') : answers['SYMP_HUM'];
      if (answers['VENTILATION']) {
        const ventMap: {[key: string]: string} = {
          'vmc_ok': 'VMC Mécanique Active',
          'naturelle': 'Ventilation Naturelle',
          'aucune': 'Confinement / Aucune',
          'nsp': 'Je ne sais pas'
        };
        summary['Ventilation'] = ventMap[answers['VENTILATION']] || answers['VENTILATION'];
      }
      if (answers['HAUTEUR']) {
        const hautMap: {[key: string]: string} = {
          'bas': 'Pied de mur (Soubassement)',
          'total': 'Toute la hauteur',
          'spot': 'Zones localisées (Spots)',
          'nsp': 'Je ne sais pas'
        };
        summary['Hauteur'] = hautMap[answers['HAUTEUR']] || answers['HAUTEUR'];
      }
    }
    
    if (answers['AGE']) {
      const ageMap: {[key: string]: string} = {
        'ancien': 'Bâti Ancien (Avant 1970)',
        'moderne': 'Moderne (1970 - 2010)',
        'neuf': 'Récente (Après 2010)',
        'nsp': 'Je ne sais pas'
      };
      summary['Typologie'] = ageMap[answers['AGE']] || answers['AGE'];
    }
    
    if (answers['CONTEXTE']) summary['Contexte récent'] = Array.isArray(answers['CONTEXTE']) ? answers['CONTEXTE'].join(', ') : answers['CONTEXTE'];
    
    if (answers['ENV']) {
      const envMap: {[key: string]: string} = {
        'arbres': 'Il y a de gros arbres proches',
        'pente': 'Le terrain est en pente',
        'neutre': 'Terrain plat / Rien à signaler',
        'nsp': 'Je ne sais pas'
      };
      summary['Environnement'] = envMap[answers['ENV']] || answers['ENV'];
    }
    
    if (answers['STATUT']) {
      const statutMap: {[key: string]: string} = {
        'proprietaire': 'Propriétaire du bien',
        'locataire': 'Locataire',
        'autre': 'Autre situation'
      };
      summary['Statut'] = statutMap[answers['STATUT']] || answers['STATUT'];
    }
    
    if (answers['URGENCE']) {
      const urgenceMap: {[key: string]: string} = {
        'absolue': 'Urgence absolue',
        'moderee': 'Urgence modérée',
        'preventif': 'Préventif / Information',
        'nsp': 'Je ne sais pas'
      };
      summary['Niveau d\'urgence'] = urgenceMap[answers['URGENCE']] || answers['URGENCE'];
    }
    
    if (photos.length > 0) summary['Photos'] = `${photos.length} photo(s) ajoutée(s)`;
    
    return summary;
  };

  const startAnalysis = () => {
    showToast('Analyse en cours...', 'info');
    setStep(99);
    setLoadingProgress(0);
    const interval = setInterval(() => {
        setLoadingProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                setIsResultReady(true);
                showToast('Analyse terminée !', 'success');
                return 100;
            }
            return prev + 2;
        });
    }, 50);
  };

  const handleFinalSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (activeTab === 'rdv') {
        // Lien de paiement ou Calendly
        setTimeout(() => {
            setStep(101); // Simulation succès
            setIsSubmitting(false);
        }, 1500);
    } else {
        // Envoi rapport PDF
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(101);
        }, 1500);
    }
  };

  // --- UI COMPONENTS ---

  const ProgressBar = () => {
    const progress = Math.min((step / totalProgressSteps) * 100, 100);
    const colorClass = path === 'humidite' ? 'bg-blue-500' : 'bg-orange-600';
    const currentStepDisplay = step > 0 && step < 99 ? step : 0;
    const totalStepsDisplay = totalProgressSteps;
    const estimatedTime = step > 0 && step < 99 ? getEstimatedTime() : 0;
    
    return (
      <div className="w-full bg-slate-100 h-2 mt-0 relative">
        <div className={`h-full transition-all duration-500 ease-out ${colorClass}`} style={{ width: `${progress}%` }}></div>
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded shadow-sm">
            {currentStepDisplay}/{totalStepsDisplay}
          </span>
          {estimatedTime > 0 && step > 0 && step < 99 && (
            <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded shadow-sm">
              ~{estimatedTime} min restantes
            </span>
          )}
        </div>
      </div>
    );
  };

  const ExpertBubble = ({ text }: { text: string }) => (
    <div className="mt-6 bg-white border-l-4 border-slate-800 p-4 rounded-r-lg shadow-sm animate-fadeIn flex items-start gap-3">
        <div className="mt-1 text-slate-800 shrink-0"><IconInfo /></div>
        <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Note de l'Expert IPB</p>
            <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
        </div>
    </div>
  );

  // Composant Toast
  const Toast = () => {
    if (!toast) return null;
    
    const bgColor = toast.type === 'success' ? 'bg-green-500' : toast.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500';
    
    return (
      <div className="fixed top-4 right-4 z-50 animate-slideIn">
        <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 min-w-[300px]`}>
          <IconCheck />
          <span className="font-semibold">{toast.message}</span>
        </div>
      </div>
    );
  };
  
  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ne pas intercepter si on est dans un input
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }
      
      // Flèche gauche ou Backspace : retour en arrière
      if ((e.key === 'ArrowLeft' || e.key === 'Backspace') && step > 0 && step < 99 && step !== 101) {
        e.preventDefault();
        if (step > 1) {
          setStep(step - 1);
        } else {
          setStep(0);
        }
      }
      
      // Flèche droite ou Enter : continuer (si bouton disponible)
      if ((e.key === 'ArrowRight' || e.key === 'Enter') && step > 0 && step < 99) {
        e.preventDefault();
        const continueButton = document.querySelector('button:not([disabled]):not(.italic)') as HTMLButtonElement;
        if (continueButton && continueButton.textContent?.includes('Continuer') || continueButton?.textContent?.includes('Valider')) {
          continueButton.click();
        }
      }
      
      // Escape : retour à l'accueil
      if (e.key === 'Escape' && step > 0 && step < 99) {
        if (window.confirm('Voulez-vous vraiment quitter le diagnostic ? Vos réponses sont sauvegardées.')) {
          setStep(0);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  const ChoiceButton = ({ label, sub, onClick, isSelected, isNsp }: any) => (
    <button 
        onClick={onClick}
        className={`w-full p-5 mb-3 rounded-xl border-2 text-left transition-all duration-200 group relative overflow-hidden
        ${isNsp 
            ? 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 italic' 
            : isSelected 
                ? 'border-slate-900 bg-slate-900 text-white shadow-lg transform scale-[1.01]' 
                : 'border-slate-200 hover:border-orange-400 bg-white shadow-sm hover:shadow-md'}`}
    >
        <div className="flex justify-between items-center relative z-10">
            <div>
                <span className={`font-bold text-lg block ${isSelected ? 'text-white' : isNsp ? 'text-slate-500' : 'text-slate-900'}`}>{label}</span>
                {sub && <span className={`text-sm mt-1 block ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>{sub}</span>}
            </div>
            {isSelected && <div className="text-white"><IconCheck /></div>}
        </div>
    </button>
  );

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
      <Toast />
      
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col min-h-[750px] relative">
        
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
             <div className="flex items-center gap-2">
                <div className="font-black text-xl tracking-tighter text-slate-900">IPB<span className="text-orange-600">.</span></div>
             </div>
             {step > 0 && step < 99 && step !== 101 && (
                 <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        if (step > 1) {
                          setStep(step - 1);
                        } else {
                          setStep(0);
                        }
                      }} 
                      className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500 transition flex items-center gap-2 group"
                      title="Retour en arrière"
                    >
                      <IconBack />
                      <span className="text-xs font-semibold hidden sm:inline group-hover:text-slate-700">Retour</span>
                    </button>
                 </div>
             )}
        </div>

        {step > 0 && step < 99 && <ProgressBar />}

        <div className="flex-1 overflow-y-auto p-6 md:p-12">
            
            {/* STEP 0: ACCUEIL */}
            {step === 0 && (
                <div className="animate-fadeIn pt-4 text-center">
                    <div className="inline-block p-4 bg-orange-50 text-orange-600 rounded-full mb-6"><IconSearch /></div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">Comprendre l'état de<br/>votre patrimoine.</h1>
                    <p className="text-lg text-slate-600 mb-4 max-w-md mx-auto">Ce module d'analyse structure les observations techniques pour préparer l'intervention de l'ingénieur IPB.</p>
                    <div className="mb-8 max-w-md mx-auto">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                        <div className="flex items-start gap-3">
                          <div className="text-blue-600 mt-0.5"><IconInfo /></div>
                          <div>
                            <p className="text-sm font-semibold text-blue-900 mb-1">⏱️ Temps estimé : ~2 minutes</p>
                            <p className="text-xs text-blue-700">Vos réponses sont sauvegardées automatiquement. Vous pouvez reprendre plus tard si besoin.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-6 mb-10 text-left border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wide text-center">Protocole d'intervention :</h3>
                        <div className="flex justify-between items-center text-center px-4">
                            <div className="flex flex-col items-center gap-2"><div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-900">1</div><p className="text-xs font-bold text-slate-700">Analyse<br/>Digitale</p></div>
                            <div className="h-0.5 bg-slate-200 w-12"></div>
                            <div className="flex flex-col items-center gap-2"><div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-900">2</div><p className="text-xs font-bold text-slate-700">Validation<br/>Expert</p></div>
                            <div className="h-0.5 bg-slate-200 w-12"></div>
                            <div className="flex flex-col items-center gap-2"><div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-900">3</div><p className="text-xs font-bold text-slate-700">Rapport<br/>Technique</p></div>
                        </div>
                    </div>
                    <button onClick={() => setStep(1)} className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-orange-600 transition duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 mx-auto">Initier le diagnostic <IconArrowRight /></button>
                </div>
            )}

            {/* STEP 1: LE CHOIX */}
            {step === 1 && (
                <div className="animate-slideIn">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-3 text-slate-900">Quelle est votre observation principale ?</h2>
                        <p className="text-slate-500 text-lg mb-4">Ce choix orientera l'arbre de décision technique.</p>
                        {totalProgressSteps - step <= 3 && step > 0 && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800 font-medium">
                            🎉 Plus que {totalProgressSteps - step} question(s) ! Vous y êtes presque.
                          </div>
                        )}
                    </div>
                    <ChoiceButton label="Fissures & Mouvements" sub="Lézardes sur murs porteurs, cloisons, plafonds..." onClick={() => handleSingleChoice('TYPE', 'fissure')} />
                    <ChoiceButton label="Humidité & Infiltrations" sub="Taches, salpêtre, moisissures, décollements..." onClick={() => handleSingleChoice('TYPE', 'humidite')} />
                </div>
            )}

            {/* --- PARCOURS FISSURES --- */}

            {step === 2 && path === 'fissure' && (
                <div className="animate-slideIn">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-slate-900">Localisation des anomalies</h2>
                            <p className="text-slate-500">Sélectionnez toutes les zones concernées (Choix multiple).</p>
                        </div>
                        {answers['LOC_FISSURE'] && (
                            <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs font-semibold text-green-700">
                                ✓ {Array.isArray(answers['LOC_FISSURE']) ? answers['LOC_FISSURE'].length : 1} zone(s)
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-3 mb-8">
                        {['Façade extérieure', 'Murs intérieurs (Refends)', 'Plafond / Dalle', 'Sol / Carrelage', 'Terrasse / Trottoir'].map((opt) => {
                            const isSelected = answers['LOC_FISSURE']?.includes(opt) || multiSelection.includes(opt);
                            return (
                                <button 
                                    key={opt}
                                    onClick={() => toggleMultiChoice({label: opt, score: 5})}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition flex justify-between items-center
                                    ${isSelected ? 'border-orange-600 bg-orange-50' : 'border-slate-100 bg-white hover:border-slate-300'}`}
                                >
                                    <span className={`font-bold text-lg ${isSelected ? 'text-orange-900' : 'text-slate-700'}`}>{opt}</span>
                                    {isSelected && <div className="text-orange-600"><IconCheck /></div>}
                                </button>
                            );
                        })}
                    </div>
                    <div className="space-y-3">
                        <button disabled={multiSelection.length === 0 && !answers['LOC_FISSURE']} onClick={() => validateMultiChoice('LOC_FISSURE')} className="w-full bg-slate-900 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-xl transition shadow-md text-lg">Continuer</button>
                        <button onClick={() => {
                            setAnswers((prev: any) => ({ ...prev, 'LOC_FISSURE': ['Je ne sais pas'] }));
                            setStep((prev: number) => prev + 1);
                        }} className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 italic font-medium transition">
                            Je ne sais pas exactement
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && path === 'fissure' && (
                <div className="animate-slideIn">
                    <h2 className="text-2xl font-bold mb-3 text-slate-900">Morphologie des fissures</h2>
                    <p className="text-slate-500 mb-8">La forme traduit les contraintes mécaniques subies.</p>
                    
                    <div className="space-y-2 mb-6">
                        {[{label: "En Escalier / Crémaillère", score: 10, sub: "Suit les joints"}, {label: "Verticale ou Horizontale", score: 5, sub: "Rupture franche"}, {label: "Faïençage", score: 2, sub: "Réseau superficiel"}].map((opt) => (
                            <button 
                                key={opt.label}
                                onClick={() => toggleMultiChoice(opt)}
                                className={`w-full p-4 rounded-xl border-2 text-left transition flex justify-between items-center
                                ${multiSelection.includes(opt.label) ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                            >
                                <span className={`font-bold text-base ${multiSelection.includes(opt.label) ? 'text-orange-900' : 'text-slate-700'}`}>{opt.label}</span>
                                {multiSelection.includes(opt.label) && <div className="text-orange-600"><IconCheck /></div>}
                            </button>
                        ))}
                    </div>
                    
                    <div className="space-y-3 mb-2">
                        <button onClick={() => validateMultiChoice('FORME_FISSURE')} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl transition shadow-md text-lg">
                            Valider les formes
                        </button>
                        <button onClick={() => {
                            setAnswers((prev: any) => ({ ...prev, 'FORME_FISSURE': ['Je ne sais pas'] }));
                            setStep((prev: number) => prev + 1);
                        }} className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 italic font-medium transition">
                            Je ne sais pas
                        </button>
                    </div>
                    
                    <ExpertBubble text="Une fissure en escalier (45°) est souvent caractéristique d'un tassement différentiel des fondations (mouvement de sol argileux)." />
                </div>
            )}

            {step === 4 && path === 'fissure' && (
                <div className="animate-slideIn">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-slate-900">Signes collatéraux</h2>
                            <p className="text-slate-500">Avez-vous noté d'autres dysfonctionnements ?</p>
                        </div>
                        {answers['SIGNES'] && (
                            <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs font-semibold text-green-700">
                                ✓ Répondu
                            </div>
                        )}
                    </div>
                    <div className="space-y-2 mb-6">
                         {[{label: "Portes/Fenêtres qui frottent", score: 10}, {label: "Bruits de craquement", score: 5}, {label: "Décollement sols", score: 3}].map((opt) => {
                            const isSelected = answers['SIGNES']?.includes(opt.label) || multiSelection.includes(opt.label);
                            return (
                                <button 
                                    key={opt.label}
                                    onClick={() => toggleMultiChoice({...opt, key: 'SIGNES'})}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition flex justify-between items-center
                                    ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                                >
                                    <span className={`font-bold text-base ${isSelected ? 'text-orange-900' : 'text-slate-700'}`}>{opt.label}</span>
                                    {isSelected && <div className="text-orange-600"><IconCheck /></div>}
                                </button>
                            );
                        })}
                    </div>
                    <div className="space-y-3 mb-2">
                        <button onClick={() => validateMultiChoice('SIGNES')} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl transition shadow-md text-lg">
                            Valider
                        </button>
                        <button onClick={() => {
                            setAnswers((prev: any) => ({ ...prev, 'SIGNES': ['Je ne sais pas'] }));
                            setStep((prev: number) => prev + 1);
                        }} className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 italic font-medium transition">
                            Je ne sais pas
                        </button>
                    </div>
                    <ExpertBubble text="Si les menuiseries ne sont plus d'équerre (frottements), cela confirme souvent une distorsion de la structure globale." />
                </div>
            )}

            {/* --- PARCOURS HUMIDITÉ --- */}

            {step === 2 && path === 'humidite' && (
                <div className="animate-slideIn">
                    <h2 className="text-2xl font-bold mb-3 text-slate-900">Symptomatologie</h2>
                    <p className="text-slate-500 mb-6">Quels phénomènes observez-vous ? (Choix multiple)</p>
                    
                    <div className="space-y-3 mb-8">
                        {[{label: 'Salpêtre (Poudre blanche)', score: 10}, {label: 'Peinture qui cloque', score: 5}, {label: 'Moisissures (Taches noires)', score: 3}, {label: 'Ruissellement', score: 8}].map((opt) => (
                            <button key={opt.label} onClick={() => toggleMultiChoice(opt)} className={`w-full p-4 rounded-xl border-2 text-left transition flex justify-between items-center ${multiSelection.includes(opt.label) ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                                <span className={`font-bold text-lg ${multiSelection.includes(opt.label) ? 'text-blue-900' : 'text-slate-700'}`}>{opt.label}</span>
                                {multiSelection.includes(opt.label) && <div className="text-blue-600"><IconCheck /></div>}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-3">
                        <button disabled={multiSelection.length === 0 && !answers['SYMP_HUM']} onClick={() => validateMultiChoice('SYMP_HUM')} className="w-full bg-slate-900 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-xl transition shadow-md text-lg">
                            Confirmer le constat
                        </button>
                        <button onClick={() => {
                            setAnswers((prev: any) => ({ ...prev, 'SYMP_HUM': ['Je ne sais pas'] }));
                            setStep((prev: number) => prev + 1);
                        }} className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 italic font-medium transition">
                            Je ne sais pas
                        </button>
                    </div>
                    
                    <ExpertBubble text="Le salpêtre est un marqueur chimique fiable : il s'agit de sels minéraux du sol qui migrent dans le mur. Il confirme quasi-systématiquement une remontée capillaire." />
                </div>
            )}

            {step === 3 && path === 'humidite' && (
                <div className="animate-slideIn">
                    <h2 className="text-2xl font-bold mb-3 text-slate-900">Audit Ventilation</h2>
                    <p className="text-slate-500 mb-8">Pour écarter la piste de la condensation.</p>
                    
                    <ChoiceButton label="VMC Mécanique Active" sub="Bouches d'extraction motorisées (Cuisine/SDB)" onClick={() => handleSingleChoice('VENTILATION', 'vmc_ok', 1, 5)} />
                    <ChoiceButton label="Ventilation Naturelle" sub="Grilles d'aération sur fenêtres uniquement" onClick={() => handleSingleChoice('VENTILATION', 'naturelle', 1, 2)} />
                    <ChoiceButton label="Confinement / Aucune" sub="Pas de dispositif visible" onClick={() => handleSingleChoice('VENTILATION', 'aucune', 1, 0)} />
                    <ChoiceButton label="Je ne sais pas" sub="Difficile à vérifier" isNsp={true} onClick={() => handleSingleChoice('VENTILATION', 'nsp', 1, 0)} />
                    <ExpertBubble text="Parfois, de simples taches noires sont dues à un manque d'air (condensation) et non à une fuite. Savoir si vous avez une VMC nous aide à faire le tri." />
                </div>
            )}

            {step === 4 && path === 'humidite' && (
                <div className="animate-slideIn">
                    <h2 className="text-2xl font-bold mb-3 text-slate-900">Hauteur d'ascension</h2>
                    <p className="text-slate-500 mb-8">Jusqu'où les traces sont-elles visibles ?</p>
                    
                    <ChoiceButton label="Pied de mur (Soubassement)" sub="Max 1 mètre - 1m50" onClick={() => handleSingleChoice('HAUTEUR', 'bas')} />
                    <ChoiceButton label="Toute la hauteur" sub="Du sol au plafond" onClick={() => handleSingleChoice('HAUTEUR', 'total')} />
                    <ChoiceButton label="Zones localisées (Spots)" sub="Au milieu ou dans les angles" onClick={() => handleSingleChoice('HAUTEUR', 'spot')} />
                    <ChoiceButton label="Je ne sais pas" sub="Difficile à déterminer" isNsp={true} onClick={() => handleSingleChoice('HAUTEUR', 'nsp', 1, 0)} />
                    
                    <ExpertBubble text="L'humidité ascensionnelle (capillarité) s'arrête généralement à 1m50 à cause de la gravité. Si c'est plus haut, cela suggère une infiltration latérale ou une fuite." />
                </div>
            )}

            {/* --- TRONC COMMUN --- */}

            {step === 5 && (
                <div className="animate-slideIn">
                    <h2 className="text-2xl font-bold mb-3 text-slate-900">Typologie constructive</h2>
                    <p className="text-slate-500 mb-8">Les matériaux dépendent de l'époque.</p>
                    
                    <ChoiceButton label="Bâti Ancien (Avant 1970)" sub="Pierre, Brique rouge..." onClick={() => handleSingleChoice('AGE', 'ancien', 1, 5)} />
                    <ChoiceButton label="Moderne (1970 - 2010)" sub="Parpaings, Vide sanitaire..." onClick={() => handleSingleChoice('AGE', 'moderne', 1, 2)} />
                    <ChoiceButton label="Récente (Après 2010)" sub="Maison neuve" onClick={() => handleSingleChoice('AGE', 'neuf', 1, 0)} />
                    <ChoiceButton label="Je ne sais pas" sub="Je n'ai pas la date" isNsp={true} onClick={() => handleSingleChoice('AGE', 'nsp', 1, 0)} />
                </div>
            )}

            {step === 6 && (
                <div className="animate-slideIn">
                    <h2 className="text-2xl font-bold mb-3 text-slate-900">Contexte récent</h2>
                    <p className="text-slate-500 mb-6">Y a-t-il eu un événement particulier ?</p>
                    <div className="space-y-2 mb-6">
                         {[{label: "Sécheresse / Canicule", score: 8}, {label: "Travaux à proximité", score: 5}, {label: "Dégât des eaux", score: 5}].map((opt) => {
                            const isSelected = answers['CONTEXTE']?.includes(opt.label) || multiSelection.includes(opt.label);
                            return (
                                <button 
                                    key={opt.label}
                                    onClick={() => toggleMultiChoice({...opt, key: 'CONTEXTE'})}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition flex justify-between items-center
                                    ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                                >
                                    <span className={`font-bold text-base ${isSelected ? 'text-orange-900' : 'text-slate-700'}`}>{opt.label}</span>
                                    {isSelected && <div className="text-orange-600"><IconCheck /></div>}
                                </button>
                            );
                        })}
                    </div>
                    <div className="space-y-3 mb-2">
                        <button onClick={() => validateMultiChoice('CONTEXTE')} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl transition shadow-md text-lg">
                            Valider
                        </button>
                        <button onClick={() => {
                            setAnswers((prev: any) => ({ ...prev, 'CONTEXTE': ['Je ne sais pas'] }));
                            setStep((prev: number) => prev + 1);
                        }} className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 italic font-medium transition">
                            Je ne sais pas
                        </button>
                    </div>
                </div>
            )}

            {step === 7 && (
                <div className="animate-slideIn">
                    <h2 className="text-2xl font-bold mb-3 text-slate-900">L'extérieur de la maison</h2>
                    <p className="text-slate-500 mb-8">Regardons autour des murs.</p>
                    
                    <ChoiceButton label="Il y a de gros arbres proches" sub="À moins de 3-4 mètres de la maison" onClick={() => handleSingleChoice('ENV', 'arbres')} />
                    <ChoiceButton label="Le terrain est en pente" sub="Maison sur un talus ou en contrebas" onClick={() => handleSingleChoice('ENV', 'pente')} />
                    <ChoiceButton label="Terrain plat / Rien à signaler" sub="Environnement standard" onClick={() => handleSingleChoice('ENV', 'neutre')} />
                    <ChoiceButton label="Je ne sais pas" sub="Je n'ai pas observé" isNsp={true} onClick={() => handleSingleChoice('ENV', 'nsp', 1, 0)} />
                    
                    <ExpertBubble text="En été, les racines des grands arbres boivent toute l'eau du sol, ce qui assèche l'argile sous vos fondations et peut faire bouger la maison." />
                </div>
            )}

            {/* STEP 8: STATUT (PROPRIÉTAIRE/LOCATAIRE) */}
            {step === 8 && (
                <div className="animate-slideIn">
                    <div className="flex items-center gap-2 mb-3">
                        <h2 className="text-2xl font-bold text-slate-900">Vous êtes...</h2>
                        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">Important</span>
                    </div>
                    <p className="text-slate-500 mb-8">Cette information nous aide à adapter notre conseil et notre approche.</p>
                    
                    <ChoiceButton 
                        label="Propriétaire du bien" 
                        sub="Je suis propriétaire de cette maison/appartement" 
                        onClick={() => handleSingleChoice('STATUT', 'proprietaire', 1, 0)}
                        isSelected={answers['STATUT'] === 'proprietaire'}
                    />
                    <ChoiceButton 
                        label="Locataire" 
                        sub="Je loue ce bien" 
                        onClick={() => handleSingleChoice('STATUT', 'locataire', 1, 0)}
                        isSelected={answers['STATUT'] === 'locataire'}
                    />
                    <ChoiceButton 
                        label="Autre situation" 
                        sub="Usufruitier, héritier, etc." 
                        onClick={() => handleSingleChoice('STATUT', 'autre', 1, 0)}
                        isSelected={answers['STATUT'] === 'autre'}
                    />
                    
                    <ExpertBubble text="En tant que propriétaire, vous êtes responsable des travaux de réparation. En tant que locataire, c'est généralement au propriétaire de prendre en charge les réparations structurelles." />
                </div>
            )}

            {/* STEP 9: URGENCE PERÇUE */}
            {step === 9 && (
                <div className="animate-slideIn">
                    <div className="flex items-center gap-2 mb-3">
                        <h2 className="text-2xl font-bold text-slate-900">Quel est votre niveau d'urgence ?</h2>
                        <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">Important</span>
                    </div>
                    <p className="text-slate-500 mb-8">Cette information nous permet de prioriser votre dossier.</p>
                    
                    <ChoiceButton 
                        label="Urgence absolue" 
                        sub="La situation s'aggrave rapidement, j'ai besoin d'une intervention immédiate" 
                        onClick={() => handleSingleChoice('URGENCE', 'absolue', 1, 15)}
                        isSelected={answers['URGENCE'] === 'absolue'}
                    />
                    <ChoiceButton 
                        label="Urgence modérée" 
                        sub="Je veux traiter le problème rapidement, dans les prochaines semaines" 
                        onClick={() => handleSingleChoice('URGENCE', 'moderee', 1, 8)}
                        isSelected={answers['URGENCE'] === 'moderee'}
                    />
                    <ChoiceButton 
                        label="Préventif / Information" 
                        sub="Je veux comprendre la situation et planifier une intervention" 
                        onClick={() => handleSingleChoice('URGENCE', 'preventif', 1, 0)}
                        isSelected={answers['URGENCE'] === 'preventif'}
                    />
                    <ChoiceButton 
                        label="Je ne sais pas" 
                        sub="Je veux d'abord avoir l'avis d'un expert" 
                        isNsp={true}
                        onClick={() => handleSingleChoice('URGENCE', 'nsp', 1, 0)}
                        isSelected={answers['URGENCE'] === 'nsp'}
                    />
                    
                    <ExpertBubble text="Les situations d'urgence absolue nécessitent une intervention rapide pour éviter l'aggravation. Nous priorisons ces dossiers pour une réponse sous 24h." />
                </div>
            )}

            {/* STEP 10: PHOTO UPLOAD */}
            {step === 10 && (
                <div className="animate-slideIn text-center pt-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400"><IconCamera /></div>
                    <h2 className="text-2xl font-bold mb-4 text-slate-900">Avez-vous une photo ?</h2>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">C'est le meilleur moyen pour notre expert de comprendre la situation avant de vous appeler.</p>
                    <label className="block w-full border-2 border-dashed border-slate-300 rounded-2xl p-8 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition bg-white mb-6">
                        <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                        <div className="text-center"><span className="block text-lg font-bold text-slate-700 mb-1">Ajouter une photo</span><span className="text-xs text-slate-400">Facultatif - JPG/PNG</span></div>
                    </label>
                    {photos.length > 0 && (
                      <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">✓ {photos.length} photo(s) ajoutée(s)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {photos.map((photo, idx) => (
                            <div key={idx} className="relative group">
                              <Image src={photo} alt={`Photo ${idx + 1}`} width={200} height={128} className="w-full h-32 object-cover rounded-lg border-2 border-slate-200" unoptimized />
                              <button
                                onClick={() => {
                                  setPhotos((prev: string[]) => prev.filter((_, i) => i !== idx));
                                  URL.revokeObjectURL(photo);
                                  showToast('Photo supprimée', 'info');
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Supprimer"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="space-y-3">
                        <button onClick={() => setStep(98)} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition text-lg">Voir le résumé</button>
                        <button onClick={startAnalysis} className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 italic font-medium transition">
                            Passer directement à l'analyse
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 98: RÉSUMÉ AVANT SOUMISSION */}
            {step === 98 && (
                <div className="animate-fadeIn pt-4">
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Récapitulatif de vos réponses</h2>
                        <p className="text-slate-600 text-lg">Vérifiez vos réponses avant de finaliser le diagnostic. Vous pouvez revenir en arrière pour modifier.</p>
                    </div>
                    
                    <div className="bg-slate-50 rounded-2xl p-6 mb-6 border border-slate-200">
                        <div className="space-y-4">
                            {Object.entries(getSummary()).map(([key, value]) => (
                                <div key={key} className="border-b border-slate-200 pb-4 last:border-0">
                                    <div className="flex justify-between items-start gap-4">
                                        <span className="font-bold text-slate-900 text-sm uppercase tracking-wide">{key}</span>
                                        <span className="text-slate-700 text-right flex-1">{String(value)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <IconInfo className="text-blue-600 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-blue-900 mb-1">Score de risque calculé : {riskScore} points</p>
                                <p className="text-xs text-blue-700">Ce score aide notre expert à prioriser votre dossier.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                            onClick={() => setStep(10)} 
                            className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-xl font-bold shadow-md hover:bg-slate-300 transition"
                        >
                            ← Modifier mes réponses
                        </button>
                        <button 
                            onClick={startAnalysis} 
                            className="flex-1 bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-orange-700 transition flex items-center justify-center gap-2"
                        >
                            Confirmer et analyser
                            <IconArrowRight />
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 99: LOADING */}
            {step === 99 && (
                <div className="flex flex-col items-center justify-center h-full text-center pt-10 px-6">
                    <div className="w-24 h-24 border-4 border-slate-100 border-t-orange-600 rounded-full animate-spin mb-8"></div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Analyse de vos réponses...</h2>
                    <div className="space-y-4 w-full max-w-xs mx-auto text-left">
                        <div className={`flex items-center gap-4 transition-all duration-500 ${loadingProgress > 20 ? 'opacity-100' : 'opacity-40'}`}><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="font-bold text-slate-700">Traitement des symptômes</span></div>
                        <div className={`flex items-center gap-4 transition-all duration-500 ${loadingProgress > 50 ? 'opacity-100' : 'opacity-40'}`}><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="font-bold text-slate-700">Comparaison base de données (31)</span></div>
                        <div className={`flex items-center gap-4 transition-all duration-500 ${loadingProgress > 80 ? 'opacity-100' : 'opacity-40'}`}><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="font-bold text-slate-700">Préparation du rapport</span></div>
                    </div>
                    {isResultReady && <button onClick={() => setStep(100)} className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition animate-fadeIn">Voir le résultat</button>}
                </div>
            )}

            {/* STEP 100: RÉSULTAT */}
            {step === 100 && (
                <div className="animate-fadeIn pt-2">
                    <div className="bg-slate-900 text-white rounded-2xl p-6 mb-8 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-orange-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div><p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Verdict de l'algorithme</p><h2 className="text-2xl font-bold">{getUrgencyLevel().label}</h2></div>
                                <div className={`${getUrgencyLevel().color} px-3 py-1 rounded text-xs font-bold uppercase`}>Score {riskScore}</div>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                <p className="text-xs font-bold text-orange-300 uppercase mb-2">Avis Technique :</p>
                                <p className="text-sm leading-relaxed text-slate-200 mb-3">{expertReport.diagnosis}</p>
                                <p className="text-sm leading-relaxed text-slate-200"><strong>Notre conseil :</strong> {expertReport.solution}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* RDV */}
                        <div className={`border-2 rounded-2xl p-6 cursor-pointer transition-all relative overflow-hidden ${activeTab === 'rdv' ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-orange-200'}`} onClick={() => setActiveTab('rdv')}>
                            <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">DÉDUCTIBLE*</div>
                            <div className="text-orange-600 mb-3"><IconCalendar /></div>
                            <h3 className="font-bold text-slate-900 mb-1">Réserver l'Expertise</h3>
                            <p className="text-xs text-slate-500 mb-4">Diagnostic complet + Devis garanti.</p>
                            {activeTab === 'rdv' && (
                                <form onSubmit={handleFinalSubmit} className="animate-fadeIn space-y-3">
                                    <input type="text" placeholder="Nom & Prénom" className="w-full p-3 rounded-lg border border-orange-200 mb-2 text-sm focus:border-orange-500 outline-none bg-white" required />
                                    <input type="tel" placeholder="Téléphone" className="w-full p-3 rounded-lg border border-orange-200 mb-2 text-sm focus:border-orange-500 outline-none bg-white" required />
                                    <button type="submit" className={`w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 text-sm shadow-lg transition flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-80' : ''}`}>{isSubmitting ? 'Validation...' : 'Demander mon créneau'}</button>
                                    <p className="text-[10px] text-center text-orange-800 mt-1 leading-tight">*Coût du diagnostic déduit si signature des travaux.</p>
                                </form>
                            )}
                        </div>
                        {/* RAPPORT */}
                        <div className={`border-2 rounded-2xl p-6 cursor-pointer transition-all ${activeTab === 'report' ? 'border-slate-900 bg-slate-50' : 'border-slate-100 hover:border-slate-300'}`} onClick={() => setActiveTab('report')}>
                            <div className="text-slate-500 mb-3"><IconDownload /></div>
                            <h3 className="font-bold text-slate-900 mb-1">Recevoir la fiche</h3>
                            <p className="text-xs text-slate-500 mb-4">Résumé PDF par email.</p>
                            {activeTab === 'report' && (
                                <form onSubmit={handleFinalSubmit} className="animate-fadeIn"><input type="email" placeholder="Votre Email" className="w-full p-3 rounded-lg border border-slate-300 mb-2 text-sm focus:border-slate-900 outline-none" required /><button className="w-full bg-slate-800 text-white font-bold py-2 rounded-lg hover:bg-slate-900 text-sm shadow-md">Envoyer le PDF</button></form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* MERCI */}
            {step === 101 && (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fadeIn">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-lg border-4 border-white"><IconCheck /></div>
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4">C'est parfait !</h2>
                    <p className="text-slate-600 mb-8 max-w-md text-lg leading-relaxed">Votre dossier est entre les mains de nos experts.<br/><br/>Vous serez recontacté <strong>sous 24h</strong> pour confirmer la suite.</p>
                    <button onClick={() => router.push('/')} className="text-slate-400 hover:text-slate-600 font-bold text-sm border-b border-slate-200 pb-1 transition">Retourner à l'accueil</button>
                </div>
            )}

        </div>
      </div>
    </div>
  );
}
