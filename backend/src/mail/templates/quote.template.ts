import { baseTemplate } from './base.template.js';

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

/**
 * Quote request email sent to admin
 */
export const quoteRequestTemplate = (data: QuoteFormData): string => {
  const content = `
    <h2>New Quote Request</h2>
    <div class="highlight">
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Service Type:</strong> ${data.serviceType}</p>
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      <p><strong>Budget Range:</strong> ${data.budget}</p>
      <p><strong>Timeline:</strong> ${data.timeline}</p>
    </div>
    <h3>Project Details:</h3>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
  `;

  return baseTemplate(content, 'New Quote Request');
};

/**
 * Auto-reply confirmation email to user
 */
export const quoteConfirmationTemplate = (name: string): string => {
  const content = `
    <h2>Quote Request Received</h2>
    <p>Dear ${name},</p>
    <p>Thank you for requesting a quote from Rawafid Al-Omran. We have received your request and our team will review it carefully.</p>
    <p>We will get back to you within 24-48 hours with a detailed estimate based on your requirements.</p>
    <p>Our team of experts is ready to help bring your vision to life.</p>
    <p>Best regards,<br>Rawafid Al-Omran Team</p>
  `;

  return baseTemplate(content, 'Quote Request Received - Rawafid Al-Omran');
};

export default {
  quoteRequestTemplate,
  quoteConfirmationTemplate
};