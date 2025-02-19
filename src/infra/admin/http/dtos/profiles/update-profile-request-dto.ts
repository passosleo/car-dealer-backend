export class UpdateProfileRequestDTO {
  constructor(
    public readonly name: string,
    public readonly roles: {
      roleId: string;
    }[],
  ) {}

  public static create(data: UpdateProfileRequestDTO): UpdateProfileRequestDTO {
    return new UpdateProfileRequestDTO(data.name, data.roles);
  }
}
