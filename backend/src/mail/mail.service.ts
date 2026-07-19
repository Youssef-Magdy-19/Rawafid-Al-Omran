import { emailService, EmailOptions } from '../config/email.js';
import config from '../config/index.js';
import logger from '../logger/logger.js';
import { contactFormTemplate, contactConfirmationTemplate, ContactFormData } from './templates/contact.template.js';
import { quoteRequestTemplate, quoteConfirmationTemplate, QuoteFormData } from './templates/quote.template.js';
import { newsletterConfirmationTemplate, newsletterUnsubscriptionTemplate } from './templates/newsletter.template.js';
import { adminNotificationTemplate, systemAlertTemplate, NotificationType } from './templates/admin-notification.template.js';

/**
 * Send contact form notification to admin
 */
export const sendContactFormToAdmin = async (data: ContactFormData): Promise<void> => {
  const html = contactFormTemplate(data);
  const options: EmailOptions = {
    to: config.smtp.adminEmail,
    subject: `New Contact: ${data.subject} from ${data.name}`,
    html
  };
  await emailService.sendMail(options);
  logger.info('Contact form notification sent to admin', { email: data.email });
};

/**
 * Send contact form confirmation to user
 */
export const sendContactConfirmation = async (name: string, email: string): Promise<void> => {
  const html = contactConfirmationTemplate(name);
  const options: EmailOptions = {
    to: email,
    subject: 'We received your message - Rawafid Al-Omran',
    html
  };
  await emailService.sendMail(options);
  logger.info('Contact confirmation sent', { email });
};

/**
 * Send quote request notification to admin
 */
export const sendQuoteRequestToAdmin = async (data: QuoteFormData): Promise<void> => {
  const html = quoteRequestTemplate(data);
  const options: EmailOptions = {
    to: config.smtp.adminEmail,
    subject: `New Quote Request from ${data.name}`,
    html
  };
  await emailService.sendMail(options);
  logger.info('Quote request notification sent to admin', { email: data.email });
};

/**
 * Send quote request confirmation to user
 */
export const sendQuoteConfirmation = async (name: string, email: string): Promise<void> => {
  const html = quoteConfirmationTemplate(name);
  const options: EmailOptions = {
    to: email,
    subject: 'Quote Request Received - Rawafid Al-Omran',
    html
  };
  await emailService.sendMail(options);
  logger.info('Quote confirmation sent', { email });
};

/**
 * Send newsletter subscription confirmation
 */
export const sendNewsletterConfirmation = async (email: string): Promise<void> => {
  const html = newsletterConfirmationTemplate(email);
  const options: EmailOptions = {
    to: email,
    subject: 'Welcome to Our Newsletter - Rawafid Al-Omran',
    html
  };
  await emailService.sendMail(options);
  logger.info('Newsletter confirmation sent', { email });
};

/**
 * Send newsletter unsubscription confirmation
 */
export const sendNewsletterUnsubscription = async (email: string): Promise<void> => {
  const html = newsletterUnsubscriptionTemplate(email);
  const options: EmailOptions = {
    to: email,
    subject: 'Newsletter Unsubscribed - Rawafid Al-Omran',
    html
  };
  await emailService.sendMail(options);
  logger.info('Newsletter unsubscription confirmation sent', { email });
};

/**
 * Send admin notification
 */
export const sendAdminNotification = async (
  type: NotificationType,
  title: string,
  message: string,
  details?: Record<string, string>
): Promise<void> => {
  const html = adminNotificationTemplate(type, title, message, details);
  const options: EmailOptions = {
    to: config.smtp.adminEmail,
    subject: `[${type.toUpperCase()}] ${title}`,
    html
  };
  await emailService.sendMail(options);
  logger.info('Admin notification sent', { type, title });
};

/**
 * Send system alert to admin
 */
export const sendSystemAlert = async (
  alertType: 'error' | 'warning' | 'info',
  title: string,
  message: string
): Promise<void> => {
  const html = systemAlertTemplate(alertType, title, message);
  const options: EmailOptions = {
    to: config.smtp.adminEmail,
    subject: `[SYSTEM ALERT] ${title}`,
    html
  };
  await emailService.sendMail(options);
  logger.warn('System alert sent to admin', { alertType, title });
};

export default {
  sendContactFormToAdmin,
  sendContactConfirmation,
  sendQuoteRequestToAdmin,
  sendQuoteConfirmation,
  sendNewsletterConfirmation,
  sendNewsletterUnsubscription,
  sendAdminNotification,
  sendSystemAlert
};