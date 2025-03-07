import { Paginated } from '../../../../shared/types/generic';
import { prisma } from '../../../../shared/db';
import { Seller } from '../../../../../domain/admin/sellers/entities/seller-entity';
import { SellerMapperPrisma } from '../mappers/seller-mapper-prisma';
import { Prisma } from '@prisma/client';
import {
  ISellerRepository,
  ListSellersParams,
} from '../../../../../domain/admin/sellers/repositories/seller-repository';

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
      OR: [
        { firstName: { contains: params.search, mode: 'insensitive' } },
        { lastName: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
        { phone: { contains: params.search, mode: 'insensitive' } },
      ],
      active: params.active,
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
      prisma.seller.count({
        where,
        orderBy: { firstName: orderBy },
      }),
      prisma.seller.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      total,
      page,
      limit,
      items: data.map(SellerMapperPrisma.toDomain),
    };
  }
}
