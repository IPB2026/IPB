'use server';

import { sendEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rateLimit';

interface CalculatorLeadInput {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  project: string;
  largeur: number;
  hauteur: number;
  mur: string;
  etage: string;
  estimateMin: number;
  estimateMax: number;
  poutreType: string;
}

interface CalculatorLeadResult {
  success: boolean;
  message?: string;
}

const projectLabels: Record<string, string> = {
  cuisine_ouverte: 'Cuisine ouverte sur séjour',
  baie_jardin: 'Baie vitrée sur jardin / terrasse',
  suite_parentale: 'Suite parentale étendue',
  autre: 'Autre projet',
};

const murLabels: Record<string, string> = {
  brique: 'Brique foraine',
  parpaing: 'Parpaing',
  pierre: 'Pierre / béton',
  inconnu: 'Non précisé',
};

const etageLabels: Record<string, string> = {
  rdc_combles: 'RDC sous combles non habitables',
  rdc_etage: 'RDC sous étage habité',
  etage_etage: 'Étage avec étage(s) au-dessus',
};

export async function submitCalculatorLead(input: CalculatorLeadInput): Promise<CalculatorLeadResult> {
  try {
    if (!input.name || !input.email || !input.project) {
      return { success: false, message: 'Nom et email sont obligatoires.' };
    }

    // Rate limit basique par email
    const rateKey = `calculator-lead:${input.email}`;
    const rateLimit = checkRateLimit(rateKey, { limit: 3, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.allowed) {
      const min = Math.ceil(rateLimit.retryAfterMs / 60000);
      return { success: false, message: `Trop de demandes. Réessayez dans ${min} min.` };
    }

    const projectLabel = projectLabels[input.project] || input.project;
    const murLabel = murLabels[input.mur] || input.mur;
    const etageLabel = etageLabels[input.etage] || input.etage;

    // Détection zone IPB par CP simple (ville optionnelle)
    const city = input.city || '';
    const cpMatch = city.match(/\b(\d{5})\b/);
    const inServiceArea = cpMatch ? ['31', '32', '81', '82', '09'].includes(cpMatch[1].slice(0, 2)) : true;

    // Email interne — lead chaud (calculateur = warm/hot)
    if (process.env.EMAIL_TO) {
      await sendEmail({
        to: process.env.EMAIL_TO,
        subject: `[CALC ${input.estimateMin}–${input.estimateMax}€] ${input.name} · Mur porteur${city ? ' à ' + city : ''} — ${input.email}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #F3EFE8;">
            <div style="background: #0B1826; color: white; padding: 24px; text-align: center;">
              <p style="margin: 0; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.7;">Lead calculateur</p>
              <h1 style="margin: 6px 0 0; font-size: 22px; font-weight: 700;">Estimation mur porteur</h1>
            </div>

            <div style="background: #C8601F; color: white; padding: 18px 24px; text-align: center;">
              <p style="margin: 0; font-size: 14px; opacity: 0.9;">Estimation calculée</p>
              <p style="margin: 4px 0 0; font-size: 28px; font-weight: 700;">${input.estimateMin.toLocaleString('fr-FR')} – ${input.estimateMax.toLocaleString('fr-FR')} €</p>
            </div>

            <div style="background: white; margin: 16px; padding: 24px; border-radius: 6px; border: 1px solid #D8D2C9;">
              <h2 style="margin: 0 0 16px; color: #C8601F; font-size: 16px;">Contact</h2>
              <p style="margin: 6px 0;"><strong>Nom :</strong> ${input.name}</p>
              <p style="margin: 6px 0;"><strong>Email :</strong> <a href="mailto:${input.email}" style="color: #C8601F;">${input.email}</a></p>
              ${input.phone ? `<p style="margin: 6px 0;"><strong>Téléphone :</strong> <a href="tel:${input.phone}" style="color: #C8601F;">${input.phone}</a></p>` : ''}
              ${city ? `<p style="margin: 6px 0;"><strong>Commune :</strong> ${city} ${inServiceArea ? '✅ zone' : '⚠️ hors zone à vérifier'}</p>` : ''}
            </div>

            <div style="background: white; margin: 16px; padding: 24px; border-radius: 6px; border: 1px solid #D8D2C9;">
              <h2 style="margin: 0 0 16px; color: #C8601F; font-size: 16px;">Projet décrit</h2>
              <table style="width: 100%; font-size: 14px; line-height: 1.8;">
                <tr><td style="color: #736D67;">Projet</td><td style="text-align: right;"><strong>${projectLabel}</strong></td></tr>
                <tr><td style="color: #736D67;">Dimensions</td><td style="text-align: right;"><strong>${input.largeur.toFixed(1)} m × ${input.hauteur.toFixed(1)} m</strong></td></tr>
                <tr><td style="color: #736D67;">Type de mur</td><td style="text-align: right;"><strong>${murLabel}</strong></td></tr>
                <tr><td style="color: #736D67;">Configuration</td><td style="text-align: right;"><strong>${etageLabel}</strong></td></tr>
                <tr><td style="color: #736D67;">Poutre dimensionnée</td><td style="text-align: right;"><strong>${input.poutreType}</strong></td></tr>
              </table>
            </div>

            <div style="margin: 16px; padding: 18px; background: #FFF8F0; border-left: 3px solid #C8601F; border-radius: 4px; font-size: 13px;">
              <strong>Action recommandée :</strong> Rappel sous 24h. Le calculateur indique un projet mûr (l'utilisateur a renseigné ses coordonnées après avoir vu son estimation).
            </div>
          </div>
        `,
      });
    }

    // Email client — récap estimation
    await sendEmail({
      to: input.email,
      subject: `Votre estimation pour l'ouverture de mur porteur à ${input.city}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F3EFE8; color: #1A1917;">
          <div style="background: #0B1826; color: white; padding: 28px 24px; text-align: center;">
            <p style="margin: 0; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.6;">IPB · Institut de pathologie du bâtiment</p>
            <h1 style="margin: 12px 0 0; font-family: Georgia, serif; font-size: 26px; font-weight: 700;">Votre estimation</h1>
          </div>

          <div style="background: white; margin: 16px; padding: 28px; border-radius: 6px; border: 1px solid #D8D2C9;">
            <p style="margin: 0; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #A09A93; text-align: center;">Fourchette estimée</p>
            <p style="margin: 12px 0 0; font-family: Georgia, serif; font-size: 36px; font-weight: 700; color: #1A1917; text-align: center; letter-spacing: -0.025em;">
              ${input.estimateMin.toLocaleString('fr-FR')} – ${input.estimateMax.toLocaleString('fr-FR')} €
            </p>
            <p style="margin: 8px 0 0; font-size: 12px; text-align: center; color: #736D67;">TTC · finitions comprises</p>
          </div>

          <div style="background: white; margin: 16px; padding: 28px; border-radius: 6px; border: 1px solid #D8D2C9; font-size: 14px; line-height: 1.8;">
            <h2 style="margin: 0 0 14px; font-family: Georgia, serif; font-size: 18px; font-weight: 700; color: #1A1917;">Récapitulatif de votre projet</h2>
            <table style="width: 100%; font-size: 14px; line-height: 1.9;">
              <tr><td style="color: #736D67;">Projet</td><td style="text-align: right; color: #1A1917;"><strong>${projectLabel}</strong></td></tr>
              <tr><td style="color: #736D67;">Dimensions</td><td style="text-align: right; color: #1A1917;"><strong>${input.largeur.toFixed(1)} m × ${input.hauteur.toFixed(1)} m</strong></td></tr>
              <tr><td style="color: #736D67;">Mur</td><td style="text-align: right; color: #1A1917;"><strong>${murLabel}</strong></td></tr>
              <tr><td style="color: #736D67;">Configuration</td><td style="text-align: right; color: #1A1917;"><strong>${etageLabel}</strong></td></tr>
              <tr><td style="color: #736D67;">Poutre proposée</td><td style="text-align: right; color: #1A1917;"><strong>${input.poutreType}</strong></td></tr>
            </table>
          </div>

          <div style="background: white; margin: 16px; padding: 28px; border-radius: 6px; border: 1px solid #D8D2C9; font-size: 14px; line-height: 1.85; color: #736D67;">
            <p>Bonjour ${input.name.split(' ')[0]},</p>
            <p>Vous avez utilisé notre calculateur pour estimer le coût de votre ouverture de mur porteur${city ? ` à <strong style="color: #1A1917;">${city}</strong>` : ''}. Voici la fourchette indicative.</p>
            <p>Cette estimation est basée sur des paramètres saisis. Pour un devis ferme, notre institut doit venir sur place — c'est gratuit et sans engagement.</p>
            <p>Notre ingénieur structure vous appellera sous 24 heures ouvrées pour préciser les éléments techniques et planifier la visite si vous le souhaitez.</p>
            <p style="margin-top: 24px;">À très vite,</p>
            <p style="font-family: Georgia, serif; font-style: italic; color: #1A1917;">Ludovic D. — Fondateur de l’institut IPB</p>
          </div>

          <div style="margin: 16px; padding: 24px; background: #C8601F; border-radius: 6px; text-align: center;">
            <p style="margin: 0; color: white; font-size: 14px; line-height: 1.6;">
              Une question urgente ?<br />
              <a href="tel:0582953375" style="color: white; font-size: 22px; font-weight: 700; text-decoration: none;">05 82 95 33 75</a>
            </p>
          </div>

          <div style="text-align: center; padding: 20px; font-size: 11px; color: #A09A93;">
            IPB Expertise · 13 rue du Recteur Dottin, 31100 Toulouse
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Erreur calculator lead:', error);
    return { success: false, message: 'Une erreur est survenue lors de l\'envoi.' };
  }
}
