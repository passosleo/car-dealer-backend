import { User as UserPrisma } from '@prisma/client';
import { Profile as ProfilePrisma } from '@prisma/client';
import { Role as RolePrisma } from '@prisma/client';
import { ProfileRoles as ProfileRolesPrisma } from '@prisma/client';
import { User } from '../../../../domain/admin/entities/user-entity';

type UserFromPrisma = UserPrisma & {
  profile: ProfilePrisma & {
    profileRoles: (ProfileRolesPrisma & {
      role: RolePrisma;
    })[];
  };
};

export class UserMapperPrisma {
  public static toDomain({ profile, ...data }: UserFromPrisma): User {
    return User.create({
      ...data,
      profile: {
        ...profile,
        roles: profile.profileRoles.map((profileRole) => profileRole.role),
      },
    });
  }

  public static toPrisma(data: User): UserPrisma {
    return {
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      passwordChangedAt: data.passwordChangedAt,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      active: data.active,
      profileId: data.profile.profileId,
    };
  }

  public static toPartialPrisma(domain: Partial<User>): Partial<UserPrisma> {
    return {
      userId: domain.userId,
      firstName: domain.firstName,
      lastName: domain.lastName,
      email: domain.email,
      password: domain.password,
      passwordChangedAt: domain.passwordChangedAt,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      active: domain.active,
      profileId: domain.profile ? domain.profile.profileId : undefined,
    };
  }
}
