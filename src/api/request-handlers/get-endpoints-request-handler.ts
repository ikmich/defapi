import { Express, Request, Response } from 'express';
import { httpSuccess } from '../../util';
import { getEndpoints } from '../index';

function getEndpointsRequestHandler(req: Request, res: Response) {
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

  // Todo - Get data from decorators at this point.

  return httpSuccess(res, {
    count: endpointDefs.length,
    endpoints: endpointDefs
  });
}

export default getEndpointsRequestHandler;
