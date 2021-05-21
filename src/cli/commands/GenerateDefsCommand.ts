import BaseCommand from './BaseCommand';
import configUtil from '../../common/util/config-util';
import httpRequest from '../../common/util/http-request';
import { no } from '../../common/util';
import { DefapiError } from '../../common/errors';
import {API_PATH_GENERATE_DEFS, CONFIG_FILENAME} from '../../common/constants';
import { IncomingMessage } from 'http';
import conprint from '../../common/util/conprint';

/**
 * Command handler for the `defapi init` command.
 */
export class GenerateDefsCommand extends BaseCommand {
  async run() {
    await super.run();

    const baseUri = configUtil.getBaseUri();
    if (no(baseUri)) {
      throw new DefapiError(`No base uri defined in ${CONFIG_FILENAME}.`);
    }

    let res: IncomingMessage;
    let raw: string;
    try {
      const result = await httpRequest({
        baseUri,
        method: 'POST',
        path: API_PATH_GENERATE_DEFS
      });

      res = result.res;
      raw = result.raw;
      const resBody = JSON.parse(raw);

      if (res.statusCode === 200) {
        conprint.success('Success');
      } else {
        conprint.error('Error');
      }

      console.error(resBody);
    } catch (e) {
      console.error(e);
    }
  }
}
