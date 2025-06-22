import { Banner } from '../../../banners/entities/banner-entity';
import { LayoutBannerConfig } from './layout-banner-config-entity';

export interface CreateLayoutBannerPositionData {
  layoutBannerPositionId?: string;
  position?: number;
  createdAt?: Date;
  updatedAt?: Date;
  layoutBannerConfig: LayoutBannerConfig;
  banner: Banner;
}

export class LayoutBannerPosition {
  public readonly layoutBannerPositionId: string;
  public position: number;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public layoutBannerConfig: LayoutBannerConfig;
  public banner: Banner;

  public constructor(data: CreateLayoutBannerPositionData) {
    this.layoutBannerPositionId = data.layoutBannerPositionId!;
    this.position = data.position ?? 0;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.layoutBannerConfig = data.layoutBannerConfig;
    this.banner = data.banner;
  }

  public static create(data: CreateLayoutBannerPositionData): LayoutBannerPosition {
    return new LayoutBannerPosition(data);
  }
}
