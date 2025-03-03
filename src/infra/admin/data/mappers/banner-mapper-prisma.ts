import { Banner } from '../../../../domain/admin/entities/banner-entity';
import { Banner as BannerPrisma } from '@prisma/client';

export class BannerMapperPrisma {
  public static toDomain(data: BannerPrisma): Banner {
    return Banner.create(data);
  }

  public static toPrisma(data: Banner | Partial<Banner>): BannerPrisma {
    return {
      bannerId: data.bannerId,
      title: data.title,
      imageDesktopUrl: data.imageDesktopUrl,
      imageMobileUrl: data.imageMobileUrl,
      startAt: data.startAt,
      endAt: data.endAt,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    } as BannerPrisma;
  }
}
