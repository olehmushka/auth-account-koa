import { Container } from 'inversify';
import { TokenService } from '../services/token.service';
import { TYPES as ServicesTypes } from '../services/types';

const iocContainer = new Container();

iocContainer.bind<TokenService>(ServicesTypes.TokenService).to(TokenService);

export { iocContainer };
