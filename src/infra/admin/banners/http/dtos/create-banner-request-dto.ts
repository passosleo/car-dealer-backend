export class CreateBannerRequestDTO {
  constructor(
    public readonly title: string,
    public readonly imageDesktopBase64: string,
    public readonly imageMobileBase64: string,
    public readonly startAt: Date | null,
    public readonly endAt: Date | null,
    public readonly active: boolean,
  ) {}

  public static create(data: CreateBannerRequestDTO): CreateBannerRequestDTO {
    return new CreateBannerRequestDTO(
      data.title,
      data.imageDesktopBase64,
      data.imageMobileBase64,
      data.startAt,
      data.endAt,
      data.active,
    );
  }
}
