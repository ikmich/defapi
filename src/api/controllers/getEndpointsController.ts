import { Express, Request, Response } from 'express';
import { getEndpoints } from '../index';
import { httpSuccess } from '../../common/util';

function getEndpointsController(req: Request, res: Response) {
  let endpointDefs = getEndpoints(req.app as Express);

  let search = <string>req.query.search;
  if (search && search.length) {
    endpointDefs = endpointDefs.filter((def) => {
      return (
        def.title?.toLowerCase().includes(search) ||
        def.path.toLowerCase().includes(search) ||
        def.description?.toLowerCase().includes(search)
      );
    });
  }

  return httpSuccess(res, {
    count: endpointDefs.length,
    endpoints: endpointDefs
  });
}

export default getEndpointsController;
