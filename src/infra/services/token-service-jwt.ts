import { ITokenService } from '../../application/services/token-service';

export class TokenServiceJWT implements ITokenService {
  public generateToken<T>(payload: T): string {
    throw new Error('Method not implemented.');
  }

  public verifyToken<T>(token: string): T {
    throw new Error('Method not implemented.');
  }

  public generateRefreshToken<T>(payload: T): string {
    throw new Error('Method not implemented.');
  }

  public verifyRefreshToken<T>(token: string): T {
    throw new Error('Method not implemented.');
  }
}
