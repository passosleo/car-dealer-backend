import { Profile as ProfilePrisma } from '@prisma/client';
import { ProfileRoles as ProfileRolesPrisma } from '@prisma/client';
import { Role as RolePrisma } from '@prisma/client';
import { Profile } from '../../../../domain/admin/entities/profile-entity';

type ProfilePrismaQuery = ProfilePrisma & {
  profileRoles: (ProfileRolesPrisma & {
    role: RolePrisma;
  })[];
};

type ProfilePrismaPersist = ProfilePrisma & {
  roles: RolePrisma[];
};

export class ProfileMapperPrisma {
  public static toDomain({ profileRoles, ...data }: ProfilePrismaQuery): Profile {
    return Profile.create({
      ...data,
      roles: profileRoles.map((profileRole) => profileRole.role),
    });
  }

  public static toPrisma(data: Profile): ProfilePrismaPersist {
    return {
      profileId: data.profileId,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      roles: data.roles,
    };
  }

  public static toPartialPrisma(data: Partial<Profile>): Partial<ProfilePrismaPersist> {
    return {
      profileId: data.profileId,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      roles: data.roles,
    };
  }
}
