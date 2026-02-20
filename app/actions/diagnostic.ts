'use server';

import { diagnosticFormSchema, diagnosticLeadSchema, diagnosticReportSchema } from '@/lib/validations/diagnostic';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rateLimit';

/**
 * Server Actions pour le diagnostic
 * Utilise Nodemailer avec Gmail SMTP
 */

interface DiagnosticResult {
  success: boolean;
  message: string;
  data?: {
    appointmentId?: string;
    reportId?: string;
    leadId?: string;
    callbackId?: string;
  };
}

// Labels lisibles pour les questions
const questionLabels: Record<string, string> = {
  TYPE_BATIMENT: '🏠 Type de bâtiment',
  LOCALISATION: '📍 Localisation',
  FORME_FISSURE: '📐 Forme des fissures',
  LARGEUR: '📏 Largeur',
  ANCIENNETE: '📅 Ancienneté',
  EVOLUTION: '📈 Évolution',
  SIGNES_ASSOCIES: '⚠️ Signes associés',
  STATUT: '👤 Statut',
  URGENCE: '🚨 Niveau d\'urgence ressenti',
  MANIFESTATION: '💧 Manifestation',
  SAISONNALITE: '🌡️ Saisonnalité',
  VENTILATION: '🌀 Ventilation',
  TENTATIVES: '🔧 Tentatives précédentes',
};

// Labels lisibles pour les valeurs
const valueLabels: Record<string, string> = {
  // Type de bâtiment
  maison: 'Maison individuelle',
  immeuble: 'Immeuble / Appartement',
  local: 'Local professionnel',
  // Localisation fissures
  facade: 'Façade extérieure',
  interieur: 'Murs intérieurs',
  plafond: 'Plafond',
  sol: 'Sol / Dalle',
  // Localisation humidité
  bas_mur: 'Bas des murs',
  haut_mur: 'Haut des murs / Plafond',
  angle: 'Angles / Coins',
  partout: 'Partout',
  // Forme fissure
  escalier: 'En escalier (joints)',
  verticale: 'Verticales',
  horizontale: 'Horizontales',
  faience: 'Toile d\'araignée (faïençage)',
  // Largeur
  fine: 'Très fine (< 0.2mm)',
  moyenne: 'Moyenne (0.2-2mm)',
  large: 'Large (> 2mm)',
  // Ancienneté
  recent: 'Moins de 6 mois',
  moyen: '6 mois à 2 ans',
  ancien: 'Plus de 2 ans',
  // Evolution
  rapide: 'Oui, rapidement ⚠️',
  lente: 'Oui, lentement',
  stable: 'Stables',
  // Signes associés
  portes: 'Portes qui coincent',
  carrelage: 'Carrelage fissuré',
  infiltration: 'Infiltrations d\'eau',
  aucun: 'Aucun autre signe',
  // Statut
  proprietaire: 'Propriétaire occupant',
  bailleur: 'Propriétaire bailleur',
  locataire: 'Locataire',
  achat: 'En projet d\'achat',
  // Urgence
  immediate: '🔴 Très urgent',
  modere: '🟠 Préoccupant',
  surveille: '🟢 À surveiller',
  // Manifestation humidité
  salpetre: 'Salpêtre (poudre blanche)',
  moisissure: 'Moisissures noires',
  peinture: 'Peinture qui cloque',
  odeur: 'Odeur de moisi',
  // Saisonnalité
  hiver: 'Pire en hiver',
  ete: 'Pire en été / après pluie',
  permanent: 'Présent toute l\'année',
  // Ventilation
  oui_fonctionne: 'Oui, elle fonctionne',
  oui_panne: 'Oui, mais en panne',
  non: 'Non',
  // Tentatives
  deshu: 'Déshumidificateur',
  travaux: 'Travaux (injection, cuvelage...)',
  rien: 'Rien pour l\'instant',
  // Générique
  ne_sais_pas: 'Ne sait pas',
};

const formatAnswersHtml = (answers: Record<string, unknown>) => {
  const items = Object.entries(answers || {}).map(([key, value]) => {
    const questionLabel = questionLabels[key] || key;
    let displayValue: string;
    
    if (Array.isArray(value)) {
      displayValue = value.map(v => valueLabels[v] || v).join(', ');
    } else {
      displayValue = valueLabels[String(value)] || String(value);
    }
    
    return `<tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 10px 12px; font-weight: 600; color: #475569; width: 40%;">${questionLabel}</td>
      <td style="padding: 10px 12px; color: #0f172a;">${displayValue}</td>
    </tr>`;
  });
  
  return items.length 
    ? `<table style="width: 100%; border-collapse: collapse; font-size: 14px;">${items.join('')}</table>` 
    : '<p>Aucune réponse transmise.</p>';
};

