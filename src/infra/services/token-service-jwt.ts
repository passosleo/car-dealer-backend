import { ITokenService } from '../../application/services/token-service';
import jwt from 'jsonwebtoken';
import { HttpException } from '../http/response/http-exception';
import { HttpStatus } from '../http/response/http-status';

export class TokenServiceJWT implements ITokenService {
  private readonly secret = 'your_secret_key';
  private readonly refreshSecret = 'your_refresh_secret_key';
  private readonly expiresIn = '1h';
  private readonly refreshExpiresIn = '7d';

  public generateToken<T extends object>(payload: T): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  public verifyToken<T extends object>(token: string): T {
    try {
      return jwt.verify(token, this.secret) as T;
    } catch (error) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }
  }

  public generateRefreshToken<T extends object>(payload: T): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshExpiresIn });
  }

  public verifyRefreshToken<T>(token: string): T {
    try {
      return jwt.verify(token, this.refreshSecret) as T;
    } catch (error) {
      throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid token');
    }
  }
}
