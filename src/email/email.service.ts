import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(name: string, email: string, subject: string, text: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: email,
        to: process.env.SMTP_EMAIL,
        subject: `Mensagem de ${name} - ${subject}`,
        text,
      });
    } catch (error) {
      throw new Error('Falha no envio do email');
    }
  }
}
