import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('INTERNET BANKING API')
    .setDescription('The internet banking APIs')
    .setVersion('1.0')
    .addTag('InternetBanking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useStaticAssets(join(__dirname, '..', 'src', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('hbs');

  await app.listen(8001);
}

bootstrap().then(() => {
  console.log('Started......');
});
