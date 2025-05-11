export class UpdateUserRequestDTO {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly active: boolean,
    public readonly profileId: string,
  ) {}

  public static create(data: UpdateUserRequestDTO): UpdateUserRequestDTO {
    return new UpdateUserRequestDTO(data.firstName, data.lastName, data.email, data.active, data.profileId);
  }
}
