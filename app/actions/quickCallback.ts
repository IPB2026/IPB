'use server';

import { sendEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rateLimit';
import { captureLead } from '@/lib/crm/captureLead';

interface QuickCallbackResult {
  success: boolean;
  message: string;
}

export async function submitQuickCallback(
  name: string,
  phone: string
): Promise<QuickCallbackResult> {
  try {
    if (!name || name.length < 2) {
      return { success: false, message: 'Merci de renseigner votre nom.' };
    }
    if (!phone || phone.length < 8) {
      return { success: false, message: 'Merci de renseigner un numéro valide.' };
    }

    const rateKey = `quickcallback:${phone.replace(/\s/g, '')}`;
    const rateLimit = checkRateLimit(rateKey, { limit: 3, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.allowed) {
      return {
        success: false,
        message: 'Demande déjà envoyée. Nous vous rappelons bientôt.',
      };
    }

    if (process.env.EMAIL_TO) {
      await sendEmail({
        to: process.env.EMAIL_TO,
        subject: `🔔 RAPPEL URGENT — ${name} demande un rappel`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #EA580C, #DC2626); color: white; padding: 20px; border-radius: 12px 12px 0 0;">
              <h2 style="margin: 0; font-size: 20px;">🔔 Demande de rappel immédiat</h2>
              <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Depuis le formulaire rapide de la page d'accueil</p>
            </div>
            
            <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
              <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #EA580C; margin-bottom: 16px;">
                <p style="margin: 0 0 8px;"><strong>Nom :</strong> ${name}</p>
                <p style="margin: 0;"><strong>Téléphone :</strong> <a href="tel:${phone.replace(/\s/g, '')}" style="color: #EA580C; font-weight: bold; font-size: 18px;">${phone}</a></p>
              </div>
              
              <div style="background: #FFF7ED; padding: 12px 16px; border-radius: 8px; border: 1px solid #FDBA74;">
                <p style="margin: 0; color: #9A3412; font-size: 14px; font-weight: bold;">
                  ⚡ Action requise : rappeler ce prospect dans les 2 prochaines heures
                </p>
              </div>
              
              <p style="color: #64748b; font-size: 12px; margin-top: 16px;">
                Reçu le ${new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}
              </p>
            </div>
          </div>
        `,
      });
    }

    // ─── Persistance CRM (non bloquant) ─────────────────────────
    await captureLead({
      source: 'RAPPEL',
      service: 'AUTRE',
      contact: {
        name,
        phone: phone.replace(/\s/g, ''),
      },
      scoring: {
        tier: 'HOT',
        callbackPriority: 'P1_4H',
        reasons: ['Demande de rappel immédiat depuis la page d\'accueil'],
      },
      summary: 'Demande de rappel rapide',
      payload: { name, phone },
    });

    return {
      success: true,
      message: 'Demande envoyée ! Un expert vous rappelle sous 2h.',
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur quick callback:', error);
    }
    return {
      success: false,
      message: 'Erreur. Appelez-nous directement au 05 82 95 33 75.',
    };
  }
}
