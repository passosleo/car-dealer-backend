export class CreateBannerRequestDTO {
  constructor(
    public readonly title: string,
    public readonly imageDesktop: string,
    public readonly imageMobile: string,
    public readonly startAt: Date | null,
    public readonly endAt: Date | null,
    public readonly active: boolean,
  ) {}

  public static create(data: CreateBannerRequestDTO): CreateBannerRequestDTO {
    return new CreateBannerRequestDTO(
      data.title,
      data.imageDesktop,
      data.imageMobile,
      data.startAt,
      data.endAt,
      data.active,
    );
  }
}
