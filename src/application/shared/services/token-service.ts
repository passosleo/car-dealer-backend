export interface ITokenService {
  generateAccessToken<T extends object>(payload: T): string;
  verifyAccessToken<T extends object>(token: string): T;
  generateRefreshToken<T extends object>(payload: T): string;
  verifyRefreshToken<T extends object>(token: string): T;
}