// Génère le diagnostic expert
const getExpertDiagnosis = (path: 'fissure' | 'humidite', score: number) => {
  if (path === 'fissure') {
    if (score >= 40) {
      return {
        urgency: '🔴 INTERVENTION URGENTE',
        urgencyColor: '#dc2626',
        diagnosis: 'Tassement différentiel actif. La structure est en mouvement et nécessite une intervention rapide.',
        solution: 'Agrafage structurel avec renfort des façades. Calage des fondations possible si nécessaire.',
        delay: 'Intervention recommandée sous 2-4 semaines',
      };
    } else if (score >= 20) {
      return {
        urgency: '🟠 À TRAITER RAPIDEMENT',
        urgencyColor: '#ea580c',
        diagnosis: 'Fissures en évolution modérée. Situation qui mérite une surveillance active.',
        solution: 'Agrafage localisé ou surveillance instrumentée (fissuromètre) avant travaux.',
        delay: 'Diagnostic sur site recommandé sous 1-2 mois',
      };
    } else {
      return {
        urgency: '🟢 SURVEILLANCE',
        urgencyColor: '#16a34a',
        diagnosis: 'Fissures stables et superficielles. Pas de danger immédiat pour la structure.',
        solution: 'Surveillance visuelle. Rebouchage esthétique possible après confirmation de stabilité.',
        delay: 'Pas d\'urgence, surveiller l\'évolution',
      };
    }
  } else {
    if (score >= 40) {
      return {
        urgency: '🔴 INTERVENTION URGENTE',
        urgencyColor: '#dc2626',
        diagnosis: 'Remontées capillaires importantes. Environnement malsain (moisissures, salpêtre).',
        solution: 'Injection résine hydrophobe + traitement curatif. VMI recommandée en complément.',
        delay: 'Intervention recommandée sous 4-6 semaines',
      };
    } else if (score >= 20) {
      return {
        urgency: '🟠 À TRAITER',
        urgencyColor: '#ea580c',
        diagnosis: 'Problème d\'humidité significatif nécessitant un traitement adapté.',
        solution: 'Diagnostic précis pour identifier la cause. Injection résine, ventilation, ou réparation infiltrations.',
        delay: 'Diagnostic sur site recommandé sous 2-3 mois',
      };
    } else {
      return {
        urgency: '🟢 SURVEILLANCE',
        urgencyColor: '#16a34a',
        diagnosis: 'Problème modéré, probablement lié à un manque de ventilation (condensation).',
        solution: 'Amélioration de la ventilation (VMC). Si persistance, diagnostic pour confirmer.',
        delay: 'Améliorer la ventilation d\'abord',
      };
    }
  }
};

/**
 * Action pour enregistrer un diagnostic (lead) dès l'affichage du résultat
 */
