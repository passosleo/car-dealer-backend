import {
  LayoutComponent as LayoutComponentPrisma,
  LayoutBannerConfig as LayoutBannerConfigPrisma,
  LayoutBannerPosition as LayoutBannerPositionPrisma,
} from '@prisma/client';
import { LayoutBannerConfig } from '../../../../domain/layout/banners/entities/layout-banner-config-entity';
import { LayoutComponentMapperPrisma } from '../../mappers/layout-component-mapper-prisma';
import { LayoutBannerPositionMapperPrisma } from './layout-banner-position-mapper-prisma';

type LayoutBannerConfigFromPrisma = LayoutBannerConfigPrisma & {
  layoutComponent: LayoutComponentPrisma;
  layoutBannerPositions: LayoutBannerPositionPrisma[];
};

type LayoutBannerConfigToPrisma = LayoutBannerConfigPrisma & {
  layoutBannerPositions: LayoutBannerPositionPrisma[];
};

export class LayoutBannerConfigMapperPrisma {
  public static toDomain({
    layoutBannerPositions,
    layoutComponent,
    ...data
  }: LayoutBannerConfigFromPrisma): LayoutBannerConfig {
    return LayoutBannerConfig.create({
      ...data,
      layoutComponent: LayoutComponentMapperPrisma.toDomain(layoutComponent),
      layoutBannerPositions: layoutBannerPositions.map(LayoutBannerPositionMapperPrisma.toDomain),
    });
  }

  public static toPrisma(data: LayoutBannerConfig): LayoutBannerConfigToPrisma {
    return {
      layoutBannerConfigId: data.layoutBannerConfigId,
      layoutComponentId: data.layoutComponent.layoutComponentId,
      maxItems: data.maxItems,
      loop: data.loop,
      delay: data.delay,
      direction: data.direction,
      jump: data.jump,
      hideOnMobile: data.hideOnMobile,
      hideOnDesktop: data.hideOnDesktop,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      layoutBannerPositions: data.layoutBannerPositions.map(LayoutBannerPositionMapperPrisma.toPrisma),
    };
  }

  public static toPartialPrisma(data: Partial<LayoutBannerConfig>): Partial<LayoutBannerConfigToPrisma> {
    return this.toPrisma(data as LayoutBannerConfig);
  }
}
