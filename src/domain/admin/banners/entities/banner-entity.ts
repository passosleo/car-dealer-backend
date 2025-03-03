export interface CreateBannerData {
  bannerId?: string;
  title: string;
  imageDesktopUrl: string;
  imageMobileUrl: string;
  startAt?: Date | null;
  endAt?: Date | null;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Banner {
  public readonly bannerId: string;
  public title: string;
  public imageDesktopUrl: string;
  public imageMobileUrl: string;
  public startAt: Date | null;
  public endAt: Date | null;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(data: CreateBannerData) {
    this.bannerId = data.bannerId!;
    this.title = data.title;
    this.imageDesktopUrl = data.imageDesktopUrl;
    this.imageMobileUrl = data.imageMobileUrl;
    this.startAt = data.createdAt ?? null;
    this.endAt = data.updatedAt ?? null;
    this.active = data.active ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: CreateBannerData): Banner {
    return new Banner(data);
  }
}
