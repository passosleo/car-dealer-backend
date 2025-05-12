import { Category as CategoryPrisma } from '@prisma/client';
import { Category } from '../../../domain/categories/entities/category-entity';

export class CategoryMapperPrisma {
  public static toDomain(data: CategoryPrisma): Category {
    return Category.create(data);
  }

  public static toPrisma(data: Category): CategoryPrisma {
    return {
      categoryId: data.categoryId,
      name: data.name,
      imageUrl: data.imageUrl,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialPrisma(data: Partial<Category>): Partial<CategoryPrisma> {
    return {
      categoryId: data.categoryId,
      name: data.name,
      imageUrl: data.imageUrl,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
