import { faker } from '@faker-js/faker';
import { Seller } from '../../domain/sellers/entities/seller-entity';
import { Paginated } from '../../infra/shared/types/generic';

export class SellerMockFactory {
  public static createEntity(data: Partial<Seller> = {}): Seller {
    return Seller.create({
      sellerId: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      customMessage: faker.lorem.sentence(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      active: faker.datatype.boolean(),
      imageUrl: faker.image.url(),
      ...data,
    });
  }

  public static createEntities(amount = 10): Seller[] {
    return Array.from({ length: amount }, this.createEntity);
  }

  public static createPaginatedEntities(page = 1, limit = 10, total = 100): Paginated<Seller> {
    const items = this.createEntities(limit);
    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
