import { Request, Response } from 'express';
import { EndpointDef } from '../../types';
import { getEndpoints } from '../index';
import { filterDefs } from '../../common/defs';
import { composeDefsDict } from '../../common/impl/composeDefsDict';

function getDefsJsonController(req: Request, res: Response) {
  let defs: EndpointDef[] = getEndpoints(req.app);
  let search = <string>req.query.search;
  defs = filterDefs(search, defs);

  const jsonOutput = JSON.stringify(composeDefsDict(defs));

  res.setHeader('content-type', 'text/json');
  res.status(200).send(Buffer.from(jsonOutput));
}

export default getDefsJsonController;
