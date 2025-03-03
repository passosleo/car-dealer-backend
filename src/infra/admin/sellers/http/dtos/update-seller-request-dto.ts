export class UpdateSellerRequestDTO {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string | null,
    public readonly email: string | null,
    public readonly phone: string | null,
    public readonly imageUrl: string | null,
    public readonly customMessage: string | null,
    public readonly active: boolean,
  ) {}

  public static create(data: UpdateSellerRequestDTO): UpdateSellerRequestDTO {
    return new UpdateSellerRequestDTO(
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.imageUrl,
      data.customMessage,
      data.active,
    );
  }
}
