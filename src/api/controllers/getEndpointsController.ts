import { Express, Request, Response } from 'express';
import { getEndpoints, httpSuccess } from '../';
import { filterDefs } from '../../common/defs';

function getEndpointsController(req: Request, res: Response) {
  let endpointDefs = getEndpoints(req.app as Express);

  let search = <string>req.query.search;
  endpointDefs = filterDefs(search, endpointDefs);

  return httpSuccess(res, {
    count: endpointDefs.length,
    endpoints: endpointDefs.map(endpointDef => {
      delete endpointDef['title'];
      return endpointDef;
    })
  });
}

export default getEndpointsController;
