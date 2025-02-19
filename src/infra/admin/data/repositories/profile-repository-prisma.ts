import { prisma } from '../../../shared/db';
import { Profile } from '../../../../domain/admin/entities/profile-entity';
import { ProfileMapperPrisma } from '../mappers/profile-mapper-prisma';
import { IProfileRepository, ListProfilesParams } from '../../../../domain/admin/repositories/profile-repository';
import { Paginated } from '../../../shared/types/generic';

export class ProfileRepositoryPrisma implements IProfileRepository {
  private readonly includeFields = {
    profileRoles: {
      include: {
        role: true,
      },
    },
  };

  public async create(data: Profile): Promise<Profile> {
    const { roles, ...prismaData } = ProfileMapperPrisma.toPrisma(data);
    const createdProfile = await prisma.profile.create({
      data: {
        ...prismaData,
        profileRoles: {
          create: roles.map((role) => ({
            roleId: role.roleId,
          })),
        },
      },
      include: this.includeFields,
    });
    return ProfileMapperPrisma.toDomain(createdProfile);
  }

  public async update(id: string, data: Partial<Profile>): Promise<Profile> {
    const { roles, ...prismaData } = ProfileMapperPrisma.toPartialPrisma(data);

    const currentAssociatedRoles = await prisma.profileRoles.findMany({
      where: { profileId: id },
      select: { roleId: true },
    });

    const currentRoleIds = currentAssociatedRoles.map((role) => role.roleId);
    const newRoleIds = roles?.map((role) => role.roleId) ?? [];

    const rolesToAdd = newRoleIds.filter((roleId) => !currentRoleIds.includes(roleId));
    const rolesToRemove = currentRoleIds.filter((roleId) => !newRoleIds.includes(roleId));

    const updatedProfile = await prisma.profile.update({
      where: { profileId: id },
      data: {
        ...prismaData,
        profileRoles: {
          deleteMany: rolesToRemove.length > 0 ? { profileId: id, roleId: { in: rolesToRemove } } : undefined,
          create: rolesToAdd.length > 0 ? rolesToAdd.map((roleId) => ({ roleId })) : undefined,
        },
      },
      include: this.includeFields,
    });

    return ProfileMapperPrisma.toDomain(updatedProfile);
  }

  public async delete(id: string): Promise<void> {
    await prisma.profile.delete({ where: { profileId: id } });
  }

  public async findById(id: string): Promise<Profile | null> {
    const profile = await prisma.profile.findUnique({ where: { profileId: id }, include: this.includeFields });
    return profile ? ProfileMapperPrisma.toDomain(profile) : null;
  }

  public async findByIds(ids: string[]): Promise<Profile[]> {
    const profile = await prisma.profile.findMany({ where: { profileId: { in: ids } }, include: this.includeFields });
    return profile.map(ProfileMapperPrisma.toDomain);
  }

  public async list({ page = 1, limit = 10, ...params }: ListProfilesParams): Promise<Paginated<Profile>> {
    const [total, data] = await Promise.all([
      prisma.profile.count(),
      prisma.profile.findMany({
        where: {
          name: { contains: params.name },
          createdAt: {
            gte: params.createdAtStart,
            lte: params.createdAtEnd,
          },
          updatedAt: {
            gte: params.updatedAtStart,
            lte: params.updatedAtEnd,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        include: this.includeFields,
      }),
    ]);

    return {
      total,
      page,
      limit,
      items: data.map(ProfileMapperPrisma.toDomain),
    };
  }
}
