// noinspection JSUnusedGlobalSymbols

import express, { Application, Express, NextFunction, Request, Response } from 'express';
import { defapiRouter } from './api/defapiRouter';
import { PATH_HTML_CLIENT_DIR } from './common';
import { viewClientController } from './api/controllers/viewClientController';

let registered = false;

/**
 * Middleware to properly setup defapi routes.
 * @param req
 * @param res
 * @param next
 */
function defapiStatic(req: Request, res: Response, next: NextFunction) {
  // Allow serving of static files for defapi web view.
  req.app.use(express.static(PATH_HTML_CLIENT_DIR));
  next();
}

/**
 * Register your express app instance to use defapi routes.
 * @param app
 */
function defapiRegister(app: Application | Express) {
  if (registered) return;
  app.use(defapiStatic);
  app.use(defapiRouter);
  registered = true;
}

async function defapiServeHtmlClient(req: Request, res: Response) {
  req.app.use(defapiStatic);
  return viewClientController(req, res);
}

export { defapiRegister, defapiRouter, defapiStatic, defapiServeHtmlClient };
