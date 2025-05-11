import { Brand as BrandPrisma } from '@prisma/client';
import { Brand } from '../../../../../domain/admin/brands/entities/brand-entity';

export class BrandMapperPrisma {
  public static toDomain(data: BrandPrisma): Brand {
    return Brand.create(data);
  }

  public static toPrisma(data: Brand): BrandPrisma {
    return {
      brandId: data.brandId,
      name: data.name,
      imageUrl: data.imageUrl,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialPrisma(data: Partial<Brand>): Partial<BrandPrisma> {
    return {
      brandId: data.brandId,
      name: data.name,
      imageUrl: data.imageUrl,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
