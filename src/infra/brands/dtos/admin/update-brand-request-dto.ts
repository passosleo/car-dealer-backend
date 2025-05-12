export class UpdateBrandRequestDTO {
  constructor(
    public readonly name: string,
    public readonly image: string,
    public readonly active: boolean,
  ) {}

  public static create(data: UpdateBrandRequestDTO): UpdateBrandRequestDTO {
    return new UpdateBrandRequestDTO(data.name, data.image, data.active);
  }
}
