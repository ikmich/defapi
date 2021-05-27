import { Request, Response } from 'express';
import { EndpointDef } from '../../types';
import { getEndpoints } from '../index';
import { composeDef } from '../../common/impl/composeDef';

function getDefsJsonController(req: Request, res: Response) {
  let defs: EndpointDef[] = getEndpoints(req.app);

  let search = <string>req.query.search;
  if (search && search.length) {
    defs = defs.filter((def) => {
      return (
        def.title?.toLowerCase().includes(search) ||
        def.path.toLowerCase().includes(search) ||
        def.description?.toLowerCase().includes(search)
      );
    });
  }

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
