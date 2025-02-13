export class SendRecoverPasswordRequestDTO {
  constructor(public readonly email: string) {}

  public static create(data: SendRecoverPasswordRequestDTO): SendRecoverPasswordRequestDTO {
    return new SendRecoverPasswordRequestDTO(data.email);
  }
}
