import { Request, Response } from 'express';
import { httpSuccess } from '../';

function getStatusController(req: Request, res: Response) {
  return httpSuccess(res, {}, 'defapi ok');
}

export default getStatusController;
