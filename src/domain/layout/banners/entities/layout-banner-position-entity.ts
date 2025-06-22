export interface CreateLayoutBannerPositionData {
  layoutBannerPositionId?: string;
  layoutBannerConfigId: string;
  bannerId: string;
  position?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class LayoutBannerPosition {
  public readonly layoutBannerPositionId: string;
  public layoutBannerConfigId: string;
  public bannerId: string;
  public position: number;
  public readonly createdAt: Date;
  public updatedAt: Date;

  public constructor(data: CreateLayoutBannerPositionData) {
    this.layoutBannerPositionId = data.layoutBannerPositionId!;
    this.layoutBannerConfigId = data.layoutBannerConfigId;
    this.bannerId = data.bannerId;
    this.position = data.position ?? 0;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: CreateLayoutBannerPositionData): LayoutBannerPosition {
    return new LayoutBannerPosition(data);
  }
}
