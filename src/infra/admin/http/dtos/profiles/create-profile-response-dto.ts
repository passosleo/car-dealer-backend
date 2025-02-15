export class CreateProfileResponseDTO {
  constructor(
    public readonly profileId: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly roles: {
      roleId: string;
      name: string;
      label: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
    }[],
  ) {}

  public static create(data: CreateProfileResponseDTO): CreateProfileResponseDTO {
    return new CreateProfileResponseDTO(data.profileId, data.name, data.createdAt, data.updatedAt, data.roles);
  }
}
