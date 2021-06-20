// noinspection JSUnusedGlobalSymbols

import express, { Application, Express, NextFunction, Request, Response } from 'express';
import { defapiRouter } from './api/defapiRouter';
import { PATH_HTML_CLIENT_DIR } from './common';
import { store } from './common/util/store';

let registered = false;

/**
 * Middleware to properly setup defapi routes.
 * @param req
 * @param res
 * @param next
 */
function defapiBootstrap(req: Request, res: Response, next: NextFunction) {
  // Allow serving of static files for defapi web view.
  req.app.use(express.static(PATH_HTML_CLIENT_DIR));

  const host = `${req.protocol}://${req.get('Host')}`;
  store.save('host', host);

  next();
}

/**
 * Register your express app instance to use defapi routes.
 * @param app
 */
function defapiRegister(app: Application | Express) {
  if (registered) return;
  app.use(defapiBootstrap);
  app.use(defapiRouter);
  registered = true;
}

export { defapiRegister, defapiRouter, defapiBootstrap };
