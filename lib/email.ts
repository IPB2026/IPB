import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailAttachment {
  filename: string;
  content: string;
  encoding: 'base64';
  contentType?: string;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY non configuré');
    return { success: false, error: 'RESEND_API_KEY non configuré' };
  }

  try {
    const resendAttachments = options.attachments?.map((a) => ({
      filename: a.filename,
      content: Buffer.from(a.content, 'base64'),
    }));

    const { data, error } = await resend.emails.send({
      from: options.from || process.env.EMAIL_FROM || 'IPB <noreply@ipb-expertise.fr>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
      attachments: resendAttachments,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error: String(error) };
  }
}
