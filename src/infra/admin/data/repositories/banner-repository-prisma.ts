import { Paginated } from './../../../shared/types/generic.d';
import { prisma } from '../../../shared/db';
import { Banner } from '../../../../domain/admin/entities/banner-entity';
import { BannerMapperPrisma } from '../mappers/banner-mapper-prisma';
import {
  IBannerRepository as IBannerRepository,
  ListBannersParams,
} from '../../../../domain/admin/repositories/banner-repository';
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
      title: { contains: params.search },
      active: params.active,
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
      prisma.banner.count({
        where,
        orderBy: { title: orderBy },
      }),
      prisma.banner.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      total,
      page,
      limit,
      items: data.map(BannerMapperPrisma.toDomain),
    };
  }
}
