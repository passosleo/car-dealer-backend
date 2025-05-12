import { Seller as SellerPrisma } from '@prisma/client';
import { Seller } from '../../../domain/sellers/entities/seller-entity';

export class SellerMapperPrisma {
  public static toDomain(data: SellerPrisma): Seller {
    return Seller.create(data);
  }

  public static toPrisma(data: Seller | Partial<Seller>): SellerPrisma {
    return {
      sellerId: data.sellerId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      imageUrl: data.imageUrl,
      customMessage: data.customMessage,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    } as SellerPrisma;
  }
}
