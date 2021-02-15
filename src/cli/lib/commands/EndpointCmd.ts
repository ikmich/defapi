import { BaseCmd } from "./BaseCmd";
import _util, { getDefFileStub, no, yes } from "../../../util/_util";
import { NoMethodError, NoPathError } from "../errors";

import FS from "fs-extra";
import Path from "path";
import fileUtil from "../../../util/file-util";
import conprint from "../../cli-helpers/conprint";
import askInput from "../ask/ask-input";
import { EndpointDef, StringOrNull } from "../../../api/meta";
import { askUtil } from "../../cli-helpers/ask-util";
import generateDefFile from "../../../helpers/generateDefFile";

/**
 * Command handler class for the `docapi endpoint` command.
 */
export class EndpointCmd extends BaseCmd {
  async run(): Promise<void> {
    await super.run();

    let method: StringOrNull = null;
    let path: StringOrNull = null;

    if (this.args.length >= 2) {
      method = this.getArg(1);
      path = this.getArg(2);
    }

    if (yes(this.options.method)) {
      method = this.options.method ?? null;
    }

    if (yes(this.options.path)) {
      path = this.options.path ?? null;
    }

    if (no(method)) {
      throw new NoMethodError();
    }

    if (no(path)) {
      throw new NoPathError();
    }

    let title = _util.fn(() => {
      let opt = this.options.title;
      if (yes(opt)) return opt;
      return `${method!.toUpperCase()} ${path}`;
    });

    if (!path) {
      throw new NoPathError();
    }

    if (!method) {
      throw new NoMethodError();
    }

    const def: EndpointDef = {
      path,
      title,
      method,
    };

    let defsDir = fileUtil.getDefsDir();
    const filename = `${getDefFileStub(def)}.js`;
    const filepath = Path.resolve(defsDir, filename);

    try {
      if (FS.existsSync(filepath)) {
        const msg = `A "${filename}" file already exists. Would you like to overwrite it? (y/n)`;
        const input = await askInput("input", msg);
        if (!askUtil.isYesInput(input)) {
          conprint.plain("Ignoring...");
          return;
        }
      }
      generateDefFile(def);
    } catch (e) {
      console.error(e);
    }

    if (FS.existsSync(filepath)) {
      conprint.success(`${filename}`);
    }
  }
}
