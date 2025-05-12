export class BrandResponseDTO {
  constructor(
    public readonly brandId: string,
    public readonly name: string,
    public readonly imageUrl: string,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(data: BrandResponseDTO): BrandResponseDTO {
    return new BrandResponseDTO(data.brandId, data.name, data.imageUrl, data.active, data.createdAt, data.updatedAt);
  }
}
