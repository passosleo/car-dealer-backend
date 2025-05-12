import { UserPasswordRecoverAttempt as UserPasswordRecoverAttemptEntity } from '@prisma/client';
import { UserPasswordRecoverAttempt } from '../../../domain/users/entities/user-password-recover-attempt-entity';

export class UserPasswordRecoverAttemptMapper {
  public static toDomain(data: UserPasswordRecoverAttemptEntity): UserPasswordRecoverAttempt {
    return UserPasswordRecoverAttempt.create(data);
  }

  public static toPrisma(data: UserPasswordRecoverAttempt): UserPasswordRecoverAttemptEntity {
    return {
      attemptId: data.attemptId,
      userId: data.userId,
      attemptCount: data.attemptCount,
      lastAttemptAt: data.lastAttemptAt,
      blockedUntil: data.blockedUntil,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialPrisma(data: Partial<UserPasswordRecoverAttempt>): Partial<UserPasswordRecoverAttemptEntity> {
    return {
      attemptId: data.attemptId,
      userId: data.userId,
      attemptCount: data.attemptCount,
      lastAttemptAt: data.lastAttemptAt,
      blockedUntil: data.blockedUntil,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
