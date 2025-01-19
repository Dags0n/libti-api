import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { isEmail } from 'class-validator';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() body: { name: string; email: string; subject: string; text: string }) {
    const { name, email, subject, text } = body;

    if (!isEmail(email)) throw new Error('E-mail inválido');
    
    await this.emailService.sendEmail(name, email, subject, text);
    return { message: 'E-mail enviado com sucesso!' };
  }
}
