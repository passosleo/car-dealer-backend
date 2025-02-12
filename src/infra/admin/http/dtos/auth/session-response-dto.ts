export class SessionResponseDTO {
  constructor(
    public readonly type: string,
    public readonly token: string,
    public readonly refreshToken: string,
    public readonly expiresIn: number,
  ) {}

  public static create(data: SessionResponseDTO): SessionResponseDTO {
    return new SessionResponseDTO(data.type, data.token, data.refreshToken, data.expiresIn);
  }
}
