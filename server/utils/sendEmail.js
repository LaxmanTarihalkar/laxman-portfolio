import nodemailer from 'nodemailer';

/**
 * Send an email notification when a new contact message arrives.
 *
 * SMTP is optional. When SMTP_HOST is empty the function resolves with
 * `{ sent: false }` so contact messages still save to MongoDB. This keeps the
 * contact form fully functional even before SMTP is configured.
 */
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return null;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  return transporter;
}

export async function sendContactNotification(message) {
  const transport = getTransporter();
  if (!transport) {
    return { sent: false, reason: 'SMTP not configured' };
  }

  const to = process.env.CONTACT_NOTIFY_EMAIL || process.env.EMAIL_FROM;
  const from = process.env.EMAIL_FROM || 'no-reply@portfolio.local';

  try {
    await transport.sendMail({
      from,
      to,
      subject: `New portfolio message: ${message.subject}`,
      text: [
        `You received a new message from your portfolio contact form.`,
        ``,
        `Name:    ${message.name}`,
        `Email:   ${message.email}`,
        `Subject: ${message.subject}`,
        ``,
        `Message:`,
        message.message,
      ].join('\n'),
      replyTo: message.email,
    });
    return { sent: true };
  } catch (err) {
    console.error('[email] Failed to send notification:', err.message);
    return { sent: false, reason: err.message };
  }
}
