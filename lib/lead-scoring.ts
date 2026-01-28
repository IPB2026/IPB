/**
 * LEAD SCORING SYSTEM - IPB EXPERTISE
 * 
 * Système de notation automatique des leads pour prioriser les actions commerciales
 */

export interface LeadData {
  // Identification
  name: string;
  email: string;
  phone?: string;
  
  // Comportement
  source: 'diagnostic' | 'contact_form' | 'lead_magnet' | 'exit_intent' | 'chat';
  hasDownloadedGuide?: boolean;
  hasCompletedDiagnostic?: boolean;
  pagesVisited?: number;
  
  // Diagnostic data (si applicable)
  urgency?: 'URGENTE' | 'MODEREE' | 'FAIBLE';
  problemType?: 'fissures' | 'humidite' | 'both';
  estimatedBudget?: number;
  location?: string;
  
  // Timestamp
  createdAt: Date;
}

export interface LeadScore {
  totalScore: number;
  classification: 'HOT' | 'WARM' | 'COLD';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedAction: string;
  recommendedDelay: string;
  breakdown: {
    category: string;
    points: number;
    reason: string;
  }[];
}

/**
 * Calcule le score d'un lead basé sur son comportement et ses caractéristiques
 */
export function calculateLeadScore(lead: LeadData): LeadScore {
  let totalScore = 0;
  const breakdown: { category: string; points: number; reason: string }[] = [];

  // 1. URGENCE (si diagnostic complété)
  if (lead.urgency) {
    let urgencyPoints = 0;
    let urgencyReason = '';
    
    switch (lead.urgency) {
      case 'URGENTE':
        urgencyPoints = 100;
        urgencyReason = 'Situation urgente - Nécessite une action immédiate';
        break;
      case 'MODEREE':
        urgencyPoints = 50;
        urgencyReason = 'Situation modérée - Intervention recommandée rapidement';
        break;
      case 'FAIBLE':
        urgencyPoints = 20;
        urgencyReason = 'Situation sous surveillance - Suivi à moyen terme';
        break;
    }
    
    totalScore += urgencyPoints;
    breakdown.push({
      category: 'Urgence',
      points: urgencyPoints,
      reason: urgencyReason,
    });
  }

  // 2. BUDGET ESTIMÉ
  if (lead.estimatedBudget) {
    let budgetPoints = 0;
    let budgetReason = '';
    
    if (lead.estimatedBudget >= 10000) {
      budgetPoints = 80;
      budgetReason = 'Budget >10k€ - Projet important';
    } else if (lead.estimatedBudget >= 5000) {
      budgetPoints = 50;
      budgetReason = 'Budget 5-10k€ - Projet moyen';
    } else {
      budgetPoints = 20;
      budgetReason = 'Budget <5k€ - Petit projet';
    }
    
    totalScore += budgetPoints;
    breakdown.push({
      category: 'Budget',
      points: budgetPoints,
      reason: budgetReason,
    });
  }

  // 3. SOURCE DU LEAD
  let sourcePoints = 0;
  let sourceReason = '';
  
  switch (lead.source) {
    case 'diagnostic':
      sourcePoints = 80;
      sourceReason = 'A complété le diagnostic - Forte intention';
      break;
    case 'contact_form':
      sourcePoints = 80;
      sourceReason = 'Formulaire de contact - Demande active';
      break;
    case 'chat':
      sourcePoints = 60;
      sourceReason = 'Chat en direct - Engagement moyen';
      break;
    case 'lead_magnet':
    case 'exit_intent':
      sourcePoints = 30;
      sourceReason = 'Téléchargement guide - Intérêt initial';
      break;
  }
  
  totalScore += sourcePoints;
  breakdown.push({
    category: 'Source',
    points: sourcePoints,
    reason: sourceReason,
  });

  // 4. ENGAGEMENT (pages visitées)
  if (lead.pagesVisited && lead.pagesVisited >= 3) {
    const engagementPoints = 20;
    totalScore += engagementPoints;
    breakdown.push({
      category: 'Engagement',
      points: engagementPoints,
      reason: `${lead.pagesVisited} pages visitées - Recherche active`,
    });
  }

  // 5. LOCALISATION (proximité)
  if (lead.location) {
    let locationPoints = 0;
    let locationReason = '';
    
    const normalizedLocation = lead.location.toLowerCase();
    
    if (
      normalizedLocation.includes('haute-garonne') ||
      normalizedLocation.includes('31') ||
      normalizedLocation.includes('toulouse') ||
      normalizedLocation.includes('colomiers') ||
      normalizedLocation.includes('tournefeuille')
    ) {
      locationPoints = 30;
      locationReason = 'Haute-Garonne (31) - Zone prioritaire';
    } else if (
      normalizedLocation.includes('tarn-et-garonne') ||
      normalizedLocation.includes('82') ||
      normalizedLocation.includes('montauban')
    ) {
      locationPoints = 20;
      locationReason = 'Tarn-et-Garonne (82) - Zone de couverture';
    } else if (
      normalizedLocation.includes('gers') ||
      normalizedLocation.includes('32') ||
      normalizedLocation.includes('auch')
    ) {
      locationPoints = 20;
      locationReason = 'Gers (32) - Zone de couverture';
    } else {
      locationPoints = 5;
      locationReason = 'Hors zone - À évaluer';
    }
    
    totalScore += locationPoints;
    breakdown.push({
      category: 'Localisation',
      points: locationPoints,
      reason: locationReason,
    });
  }

  // 6. CONTACT FOURNI
  if (lead.phone) {
    const contactPoints = 20;
    totalScore += contactPoints;
    breakdown.push({
      category: 'Contact',
      points: contactPoints,
      reason: 'Numéro de téléphone fourni - Contact facile',
    });
  }

  // CLASSIFICATION
  let classification: 'HOT' | 'WARM' | 'COLD';
  let priority: 'HIGH' | 'MEDIUM' | 'LOW';
  let recommendedAction: string;
  let recommendedDelay: string;

  if (totalScore >= 150) {
    classification = 'HOT';
    priority = 'HIGH';
    recommendedAction = 'Appeler IMMÉDIATEMENT';
    recommendedDelay = 'Dans l\'heure';
  } else if (totalScore >= 80) {
    classification = 'WARM';
    priority = 'MEDIUM';
    recommendedAction = 'Appeler dans les 24h';
    recommendedDelay = '24 heures max';
  } else {
    classification = 'COLD';
    priority = 'LOW';
    recommendedAction = 'Email de nurturing automatique';
    recommendedDelay = '2-5 jours';
  }

  return {
    totalScore,
    classification,
    priority,
    recommendedAction,
    recommendedDelay,
    breakdown,
  };
}

