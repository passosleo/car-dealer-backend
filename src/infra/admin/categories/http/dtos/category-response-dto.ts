export class CategoryResponseDTO {
  constructor(
    public readonly categoryId: string,
    public readonly name: string,
    public readonly imageUrl: string,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(data: CategoryResponseDTO): CategoryResponseDTO {
    return new CategoryResponseDTO(
      data.categoryId,
      data.name,
      data.imageUrl,
      data.active,
      data.createdAt,
      data.updatedAt,
    );
  }
}
