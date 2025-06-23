export class LayoutComponentResponseDTO {
  constructor(
    public readonly layoutComponentId: string,
    public readonly label: string,
    public readonly name: string,
    public readonly page: string,
    public readonly description: string | null,
    public readonly position: number,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(data: LayoutComponentResponseDTO): LayoutComponentResponseDTO {
    return new LayoutComponentResponseDTO(
      data.layoutComponentId,
      data.label,
      data.name,
      data.page,
      data.description,
      data.position,
      data.active,
      data.createdAt,
      data.updatedAt,
    );
  }
}
