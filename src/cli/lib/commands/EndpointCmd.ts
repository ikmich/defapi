import {BaseCmd} from "./BaseCmd";
import _util, {_fn, _noSpace, _slug, no, yes} from "../../../util/_util";
import {TitleNotFoundError} from "../errors";

import FS from 'fs-extra';
import Path from 'path';
import fileUtil from "../../../util/file-util";
import conprint from "../helpers/conprint";

export class EndpointCmd extends BaseCmd {

  async run(): Promise<void> {
    await super.run();
    console.log('>> EndpointCmd');

    // $ docapi endpoint <1:title> <2?:path> <3?:method>
    // Read options and args
    // Use title arg/option as filename
    //

    let title = _util.fn(() => {
      let opt = this.options.title;
      if (yes(opt)) return opt;

      let arg = this.getArg(1);
      if (yes(arg)) return arg;

      // If no title is passed but a tag is passed, use the tag as the title.
      let tag = this.options.tag;
      if (yes(tag)) return tag;

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

    let tag = _fn(() => {
      let opt = this.options.tag;
      if (yes(opt)) return _noSpace(opt!);
      return '';
    });

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

    let filename = `${no(tag) ? _slug(title) : tag}.endpoint.${ext}`; // Todo - allow user to choose preferred extension?
    // create the file (for test)

    /*
export interface EndpointDef {
  path: string;
  method: string;
  title?: NullableString;
  tag?: NullableString;
  request?: RequestDef;
  response?: ResponseDef;
  group?: NullableString;
}
     */
    let contents = `module.exports = {
  path: "${path}",
  method: "${method}",
  title: "${title}",
  tag: "${tag}",
  request: {
    type: "",
    query: null,
    body: null,
    headers: null
  },
  response: {
    type: "",
    body: {
      success: {},
      fail: {}
    }
  }
}`;

    console.log({
      contents
    });
    const filepath = Path.resolve(fileUtil.getDefsDir(), filename);
    console.log({filepath});
    // try {
    //   FS.writeFileSync(filename, contents, {encoding: 'utf-8'});
    // } catch (e) {
    //   console.error(e);
    // }
    //
    // if (FS.existsSync(filepath)) {
    //   conprint.success(`${filename}`)
    // }
  }
}
