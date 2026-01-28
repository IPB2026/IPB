/**
 * SÉQUENCE EMAIL NURTURING - IPB EXPERTISE
 * 
 * Séquence de 4 emails pour transformer les leads froids en clients
 * À implémenter avec Brevo, Mailchimp ou ConvertKit
 */

export const nurturingSequence = {
  /**
   * EMAIL 1 : Envoi immédiat après téléchargement du guide
   */
  day0_welcome: {
    subject: "🎁 Votre Guide Expert IPB est Prêt !",
    delay: "0 jours",
    goal: "Délivrer la valeur promise + CTA diagnostic",
    html: (name: string, email: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.7; color: #1e293b; background: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #EA580C 0%, #F97316 100%); color: white; padding: 40px 30px; text-align: center; }
          .content { padding: 40px 30px; }
          .button { display: inline-block; background: #EA580C; color: white; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 20px 0; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3); }
          .checklist { background: #FFF7ED; padding: 25px; border-left: 5px solid #EA580C; margin: 25px 0; border-radius: 8px; }
          .footer { text-align: center; padding: 30px; color: #64748b; font-size: 13px; background: #f1f5f9; }
          .highlight { background: #FEF3C7; padding: 2px 6px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 32px; font-weight: 800;">🎉 Votre Guide Est Prêt !</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Guide Expert IPB - Édition 2025</p>
          </div>
          
          <div class="content">
            <p style="font-size: 20px; margin-bottom: 10px;"><strong>Bonjour ${name},</strong></p>
            
            <p style="font-size: 16px;">Merci d'avoir téléchargé notre guide expert ! 📚</p>
            
            <div class="checklist">
              <h2 style="color: #EA580C; margin-top: 0; font-size: 22px;">📖 "Les 10 Signes Que Votre Fissure Est Dangereuse"</h2>
              <p style="margin-bottom: 15px;">Ce guide vous révèle :</p>
              <ul style="margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>✅ Comment identifier une fissure structurelle</strong> vs une microfissure bénigne</li>
                <li style="margin-bottom: 8px;"><strong>✅ Les 3 erreurs fatales</strong> qui aggravent les fissures</li>
                <li style="margin-bottom: 8px;"><strong>✅ Solutions comparées</strong> : Agrafage (5k€) vs Micropieux (40k€)</li>
                <li style="margin-bottom: 8px;"><strong>✅ Cas pratiques</strong> de maisons sauvées à Toulouse, Montauban, Auch</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="https://www.ipb-expertise.fr/guides/guide-fissures-humidite.pdf" class="button" style="color: white;">
                📥 TÉLÉCHARGER LE GUIDE PDF
              </a>
            </div>

            <div style="background: #EFF6FF; padding: 25px; border-radius: 12px; margin: 30px 0; border: 2px solid #BFDBFE;">
              <h3 style="color: #2563EB; margin-top: 0; font-size: 20px;">🎁 BONUS : Diagnostic Gratuit Personnalisé</h3>
              <p style="margin-bottom: 15px;">Vous avez des <span class="highlight">fissures</span> ou de <span class="highlight">l'humidité</span> chez vous ?</p>
              <p><strong>Obtenez un diagnostic expert GRATUIT en 3 minutes :</strong></p>
              <ul style="margin: 15px 0; padding-left: 20px;">
                <li>✅ Évaluation de la gravité</li>
                <li>✅ Solutions adaptées à votre cas</li>
                <li>✅ Estimation budgétaire</li>
              </ul>
              <div style="text-align: center;">
                <a href="https://www.ipb-expertise.fr/diagnostic" style="display: inline-block; background: #2563EB; color: white; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 10px 0; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
                  🔍 Diagnostic Gratuit →
                </a>
              </div>
            </div>

            <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;">

            <div style="text-align: center;">
              <p style="margin-bottom: 15px;"><strong style="color: #EA580C; font-size: 18px;">Besoin de conseils immédiats ?</strong></p>
              <p style="font-size: 24px; margin: 10px 0;">
                📞 <a href="tel:0582953375" style="color: #EA580C; text-decoration: none; font-weight: bold;">05 82 95 33 75</a>
              </p>
              <p style="color: #64748b; font-size: 14px;">Disponible du lundi au samedi, 8h-18h</p>
            </div>
          </div>

          <div class="footer">
            <p style="margin-bottom: 10px;"><strong>IPB - Expert Fissures & Humidité</strong></p>
            <p style="margin-bottom: 15px;">Haute-Garonne • Tarn-et-Garonne • Gers</p>
            <p style="margin-bottom: 5px;">
              📧 <a href="mailto:contact@ipb-expertise.fr" style="color: #64748b; text-decoration: none;">contact@ipb-expertise.fr</a><br>
              🌐 <a href="https://www.ipb-expertise.fr" style="color: #64748b; text-decoration: none;">www.ipb-expertise.fr</a>
            </p>
            <p style="font-size: 11px; color: #94a3b8; margin-top: 20px;">
              Vous recevez cet email car vous avez téléchargé notre guide sur ipb-expertise.fr<br>
              <a href="https://www.ipb-expertise.fr/legal/confidentialite" style="color: #94a3b8; text-decoration: underline;">Politique de confidentialité</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  },

  /**
   * EMAIL 2 : 2 jours après - Relance douce
   */
  day2_followup: {
    subject: "💬 ${name}, avez-vous lu le guide ? Des questions ?",
    delay: "2 jours",
    goal: "Engagement + Témoignage social",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.7; color: #1e293b; background: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%); color: white; padding: 40px 30px; text-align: center; }
          .content { padding: 40px 30px; }
          .testimonial { background: #F0FDF4; padding: 25px; border-left: 5px solid #10B981; margin: 25px 0; border-radius: 8px; font-style: italic; }
          .button { display: inline-block; background: #EA580C; color: white; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; padding: 30px; color: #64748b; font-size: 13px; background: #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 30px; font-weight: 800;">💬 Comment Puis-Je Vous Aider ?</h1>
          </div>
          
          <div class="content">
            <p style="font-size: 18px;"><strong>Bonjour ${name},</strong></p>
            
            <p>Il y a 2 jours, vous avez téléchargé notre guide sur les fissures dangereuses.</p>
            
            <p><strong style="color: #EA580C;">Avez-vous des questions ?</strong> Je suis là pour y répondre gratuitement.</p>

            <div class="testimonial">
              <p style="margin: 0 0 15px 0; font-size: 16px;">"J'ai téléchargé le guide IPB et j'ai réalisé que mes fissures en escalier étaient graves. J'ai appelé, un expert est venu le lendemain. Aujourd'hui, ma maison est stabilisée et je peux la revendre sereinement."</p>
              <p style="margin: 0; font-weight: bold; color: #10B981;">— Marie L., Montauban (82)</p>
            </div>

            <p><strong>Ne laissez pas le problème s'aggraver.</strong></p>
            
            <p>Les fissures évoluent avec le temps, surtout avec :</p>
            <ul>
              <li>La sécheresse estivale</li>
              <li>Les pluies automnales</li>
              <li>Le gel hivernal</li>
            </ul>

            <p style="font-size: 18px; margin-top: 30px;"><strong>2 options pour vous :</strong></p>

            <div style="background: #FFF7ED; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #EA580C;">📞 Option 1 : Appelez-moi</strong></p>
              <p style="font-size: 26px; margin: 0;">
                <a href="tel:0582953375" style="color: #EA580C; text-decoration: none; font-weight: bold;">05 82 95 33 75</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">Je réponds personnellement du lundi au samedi</p>
            </div>

            <div style="background: #EFF6FF; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #2563EB;">🔍 Option 2 : Diagnostic en ligne</strong></p>
              <p style="margin: 0 0 15px 0;">3 minutes pour une première évaluation professionnelle</p>
              <div style="text-align: center;">
                <a href="https://www.ipb-expertise.fr/diagnostic" class="button" style="color: white; background: #2563EB;">
                  Faire Mon Diagnostic →
                </a>
              </div>
            </div>

            <p style="margin-top: 30px; color: #64748b; font-size: 14px;">
              <strong>P.S. :</strong> Si vous hésitez, répondez simplement à cet email. Je vous aiderai avec plaisir ! 😊
            </p>
          </div>

          <div class="footer">
            <p><strong>IPB - Expert Fissures & Humidité</strong></p>
            <p>Intervention : Haute-Garonne, Tarn-et-Garonne, Gers</p>
            <p style="margin-top: 15px;">
              📞 05 82 95 33 75<br>
              📧 contact@ipb-expertise.fr<br>
              🌐 www.ipb-expertise.fr
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  },

  /**
   * EMAIL 3 : 5 jours après - Urgence + Offre limitée
   */
  day5_urgency: {
    subject: "⚠️ ${name}, ne laissez pas vos fissures s'aggraver",
    delay: "5 jours",
    goal: "Créer l'urgence + Offre limitée",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.7; color: #1e293b; background: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%); color: white; padding: 40px 30px; text-align: center; }
          .content { padding: 40px 30px; }
          .alert { background: #FEF2F2; padding: 25px; border: 2px solid #FCA5A5; margin: 25px 0; border-radius: 12px; }
          .offer { background: #ECFDF5; padding: 25px; border: 3px dashed #10B981; margin: 25px 0; border-radius: 12px; text-align: center; }
          .button { display: inline-block; background: #EA580C; color: white; padding: 18px 36px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 18px; }
          .footer { text-align: center; padding: 30px; color: #64748b; font-size: 13px; background: #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 32px; font-weight: 800;">⚠️ Attention ${name}</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Ne laissez pas le temps jouer contre vous</p>
          </div>
          
          <div class="content">
            <p style="font-size: 18px;"><strong>Bonjour ${name},</strong></p>
            
            <p>Il y a 5 jours, vous avez téléchargé notre guide sur les fissures dangereuses.</p>

            <div class="alert">
              <h3 style="color: #DC2626; margin-top: 0; font-size: 20px;">⏰ Pourquoi agir MAINTENANT ?</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li style="margin-bottom: 10px;"><strong>Aggravation rapide :</strong> Une fissure de 1mm peut devenir 5mm en 6 mois</li>
                <li style="margin-bottom: 10px;"><strong>Coûts exponentiels :</strong> Attendre = Travaux 2-3x plus chers</li>
                <li style="margin-bottom: 10px;"><strong>Décote immobilière :</strong> -20% à -30% de la valeur de votre bien</li>
                <li><strong>Risque structurel :</strong> L'assurance peut refuser de couvrir si négligence</li>
              </ul>
            </div>

            <div class="offer">
              <h3 style="color: #10B981; margin-top: 0; font-size: 24px;">🎁 OFFRE LIMITÉE - Cette Semaine</h3>
              <p style="font-size: 18px; margin: 15px 0;"><strong>Diagnostic À Domicile GRATUIT</strong></p>
              <p style="font-size: 14px; color: #64748b;">(Valeur : 150€ - Offert aux lecteurs du guide)</p>
              <p style="margin: 20px 0;">Un expert IPB se déplace chez vous avec :</p>
              <ul style="text-align: left; display: inline-block; margin: 0; padding-left: 20px;">
                <li>📏 Fissuromètre professionnel</li>
                <li>📊 Analyse structurelle complète</li>
                <li>💰 Devis détaillé sur place</li>
              </ul>
              <div style="margin-top: 25px;">
                <a href="https://www.ipb-expertise.fr/contact" class="button" style="color: white;">
                  🏠 Réserver Mon Diagnostic →
                </a>
              </div>
              <p style="margin-top: 15px; font-size: 13px; color: #64748b;">
                ⏰ Places limitées • Valable jusqu'au ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString('fr-FR')}
              </p>
            </div>

            <p style="margin-top: 30px; font-size: 15px;">
              <strong>Ou appelez-moi directement :</strong><br>
              <span style="font-size: 28px; color: #EA580C; font-weight: bold;">📞 05 82 95 33 75</span>
            </p>

            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
              <em>— L'équipe IPB Expertise</em>
            </p>
          </div>

          <div class="footer">
            <p><strong>IPB - Expert Fissures & Humidité</strong></p>
            <p>Toulouse • Montauban • Auch et toute l'Occitanie</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },

  /**
   * EMAIL 4 : 10 jours après - Dernière chance
   */
  day10_last_chance: {
    subject: "🔔 ${name}, dernière chance pour votre diagnostic gratuit",
    delay: "10 jours",
    goal: "Dernier rappel avant abandon",
    html: (name: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.7; color: #1e293b; background: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%); color: white; padding: 40px 30px; text-align: center; }
          .content { padding: 40px 30px; }
          .case-study { background: #F5F3FF; padding: 25px; border-radius: 12px; margin: 25px 0; }
          .button { display: inline-block; background: #EA580C; color: white; padding: 18px 36px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 18px; }
          .footer { text-align: center; padding: 30px; color: #64748b; font-size: 13px; background: #f1f5f9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 32px; font-weight: 800;">🔔 Dernière Chance ${name}</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Votre diagnostic gratuit expire bientôt</p>
          </div>
          
          <div class="content">
            <p style="font-size: 18px;"><strong>Bonjour ${name},</strong></p>
            
            <p>Il y a 10 jours, vous avez téléchargé notre guide expert sur les fissures.</p>

            <p><strong style="color: #EA580C;">Avez-vous trouvé les réponses à vos questions ?</strong></p>

            <p>Si vous hésitez encore, laissez-moi vous raconter une histoire vraie :</p>

            <div class="case-study">
              <h3 style="color: #7C3AED; margin-top: 0;">📖 Case Study : Maison Sauvée à Colomiers</h3>
              <p><strong>Le problème :</strong></p>
              <p style="margin-bottom: 15px;">Monsieur D. avait remarqué des fissures en escalier sur sa façade. "Juste des fissures esthétiques", pensait-il...</p>
              
              <p><strong>6 mois plus tard :</strong></p>
              <p style="margin-bottom: 15px;">Les fissures atteignaient 8mm. Les portes ne fermaient plus. Un diagnostiqueur immobilier a estimé une <strong style="color: #DC2626;">décote de 35 000€</strong> sur la valeur de sa maison.</p>
              
              <p><strong style="color: #10B981;">La solution IPB :</strong></p>
              <p>Agrafage structurel en 4 jours. <strong>Coût : 5 200€</strong> au lieu des 42 000€ de micropieux proposés par un concurrent.</p>
              
              <p style="margin-top: 15px;"><em>"Si j'avais agi dès les premiers signes, j'aurais économisé 2 000€ et évité 6 mois d'angoisse." — Mr D.</em></p>
            </div>

            <p style="font-size: 18px; margin-top: 30px;"><strong>Ne faites pas la même erreur.</strong></p>

            <p>Profitez de <strong style="color: #10B981;">votre diagnostic gratuit</strong> pendant qu'il est encore temps :</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.ipb-expertise.fr/diagnostic" class="button" style="color: white;">
                🔍 Mon Diagnostic Gratuit (3 min) →
              </a>
            </div>

            <div style="background: #FEF2F2; padding: 20px; border-radius: 10px; border-left: 4px solid #EF4444; margin: 30px 0;">
              <p style="margin: 0; color: #991B1B;"><strong>⏰ Cette offre expire dans 3 jours</strong></p>
              <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">Après, le diagnostic sera facturé 150€</p>
            </div>

            <p style="margin-top: 30px;">
              <strong>Préférez parler à un expert ?</strong><br>
              <span style="font-size: 26px; color: #EA580C; font-weight: bold;">📞 05 82 95 33 75</span>
            </p>

            <p style="color: #64748b; font-size: 14px; margin-top: 40px;">
              Cordialement,<br>
              <strong>L'équipe IPB Expertise</strong>
            </p>
          </div>

          <div class="footer">
            <p><strong>IPB - Expert Fissures & Humidité</strong></p>
            <p>Haute-Garonne • Tarn-et-Garonne • Gers</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
};

export default nurturingSequence;
