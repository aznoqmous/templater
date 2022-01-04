import { join } from "path";

export default class HandlebarsConfig {

  /**
   * To call in your script
   * @param handlebars 
   */
  static async register(handlebars) {
    handlebars.registerHelper("formatDate", (datetime) => {
      let date = (new Date(datetime))
      return date.toLocaleString() != "Invalid Date" ? date.toLocaleString() : "-"
    })
    await HandlebarsConfig.registerPartials(handlebars, join(__dirname, '..', "views", "partials"))
  }

  static async registerPartials(handlebars, partialsDir) {
    let filenames = [...readdirSync(partialsDir)]
    filenames.map(filename => {
      let matches = /^([^.]+).hbs$/.exec(filename);
      if (!matches) {
        return;
      }
      let name = matches[1];
      let template = readFileSync(join(partialsDir, filename), 'utf8')
      handlebars.registerPartial(name, template)
    })
  }
}

import { readdirSync, readFileSync } from 'fs';
