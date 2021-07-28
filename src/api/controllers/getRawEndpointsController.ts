import { Express, Request, Response } from 'express';
import { getRawEndpoints, httpSuccess } from '../';
import { filterDefs } from '../../common/defs';

function getRawEndpointsController(req: Request, res: Response) {
  let endpointDefs = getRawEndpoints(req.app as Express);

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

export default getRawEndpointsController;
