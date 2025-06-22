import { LayoutTopBarMessage as LayoutTopBarMessagePrisma } from '@prisma/client';
import { LayoutTopBarMessage } from '../../../../domain/layout/top-bar/entities/layout-top-bar-message-entity';

export class LayoutTopBarMessageMapperPrisma {
  public static toDomain(data: LayoutTopBarMessagePrisma): LayoutTopBarMessage {
    return LayoutTopBarMessage.create(data);
  }

  public static toPrisma(data: LayoutTopBarMessage): LayoutTopBarMessagePrisma {
    return {
      layoutTopBarMessageId: data.layoutTopBarMessageId,
      layoutTopBarConfigId: data.layoutTopBarConfigId,
      message: data.message,
      link: data.link,
      position: data.position,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialPrisma(data: Partial<LayoutTopBarMessage>): Partial<LayoutTopBarMessagePrisma> {
    return this.toPrisma(data as LayoutTopBarMessage);
  }
}
