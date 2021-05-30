import { Request, Response } from 'express';

function viewDocsController(req: Request, res: Response) {
  // Todo - continue
  // const html = fileUtil.read(HTML_INDEX_PATH) ?? '';
  res.setHeader('content-type', 'text/html');
  // res.status(200).send(Buffer.from(html));
  res.status(200).sendFile('');
}

export { viewDocsController };
