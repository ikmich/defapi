import { Path } from '../depds';
import { PATH__HTML_CLIENT } from '../index';
import fileManager from './fileManager';

const htmlClientManager = {
  createEnvFile() {
    const path = this.getEnvPath();
    if (!fileManager.exists(path)) {
      fileManager.create(path);
    }
    return path;
  },

  getEnvPath() {
    return Path.join(PATH__HTML_CLIENT, '.env');
  },

  readEnv() {
    const filepath = this.getEnvPath();
    if (filepath) {
      return fileManager.read(filepath);
    }
    return null;
  },

  parseEnv(): object {
    let result: any = {};
    let contents = this.readEnv();
    if (!contents) {
      return result;
    }

    let lines: string[] = contents.split(/\n|\r|\r\n/);
    if (!Array.isArray(lines)) {
      return result;
    }

    for (let line of lines) {
      const matches = line.match(/(\w+)=(.*)/);
      if (!matches || !matches[1]) {
        continue;
      }

      let k = matches[1];
      let v = matches[2] ?? '';

      if (k && k.length > 0) {
        let isNumber = false;
        let isBoolean = false;
        let val: any = v;
        if (v && v.length > 0) {
          let isSingleQuoted = v.startsWith("'") && v.endsWith("'");
          let isDoubleQuoted = v.startsWith('"') && v.endsWith('"');
          let quoted = isSingleQuoted || isDoubleQuoted;

          if (!quoted) {
            isBoolean = v === 'true' || v === 'false';
            if (!isBoolean) {
              isNumber = !isNaN(Number(v));
            }
          }

          /*
           Remove the quotes, since value is going into a js object literal, which assigns a string to
           the value by default.
           */
          v = v.replace(/^['"]/, '').replace(/['"]$/, '');

          if (isNumber) {
            val = Number(v);
          } else if (isBoolean) {
            val = Boolean(v);
          } else {
            val = v;
          }
        }

        result[k] = val;
      }
    }

    return result;
  },

  // updateEnv(env: HtmlClientEnv) {
  //   /* [Read current env and merge]
  //    * -----------------------------*/
  //
  //   const currentEnv = this.parseEnv();
  //   console.log({ currentEnv });
  //
  //   // try {
  //   //   let envOutput = '';
  //   //   Object.keys(env).forEach((k) => {
  //   //     const v = env[k];
  //   //     if (typeof v === 'string') {
  //   //       envOutput += `${k}="${v}"\n`;
  //   //     } else {
  //   //       envOutput += `${k}=${v}\n`;
  //   //     }
  //   //   });
  //   //
  //   //   let envFilePath = this.getEnvPath();
  //   //   if (!envFilePath) {
  //   //     envFilePath = this.createEnvFile();
  //   //   }
  //   //
  //   //   fileManager.write(envFilePath, envOutput);
  //   //
  //   //   return envOutput;
  //   // } catch (e) {
  //   //   conprint.error('Error writing env file');
  //   //   console.error(e);
  //   //   return '';
  //   // }
  // }
};
