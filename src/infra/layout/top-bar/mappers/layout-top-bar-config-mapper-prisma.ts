import {
  LayoutComponent as LayoutComponentPrisma,
  LayoutTopBarConfig as LayoutTopBarConfigPrisma,
  LayoutTopBarMessage as LayoutTopBarMessagePrisma,
} from '@prisma/client';
import { LayoutTopBarConfig } from '../../../../domain/layout/top-bar/entities/layout-top-bar-config-entity';
import { LayoutTopBarMessage } from '../../../../domain/layout/top-bar/entities/layout-top-bar-message-entity';
import { LayoutComponent } from '../../../../domain/layout/entities/layout-component-entity';

type LayoutTopBarConfigFromPrisma = LayoutTopBarConfigPrisma & {
  layoutComponent: LayoutComponentPrisma;
  layoutTopBarMessages: LayoutTopBarMessagePrisma[];
};

type LayoutTopBarConfigToPrisma = LayoutTopBarConfigPrisma & {
  layoutComponent: LayoutComponentPrisma;
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
      layoutComponent: LayoutComponent.create(layoutComponent),
      layoutTopBarMessages: layoutTopBarMessages.map(LayoutTopBarMessage.create),
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
      layoutComponent: data.layoutComponent,
      layoutTopBarMessages: data.layoutTopBarMessages,
    };
  }

  public static toPartialPrisma(data: Partial<LayoutTopBarConfig>): Partial<LayoutTopBarConfigToPrisma> {
    return this.toPrisma(data as LayoutTopBarConfig);
  }
}
