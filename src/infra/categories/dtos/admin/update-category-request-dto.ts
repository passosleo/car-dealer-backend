export class UpdateCategoryRequestDTO {
  constructor(
    public readonly name: string,
    public readonly image: string,
    public readonly active: boolean,
  ) {}

  public static create(data: UpdateCategoryRequestDTO): UpdateCategoryRequestDTO {
    return new UpdateCategoryRequestDTO(data.name, data.image, data.active);
  }
}
