import { baseTemplate } from './base.template.js';

export type NotificationType = 'contact' | 'quote' | 'newsletter' | 'system';

/**
 * Admin notification email template
 */
export const adminNotificationTemplate = (
  type: NotificationType,
  title: string,
  message: string,
  details?: Record<string, string>
): string => {
  const typeLabels: Record<NotificationType, string> = {
    contact: 'Contact Form Submission',
    quote: 'Quote Request',
    newsletter: 'Newsletter Subscription',
    system: 'System Notification'
  };

  let detailsHtml = '';
  if (details && Object.keys(details).length > 0) {
    detailsHtml = `
      <div class="highlight">
        ${Object.entries(details)
          .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
          .join('')}
      </div>
    `;
  }

  const content = `
    <h2>${typeLabels[type]}</h2>
    <p><strong>${title}</strong></p>
    ${detailsHtml}
    <p>${message}</p>
    <p><em>Time: ${new Date().toLocaleString()}</em></p>
  `;

  return baseTemplate(content, `${typeLabels[type]} - Rawafid Al-Omran`);
};

/**
 * System alert notification for admins
 */
export const systemAlertTemplate = (
  alertType: 'error' | 'warning' | 'info',
  title: string,
  message: string
): string => {
  const colors = {
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8'
  };

  const content = `
    <div style="background-color: ${colors[alertType]}; color: white; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
      <strong>${alertType.toUpperCase()}: ${title}</strong>
    </div>
    <p>${message}</p>
    <p><em>Time: ${new Date().toISOString()}</em></p>
    <p>Server: ${process.env.NODE_ENV || 'development'}</p>
  `;

  return baseTemplate(content, `System Alert: ${title}`);
};

export default {
  adminNotificationTemplate,
  systemAlertTemplate
};