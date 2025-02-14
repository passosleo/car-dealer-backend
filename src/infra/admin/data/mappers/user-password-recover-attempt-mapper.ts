import { UserPasswordRecoverAttempt as UserPasswordRecoverAttemptEntity } from '@prisma/client';
import { UserPasswordRecoverAttempt } from '../../../../domain/admin/entities/user-password-recover-attempt-entity';

export class UserPasswordRecoverAttemptMapper {
  public static toDomain(entity: UserPasswordRecoverAttemptEntity): UserPasswordRecoverAttempt {
    return UserPasswordRecoverAttempt.create(entity);
  }

  public static toEntity(domain: UserPasswordRecoverAttempt): UserPasswordRecoverAttemptEntity {
    return {
      attemptId: domain.attemptId,
      userId: domain.userId,
      attemptCount: domain.attemptCount,
      lastAttemptAt: domain.lastAttemptAt,
      blockedUntil: domain.blockedUntil,
      token: domain.token,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
