import nodemailer from 'nodemailer';

/**
 * Configuration du transporteur email avec Gmail SMTP
 */
export function createEmailTransporter() {
  // Vérification des variables d'environnement
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('Variables SMTP_USER et SMTP_PASS doivent être configurées dans .env.local');
  }

  // Création du transporteur Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, // Votre adresse Gmail
      pass: process.env.SMTP_PASS, // Mot de passe d'application Gmail
    },
  });

  return transporter;
}

/**
 * Fonction utilitaire pour envoyer un email
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}) {
  // Vérifier que les variables sont configurées
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('⚠️ Email non configuré : SMTP_USER et SMTP_PASS manquants');
    return { success: false, error: 'Email non configuré' };
  }

  try {
    const transporter = createEmailTransporter();

    const mailOptions = {
      from: options.from || process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email envoyé avec succès:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    return { success: false, error };
  }
}

