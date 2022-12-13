import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('INTERNET BANKING API')
    .setDescription('The internet banking APIs')
    .setVersion('1.0')
    .addTag('InternetBanking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8001);
}

bootstrap().then(() => {
  console.log('Started......');
});
