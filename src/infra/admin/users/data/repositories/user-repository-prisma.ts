import { User } from '../../../../../domain/admin/users/entities/user-entity';
import { IUserRepository, ListUsersParams } from '../../../../../domain/admin/users/repositories/user-repository';
import { prisma } from '../../../../shared/db';
import { Paginated } from '../../../../shared/types/generic';
import { UserMapperPrisma } from '../mappers/user-mapper-prisma';

export class UserRepositoryPrisma implements IUserRepository {
  private readonly includeFields = {
    profile: {
      include: {
        profileRoles: {
          include: {
            role: true,
          },
        },
      },
    },
  };

  public async create(data: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: UserMapperPrisma.toPrisma(data),
      include: this.includeFields,
    });
    return UserMapperPrisma.toDomain(createdUser);
  }

  public async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { userId: id },
      data: UserMapperPrisma.toPartialPrisma(data),
      include: this.includeFields,
    });
    return UserMapperPrisma.toDomain(updatedUser);
  }

  public async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { userId: id } });
  }

  public async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { userId: id },
      include: this.includeFields,
    });
    return user ? UserMapperPrisma.toDomain(user) : null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: this.includeFields,
    });
    return user ? UserMapperPrisma.toDomain(user) : null;
  }

  public async list({ page = 1, limit = 10, orderBy = 'asc', ...params }: ListUsersParams): Promise<Paginated<User>> {
    const [total, data] = await Promise.all([
      prisma.user.count(),
      prisma.user.findMany({
        where: {
          OR: [
            { firstName: { contains: params.search } },
            { lastName: { contains: params.search } },
            { email: { contains: params.search } },
          ],
        },
        orderBy: { firstName: orderBy },
        skip: (page - 1) * limit,
        take: limit,
        include: this.includeFields,
      }),
    ]);

    return {
      total,
      page,
      limit,
      items: data.map(UserMapperPrisma.toDomain),
    };
  }
}