export async function submitDiagnosticLead(
  formData: FormData
): Promise<DiagnosticResult> {
  try {
    const rawData = {
      name: formData.get('name') as string,
      phone: (formData.get('phone') as string) || '',
      email: (formData.get('email') as string) || '',
      address: (formData.get('address') as string) || '',
      yearBuilt: (formData.get('yearBuilt') as string) || '',
      preferredTime: (formData.get('preferredTime') as string) || '',
      path: formData.get('path') as 'fissure' | 'humidite',
      answers: JSON.parse(formData.get('answers') as string || '{}'),
      riskScore: parseInt(formData.get('riskScore') as string, 10) || 0,
    };
    
    // Labels pour les champs
    const yearBuiltLabels: Record<string, string> = {
      'avant_1950': 'Avant 1950',
      '1950_1980': '1950 - 1980',
      '1980_2000': '1980 - 2000',
      'apres_2000': 'Après 2000',
      'ne_sais_pas': 'Ne sait pas',
    };
    const preferredTimeLabels: Record<string, string> = {
      'matin': 'Matin (9h - 12h)',
      'apres_midi': 'Après-midi (14h - 18h)',
      'soir': 'Soir (18h - 20h)',
      'indifferent': 'Indifférent',
    };

    // Récupérer la photo si présente
    const photoBase64 = formData.get('photo') as string | null;
    const photoName = formData.get('photoName') as string | null;

    let validatedData;
    try {
      validatedData = diagnosticLeadSchema.parse(rawData);
    } catch (validationError) {
      console.error('❌ VALIDATION LEAD ÉCHOUÉE:', validationError instanceof z.ZodError ? validationError.issues : validationError);
      console.error('❌ Données reçues:', { name: rawData.name, phone: rawData.phone, email: rawData.email, path: rawData.path, riskScore: rawData.riskScore });
      throw validationError;
    }

    const rateKey = `diagnostic-lead:${validatedData.email || validatedData.phone || validatedData.name}`;
    const rateLimit = checkRateLimit(rateKey, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.allowed) {
      const retryMinutes = Math.ceil(rateLimit.retryAfterMs / 60000);
      return {
        success: false,
        message: `Trop de demandes en peu de temps. Réessayez dans ${retryMinutes} min.`,
      };
    }

    const leadId = `LEAD-${Date.now()}`;
    const logoUrl =
      process.env.EMAIL_LOGO_URL ||
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr'}/images/IPB_Logo_HD.png`;
    // TOUJOURS envoyer l'email du lead (c'est le plus important !)
    const expertDiagnosis = getExpertDiagnosis(validatedData.path, validatedData.riskScore);
    const answersHtml = formatAnswersHtml(validatedData.answers);
    
    console.log('📧 Lead validé, envoi email à:', process.env.EMAIL_TO || '⚠️ EMAIL_TO NON DÉFINI');
    if (process.env.EMAIL_TO) {
      const leadEmailResult = await sendEmail({
        to: process.env.EMAIL_TO,
        subject: `🎯 NOUVEAU LEAD [${expertDiagnosis.urgency}] - ${validatedData.name} - ${rawData.address || validatedData.phone || validatedData.email}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f8fafc;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #0f172a, #1e293b); color: white; padding: 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">🎯 Nouveau Lead IPB</h1>
              <p style="margin: 8px 0 0; opacity: 0.8; font-size: 14px;">Diagnostic en ligne complété</p>
            </div>
            
            <!-- Alerte urgence -->
            <div style="background: ${expertDiagnosis.urgencyColor}; color: white; padding: 16px 24px; text-align: center;">
              <span style="font-size: 18px; font-weight: bold;">${expertDiagnosis.urgency}</span>
            </div>
            
            <!-- Contact Client - Section prioritaire -->
            <div style="background: white; margin: 16px; padding: 20px; border-radius: 12px; border: 2px solid #ea580c;">
              <h2 style="margin: 0 0 16px; color: #ea580c; font-size: 18px;">📞 CONTACT CLIENT</h2>
              <table style="width: 100%; font-size: 16px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Nom :</td>
                  <td style="padding: 8px 0; font-size: 18px; color: #0f172a;"><strong>${validatedData.name}</strong></td>
                </tr>
                ${validatedData.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Téléphone :</td>
                  <td style="padding: 8px 0;">
                    <a href="tel:${validatedData.phone}" style="color: #ea580c; font-size: 20px; font-weight: bold; text-decoration: none;">
                      📱 ${validatedData.phone}
                    </a>
                  </td>
                </tr>
                ` : ''}
                ${validatedData.email ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email :</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${validatedData.email}" style="color: #2563eb; text-decoration: none;">
                      ✉️ ${validatedData.email}
                    </a>
                  </td>
                </tr>
                ` : ''}
                ${rawData.address ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Adresse du bien :</td>
                  <td style="padding: 8px 0;">
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rawData.address)}" target="_blank" style="color: #16a34a; text-decoration: none;">
                      📍 ${rawData.address}
                    </a>
                  </td>
                </tr>
                ` : ''}
                ${rawData.yearBuilt ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Construction :</td>
                  <td style="padding: 8px 0;">
                    🏗️ ${yearBuiltLabels[rawData.yearBuilt] || rawData.yearBuilt}
                  </td>
                </tr>
                ` : ''}
                ${rawData.preferredTime ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Créneau préféré :</td>
                  <td style="padding: 8px 0; color: #ea580c; font-weight: bold;">
                    🕐 ${preferredTimeLabels[rawData.preferredTime] || rawData.preferredTime}
                  </td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <!-- Diagnostic Expert -->
            <div style="background: white; margin: 16px; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 18px;">
                ${validatedData.path === 'fissure' ? '🔧' : '💧'} DIAGNOSTIC AUTOMATIQUE
              </h2>
              
              <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                <div style="flex: 1; background: #f1f5f9; padding: 12px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Type</div>
                  <div style="font-size: 14px; font-weight: bold; color: #0f172a; margin-top: 4px;">
                    ${validatedData.path === 'fissure' ? 'Fissures & Structure' : 'Humidité & Infiltrations'}
                  </div>
                </div>
                <div style="flex: 1; background: #f1f5f9; padding: 12px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Score</div>
                  <div style="font-size: 24px; font-weight: bold; color: ${expertDiagnosis.urgencyColor}; margin-top: 4px;">
                    ${validatedData.riskScore}/100
                  </div>
                </div>
              </div>
              
              <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 14px; border-radius: 0 8px 8px 0; margin-bottom: 12px;">
                <div style="font-weight: bold; color: #1e40af; margin-bottom: 6px;">📋 Analyse :</div>
                <div style="color: #1e40af;">${expertDiagnosis.diagnosis}</div>
              </div>
              
              <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px; border-radius: 0 8px 8px 0; margin-bottom: 12px;">
                <div style="font-weight: bold; color: #166534; margin-bottom: 6px;">✅ Solution recommandée :</div>
                <div style="color: #166534;">${expertDiagnosis.solution}</div>
              </div>
              
              <div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 14px; border-radius: 0 8px 8px 0;">
                <div style="font-weight: bold; color: #92400e; margin-bottom: 6px;">⏰ Délai :</div>
                <div style="color: #92400e;">${expertDiagnosis.delay}</div>
              </div>
            </div>
            
            <!-- Réponses détaillées -->
            <div style="background: white; margin: 16px; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 18px;">📝 RÉPONSES DU CLIENT</h2>
              ${answersHtml}
            </div>
            
            ${photoBase64 ? `
            <!-- Photo jointe -->
            <div style="background: #ecfdf5; margin: 16px; padding: 20px; border-radius: 12px; border: 2px solid #10b981;">
              <h2 style="margin: 0 0 12px; color: #059669; font-size: 18px;">📷 PHOTO JOINTE</h2>
              <p style="margin: 0; color: #047857;">Le client a joint une photo de son problème : <strong>${photoName || 'photo.jpg'}</strong></p>
              <p style="margin: 8px 0 0; color: #065f46; font-size: 14px;">→ Voir la pièce jointe de cet email</p>
            </div>
            ` : ''}
            
            <!-- Footer -->
            <div style="text-align: center; padding: 16px; color: #64748b; font-size: 12px;">
              <p style="margin: 0;">ID: ${leadId} • ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
              <p style="margin: 8px 0 0;">Généré automatiquement par le site IPB</p>
            </div>
            
          </div>
        `,
        // Ajouter la photo en pièce jointe si présente
        attachments: photoBase64 ? [{
          filename: photoName || 'photo-client.jpg',
          content: photoBase64.replace(/^data:image\/\w+;base64,/, ''),
          encoding: 'base64' as const,
        }] : undefined,
      });
      if (!leadEmailResult.success) {
        console.error('❌ Erreur envoi email lead:', leadEmailResult.error);
      } else {
        console.log('✅ Email lead envoyé avec succès à', process.env.EMAIL_TO);
      }
    } else {
      console.error('⚠️ EMAIL_TO non configuré — email lead NON envoyé');
    }

    if (validatedData.email) {
      await sendEmail({
        to: validatedData.email,
        subject: 'Votre diagnostic a bien été reçu | IPB Expertise',
        html: `
          <div style="font-family: Arial, sans-serif; background:#f8fafc; padding: 24px;">
            <div style="max-width: 640px; margin: 0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; overflow:hidden;">
              <div style="background: linear-gradient(135deg, #0f172a, #1f2937); color:#fff; padding: 22px 24px;">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:48px; height:48px; border-radius:12px; background:#0b1220; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                    <img src="${logoUrl}" alt="IPB" width="48" height="48" style="display:block; width:48px; height:48px; object-fit:contain;" />
                  </div>
                  <div>
                    <div style="font-size:18px; font-weight:700;">Institut de Pathologie du Bâtiment</div>
                    <div style="font-size:13px; opacity:.85; margin-top:4px;">Expertise fissures & humidité — Toulouse</div>
                  </div>
                </div>
              </div>
              <div style="padding: 24px;">
                <h2 style="margin: 0 0 12px; color:#0f172a; font-size:22px;">Bonjour ${validatedData.name},</h2>
                <p style="margin:0 0 14px; color:#334155; font-size:15px; line-height:1.6;">
                  Merci pour votre confiance. Votre demande a bien été reçue par notre équipe d’experts IPB.
                </p>
                <p style="margin:0 0 14px; color:#334155; font-size:15px; line-height:1.6;">
                  Nous analysons chaque situation avec méthode (diagnostic technique, mesures, recommandations adaptées).
                </p>

                <div style="background:#f1f5f9; border:1px solid #e2e8f0; padding:16px; border-radius:12px; margin:16px 0;">
                  <p style="margin:0; color:#0f172a; font-size:14px; font-weight:700;">Pourquoi IPB ?</p>
                  <ul style="margin:10px 0 0; padding-left:18px; color:#334155; font-size:14px; line-height:1.6;">
                    <li>✅ Expertise spécialisée fissures & humidité</li>
                    <li>✅ Solutions durables (agrafage, injection résine)</li>
                    <li>✅ Garantie décennale</li>
                  </ul>
                </div>

                <div style="background:#fff7ed; border-left:4px solid #ea580c; padding:14px 16px; border-radius:8px; margin:18px 0;">
                  <p style="margin:0; color:#7c2d12; font-size:14px;">
                    Pour accélérer l’analyse, appelez-nous directement au <strong>05 82 95 33 75</strong>.
                  </p>
                </div>

                <div style="text-align:center; margin: 18px 0 4px;">
                  <a href="https://ipb-expertise.fr" style="display:inline-block; background:#ea580c; color:#ffffff; text-decoration:none; padding:12px 22px; border-radius:10px; font-size:14px; font-weight:700;">
                    Découvrir notre expertise
                  </a>
                </div>

                <p style="margin:18px 0 0; color:#64748b; font-size:13px;">
                  IPB • Expert Fissures & Humidité • Toulouse et Haute-Garonne
                </p>
              </div>
            </div>
            <p style="text-align:center; font-size:12px; color:#94a3b8; margin-top:16px;">
              Cet email est envoyé automatiquement par contact@ipb-expertise.fr
            </p>
            <p style="text-align:center; font-size:11px; color:#94a3b8; margin-top:6px;">
              Vos données sont traitées conformément à la politique de confidentialité : https://ipb-expertise.fr/legal/confidentialite
            </p>
          </div>
        `,
      });
    }

    return {
      success: true,
      message: 'Diagnostic enregistré.',
      data: { leadId },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: `Erreur de validation: ${error.issues[0]?.message || 'Données invalides'}`,
      };
    }
    console.error('Erreur submitDiagnosticLead:', error);
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer plus tard.',
    };
  }
}

