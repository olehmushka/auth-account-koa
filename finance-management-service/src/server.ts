import { InversifyExpressServer } from 'inversify-express-utils';
import { iocContainer } from './ioc/ioc.config';

const server = new InversifyExpressServer(iocContainer, null, { rootPath: '/api/fm' });

export { server };
