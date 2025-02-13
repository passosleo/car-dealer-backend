import { User } from '../../../../domain/admin/entities/user-entity';
import { IUserRepository, ListUsersParams } from '../../../../domain/admin/repositories/user-repository';
import { prisma } from '../../../shared/db';
import { Paginated } from '../../../shared/types/generic';
import { UserMapper } from '../mappers/user-mapper';

export class UserRepositoryPrisma implements IUserRepository {
  public async create(data: User): Promise<User> {
    const user = await prisma.user.create({ data });
    return UserMapper.toDomain(user);
  }

  public async update(id: string, data: Partial<User>): Promise<User> {
    const user = await prisma.user.update({
      where: { userId: id },
      data,
    });
    return UserMapper.toDomain(user);
  }

  public async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { userId: id } });
  }

  public async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { userId: id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }

  public async list({ page = 1, limit = 10 }: ListUsersParams): Promise<Paginated<User>> {
    const [total, data] = await prisma.$transaction([
      prisma.user.count(),
      prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      total,
      page,
      limit,
      data: data.map(UserMapper.toDomain),
    };
  }
}
