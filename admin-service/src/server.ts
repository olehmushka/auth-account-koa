import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { router } from './app';
import { getGeoLocation } from './middlewares/geo-location';
import * as logger from './utils/logger';

const app = express();

app.use(logger.getDevLogger());
app.use(logger.getFileStreamLogger());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', express.static(path.join(__dirname, '../public')));

app.use(getGeoLocation);
app.use('/admin', router);

app.use((req, res, next) => {
  const err: StatusError = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export { app };
