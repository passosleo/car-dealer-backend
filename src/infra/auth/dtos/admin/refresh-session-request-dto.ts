export class RefreshSessionRequestDTO {
  constructor(public readonly refreshToken: string) {}

  public static create(data: RefreshSessionRequestDTO): RefreshSessionRequestDTO {
    return new RefreshSessionRequestDTO(data.refreshToken);
  }
}