/**
 * Génère un email formaté avec le scoring pour IPB
 */
export function generateLeadScoreEmail(lead: LeadData, score: LeadScore): string {
  const priorityColor = {
    HIGH: '#DC2626',
    MEDIUM: '#F59E0B',
    LOW: '#10B981',
  }[score.priority];

  const classificationEmoji = {
    HOT: '🔥',
    WARM: '🟠',
    COLD: '❄️',
  }[score.classification];

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 650px; margin: 0 auto; padding: 20px; }
        .score-badge { display: inline-block; background: ${priorityColor}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 16px; }
        .breakdown { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .breakdown-item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .action-box { background: #FFF7ED; padding: 20px; border-left: 4px solid #EA580C; border-radius: 4px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2 style="color: ${priorityColor};">
          ${classificationEmoji} Nouveau Lead ${score.classification}
        </h2>
        
        <div style="margin: 20px 0;">
          <span class="score-badge">${score.totalScore} points</span>
          <span style="margin-left: 10px; font-size: 14px; color: #64748b;">
            Priorité: ${score.priority}
          </span>
        </div>

        <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Informations du lead :</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Nom :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${lead.email}">${lead.email}</a></td>
            </tr>
            ${lead.phone ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Téléphone :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><a href="tel:${lead.phone}">${lead.phone}</a></td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Source :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${lead.source}</td>
            </tr>
            ${lead.location ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Localisation :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${lead.location}</td>
            </tr>
            ` : ''}
            ${lead.urgency ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Urgence :</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${lead.urgency}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 8px 0;"><strong>Date :</strong></td>
              <td style="padding: 8px 0;">${lead.createdAt.toLocaleString('fr-FR')}</td>
            </tr>
          </table>
        </div>

        <div class="breakdown">
          <h3 style="margin-top: 0;">📊 Détail du Score :</h3>
          ${score.breakdown.map(item => `
            <div class="breakdown-item">
              <strong>${item.category} : +${item.points} points</strong>
              <br>
              <span style="color: #64748b; font-size: 14px;">${item.reason}</span>
            </div>
          `).join('')}
        </div>

        <div class="action-box">
          <h3 style="margin-top: 0; color: #EA580C;">🎯 Action Recommandée :</h3>
          <p style="font-size: 18px; margin: 0;"><strong>${score.recommendedAction}</strong></p>
          <p style="margin: 10px 0 0 0; color: #64748b;">Délai : ${score.recommendedDelay}</p>
        </div>

        ${score.classification === 'HOT' ? `
          <div style="background: #FEF2F2; padding: 15px; border-radius: 8px; border: 2px solid #FCA5A5;">
            <p style="margin: 0; color: #991B1B; font-weight: bold;">
              ⚠️ LEAD CHAUD - À TRAITER EN PRIORITÉ ABSOLUE
            </p>
          </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;
}
