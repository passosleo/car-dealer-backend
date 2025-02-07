import { User as UserEntity } from '@prisma/client';
import { User } from '../../../domain/entities/user-entity';

export class UserMapper {
  public static toDomain(entity: UserEntity): User {
    return User.create(entity);
  }

  public static toEntity(domain: User): UserEntity {
    return {
      userId: domain.userId,
      firstName: domain.firstName,
      lastName: domain.lastName,
      email: domain.email,
      password: domain.password,
      passwordChangedAt: domain.passwordChangedAt,
      createdAt: domain.createdAt,
      createdBy: domain.createdBy,
      updatedAt: domain.updatedAt,
      updatedBy: domain.updatedBy,
      active: domain.active,
    };
  }
}
