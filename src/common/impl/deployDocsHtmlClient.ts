import fileUtil from '../util/fileUtil';
import { FS, Path } from '../depds';
import { PATH__HTML_CLIENT } from '../index';
import conprint from '../util/conprint';

/**
 * Copy static html files to the project to be rendered.
 */
export function deployDocsHtmlClient() {
  const docsDir = fileUtil.getDocsDir();
  const src = Path.join(PATH__HTML_CLIENT, '/');
  if (!FS.existsSync(src)) {
    // => Client has not been built. This should not be so, though. Defapi should be deployed with the docs client
    // pre-built.
    return;
  }

  const dest = Path.join(docsDir, '/');
  FS.ensureDirSync(dest);
  try {
    FS.copySync(src, dest, { recursive: true, overwrite: true, errorOnExist: false });
  } catch (e) {
    conprint.error('Error deploying html client');
    console.error(e);
  }
}
