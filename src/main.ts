import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from "path";
import { readdirSync, readFileSync } from 'fs';

const HandleBarsLayouts = require('handlebars-layouts');
const hbs = require("hbs");

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  HandleBarsLayouts.register(hbs.handlebars);
  app.setViewEngine('hbs');

  hbs.handlebars.registerHelper("formatDate", (datetime)=>{
    let date = (new Date(datetime))
    return date.toDateString() != "Invalid Date" ? date.toDateString() : "-"
  })
  await registerPartials(join(__dirname, '..', "views", "partials"))

  await app.listen(3000);
}
bootstrap();

async function registerPartials(partialsDir){
  let filenames = [...readdirSync(partialsDir)]
  filenames.map(filename => {
    let matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    let name = matches[1];
    let template = readFileSync(join(partialsDir, filename), 'utf8')
    hbs.handlebars.registerPartial(name, template)
  })
}
