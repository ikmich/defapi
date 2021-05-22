// noinspection JSUnusedGlobalSymbols

import { Application, Express } from 'express';
import { defapiRouter } from './api/defapiRouter';

/**
 * Register your express app instance to use defapi routes.
 * @param app
 */
function defapiRegister(app: Application | Express) {
  app.use(defapiRouter);
}

export { defapiRegister, defapiRouter };
