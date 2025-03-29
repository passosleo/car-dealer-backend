export class CreateBrandRequestDTO {
  constructor(
    public readonly name: string,
    public readonly image: string,
    public readonly active: boolean,
  ) {}

  public static create(data: CreateBrandRequestDTO): CreateBrandRequestDTO {
    return new CreateBrandRequestDTO(data.name, data.image, data.active);
  }
}
