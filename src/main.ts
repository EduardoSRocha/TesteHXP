import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('TEST HUB XP API')
    .setDescription('API for testing for Hub XP, providing endpoints to manage resources and operations.')
    .setVersion('1.0')
    .build();

const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
