import { Profile as ProfilePrisma } from '@prisma/client';
import { ProfileRoles as ProfileRolesPrisma } from '@prisma/client';
import { Role as RolePrisma } from '@prisma/client';
import { Profile } from '../../../../domain/admin/entities/profile-entity';

type ProfileFromPrisma = ProfilePrisma & {
  profileRoles: (ProfileRolesPrisma & {
    role: RolePrisma;
  })[];
};

type ProfileToPrisma = ProfilePrisma & {
  roles: RolePrisma[];
};

export class ProfileMapperPrisma {
  public static toDomain({ profileRoles, ...data }: ProfileFromPrisma): Profile {
    return Profile.create({
      ...data,
      roles: profileRoles.map((profileRole) => profileRole.role),
    });
  }

  public static toPrisma(data: Profile): ProfileToPrisma {
    return {
      profileId: data.profileId,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      roles: data.roles,
    };
  }

  public static toPartialPrisma(data: Partial<Profile>): Partial<ProfileToPrisma> {
    return {
      profileId: data.profileId,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      roles: data.roles,
    };
  }
}
