export class CreateUserRequestDTO {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly active: boolean,
    public readonly profileId: string,
  ) {}

  public static create(data: CreateUserRequestDTO): CreateUserRequestDTO {
    return new CreateUserRequestDTO(data.firstName, data.lastName, data.email, data.active, data.profileId);
  }
}
