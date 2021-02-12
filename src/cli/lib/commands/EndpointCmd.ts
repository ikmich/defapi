import {BaseCmd} from "./BaseCmd";
import _util, {_fn, _noSpace, _slug, devLog, no, yes} from "../../../util/_util";
import {TitleNotFoundError} from "../errors";

import FS from 'fs-extra';
import Path from 'path';
import fileUtil from "../../../util/file-util";
import conprint from "../helpers/conprint";
import askInput from "../ask/ask-input";

// $ docapi endpoint <1:title> <2?:path> <3?:method>
// Read options and args
// Use title arg/option as filename

export class EndpointCmd extends BaseCmd {

  async run(): Promise<void> {
    await super.run();
    devLog('>> EndpointCmd');

    let title = _util.fn(() => {
      let opt = this.options.title;
      if (yes(opt)) return opt;

      let arg = this.getArg(1);
      if (yes(arg)) return arg;

      // // If no title is passed but a tag is passed, use the tag as the title.
      // let tag = this.options.name;
      // if (yes(tag)) return tag;

      throw new TitleNotFoundError();
    });

    let path = _util.fn(() => {
      let opt = this.options.path;
      if (yes(opt)) return opt!;

      let arg = this.getArg(2);
      if (yes(title) && yes(arg)) return arg!;

      return ''; // No path provided
    });

    let method = _fn(() => {
      let opt = this.options.method;
      if (yes(opt)) return opt!;

      let arg = this.getArg(3);
      if (yes(path) && yes(arg)) return arg!;
      return ''; // No method provided
    });

    // let name = _fn(() => {
    //   let opt = this.options.name;
    //   if (yes(opt)) return _noSpace(opt!);
    //
    //   return _slug(title);
    // });

    let ext = _fn(() => {
      let opt = this.options.ext;
      if (yes(opt)) return opt!;
      return 'js';
    });

    console.log({
      title,
      path,
      method
    });

    let filename = `${_slug(title)}.${ext}`;
    // create the file (for test)

    let contents = `module.exports = {
  path: "${path}",
  method: "${method}",
  title: "${title}",
  request: {
    type: "",
    query: null,
    body: null,
    headers: null
  },
  response: {
    type: "",
    body: {}
  }
}`;

    const filepath = Path.resolve(fileUtil.getDefsDir(), filename);
    console.log({filepath});
    try {
      if (FS.existsSync(filepath)) {
        const msg = `A ${filename} file already exists. Would you like to overwrite it? (y/n)`;
        const input = await askInput('input', msg);
        if (input !== 'y' && input !== 'yes') {
          conprint.plain('Ignoring...');
          return;
        }
      }
      FS.writeFileSync(filepath, contents, {encoding: 'utf-8'});
    } catch (e) {
      console.error(e);
    }

    if (FS.existsSync(filepath)) {
      conprint.success(`${filename}`)
    }
  }
}
