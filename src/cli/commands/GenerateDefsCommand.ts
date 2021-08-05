import BaseCommand from './BaseCommand';
import configManager from '../../common/managers/configManager';
import httpRequest from '../../api/httpRequest';
import { no } from '../../common/util';
import { DefapiError } from '../../common/errors';
import { IncomingMessage } from 'http';
import conprint from '../../common/util/conprint';
import { ROUTE_DEFS } from '../../api';
import { CONFIG_FILENAME } from '../../common';

/**
 * Command handler for the `defapi init` command.
 */
export class GenerateDefsCommand extends BaseCommand {
  async run() {
    await super.run();

    const baseUri = configManager.getBaseUri();
    if (no(baseUri)) {
      throw new DefapiError(`No base uri defined in ${CONFIG_FILENAME}.`);
    }

    let res: IncomingMessage;
    let raw: string;
    try {
      const result = await httpRequest({
        baseUri,
        method: 'POST',
        path: ROUTE_DEFS
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
