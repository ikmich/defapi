// noinspection JSUnusedGlobalSymbols

import { Application, Express } from 'express';
import { defapiRouter } from './api/defapiRouter';

let registered = false;

/**
 * Register your express app instance to use defapi routes.
 * @param app
 */
function defapiRegister(app: Application | Express) {
  if (registered) return;
  app.use(defapiRouter);
  registered = true;
}

export { defapiRegister, defapiRouter };
