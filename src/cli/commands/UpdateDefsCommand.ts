import BaseCommand from './BaseCommand';

/**
 * Command handler for the `defapi init` command.
 */
export class UpdateDefsCommand extends BaseCommand {
  async run() {
    // await super.run();
    //
    // const baseUri = configUtil.getBaseUri();
    // if (no(baseUri)) {
    //   throw new DefapiError('No base uri');
    // }
    //
    // try {
    //   const { res, raw } = await httpRequest({
    //     baseUri,
    //     method: 'POST',
    //     path: API_PATH_UPDATE_DEFS
    //   });
    //
    //   if (res.statusCode === 200) {
    //     const resBody = JSON.parse(raw);
    //     console.log(resBody);
    //   } else {
    //     console.error(res.statusMessage);
    //   }
    // } catch (e) {
    //   console.error(e);
    // }
  }
}
