export class ListRolesResponseDTO {
  constructor(
    public readonly roleId: string,
    public readonly name: string,
    public readonly label: string,
    public readonly description: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(data: ListRolesResponseDTO): ListRolesResponseDTO {
    return new ListRolesResponseDTO(
      data.roleId,
      data.name,
      data.label,
      data.description,
      data.createdAt,
      data.updatedAt,
    );
  }
}
