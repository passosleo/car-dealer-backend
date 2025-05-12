export class SessionResponseDTO {
  constructor(
    public readonly type: string,
    public readonly accessToken: string,
    public readonly accessTokenExpiresIn: number,
    public readonly refreshToken: string,
    public readonly refreshTokenExpiresIn: number,
  ) {}

  public static create(data: SessionResponseDTO): SessionResponseDTO {
    return new SessionResponseDTO(
      data.type,
      data.accessToken,
      data.accessTokenExpiresIn,
      data.refreshToken,
      data.refreshTokenExpiresIn,
    );
  }
}
