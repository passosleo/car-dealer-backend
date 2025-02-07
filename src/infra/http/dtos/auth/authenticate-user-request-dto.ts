export class AuthenticateUserRequestDTO {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static create(data: AuthenticateUserRequestDTO): AuthenticateUserRequestDTO {
    return new AuthenticateUserRequestDTO(data.email, data.password);
  }
}
