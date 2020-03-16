import * as http from 'http';
import { server, closeConnections } from './server';
import * as config from './config';

server.on('error', async (err, _ctx) => {
  try {
    console.log(err);
    await closeConnections();
    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});

http
  .createServer(server.callback())
  .listen(config.PORT, () => {
    console.log(`App is running at http://localhost:${config.PORT}`);
    console.log('Press CTRL-C to stop');
  });
