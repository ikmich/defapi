import { Express } from 'express';
import { EndpointDef } from '../index';
declare function getEndpoints(app: Express): EndpointDef[];
export { getEndpoints };
