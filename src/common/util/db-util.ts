const Path = require('path');
const FS = require('fs-extra');

const DB_ROOT = Path.join(__dirname, '../__db');
FS.ensureDirSync(DB_ROOT);

export const localDb = {
  get(key: string) {
    const filepath = Path.join(DB_ROOT, `${key}.json`);
    let data = {};
    if (FS.existsSync(filepath)) {
      data = require(filepath)[key];
    }
    return data;
  },
  save(key: string, data: Array<any> | Object) {
    const filepath = Path.join(DB_ROOT, `${key}.json`);

    if (!FS.existsSync(filepath)) {
      const payload = {
        [key]: data
      };
      const targetContents = JSON.stringify(payload, null, 2);
      FS.writeFileSync(filepath, targetContents, { encoding: 'utf-8' });
      return;
    }

    let DEFAULT_RESULT = {
      [key]: {}
    };
    let result: any = DEFAULT_RESULT;
    let currentData: any = DEFAULT_RESULT;

    try {
      currentData = require(filepath) ?? DEFAULT_RESULT;
    } catch (e) {
      FS.writeFileSync(filepath, DEFAULT_RESULT, { encoding: 'utf-8' });
    }

    if (Array.isArray(data)) {
      result[key] = data;
    } else if (Object.keys(data).length === 0) {
      // Empty object
      result[key] = {};
    } else {
      const parse = function(source: any, target: any) {
        let result = {
          ...source
        };

        let delKeys = source ? Object.keys(source).filter((k) => {
          return !Object.keys(target).includes(k);
        }) : [];

        for (let k of delKeys) {
          delete result[k];
        }

        let targetKeys = Object.keys(target);

        for (let k of targetKeys) {
          const v = target[k];
          if (v.constructor === Object) {
            result = {
              ...result,
              [k]: parse(v, target[k])
            };
          } else {
            result[k] = target[k];
          }
        }

        return result;
      }

      result = parse(currentData[key], data);
    }

    FS.writeFileSync(filepath, JSON.stringify(result, null, 2), { encoding: 'utf-8' });
  }
};
