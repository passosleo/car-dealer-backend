export interface ITokenService {
  generateToken<T>(payload: T): string;
  verifyToken<T>(token: string): T;
  generateRefreshToken<T>(payload: T): string;
  verifyRefreshToken<T>(token: string): T;
}
