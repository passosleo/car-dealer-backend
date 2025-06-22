import { Prisma } from '@prisma/client';
import {
  ILayoutTopBarConfigRepository,
  ListLayoutTopBarConfigParams,
} from '../../../../domain/layout/top-bar/repositories/layout-top-bar-config-repository';
import { LayoutTopBarConfig } from '../../../../domain/layout/top-bar/entities/layout-top-bar-config-entity';
import { LayoutTopBarConfigMapperPrisma } from '../mappers/layout-top-bar-config-mapper-prisma';
import { prisma } from '../../../shared/db';
import { Paginated } from '../../../shared/types/generic';

export class LayoutTopBarConfigRepositoryPrisma implements ILayoutTopBarConfigRepository {
  private readonly includeFields = {
    layoutComponent: true,
    layoutTopBarMessages: true,
  };

  public async create(data: LayoutTopBarConfig): Promise<LayoutTopBarConfig> {
    const { layoutTopBarMessages, ...prismaData } = LayoutTopBarConfigMapperPrisma.toPrisma(data);
    const createdLayoutTopBarConfig = await prisma.layoutTopBarConfig.create({
      data: {
        ...prismaData,
        layoutTopBarMessages: {
          create: layoutTopBarMessages,
        },
      },
      include: this.includeFields,
    });
    return LayoutTopBarConfigMapperPrisma.toDomain(createdLayoutTopBarConfig);
  }

  public async update(id: string, data: Partial<LayoutTopBarConfig>): Promise<LayoutTopBarConfig> {
    const { layoutTopBarMessages, ...prismaData } = LayoutTopBarConfigMapperPrisma.toPartialPrisma(data);

    const updatedLayoutTopBarConfig = await prisma.$transaction(async (tx) => {
      await tx.layoutTopBarMessage.deleteMany({
        where: { layoutTopBarConfigId: id },
      });

      const updated = await tx.layoutTopBarConfig.update({
        where: { layoutTopBarConfigId: id },
        data: {
          ...prismaData,
          layoutTopBarMessages: layoutTopBarMessages ? { create: layoutTopBarMessages } : undefined,
        },
        include: this.includeFields,
      });

      return updated;
    });

    return LayoutTopBarConfigMapperPrisma.toDomain(updatedLayoutTopBarConfig);
  }

  public async delete(id: string): Promise<void> {
    await prisma.layoutTopBarConfig.delete({ where: { layoutTopBarConfigId: id } });
  }

  public async findById(id: string): Promise<LayoutTopBarConfig | null> {
    const layoutTopBarConfig = await prisma.layoutTopBarConfig.findUnique({
      where: { layoutTopBarConfigId: id },
      include: this.includeFields,
    });
    return layoutTopBarConfig ? LayoutTopBarConfigMapperPrisma.toDomain(layoutTopBarConfig) : null;
  }

  public async findAll(): Promise<LayoutTopBarConfig[]> {
    const layoutTopBarConfigs = await prisma.layoutTopBarConfig.findMany({ include: this.includeFields });
    return layoutTopBarConfigs.map(LayoutTopBarConfigMapperPrisma.toDomain);
  }

  public async list({
    page = 1,
    limit = 10,
    orderBy = 'asc',
    ...params
  }: ListLayoutTopBarConfigParams): Promise<Paginated<LayoutTopBarConfig>> {
    const where: Prisma.LayoutTopBarConfigWhereInput = {
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
      prisma.layoutTopBarConfig.count({ where }),
      prisma.layoutTopBarConfig.findMany({
        where,
        orderBy: { active: orderBy },
        skip: (page - 1) * limit,
        take: limit,
        include: this.includeFields,
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      items: data.map(LayoutTopBarConfigMapperPrisma.toDomain),
    };
  }
}
