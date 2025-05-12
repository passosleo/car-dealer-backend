export class BannerResponseDTO {
  constructor(
    public readonly bannerId: string,
    public readonly title: string,
    public readonly imageDesktopUrl: string,
    public readonly imageMobileUrl: string,
    public readonly startAt: Date | null,
    public readonly endAt: Date | null,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(data: BannerResponseDTO): BannerResponseDTO {
    return new BannerResponseDTO(
      data.bannerId,
      data.title,
      data.imageDesktopUrl,
      data.imageMobileUrl,
      data.startAt,
      data.endAt,
      data.active,
      data.createdAt,
      data.updatedAt,
    );
  }
}
