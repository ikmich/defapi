import { Express, Request, Response } from 'express';
import { httpSuccess } from '../../util';
import { getEndpoints } from '../index';

function getEndpointsController(req: Request, res: Response) {
  const endpoints = getEndpoints(req.app as Express);
  return httpSuccess(res, {
    count: endpoints.length,
    endpoints
  });
}

export default getEndpointsController;
