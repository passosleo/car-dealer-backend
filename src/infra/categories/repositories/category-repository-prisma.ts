import { Prisma } from '@prisma/client';
import { CategoryMapperPrisma } from '../mappers/category-mapper-prisma';
import { ICategoryRepository, ListCategoriesParams } from '../../../domain/categories/repositories/category-repository';
import { Category } from '../../../domain/categories/entities/category-entity';
import { prisma } from '../../shared/db';
import { Paginated } from '../../shared/types/generic';

export class CategoryRepositoryPrisma implements ICategoryRepository {
  public async create(data: Category): Promise<Category> {
    const createdCategory = await prisma.category.create({ data: CategoryMapperPrisma.toPrisma(data) });
    return CategoryMapperPrisma.toDomain(createdCategory);
  }

  public async update(id: string, data: Partial<Category>): Promise<Category> {
    const updatedCategory = await prisma.category.update({
      where: { categoryId: id },
      data: CategoryMapperPrisma.toPartialPrisma(data),
    });
    return CategoryMapperPrisma.toDomain(updatedCategory);
  }

  public async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { categoryId: id } });
  }

  public async findById(id: string): Promise<Category | null> {
    const brand = await prisma.category.findUnique({ where: { categoryId: id } });
    return brand ? CategoryMapperPrisma.toDomain(brand) : null;
  }

  public async findByName(name: string): Promise<Category | null> {
    const brand = await prisma.category.findUnique({ where: { name } });
    return brand ? CategoryMapperPrisma.toDomain(brand) : null;
  }

  public async list({
    page = 1,
    limit = 10,
    orderBy = 'asc',
    ...params
  }: ListCategoriesParams): Promise<Paginated<Category>> {
    const where: Prisma.CategoryWhereInput = {
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
      prisma.category.count({ where }),
      prisma.category.findMany({
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
      items: data.map(CategoryMapperPrisma.toDomain),
    };
  }
}
