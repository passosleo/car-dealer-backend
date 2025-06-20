import { Prisma } from '@prisma/client';
import {
  ITopBarMessageRepository,
  ListTopBarMessageParams,
} from '../../../../domain/layout/topbar/repositories/topbar-message-repository';
import { TopBarMessage } from '../../../../domain/layout/topbar/entities/top-bar-message-entity';
import { prisma } from '../../../shared/db';
import { TopBarMessageMapperPrisma } from '../mappers/topbar-message-mapper-prisma';
import { Paginated } from '../../../shared/types/generic';

export class TopBarMessageRepositoryPrisma implements ITopBarMessageRepository {
  public async create(data: TopBarMessage): Promise<TopBarMessage> {
    const createdTopBarMessage = await prisma.topBarMessage.create({ data: TopBarMessageMapperPrisma.toPrisma(data) });
    return TopBarMessageMapperPrisma.toDomain(createdTopBarMessage);
  }

  public async createMany(data: TopBarMessage[]): Promise<TopBarMessage[]> {
    await prisma.topBarMessage.createMany({
      data: data.map(TopBarMessageMapperPrisma.toPrisma),
      skipDuplicates: true,
    });
    const createdTopBarMessages = await prisma.topBarMessage.findMany({
      where: { message: { in: data.map((msg) => msg.message) } },
    });
    return createdTopBarMessages.map(TopBarMessageMapperPrisma.toDomain);
  }

  public async update(id: string, data: Partial<TopBarMessage>): Promise<TopBarMessage> {
    const updatedTopBarMessage = await prisma.topBarMessage.update({
      where: { topBarMessageId: id },
      data: TopBarMessageMapperPrisma.toPartialPrisma(data),
    });
    return TopBarMessageMapperPrisma.toDomain(updatedTopBarMessage);
  }

  public async updateMany(data: Partial<TopBarMessage>[]): Promise<TopBarMessage[]> {
    const updatedTopBarMessages = await Promise.all(
      data.map(async (msg) => {
        const updated = await prisma.topBarMessage.update({
          where: { topBarMessageId: msg.topBarMessageId },
          data: TopBarMessageMapperPrisma.toPartialPrisma(msg),
        });
        return TopBarMessageMapperPrisma.toDomain(updated);
      }),
    );
    return updatedTopBarMessages;
  }

  public async delete(id: string): Promise<void> {
    await prisma.topBarMessage.delete({ where: { topBarMessageId: id } });
  }

  public async findById(id: string): Promise<TopBarMessage | null> {
    const brand = await prisma.topBarMessage.findUnique({ where: { topBarMessageId: id } });
    return brand ? TopBarMessageMapperPrisma.toDomain(brand) : null;
  }

  public async findByMessage(message: string): Promise<TopBarMessage | null> {
    const brand = await prisma.topBarMessage.findUnique({ where: { message } });
    return brand ? TopBarMessageMapperPrisma.toDomain(brand) : null;
  }

  public async findByMessages(messages: string[]): Promise<TopBarMessage[]> {
    const brands = await prisma.topBarMessage.findMany({ where: { message: { in: messages } } });
    return brands.map(TopBarMessageMapperPrisma.toDomain);
  }

  public async list({
    page = 1,
    limit = 10,
    orderBy = 'asc',
    ...params
  }: ListTopBarMessageParams): Promise<Paginated<TopBarMessage>> {
    const where: Prisma.TopBarMessageWhereInput = {
      message: { contains: params.search, mode: 'insensitive' },
      link: { contains: params.search, mode: 'insensitive' },
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
      prisma.topBarMessage.count({ where }),
      prisma.topBarMessage.findMany({
        where,
        orderBy: { position: orderBy },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      items: data.map(TopBarMessageMapperPrisma.toDomain),
    };
  }

  public async findAll(): Promise<TopBarMessage[]> {
    const topBarMessages = await prisma.topBarMessage.findMany();
    return topBarMessages.map(TopBarMessageMapperPrisma.toDomain);
  }
}
