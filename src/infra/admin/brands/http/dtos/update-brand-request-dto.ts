export class UpdateBrandRequestDTO {
  constructor(
    public readonly name: string,
    public readonly imageUrl: string,
    public readonly active: boolean,
  ) {}

  public static create(data: UpdateBrandRequestDTO): UpdateBrandRequestDTO {
    return new UpdateBrandRequestDTO(data.name, data.imageUrl, data.active);
  }
}
