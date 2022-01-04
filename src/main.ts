import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from "path";
import HandlebarsConfig from "./handlebars.config"

const HandleBarsLayouts = require('handlebars-layouts');
const hbs = require("hbs");

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  HandleBarsLayouts.register(hbs.handlebars);
  await HandlebarsConfig.register(hbs.handlebars);
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();


