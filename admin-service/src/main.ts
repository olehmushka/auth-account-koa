import http from 'http';
import { app } from './server';
import * as config from './config';

const port = normalizePort(config.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', getOnError(port));
server.on('listening', getOnListening(server));

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(Number(port))) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function getOnError(port) {
  return (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
}

function getOnListening(server) {
  return () => {
    const addr = server.address();
    const bind =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  };
}
