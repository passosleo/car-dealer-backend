export class SellerResponseDTO {
  constructor(
    public readonly sellerId: string,
    public readonly firstName: string,
    public readonly lastName: string | null,
    public readonly email: string | null,
    public readonly phone: string | null,
    public readonly imageUrl: string | null,
    public readonly customMessage: string | null,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(data: SellerResponseDTO): SellerResponseDTO {
    return new SellerResponseDTO(
      data.sellerId,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.imageUrl,
      data.customMessage,
      data.active,
      data.createdAt,
      data.updatedAt,
    );
  }
}
