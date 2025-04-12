export class CreateCategoryRequestDTO {
  constructor(
    public readonly name: string,
    public readonly image: string,
    public readonly active: boolean,
  ) {}

  public static create(data: CreateCategoryRequestDTO): CreateCategoryRequestDTO {
    return new CreateCategoryRequestDTO(data.name, data.image, data.active);
  }
}
