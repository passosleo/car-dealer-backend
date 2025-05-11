export class CreateProfileRequestDTO {
  constructor(
    public readonly name: string,
    public readonly roles: {
      roleId: string;
    }[],
  ) {}

  public static create(data: CreateProfileRequestDTO): CreateProfileRequestDTO {
    return new CreateProfileRequestDTO(data.name, data.roles);
  }
}
