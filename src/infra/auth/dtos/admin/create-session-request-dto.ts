export class CreateSessionRequestDTO {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static create(data: CreateSessionRequestDTO): CreateSessionRequestDTO {
    return new CreateSessionRequestDTO(data.email, data.password);
  }
}
