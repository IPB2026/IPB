'use server';

import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rateLimit';

// Schéma de validation pour le formulaire de contact
const contactFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Email invalide'),
  subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères').max(200),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(2000),
});

interface ContactResult {
  success: boolean;
  message: string;
}

/**
 * Server Action pour envoyer le formulaire de contact
 * Utilise Nodemailer avec Gmail SMTP
 */
export async function submitContactForm(
  formData: FormData
): Promise<ContactResult> {
  try {
    // Extraction et validation des données
    const rawData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    // Validation Zod
    const validatedData = contactFormSchema.parse(rawData);

    const rateKey = `contact:${validatedData.email.toLowerCase()}`;
    const rateLimit = checkRateLimit(rateKey, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.allowed) {
      const retryMinutes = Math.ceil(rateLimit.retryAfterMs / 60000);
      return {
        success: false,
        message: `Trop de demandes en peu de temps. Réessayez dans ${retryMinutes} min.`,
      };
    }

    // Envoi d'email à l'équipe IPB
    if (process.env.EMAIL_TO) {
      try {
        await sendEmail({
          to: process.env.EMAIL_TO,
          subject: `[Contact] ${validatedData.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #EA580C;">Nouveau message depuis le site IPB</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Nom :</strong> ${validatedData.name}</p>
                <p><strong>Email :</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
                <p><strong>Sujet :</strong> ${validatedData.subject}</p>
              </div>
              
              <div style="background: #ffffff; padding: 20px; border-left: 4px solid #EA580C; margin: 20px 0;">
                <h3 style="margin-top: 0;">Message :</h3>
                <p style="white-space: pre-wrap;">${validatedData.message}</p>
              </div>
              
              <div style="background: #fff7ed; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;">
                  <strong>Action :</strong> Répondre à <a href="mailto:${validatedData.email}">${validatedData.email}</a>
                </p>
              </div>
              
              <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
                Message reçu le ${new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}.
              </p>
            </div>
          `,
          replyTo: validatedData.email,
        });

        // Email de confirmation au client
        await sendEmail({
          to: validatedData.email,
          subject: 'Confirmation de réception - IPB',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #EA580C;">Message bien reçu !</h2>
              
              <p>Bonjour ${validatedData.name},</p>
              
              <p>Nous avons bien reçu votre message concernant : <strong>${validatedData.subject}</strong></p>
              
              <p>Notre équipe d'experts va l'examiner et vous répondra dans les plus brefs délais (sous 24h).</p>
              
              <div style="background: #fff7ed; padding: 20px; border-left: 4px solid #EA580C; margin: 20px 0;">
                <p style="margin: 0;">
                  <strong>Besoin d'une réponse urgente ?</strong><br/>
                  Appelez-nous directement au <strong>05 82 95 33 75</strong>
                </p>
              </div>
              
              <p style="margin-top: 30px;">
                <strong>L'équipe IPB</strong><br/>
                Institut de Pathologie du Bâtiment<br/>
                31C Chemin de Roquettes, 31600 Saubens
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email:', emailError);
        // En développement, on continue même si l'email échoue
        if (process.env.NODE_ENV === 'production') {
          throw new Error('Erreur lors de l\'envoi de l\'email');
        }
      }
    } else {
      // Mode développement sans email configuré
      if (process.env.NODE_ENV === 'development') {
        console.log('📧 Message de contact (email non configuré):', validatedData);
      }
    }

    return {
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: `Erreur de validation: ${error.issues[0]?.message || 'Données invalides'}`,
      };
    }

    console.error('Erreur lors de l\'envoi du formulaire de contact:', error);
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer plus tard ou nous appeler au 05 82 95 33 75.',
    };
  }
}
