import { Prisma } from '@prisma/client';

import { prisma } from '../../../shared/db';
import { Paginated } from '../../../shared/types/generic';
import {
  ILayoutBannerConfigRepository,
  ListLayoutBannerConfigParams,
} from '../../../../domain/layout/banners/repositories/layout-banner-config-repository';
import { LayoutBannerConfig } from '../../../../domain/layout/banners/entities/layout-banner-config-entity';
import { LayoutBannerConfigMapperPrisma } from '../mappers/layout-banner-config-mapper-prisma';

export class LayoutBannerConfigRepositoryPrisma implements ILayoutBannerConfigRepository {
  private readonly includeFields = {
    layoutComponent: true,
    layoutBannerPositions: true,
  };

  public async create(data: LayoutBannerConfig): Promise<LayoutBannerConfig> {
    const { layoutBannerPositions, ...prismaData } = LayoutBannerConfigMapperPrisma.toPrisma(data);
    const createdLayoutBannerConfig = await prisma.layoutBannerConfig.create({
      data: {
        ...prismaData,
        layoutBannerPositions: {
          create: layoutBannerPositions,
        },
      },
      include: this.includeFields,
    });
    return LayoutBannerConfigMapperPrisma.toDomain(createdLayoutBannerConfig);
  }

  public async update(id: string, data: Partial<LayoutBannerConfig>): Promise<LayoutBannerConfig> {
    const { layoutBannerPositions, ...prismaData } = LayoutBannerConfigMapperPrisma.toPartialPrisma(data);

    const updatedLayoutBannerConfig = await prisma.$transaction(async (tx) => {
      await tx.layoutBannerPosition.deleteMany({
        where: { layoutBannerConfigId: id },
      });

      const updated = await tx.layoutBannerConfig.update({
        where: { layoutBannerConfigId: id },
        data: {
          ...prismaData,
          layoutBannerPositions: layoutBannerPositions ? { create: layoutBannerPositions } : undefined,
        },
        include: this.includeFields,
      });

      return updated;
    });

    return LayoutBannerConfigMapperPrisma.toDomain(updatedLayoutBannerConfig);
  }

  public async delete(id: string): Promise<void> {
    await prisma.layoutBannerConfig.delete({ where: { layoutBannerConfigId: id } });
  }

  public async findById(id: string): Promise<LayoutBannerConfig | null> {
    const layoutBannerConfig = await prisma.layoutBannerConfig.findUnique({
      where: { layoutBannerConfigId: id },
      include: this.includeFields,
    });
    return layoutBannerConfig ? LayoutBannerConfigMapperPrisma.toDomain(layoutBannerConfig) : null;
  }

  public async findAll(): Promise<LayoutBannerConfig[]> {
    const layoutBannerConfigs = await prisma.layoutBannerConfig.findMany({ include: this.includeFields });
    return layoutBannerConfigs.map(LayoutBannerConfigMapperPrisma.toDomain);
  }

  public async list({
    page = 1,
    limit = 10,
    orderBy = 'asc',
    ...params
  }: ListLayoutBannerConfigParams): Promise<Paginated<LayoutBannerConfig>> {
    const where: Prisma.LayoutBannerConfigWhereInput = {
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
      prisma.layoutBannerConfig.count({ where }),
      prisma.layoutBannerConfig.findMany({
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
      items: data.map(LayoutBannerConfigMapperPrisma.toDomain),
    };
  }
}
