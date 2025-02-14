export class GetUserInfoResponseDTO {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly active: boolean,
  ) {}

  public static create(data: GetUserInfoResponseDTO) {
    return new GetUserInfoResponseDTO(data.firstName, data.lastName, data.email, data.active);
  }
}