/**
 * Action pour demander un rappel suite au diagnostic
 */
export async function submitDiagnosticCallback(
  formData: FormData
): Promise<DiagnosticResult> {
  try {
    const rawData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || '',
      path: formData.get('path') as 'fissure' | 'humidite',
      answers: JSON.parse(formData.get('answers') as string || '{}'),
      riskScore: parseInt(formData.get('riskScore') as string, 10) || 0,
    };

    const rateKey = `diagnostic-callback:${rawData.phone || rawData.name}`;
    const rateLimit = checkRateLimit(rateKey, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.allowed) {
      const retryMinutes = Math.ceil(rateLimit.retryAfterMs / 60000);
      return {
        success: false,
        message: `Trop de demandes en peu de temps. Réessayez dans ${retryMinutes} min.`,
      };
    }

    const callbackId = `CALL-${Date.now()}`;
    const expertDiagnosis = getExpertDiagnosis(rawData.path, rawData.riskScore);
    const answersHtml = formatAnswersHtml(rawData.answers);
    const logoUrl =
      process.env.EMAIL_LOGO_URL ||
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr'}/images/IPB_Logo_HD.png`;

    if (process.env.EMAIL_TO) {
      const emailResult = await sendEmail({
        to: process.env.EMAIL_TO,
        subject: `📞 RAPPEL DEMANDÉ [${expertDiagnosis.urgency}] - ${rawData.name} - ${rawData.phone}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f8fafc;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ea580c, #dc2626); color: white; padding: 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">📞 DEMANDE DE RAPPEL</h1>
              <p style="margin: 8px 0 0; opacity: 0.9; font-size: 16px;">Le client attend votre appel !</p>
            </div>
            
            <!-- Alerte urgence -->
            <div style="background: ${expertDiagnosis.urgencyColor}; color: white; padding: 16px 24px; text-align: center;">
              <span style="font-size: 18px; font-weight: bold;">${expertDiagnosis.urgency}</span>
            </div>
            
            <!-- Contact Client - Section prioritaire -->
            <div style="background: white; margin: 16px; padding: 24px; border-radius: 12px; border: 3px solid #ea580c;">
              <h2 style="margin: 0 0 20px; color: #ea580c; font-size: 20px; text-align: center;">
                🚨 APPELER CE CLIENT
              </h2>
              <table style="width: 100%; font-size: 16px;">
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; width: 120px;">Nom :</td>
                  <td style="padding: 10px 0; font-size: 20px; color: #0f172a;"><strong>${rawData.name}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold;">Téléphone :</td>
                  <td style="padding: 10px 0;">
                    <a href="tel:${rawData.phone}" style="background: #ea580c; color: white; padding: 12px 24px; border-radius: 8px; font-size: 22px; font-weight: bold; text-decoration: none; display: inline-block;">
                      📱 ${rawData.phone}
                    </a>
                  </td>
                </tr>
                ${rawData.email ? `
                <tr>
                  <td style="padding: 10px 0; font-weight: bold;">Email :</td>
                  <td style="padding: 10px 0;">
                    <a href="mailto:${rawData.email}" style="color: #2563eb; text-decoration: none;">
                      ✉️ ${rawData.email}
                    </a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <!-- Diagnostic Expert -->
            <div style="background: white; margin: 16px; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 18px;">
                ${rawData.path === 'fissure' ? '🔧' : '💧'} DIAGNOSTIC À CONNAÎTRE AVANT L'APPEL
              </h2>
              
              <div style="margin-bottom: 16px;">
                <table style="width: 100%;">
                  <tr>
                    <td style="width: 50%; padding: 8px; background: #f1f5f9; border-radius: 8px; text-align: center;">
                      <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Type</div>
                      <div style="font-size: 14px; font-weight: bold; color: #0f172a; margin-top: 4px;">
                        ${rawData.path === 'fissure' ? 'Fissures & Structure' : 'Humidité & Infiltrations'}
                      </div>
                    </td>
                    <td style="width: 10px;"></td>
                    <td style="width: 50%; padding: 8px; background: #f1f5f9; border-radius: 8px; text-align: center;">
                      <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Score de risque</div>
                      <div style="font-size: 24px; font-weight: bold; color: ${expertDiagnosis.urgencyColor}; margin-top: 4px;">
                        ${rawData.riskScore}/100
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 14px; border-radius: 0 8px 8px 0; margin-bottom: 12px;">
                <div style="font-weight: bold; color: #1e40af; margin-bottom: 6px;">📋 Ce que le client a :</div>
                <div style="color: #1e40af;">${expertDiagnosis.diagnosis}</div>
              </div>
              
              <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px; border-radius: 0 8px 8px 0; margin-bottom: 12px;">
                <div style="font-weight: bold; color: #166534; margin-bottom: 6px;">✅ Solution à proposer :</div>
                <div style="color: #166534;">${expertDiagnosis.solution}</div>
              </div>
              
              <div style="background: #fef3c7; border-left: 4px solid #d97706; padding: 14px; border-radius: 0 8px 8px 0;">
                <div style="font-weight: bold; color: #92400e; margin-bottom: 6px;">⏰ Délai recommandé :</div>
                <div style="color: #92400e;">${expertDiagnosis.delay}</div>
              </div>
            </div>
            
            <!-- Réponses détaillées -->
            <div style="background: white; margin: 16px; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 18px;">📝 CE QUE LE CLIENT A RÉPONDU</h2>
              ${answersHtml}
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding: 16px; color: #64748b; font-size: 12px;">
              <p style="margin: 0;">ID: ${callbackId} • ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
              <p style="margin: 8px 0 0;">⚡ Le client attend un rappel sous 24h maximum</p>
            </div>
            
          </div>
        `,
      });

      if (!emailResult.success && process.env.NODE_ENV === 'production') {
        return {
          success: false,
          message: 'Erreur lors de l\'envoi de la demande. Veuillez réessayer plus tard.',
        };
      }
    }

    if (rawData.email) {
      await sendEmail({
        to: rawData.email,
        subject: 'Votre demande de rappel est confirmée | IPB',
        html: `
          <div style="font-family: Arial, sans-serif; background:#f8fafc; padding: 24px;">
            <div style="max-width: 640px; margin: 0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; overflow:hidden;">
              <div style="background: linear-gradient(135deg, #0f172a, #1f2937); color:#fff; padding: 22px 24px;">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:48px; height:48px; border-radius:12px; background:#0b1220; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                    <img src="${logoUrl}" alt="IPB" width="48" height="48" style="display:block; width:48px; height:48px; object-fit:contain;" />
                  </div>
                  <div>
                    <div style="font-size:18px; font-weight:700;">Institut de Pathologie du Bâtiment</div>
                    <div style="font-size:13px; opacity:.85; margin-top:4px;">Votre rappel est confirmé</div>
                  </div>
                </div>
              </div>
              <div style="padding: 24px;">
                <h2 style="margin: 0 0 12px; color:#0f172a; font-size:22px;">Bonjour ${rawData.name},</h2>
                <p style="margin:0 0 14px; color:#334155; font-size:15px; line-height:1.6;">
                  Merci, votre demande de rappel est bien enregistrée. Un expert IPB vous rappelle sous 24h.
                </p>
                <div style="background:#fff7ed; border-left:4px solid #ea580c; padding:14px 16px; border-radius:8px; margin:18px 0;">
                  <p style="margin:0; color:#7c2d12; font-size:14px;">
                    Si vous souhaitez accélérer l’échange, appelez-nous au <strong>05 82 95 33 75</strong>.
                  </p>
                </div>
                <div style="text-align:center; margin: 18px 0 4px;">
                  <a href="https://ipb-expertise.fr" style="display:inline-block; background:#ea580c; color:#ffffff; text-decoration:none; padding:12px 22px; border-radius:10px; font-size:14px; font-weight:700;">
                    Découvrir notre expertise
                  </a>
                </div>
                <p style="margin:18px 0 0; color:#64748b; font-size:13px;">
                  IPB • Expert Fissures & Humidité • Toulouse et Haute-Garonne
                </p>
              </div>
            </div>
            <p style="text-align:center; font-size:12px; color:#94a3b8; margin-top:16px;">
              Cet email est envoyé automatiquement par contact@ipb-expertise.fr
            </p>
            <p style="text-align:center; font-size:11px; color:#94a3b8; margin-top:6px;">
              Vos données sont traitées conformément à la politique de confidentialité : https://ipb-expertise.fr/legal/confidentialite
            </p>
          </div>
        `,
      });
    }

    return {
      success: true,
      message: 'Votre demande de rappel a bien été enregistrée.',
      data: { callbackId },
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur lors de la demande de rappel:', error);
    }
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer plus tard.',
    };
  }
}

/**
 * Action pour réserver une expertise sur site
 */
export async function submitDiagnosticAppointment(
  formData: FormData
): Promise<DiagnosticResult> {
  try {
    const logoUrl =
      process.env.EMAIL_LOGO_URL ||
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr'}/images/IPB_Logo_HD.png`;

    // Extraction et validation des données
    const rawData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string | null,
      path: formData.get('path') as 'fissure' | 'humidite',
      answers: JSON.parse(formData.get('answers') as string),
      riskScore: parseInt(formData.get('riskScore') as string, 10),
    };

    // Validation Zod
    const validatedData = diagnosticFormSchema.parse({
      ...rawData,
      email: rawData.email || undefined,
    });

    const rateKey = `diagnostic:${validatedData.phone}`;
    const rateLimit = checkRateLimit(rateKey, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.allowed) {
      const retryMinutes = Math.ceil(rateLimit.retryAfterMs / 60000);
      return {
        success: false,
        message: `Trop de demandes en peu de temps. Réessayez dans ${retryMinutes} min.`,
      };
    }

    const appointmentId = `APT-${Date.now()}`;

    // Envoi d'email à l'équipe IPB
    if (process.env.EMAIL_TO) {
      try {
        const urgencyLevel = validatedData.riskScore >= 25 ? '🔴 URGENT' : validatedData.riskScore >= 15 ? '🟠 PRIORITAIRE' : '🟢 NORMAL';
        
        const teamEmailResult = await sendEmail({
          to: process.env.EMAIL_TO,
          subject: `[${urgencyLevel}] Nouvelle demande de diagnostic - ${validatedData.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #EA580C;">Nouvelle demande de diagnostic IPB</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Informations client</h3>
                <p><strong>Nom :</strong> ${validatedData.name}</p>
                <p><strong>Téléphone :</strong> ${validatedData.phone}</p>
                ${validatedData.email ? `<p><strong>Email :</strong> ${validatedData.email}</p>` : ''}
              </div>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Détails du diagnostic</h3>
                <p><strong>Type :</strong> ${validatedData.path === 'fissure' ? '🔧 Fissures & Structure' : '💧 Humidité & Infiltrations'}</p>
                <p><strong>Score de risque :</strong> ${validatedData.riskScore}/100</p>
                <p><strong>Niveau d'urgence :</strong> ${urgencyLevel}</p>
                <p><strong>ID Réservation :</strong> ${appointmentId}</p>
              </div>
              
              <div style="background: #fff7ed; padding: 15px; border-left: 4px solid #EA580C; margin: 20px 0;">
                <p style="margin: 0;"><strong>Action requise :</strong> Contacter le client sous 24h pour confirmer le rendez-vous.</p>
              </div>
              
              <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
                Cette demande a été générée automatiquement depuis le site IPB.
              </p>
            </div>
          `,
        });
        if (!teamEmailResult.success && process.env.NODE_ENV === 'production') {
          return {
            success: false,
            message: 'Erreur lors de l\'envoi de la demande. Veuillez réessayer plus tard.',
          };
        }

        if (validatedData.email) {
          await sendEmail({
            to: validatedData.email,
            subject: 'Votre demande de rendez-vous est bien enregistrée | IPB',
            html: `
              <div style="font-family: Arial, sans-serif; background:#f8fafc; padding: 24px;">
                <div style="max-width: 640px; margin: 0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; overflow:hidden;">
                  <div style="background: linear-gradient(135deg, #0f172a, #1f2937); color:#fff; padding: 20px 24px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                      <div style="width:48px; height:48px; border-radius:12px; background:#0b1220; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                        <img src="${logoUrl}" alt="IPB" width="48" height="48" style="display:block; width:48px; height:48px; object-fit:contain;" />
                      </div>
                      <div>
                        <div style="font-size:18px; font-weight:700;">Institut de Pathologie du Bâtiment</div>
                        <div style="font-size:13px; opacity:.85; margin-top:4px;">Votre demande d'expertise</div>
                      </div>
                    </div>
                  </div>
                  <div style="padding: 24px;">
                    <h2 style="margin: 0 0 12px; color:#0f172a; font-size:22px;">Bonjour ${validatedData.name},</h2>
                    <p style="margin:0 0 14px; color:#334155; font-size:15px; line-height:1.6;">
                      Nous avons bien reçu votre demande de rendez-vous. Un expert vous recontacte sous 24h pour confirmer le créneau.
                    </p>
                    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin:16px 0;">
                      <p style="margin:0; color:#475569; font-size:14px;">
                        <strong>Type :</strong> ${validatedData.path === 'fissure' ? 'Fissures & Structure' : 'Humidité & Infiltrations'}<br/>
                        <strong>Score :</strong> ${validatedData.riskScore}/100
                      </p>
                    </div>
                    <div style="background:#fff7ed; border-left:4px solid #ea580c; padding:14px 16px; border-radius:8px; margin:18px 0;">
                      <p style="margin:0; color:#7c2d12; font-size:14px;">
                        Besoin d'un avis rapide ? Appelez-nous au <strong>05 82 95 33 75</strong>.
                      </p>
                    </div>
                    <div style="text-align:center; margin: 18px 0 4px;">
                      <a href="https://ipb-expertise.fr" style="display:inline-block; background:#ea580c; color:#ffffff; text-decoration:none; padding:12px 20px; border-radius:10px; font-size:14px; font-weight:700;">
                        Visiter le site IPB
                      </a>
                    </div>
                    <p style="margin:18px 0 0; color:#64748b; font-size:13px;">
                      IPB • 54 avenue Jean Jaurès, 31170 Tournefeuille
                    </p>
                  </div>
                </div>
                <p style="text-align:center; font-size:12px; color:#94a3b8; margin-top:16px;">
                  Cet email est envoyé automatiquement par contact@ipb-expertise.fr
                </p>
                <p style="text-align:center; font-size:11px; color:#94a3b8; margin-top:6px;">
                  Vos données sont traitées conformément à la politique de confidentialité : https://ipb-expertise.fr/legal/confidentialite
                </p>
              </div>
            `,
          });
        }
      } catch (emailError) {
        // On log l'erreur mais on ne bloque pas le processus
        if (process.env.NODE_ENV === 'development') {
          console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        }
        if (process.env.NODE_ENV === 'production') {
          return {
            success: false,
            message: 'Erreur lors de l\'envoi de la demande. Veuillez réessayer plus tard.',
          };
        }
      }
    }

    // Log pour développement
    if (process.env.NODE_ENV === 'development') {
      console.log('📅 Nouvelle réservation:', {
        appointmentId,
        name: validatedData.name,
        phone: validatedData.phone,
        path: validatedData.path,
        riskScore: validatedData.riskScore,
      });
    }

    return {
      success: true,
      message: 'Votre demande de rendez-vous a été enregistrée. Notre équipe vous contactera sous 24h.',
      data: { appointmentId },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: `Erreur de validation: ${error.issues[0]?.message || 'Données invalides'}`,
      };
    }

    // Ne jamais exposer les détails d'erreur en production
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur lors de la soumission du diagnostic:', error);
    }
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer plus tard.',
    };
  }
}

