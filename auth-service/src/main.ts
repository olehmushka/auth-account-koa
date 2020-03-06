import { server } from './server';
import * as config from './config/config';

server.listen(config.PORT, () => {
  console.log(`App is running at http://localhost:${config.PORT}`);
  console.log('Press CTRL-C to stop');
});
