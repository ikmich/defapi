import { Request, Response } from 'express';
import { composeManifest } from '../../common/impl/composeManifest';

function viewDocsController(req: Request, res: Response) {
  // Todo - continue

  //res.setHeader('content-type', 'text/html');
  //res.status(200).sendFile('');
  //// const html = fileUtil.read(HTML_INDEX_PATH) ?? '';
  //// res.status(200).send(Buffer.from(html));

  const manifest = composeManifest(req);

  res.json(manifest);
}

export { viewDocsController };
