export class RecoverPasswordRequestDTO {
  constructor(
    public readonly newPassword: string,
    public readonly token: string,
  ) {}

  public static create(data: RecoverPasswordRequestDTO): RecoverPasswordRequestDTO {
    return new RecoverPasswordRequestDTO(data.newPassword, data.token);
  }
}
