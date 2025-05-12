import { Banner } from '../../../domain/banners/entities/banner-entity';
import { IBannerRepository, ListBannersParams } from '../../../domain/banners/repositories/banner-repository';
import { prisma } from '../../shared/db';
import { Paginated } from '../../shared/types/generic';
import { BannerMapperPrisma } from '../mappers/banner-mapper-prisma';
import { Prisma } from '@prisma/client';

export class BannerRepositoryPrisma implements IBannerRepository {
  public async create(data: Banner): Promise<Banner> {
    const createdBanner = await prisma.banner.create({ data: BannerMapperPrisma.toPrisma(data) });
    return BannerMapperPrisma.toDomain(createdBanner);
  }

  public async update(id: string, data: Partial<Banner>): Promise<Banner> {
    const updatedBanner = await prisma.banner.update({
      where: { bannerId: id },
      data: BannerMapperPrisma.toPrisma(data),
    });
    return BannerMapperPrisma.toDomain(updatedBanner);
  }

  public async delete(id: string): Promise<void> {
    await prisma.banner.delete({ where: { bannerId: id } });
  }

  public async findById(id: string): Promise<Banner | null> {
    const banner = await prisma.banner.findUnique({ where: { bannerId: id } });
    return banner ? BannerMapperPrisma.toDomain(banner) : null;
  }

  public async list({
    page = 1,
    limit = 10,
    orderBy = 'asc',
    ...params
  }: ListBannersParams): Promise<Paginated<Banner>> {
    const where: Prisma.BannerWhereInput = {
      title: { contains: params.search, mode: 'insensitive' },
      active: params.status === 'active' ? true : params.status === 'inactive' ? false : undefined,
      startAt: {
        gte: params.startAtStart,
        lte: params.startAtEnd,
      },
      endAt: {
        gte: params.endAtStart,
        lte: params.endAtEnd,
      },
      createdAt: {
        gte: params.createdAtStart,
        lte: params.createdAtEnd,
      },
      updatedAt: {
        gte: params.updatedAtStart,
        lte: params.updatedAtEnd,
      },
    };

    const [total, data] = await Promise.all([
      prisma.banner.count({ where }),
      prisma.banner.findMany({
        where,
        orderBy: { title: orderBy },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      items: data.map(BannerMapperPrisma.toDomain),
    };
  }
}
