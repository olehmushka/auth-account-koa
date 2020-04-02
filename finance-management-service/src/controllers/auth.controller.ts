import { NextFunction, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import { SignInRequest } from '../interfaces/auth.interfaces';
import { TokenService } from '../services/token.service';
import { TYPES } from '../services/types';

@controller('/auth')
export class AuthController {
  constructor(@inject(TYPES.TokenService) private _tokenService: TokenService) {
  }

  @httpPost('/sign-in')
  public signIn(req: SignInRequest, res: Response, next: NextFunction) {
    return this._tokenService.createToken(req.user)
      .then((token) => {
        return res.status(200).json({
          token,
          success: true,
        });
      })
      .catch(next);
  }
}