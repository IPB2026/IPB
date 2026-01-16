'use server';

import { diagnosticFormSchema, diagnosticReportSchema } from '@/lib/validations/diagnostic';
import { z } from 'zod';

/**
 * Server Actions pour le diagnostic
 * Toute la logique métier est côté serveur, aucune clé API exposée au client
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
 * TODO: Intégrer avec votre système de réservation (Calendly, calendrier interne, etc.)
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

    // TODO: Intégration avec votre système
    // Exemples :
    // - Envoyer un email via Resend/SendGrid
    // - Créer un événement dans Calendly
    // - Sauvegarder dans une base de données
    // - Envoyer une notification Slack/Discord

    // Simulation d'un appel API sécurisé
    // const response = await fetch('https://votre-api.com/appointments', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.API_SECRET_KEY}`,
    //   },
    //   body: JSON.stringify(validatedData),
    // });

    // Pour l'instant, on simule un succès
    const appointmentId = `APT-${Date.now()}`;

    // Log pour développement (à remplacer par un vrai système de logging)
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
        message: `Erreur de validation: ${error.issues[0].message}`,
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
 * TODO: Intégrer avec votre service d'email (Resend, SendGrid, etc.)
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

    // TODO: Générer le PDF et l'envoyer par email
    // Exemple avec Resend:
    // await resend.emails.send({
    //   from: 'IPB <noreply@ipb-expertise.fr>',
    //   to: validatedData.email,
    //   subject: 'Votre diagnostic IPB',
    //   attachments: [{
    //     filename: 'diagnostic-ipb.pdf',
    //     content: pdfBuffer,
    //   }],
    // });

    const reportId = `RPT-${Date.now()}`;

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
        message: `Erreur de validation: ${error.issues[0].message}`,
      };
    }

    console.error('Erreur lors de la demande de rapport:', error);
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer plus tard.',
    };
  }
}

