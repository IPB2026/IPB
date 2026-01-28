import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { name, email, source } = await request.json();

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nom et email requis' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    const now = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

    // 1. Email au lead (avec le guide en pièce jointe ou lien)
    const clientEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #EA580C 0%, #F97316 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
          .button { display: inline-block; background: #EA580C; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .checklist { background: #FFF7ED; padding: 20px; border-left: 4px solid #EA580C; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🎉 Votre Guide est Prêt !</h1>
          </div>
          
          <div class="content">
            <p style="font-size: 18px;"><strong>Bonjour ${name},</strong></p>
            
            <p>Merci d'avoir téléchargé notre guide expert :</p>
            
            <div class="checklist">
              <h2 style="color: #EA580C; margin-top: 0;">📖 "Les 10 Signes Que Votre Fissure Est Dangereuse"</h2>
              <p>Ce guide vous révèle :</p>
              <ul>
                <li>✅ Comment identifier une fissure structurelle</li>
                <li>✅ Quand faut-il s'inquiéter et agir rapidement</li>
                <li>✅ Les 3 erreurs à éviter absolument</li>
                <li>✅ Solutions et coûts comparés</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="https://www.ipb-expertise.fr/guides/guide-fissures-humidite.pdf" class="button">
                📥 Télécharger le Guide PDF
              </a>
            </div>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">

            <h3 style="color: #EA580C;">🎁 BONUS : Diagnostic Gratuit</h3>
            <p>Vous avez des fissures ou de l'humidité chez vous ?</p>
            <p><strong>Obtenez un diagnostic expert GRATUIT en 3 minutes :</strong></p>
            <div style="text-align: center;">
              <a href="https://www.ipb-expertise.fr/diagnostic" style="display: inline-block; background: #2563EB; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0;">
                🔍 Faire Mon Diagnostic Gratuit
              </a>
            </div>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">

            <p style="color: #6b7280; font-size: 14px;">
              <strong>Besoin d'aide ?</strong><br>
              📞 <a href="tel:0582953375" style="color: #EA580C; text-decoration: none;">05 82 95 33 75</a><br>
              📧 <a href="mailto:contact@ipb-expertise.fr" style="color: #EA580C; text-decoration: none;">contact@ipb-expertise.fr</a>
            </p>
          </div>

          <div class="footer">
            <p><strong>IPB - Expert Fissures & Humidité</strong></p>
            <p>Haute-Garonne, Tarn-et-Garonne, Gers</p>
            <p style="font-size: 10px; color: #9ca3af;">
              Vous recevez cet email car vous avez téléchargé notre guide sur ipb-expertise.fr<br>
              <a href="https://www.ipb-expertise.fr/legal/confidentialite" style="color: #9ca3af;">Politique de confidentialité</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Email à IPB (notification de nouveau lead)
    const ipbEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 12px;">
          <h2 style="color: #EA580C; margin-bottom: 20px;">🎯 Nouveau Lead - Guide Téléchargé</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0;">Informations du lead :</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Nom :</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email :</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Source :</strong></td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${source || 'exit_intent'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0;"><strong>Date :</strong></td>
                <td style="padding: 8px 0;">${now}</td>
              </tr>
            </table>
          </div>

          <div style="background: #FFF7ED; padding: 15px; border-left: 4px solid #EA580C; border-radius: 4px;">
            <p style="margin: 0;"><strong>📊 Lead Score :</strong> <span style="color: #EA580C; font-size: 18px;">30 points</span> (Lead Magnet)</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">
              <strong>Action recommandée :</strong> Relancer par email dans 2 jours avec offre diagnostic
            </p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #EFF6FF; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #1e40af;">
              💡 <strong>Tip :</strong> Ce lead a montré de l'intérêt. Envoie-lui l'email de nurturing dans 48h !
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send emails
    try {
      // Email au client
      await sendEmail({
        to: email,
        subject: `🎁 Votre Guide Expert IPB est Prêt !`,
        html: clientEmailHtml,
      });

      // Email à IPB
      await sendEmail({
        to: process.env.EMAIL_TO || 'contact@ipb-expertise.fr',
        subject: `🎯 Nouveau Lead - ${name} (Guide téléchargé)`,
        html: ipbEmailHtml,
      });

      return NextResponse.json({
        success: true,
        message: 'Guide envoyé avec succès',
      });
    } catch (emailError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erreur envoi email lead magnet:', emailError);
      }
      
      // Même si l'email échoue, on considère que le lead est capturé
      return NextResponse.json({
        success: true,
        message: 'Lead enregistré',
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur API lead magnet:', error);
    }
    
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
