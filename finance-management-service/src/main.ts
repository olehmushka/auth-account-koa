import 'reflect-metadata';
import './ioc/loader';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import { logger, routeLogger } from './lib/logger';
import * as config from './config';
import { server } from './server';

server.setConfig((_app: express.Application) => {

  _app.use(routeLogger);
  _app.use(bodyParser.json());
  _app.use(bodyParser.urlencoded({ extended: true }));

})
  .setErrorConfig((_app) => {
    // catch 404 and forward to error handler
    _app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(404);
      res.json({ message: 'Page not found' });
    });
  });

const app = server.build();
app.listen(config.PORT, () => {
  logger.info(`App is running at http://localhost:${config.PORT}`);
  logger.info('Press CTRL-C to stop');
});

export { app };
