import { faker } from '@faker-js/faker';
import { Brand } from '../../../domain/admin/brands/entities/brand-entity';
import { Paginated } from '../../../infra/shared/types/generic';

export class BrandMockFactory {
  public static createEntity(data: Partial<Brand> = {}): Brand {
    return Brand.create({
      brandId: faker.string.uuid(),
      name: faker.company.name(),
      imageUrl: faker.image.url(),
      active: faker.datatype.boolean(),
      ...data,
    });
  }

  public static createEntities(amount = 10): Brand[] {
    return Array.from({ length: amount }, this.createEntity);
  }

  public static createPaginatedEntities(page = 1, limit = 10, total = 100): Paginated<Brand> {
    const items = this.createEntities(total);
    return {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
      items: items.slice((page - 1) * limit, page * limit),
    };
  }
}