/**
 * Action pour demander le rapport PDF par email
 */
export async function requestDiagnosticReport(
  formData: FormData
): Promise<DiagnosticResult> {
  try {
    const rawData = {
      email: formData.get('email') as string,
      path: formData.get('path') as 'fissure' | 'humidite',
      answers: JSON.parse(formData.get('answers') as string),
      riskScore: parseInt(formData.get('riskScore') as string, 10),
    };

    const validatedData = diagnosticReportSchema.parse(rawData);

    const rateKey = `diagnostic-report:${validatedData.email.toLowerCase()}`;
    const rateLimit = checkRateLimit(rateKey, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.allowed) {
      const retryMinutes = Math.ceil(rateLimit.retryAfterMs / 60000);
      return {
        success: false,
        message: `Trop de demandes en peu de temps. Réessayez dans ${retryMinutes} min.`,
      };
    }

    const reportId = `RPT-${Date.now()}`;

    // Envoi d'email avec résumé du diagnostic
    if (validatedData.email) {
      try {
        const diagnosisType = validatedData.path === 'fissure' ? 'Fissures & Structure' : 'Humidité & Infiltrations';
        const urgencyLevel = validatedData.riskScore >= 25 ? 'INTERVENTION PRIORITAIRE' : validatedData.riskScore >= 15 ? 'NÉCESSITE UNE EXPERTISE' : 'SITUATION À SURVEILLER';
        
        await sendEmail({
          to: validatedData.email,
          subject: 'Votre diagnostic IPB - Résumé',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #EA580C;">Votre diagnostic IPB</h2>
              
              <p>Bonjour,</p>
              
              <p>Merci d'avoir utilisé notre outil de diagnostic en ligne. Voici le résumé de votre analyse :</p>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Type de diagnostic</h3>
                <p><strong>${diagnosisType}</strong></p>
                
                <h3 style="margin-top: 20px;">Niveau d'urgence</h3>
                <p><strong style="color: #EA580C;">${urgencyLevel}</strong></p>
                
                <h3 style="margin-top: 20px;">Score de risque</h3>
                <p><strong>${validatedData.riskScore}/100</strong></p>
              </div>
              
              <div style="background: #fff7ed; padding: 20px; border-left: 4px solid #EA580C; margin: 20px 0;">
                <h3 style="margin-top: 0;">Prochaines étapes</h3>
                <p>Pour obtenir un diagnostic complet et un devis personnalisé, nous vous invitons à :</p>
                <ul>
                  <li>Appeler notre équipe au <strong>05 82 95 33 75</strong></li>
                  <li>Ou réserver directement une expertise sur site (149€, déductible sur travaux)</li>
                </ul>
              </div>
              
              <p style="margin-top: 30px;">
                <strong>L'équipe IPB</strong><br/>
                Institut de Pathologie du Bâtiment<br/>
                Intervention Toulouse et Haute-Garonne<br/>
                Tél: 05 82 95 33 75
              </p>
              
              <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
                ID Rapport: ${reportId}
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Erreur lors de l\'envoi du rapport:', emailError);
        }
        // On continue même si l'email échoue
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Rapport demandé:', {
        reportId,
        email: validatedData.email,
        path: validatedData.path,
      });
    }

    return {
      success: true,
      message: 'Votre rapport sera envoyé par email dans les prochaines minutes.',
      data: { reportId },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: `Erreur de validation: ${error.issues[0]?.message || 'Données invalides'}`,
      };
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur lors de la demande de rapport:', error);
    }
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer plus tard.',
    };
  }
}
