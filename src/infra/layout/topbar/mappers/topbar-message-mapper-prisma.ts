import { TopBarMessage as TopBarMessagePrisma } from '@prisma/client';
import { TopBarMessage } from '../../../../domain/layout/topbar/entities/top-bar-message-entity';

export class TopBarMessageMapperPrisma {
  public static toDomain(data: TopBarMessagePrisma): TopBarMessage {
    return TopBarMessage.create(data);
  }

  public static toPrisma(data: TopBarMessage): TopBarMessagePrisma {
    return {
      topBarMessageId: data.topBarMessageId,
      message: data.message,
      link: data.link,
      position: data.position,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialPrisma(data: Partial<TopBarMessage>): Partial<TopBarMessagePrisma> {
    return this.toPrisma(data as TopBarMessage);
  }
}
