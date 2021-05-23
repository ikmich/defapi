import { Request, Response } from 'express';
import { EndpointDef } from '../../types';
import { getEndpoints } from '../index';
import { composeDef } from '../../common/impl/composeDef';

function getDefsJsonController(req: Request, res: Response) {
  let defs: EndpointDef[] = getEndpoints(req.app);
  const jsob: { [k: string]: object } = {};

  for (let def of defs) {
    let key = `${def.method} ${def.path}`;
    jsob[key] = composeDef(def);
  }

  const jsonOutput = JSON.stringify(jsob);

  res.setHeader('content-type', 'text/json');
  res.status(200).send(Buffer.from(jsonOutput));
}

export default getDefsJsonController;
