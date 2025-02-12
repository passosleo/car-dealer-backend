import { ITokenService } from '../../../application/shared/services/token-service';
import jwt from 'jsonwebtoken';
import { HttpException } from '../http/response/http-exception';
import { HttpStatus } from '../http/response/http-status';
import { envConfig } from '../http/config/env-config';

export class TokenServiceJWT implements ITokenService {
  private readonly config = envConfig.auth;

  public generateToken<T extends object>(payload: T): string {
    return jwt.sign(payload, this.config.secret, { expiresIn: this.config.expiresIn });
  }

  public verifyToken<T extends object>(token: string): T {
    try {
      return jwt.verify(token, this.config.secret) as T;
    } catch (error) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }
  }

  public generateRefreshToken<T extends object>(payload: T): string {
    return jwt.sign(payload, this.config.refreshSecret, { expiresIn: this.config.refreshExpiresIn });
  }

  public verifyRefreshToken<T>(token: string): T {
    try {
      return jwt.verify(token, this.config.refreshSecret) as T;
    } catch (error) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }
  }
}
