'use server';

import { diagnosticFormSchema, diagnosticReportSchema } from '@/lib/validations/diagnostic';
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
  };
}

/**
 * Action pour réserver une expertise sur site
 */
export async function submitDiagnosticAppointment(
  formData: FormData
): Promise<DiagnosticResult> {
  try {
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
        
        await sendEmail({
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
      } catch (emailError) {
        // On log l'erreur mais on ne bloque pas le processus
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
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
    console.error('Erreur lors de la soumission du diagnostic:', error);
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
                31C Chemin de Roquettes, 31600 Saubens<br/>
                Tél: 05 82 95 33 75
              </p>
              
              <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
                ID Rapport: ${reportId}
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi du rapport:', emailError);
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

    console.error('Erreur lors de la demande de rapport:', error);
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer plus tard.',
    };
  }
}
