import { Paginated } from '../../shared/types/generic';
import { prisma } from '../../shared/db';
import { BrandMapperPrisma } from '../mappers/brand-mapper-prisma';
import { Prisma } from '@prisma/client';
import { IBrandRepository, ListBrandsParams } from '../../../domain/brands/repositories/brand-repository';
import { Brand } from '../../../domain/brands/entities/brand-entity';

export class BrandRepositoryPrisma implements IBrandRepository {
  public async create(data: Brand): Promise<Brand> {
    const createdBrand = await prisma.brand.create({ data: BrandMapperPrisma.toPrisma(data) });
    return BrandMapperPrisma.toDomain(createdBrand);
  }

  public async update(id: string, data: Partial<Brand>): Promise<Brand> {
    const updatedBrand = await prisma.brand.update({
      where: { brandId: id },
      data: BrandMapperPrisma.toPartialPrisma(data),
    });
    return BrandMapperPrisma.toDomain(updatedBrand);
  }

  public async delete(id: string): Promise<void> {
    await prisma.brand.delete({ where: { brandId: id } });
  }

  public async findById(id: string): Promise<Brand | null> {
    const brand = await prisma.brand.findUnique({ where: { brandId: id } });
    return brand ? BrandMapperPrisma.toDomain(brand) : null;
  }

  public async findByName(name: string): Promise<Brand | null> {
    const brand = await prisma.brand.findUnique({ where: { name } });
    return brand ? BrandMapperPrisma.toDomain(brand) : null;
  }

  public async list({ page = 1, limit = 10, orderBy = 'asc', ...params }: ListBrandsParams): Promise<Paginated<Brand>> {
    const where: Prisma.BrandWhereInput = {
      name: { contains: params.search, mode: 'insensitive' },
      active: params.status === 'active' ? true : params.status === 'inactive' ? false : undefined,
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
      prisma.brand.count({ where }),
      prisma.brand.findMany({
        where,
        orderBy: { name: orderBy },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      items: data.map(BrandMapperPrisma.toDomain),
    };
  }
}
