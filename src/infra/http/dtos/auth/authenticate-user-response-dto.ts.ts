export class AuthenticateUserResponseDTO {
  constructor(
    public readonly type: string,
    public readonly token: string,
    public readonly refreshToken: string,
    public readonly expiresIn: number,
  ) {}

  public static create(data: AuthenticateUserResponseDTO): AuthenticateUserResponseDTO {
    return new AuthenticateUserResponseDTO(data.type, data.token, data.refreshToken, data.expiresIn);
  }
}
