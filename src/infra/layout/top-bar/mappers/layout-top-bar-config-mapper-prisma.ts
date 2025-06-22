import {
  LayoutComponent as LayoutComponentPrisma,
  LayoutTopBarConfig as LayoutTopBarConfigPrisma,
  LayoutTopBarMessage as LayoutTopBarMessagePrisma,
} from '@prisma/client';
import { LayoutTopBarConfig } from '../../../../domain/layout/top-bar/entities/layout-top-bar-config-entity';
import { LayoutTopBarMessageMapperPrisma } from './layout-top-bar-message-mapper-prisma';
import { LayoutComponentMapperPrisma } from '../../components/mappers/layout-component-mapper-prisma';

type LayoutTopBarConfigFromPrisma = LayoutTopBarConfigPrisma & {
  layoutComponent: LayoutComponentPrisma;
  layoutTopBarMessages: LayoutTopBarMessagePrisma[];
};

type LayoutTopBarConfigToPrisma = LayoutTopBarConfigPrisma & {
  layoutTopBarMessages: LayoutTopBarMessagePrisma[];
};

export class LayoutTopBarConfigMapperPrisma {
  public static toDomain({
    layoutTopBarMessages,
    layoutComponent,
    ...data
  }: LayoutTopBarConfigFromPrisma): LayoutTopBarConfig {
    return LayoutTopBarConfig.create({
      ...data,
      layoutComponent: LayoutComponentMapperPrisma.toDomain(layoutComponent),
      layoutTopBarMessages: layoutTopBarMessages.map(LayoutTopBarMessageMapperPrisma.toDomain),
    });
  }

  public static toPrisma(data: LayoutTopBarConfig): LayoutTopBarConfigToPrisma {
    return {
      layoutTopBarConfigId: data.layoutTopBarConfigId,
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
      layoutTopBarMessages: data.layoutTopBarMessages.map(LayoutTopBarMessageMapperPrisma.toPrisma),
    };
  }

  public static toPartialPrisma(data: Partial<LayoutTopBarConfig>): Partial<LayoutTopBarConfigToPrisma> {
    return this.toPrisma(data as LayoutTopBarConfig);
  }
}
