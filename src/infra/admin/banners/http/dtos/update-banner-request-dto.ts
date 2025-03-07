export class UpdateBannerRequestDTO {
  constructor(
    public readonly title: string,
    public readonly imageDesktopBase64: string,
    public readonly imageMobileBase64: string,
    public readonly startAt: Date | null,
    public readonly endAt: Date | null,
    public readonly active: boolean,
  ) {}

  public static create(data: UpdateBannerRequestDTO): UpdateBannerRequestDTO {
    return new UpdateBannerRequestDTO(
      data.title,
      data.imageDesktopBase64,
      data.imageMobileBase64,
      data.startAt,
      data.endAt,
      data.active,
    );
  }
}
