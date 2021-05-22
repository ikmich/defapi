import fileUtil from './fileUtil';
import * as os from 'os';

const Path = require('path');
const FS = require('fs-extra');
const STORE_PATH = Path.join(os.tmpdir(), 'defapi');

FS.ensureDirSync(STORE_PATH);

function getJson(path: string) {
  let contents = fileUtil.read(path);
  if (contents && contents.length) {
    try {
      return JSON.parse(contents);
    } catch (e) {
      if (e instanceof SyntaxError) {
        // Invalid json. Could be empty file or otherwise.
        throw new Error('Invalid object store');
      }
    }
  }
}

function writeToFile(path: string, contents: any) {
  FS.writeFileSync(path, contents, { encoding: 'utf-8' });
}

function fileExists(path: string) {
  return FS.existsSync(path);
}

function toJson(obj: any) {
  return JSON.stringify(obj, null, 2);
}

class UnexpectedKeysError extends Error {
  constructor() {
    super('Unexpected keys');
  }
}

class InvalidStoreFormatError extends Error {
  constructor() {
    super('Invalid store format - data key not found');
  }
}

// ----s

export const store = {
  get(key: string) {
    const filepath = Path.join(STORE_PATH, `${key}.json`);
    let data = getJson(filepath);
    if (data) {
      let keys = Object.keys(data);
      if (!keys.includes(key)) {
        throw new InvalidStoreFormatError();
      } else if (keys.length > 1) {
        throw new UnexpectedKeysError();
      }
    }

    return data;
  },

  save(key: string, data: Array<any> | Object) {
    const filepath = Path.join(STORE_PATH, `${key}.json`);

    if (!fileExists(filepath)) {
      const payload = {
        [key]: data
      };
      const targetContents = toJson(payload);
      writeToFile(filepath, targetContents);
      return payload;
    }

    let result: any = {
      [key]: {}
    };
    let currentData: any;

    currentData = getJson(filepath) ?? {};

    if (Array.isArray(data)) {
      result[key] = data;
    } else if (Object.keys(data).length === 0) {
      // Empty object
      result[key] = {};
    } else {
      const parse = function (source: any, target: any) {
        let result = {
          ...source
        };

        let delKeys = source
          ? Object.keys(source).filter((k) => {
              return !Object.keys(target).includes(k);
            })
          : [];

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
      };

      result[key] = parse(currentData[key], data);
    }

    writeToFile(filepath, toJson(result));
    return result;
  }
};
