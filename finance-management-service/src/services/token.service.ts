import { injectable } from 'inversify';
import * as jwt from 'jsonwebtoken';
import * as config from '../config';

@injectable()
export class TokenService {
  public createToken(user: User) {
    return new Promise<string>((resolve, reject) => {
      const token = jwt.sign({ id: 'id', login: 'email' }, config.SECRET_TOKEN_KEY, { expiresIn: 86400 });
      resolve(token);
    });
  }
}
