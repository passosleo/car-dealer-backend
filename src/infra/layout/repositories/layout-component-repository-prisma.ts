import { Prisma } from '@prisma/client';
import { prisma } from '../../shared/db';
import { Paginated } from '../../shared/types/generic';
import { LayoutComponentMapperPrisma } from '../mappers/layout-component-mapper-prisma';
import {
  ILayoutComponentRepository,
  ListLayoutComponentParams,
} from '../../../domain/layout/repositories/layout-component-repository';
import { LayoutComponent } from '../../../domain/layout/entities/layout-component-entity';

export class LayoutComponentRepositoryPrisma implements ILayoutComponentRepository {
  public async create(data: LayoutComponent): Promise<LayoutComponent> {
    const createdLayoutComponent = await prisma.layoutComponent.create({
      data: LayoutComponentMapperPrisma.toPrisma(data),
    });
    return LayoutComponentMapperPrisma.toDomain(createdLayoutComponent);
  }

  public async update(id: string, data: Partial<LayoutComponent>): Promise<LayoutComponent> {
    const updatedLayoutComponent = await prisma.layoutComponent.update({
      where: { layoutComponentId: id },
      data: LayoutComponentMapperPrisma.toPartialPrisma(data),
    });
    return LayoutComponentMapperPrisma.toDomain(updatedLayoutComponent);
  }

  public async delete(id: string): Promise<void> {
    await prisma.layoutComponent.delete({ where: { layoutComponentId: id } });
  }

  public async findById(id: string): Promise<LayoutComponent | null> {
    const layoutComponent = await prisma.layoutComponent.findUnique({ where: { layoutComponentId: id } });
    return layoutComponent ? LayoutComponentMapperPrisma.toDomain(layoutComponent) : null;
  }

  public async findByName(name: string): Promise<LayoutComponent | null> {
    const layoutComponent = await prisma.layoutComponent.findUnique({ where: { name } });
    return layoutComponent ? LayoutComponentMapperPrisma.toDomain(layoutComponent) : null;
  }

  public async findByPage(page: string): Promise<LayoutComponent[]> {
    const layoutComponents = await prisma.layoutComponent.findMany({ where: { page } });
    return layoutComponents.map(LayoutComponentMapperPrisma.toDomain);
  }

  public async findAll(): Promise<LayoutComponent[]> {
    const layoutComponents = await prisma.layoutComponent.findMany();
    return layoutComponents.map(LayoutComponentMapperPrisma.toDomain);
  }

  public async findAllByPage(page: string): Promise<LayoutComponent[]> {
    const layoutComponents = await prisma.layoutComponent.findMany({ where: { page } });
    return layoutComponents.map(LayoutComponentMapperPrisma.toDomain);
  }

  public async list({
    page = 1,
    limit = 10,
    orderBy = 'asc',
    ...params
  }: ListLayoutComponentParams): Promise<Paginated<LayoutComponent>> {
    const where: Prisma.LayoutComponentWhereInput = {
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
      prisma.layoutComponent.count({ where }),
      prisma.layoutComponent.findMany({
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
      items: data.map(LayoutComponentMapperPrisma.toDomain),
    };
  }
}
