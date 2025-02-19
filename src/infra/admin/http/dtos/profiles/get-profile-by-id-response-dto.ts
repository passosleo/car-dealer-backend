export class GetProfileByIdResponseDTO {
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

  public static create(data: GetProfileByIdResponseDTO): GetProfileByIdResponseDTO {
    return new GetProfileByIdResponseDTO(data.profileId, data.name, data.createdAt, data.updatedAt, data.roles);
  }
}
