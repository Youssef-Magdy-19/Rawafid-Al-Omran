import { baseTemplate } from './base.template.js';

/**
 * Newsletter subscription confirmation email
 */
export const newsletterConfirmationTemplate = (email: string): string => {
  const content = `
    <h2>Welcome to Our Newsletter!</h2>
    <p>Thank you for subscribing to the Rawafid Al-Omran newsletter.</p>
    <p>You will now receive updates about:</p>
    <ul>
      <li>New projects and portfolio additions</li>
      <li>Industry insights and design trends</li>
      <li>Special offers and promotions</li>
      <li>Company news and announcements</li>
    </ul>
    <p>Your subscription email: <strong>${email}</strong></p>
    <p>If you did not request this subscription, please ignore this email or unsubscribe using the link below.</p>
    <p>Best regards,<br>Rawafid Al-Omran Team</p>
  `;

  return baseTemplate(content, 'Newsletter Subscription Confirmed');
};

/**
 * Newsletter unsubscription confirmation email
 */
export const newsletterUnsubscriptionTemplate = (email: string): string => {
  const content = `
    <h2>Newsletter Unsubscribed</h2>
    <p>You have been successfully unsubscribed from the Rawafid Al-Omran newsletter.</p>
    <p>Email removed: <strong>${email}</strong></p>
    <p>We're sorry to see you go. If you change your mind, you can always resubscribe on our website.</p>
    <p>Best regards,<br>Rawafid Al-Omran Team</p>
  `;

  return baseTemplate(content, 'Newsletter Unsubscribed');
};

export default {
  newsletterConfirmationTemplate,
  newsletterUnsubscriptionTemplate
};