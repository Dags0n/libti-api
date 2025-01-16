import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitando CORS para todas as origens
  app.enableCors({
    origin: 'http://localhost:3001',  // Permite requisições do frontend
    methods: 'GET, POST, PUT, DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept',  // Cabeçalhos permitidos
  });

  await app.listen(3000);
}

bootstrap();
