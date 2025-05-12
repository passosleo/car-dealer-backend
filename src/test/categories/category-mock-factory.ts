import { faker } from '@faker-js/faker';
import { Category } from '../../domain/categories/entities/category-entity';
import { Paginated } from '../../infra/shared/types/generic';

export class CategoryMockFactory {
  public static createEntity(data: Partial<Category> = {}): Category {
    return Category.create({
      categoryId: faker.string.uuid(),
      name: faker.company.name(),
      imageUrl: faker.image.url(),
      active: faker.datatype.boolean(),
      ...data,
    });
  }

  public static createEntities(amount = 10): Category[] {
    return Array.from({ length: amount }, this.createEntity);
  }

  public static createPaginatedEntities(page = 1, limit = 10, total = 100): Paginated<Category> {
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
