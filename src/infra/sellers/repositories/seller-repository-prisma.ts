import { Seller } from '../../../domain/sellers/entities/seller-entity';
import { ISellerRepository, ListSellersParams } from '../../../domain/sellers/repositories/seller-repository';
import { prisma } from '../../shared/db';
import { Paginated } from '../../shared/types/generic';
import { SellerMapperPrisma } from '../mappers/seller-mapper-prisma';
import { Prisma } from '@prisma/client';

export class SellerRepositoryPrisma implements ISellerRepository {
  public async create(data: Seller): Promise<Seller> {
    const createdSeller = await prisma.seller.create({ data: SellerMapperPrisma.toPrisma(data) });
    return SellerMapperPrisma.toDomain(createdSeller);
  }

  public async update(id: string, data: Partial<Seller>): Promise<Seller> {
    const updatedSeller = await prisma.seller.update({
      where: { sellerId: id },
      data: SellerMapperPrisma.toPrisma(data),
    });
    return SellerMapperPrisma.toDomain(updatedSeller);
  }

  public async delete(id: string): Promise<void> {
    await prisma.seller.delete({ where: { sellerId: id } });
  }

  public async findById(id: string): Promise<Seller | null> {
    const seller = await prisma.seller.findUnique({ where: { sellerId: id } });
    return seller ? SellerMapperPrisma.toDomain(seller) : null;
  }

  public async list({
    page = 1,
    limit = 10,
    orderBy = 'asc',
    ...params
  }: ListSellersParams): Promise<Paginated<Seller>> {
    const where: Prisma.SellerWhereInput = {
      ...(params.search
        ? {
            OR: [
              { firstName: { contains: params.search, mode: 'insensitive' } },
              { lastName: { contains: params.search, mode: 'insensitive' } },
              { email: { contains: params.search, mode: 'insensitive' } },
              { phone: { contains: params.search, mode: 'insensitive' } },
            ],
          }
        : {}),
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
      prisma.seller.count({ where }),
      prisma.seller.findMany({
        where,
        orderBy: { firstName: orderBy },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      items: data.map(SellerMapperPrisma.toDomain),
    };
  }
}
