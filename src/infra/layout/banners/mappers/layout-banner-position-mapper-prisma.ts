import { LayoutBannerPosition as LayoutBannerPositionPrisma } from '@prisma/client';
import { LayoutBannerPosition } from '../../../../domain/layout/banners/entities/layout-banner-position-entity';

export class LayoutBannerPositionMapperPrisma {
  public static toDomain(data: LayoutBannerPositionPrisma): LayoutBannerPosition {
    return LayoutBannerPosition.create(data);
  }

  public static toPrisma(data: LayoutBannerPosition): LayoutBannerPositionPrisma {
    return {
      layoutBannerPositionId: data.layoutBannerPositionId,
      layoutBannerConfigId: data.layoutBannerConfigId,
      bannerId: data.bannerId,
      position: data.position,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialPrisma(data: Partial<LayoutBannerPosition>): Partial<LayoutBannerPositionPrisma> {
    return this.toPrisma(data as LayoutBannerPosition);
  }
}
