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
        const teamEmailResult = await sendEmail({
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
        if (!teamEmailResult.success) {
          throw new Error('Échec envoi email équipe');
        }

        const logoUrl =
          process.env.EMAIL_LOGO_URL ||
          `${process.env.NEXT_PUBLIC_SITE_URL || 'https://ipb-expertise.fr'}/images/IPB_Logo_HD.png`;

        // Email de confirmation au client
        const clientEmailResult = await sendEmail({
          to: validatedData.email,
          subject: 'Votre demande a bien été reçue | IPB Expertise',
          html: `
            <div style="font-family: Arial, sans-serif; background:#f8fafc; padding: 24px;">
              <div style="max-width: 640px; margin: 0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; overflow:hidden;">
                <div style="background: linear-gradient(135deg, #0f172a, #1f2937); color:#fff; padding: 22px 24px;">
                  <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:48px; height:48px; border-radius:12px; background:#0b1220; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                      <img src="${logoUrl}" alt="IPB" width="48" height="48" style="display:block; width:48px; height:48px; object-fit:contain;" />
                    </div>
                    <div>
                      <div style="font-size:18px; font-weight:700; letter-spacing:0.5px;">Institut de Pathologie du Bâtiment</div>
                      <div style="font-size:13px; opacity:.85; margin-top:4px;">Expertise fissures & humidité — Toulouse</div>
                    </div>
                  </div>
                </div>
                <div style="padding: 24px;">
                  <h2 style="margin: 0 0 12px; color:#0f172a; font-size:22px;">Bonjour ${validatedData.name},</h2>
                  <p style="margin:0 0 14px; color:#334155; font-size:15px; line-height:1.6;">
                    Merci pour votre message. Nous avons bien reçu votre demande concernant :
                    <strong style="color:#0f172a;"> ${validatedData.subject}</strong>.
                  </p>
                  <p style="margin:0 0 14px; color:#334155; font-size:15px; line-height:1.6;">
                    Chez IPB, chaque diagnostic est réalisé avec méthode (mesures précises, analyse structurelle, solutions durables).
                  </p>
                  <div style="background:#f1f5f9; border:1px solid #e2e8f0; padding:16px; border-radius:12px; margin:16px 0;">
                    <p style="margin:0; color:#0f172a; font-size:14px; font-weight:700;">Pourquoi nous choisir ?</p>
                    <ul style="margin:10px 0 0; padding-left:18px; color:#334155; font-size:14px; line-height:1.6;">
                      <li>✅ Expertise dédiée fissures & humidité</li>
                      <li>✅ Solutions techniques éprouvées (agrafage, injection résine)</li>
                      <li>✅ Garantie décennale</li>
                    </ul>
                  </div>
                  <div style="background:#fff7ed; border-left:4px solid #ea580c; padding:14px 16px; border-radius:8px; margin:18px 0;">
                    <p style="margin:0; color:#7c2d12; font-size:14px;">
                      Pour accélérer votre prise en charge, appelez-nous directement au <strong>05 82 95 33 75</strong>.
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
        if (!clientEmailResult.success) {
          console.warn('⚠️ Échec envoi email confirmation client');
        }
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
