export class UpdateBannerRequestDTO {
  constructor(
    public readonly title: string,
    public readonly imageDesktopUrl: string,
    public readonly imageMobileUrl: string,
    public readonly startAt: Date | null,
    public readonly endAt: Date | null,
    public readonly active: boolean,
  ) {}

  public static create(data: UpdateBannerRequestDTO): UpdateBannerRequestDTO {
    return new UpdateBannerRequestDTO(
      data.title,
      data.imageDesktopUrl,
      data.imageMobileUrl,
      data.startAt,
      data.endAt,
      data.active,
    );
  }
}
