import { ITokenService } from '../../../application/shared/services/token-service';
import jwt from 'jsonwebtoken';
import { HttpException } from '../http/response/http-exception';
import { HttpStatus } from '../http/response/http-status';
import { CONFIG } from '../constants/config';

export class TokenServiceJWT implements ITokenService {
  private readonly config = CONFIG.auth;

  public generateAccessToken<T extends object>(payload: T): string {
    return jwt.sign(payload, this.config.accessSecret, { expiresIn: this.config.accessTokenExpiresIn });
  }

  public verifyAccessToken<T extends object>(token: string): T {
    try {
      return jwt.verify(token, this.config.accessSecret) as T;
    } catch {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }
  }

  public generateRefreshToken<T extends object>(payload: T): string {
    return jwt.sign(payload, this.config.refreshSecret, { expiresIn: this.config.refreshTokenExpiresIn });
  }

  public verifyRefreshToken<T>(token: string): T {
    try {
      return jwt.verify(token, this.config.refreshSecret) as T;
    } catch {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }
  }
}
