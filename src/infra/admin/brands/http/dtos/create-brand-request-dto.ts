export class CreateBrandRequestDTO {
  constructor(
    public readonly name: string,
    public readonly imageUrl: string,
    public readonly active: boolean,
  ) {}

  public static create(data: CreateBrandRequestDTO): CreateBrandRequestDTO {
    return new CreateBrandRequestDTO(data.name, data.imageUrl, data.active);
  }
}
