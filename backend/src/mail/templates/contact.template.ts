import { baseTemplate } from './base.template.js';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Contact form email sent to admin
 */
export const contactFormTemplate = (data: ContactFormData): string => {
  const content = `
    <h2>New Contact Form Submission</h2>
    <div class="highlight">
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Subject:</strong> ${data.subject}</p>
    </div>
    <h3>Message:</h3>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
  `;

  return baseTemplate(content, 'Contact Form Submission');
};

/**
 * Auto-reply confirmation email to user
 */
export const contactConfirmationTemplate = (name: string): string => {
  const content = `
    <h2>Thank You for Contacting Us</h2>
    <p>Dear ${name},</p>
    <p>Thank you for reaching out to Rawafid Al-Omran. We have received your message and will get back to you within 24-48 hours.</p>
    <p>In the meantime, feel free to explore our services and portfolio on our website.</p>
    <p>Best regards,<br>Rawafid Al-Omran Team</p>
  `;

  return baseTemplate(content, 'Message Received - Rawafid Al-Omran');
};

export default {
  contactFormTemplate,
  contactConfirmationTemplate
};