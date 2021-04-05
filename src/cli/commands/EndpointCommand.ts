import { BaseCommand } from './BaseCommand';
import ut, { getDefFileTitle, no, yes } from '../../util';

import FS from 'fs-extra';
import Path from 'path';
import fileUtil from '../../util/file-util';
import conprint from '../../util/conprint';
import askInput from '../ask/ask-input';
import { askUtil } from '../ask';
import { generateEndpointDefFile } from '../../util/generate-endpoint-def-file';
import { EndpointDef, Stringx } from '../../index';
import { NoMethodError, NoPathError } from '../../errors';

/**
 * Command handler class for the `defapi endpoint` command.
 */
export class EndpointCommand extends BaseCommand {
  async run(): Promise<void> {
    await super.run();

    let method: Stringx = null;
    let path: Stringx = null;

    if (this.args.length >= 2) {
      method = this.getArg(1);
      path = this.getArg(2);
    }

    if (yes(this.options.method)) {
      method = this.options.method!;
    }

    if (yes(this.options.path)) {
      path = this.options.path!;
    }

    if (no(method) || !method) {
      throw new NoMethodError();
    }

    if (no(path) || !path) {
      throw new NoPathError();
    }

    let title = ut.fn(() => {
      let opt = this.options.title;
      if (yes(opt)) return opt;
      return `${method!.toUpperCase()} ${path}`;
    });

    const def: EndpointDef = {
      path,
      title,
      method
    };

    let defsDir = fileUtil.getDefsDir();
    const filename = `${getDefFileTitle(def)}.js`;
    const filepath = Path.resolve(defsDir, filename);

    try {
      if (FS.existsSync(filepath)) {
        const msg = `Endpoint def file: "${filename}", already exists. Would you like to overwrite it? (y/n)`;
        const input = await askInput('input', msg);
        if (!askUtil.isYesInput(input)) {
          conprint.plain('Ignoring...');
          return;
        }
      }
      generateEndpointDefFile(def);
    } catch (e) {
      console.error(e);
    }

    if (FS.existsSync(filepath)) {
      conprint.success(`${filename}`);
    }
  }
}
