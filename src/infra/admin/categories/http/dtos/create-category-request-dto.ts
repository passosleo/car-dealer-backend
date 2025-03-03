export class CreateCategoryRequestDTO {
  constructor(
    public readonly name: string,
    public readonly imageUrl: string,
    public readonly active: boolean,
  ) {}

  public static create(data: CreateCategoryRequestDTO): CreateCategoryRequestDTO {
    return new CreateCategoryRequestDTO(data.name, data.imageUrl, data.active);
  }
}
