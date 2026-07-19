import nodemailer, { Transporter } from 'nodemailer';
import config from './index.js';
import logger from '../logger/logger.js';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export interface EmailTransporter {
  sendMail(options: EmailOptions): Promise<void>;
}

class EmailService implements EmailTransporter {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: config.smtp.user
        ? {
            user: config.smtp.user,
            pass: config.smtp.pass,
          }
        : undefined,
    });
  }

  public async sendMail(options: EmailOptions): Promise<void> {
    const { to, subject, html, text } = options;

    try {
      const mailOptions = {
        from: config.smtp.from,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        text,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info('Email sent successfully', {
        messageId: info.messageId,
        to: mailOptions.to,
        subject,
      });
    } catch (error) {
      logger.error('Failed to send email', {
        error,
        to: Array.isArray(to) ? to : [to],
        subject,
      });
      throw error;
    }
  }

  public async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      logger.info('Email service connection verified');
      return true;
    } catch (error) {
      logger.error('Email service connection verification failed', { error });
      return false;
    }
  }
}

export const emailService = new EmailService();
export default emailService;