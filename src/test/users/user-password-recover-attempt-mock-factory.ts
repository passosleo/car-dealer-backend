import { faker } from '@faker-js/faker';
import { UserPasswordRecoverAttempt } from '../../../domain/admin/users/entities/user-password-recover-attempt-entity';

export class UserPasswordRecoverAttemptMockFactory {
  public static createEntity(data: Partial<UserPasswordRecoverAttempt> = {}): UserPasswordRecoverAttempt {
    return UserPasswordRecoverAttempt.create({
      attemptId: faker.string.uuid(),
      userId: faker.string.uuid(),
      attemptCount: faker.number.int({ min: 0, max: 10 }),
      lastAttemptAt: faker.date.past(),
      blockedUntil: faker.date.future(),
      ...data,
    });
  }

  public static createEntities(amount = 10): UserPasswordRecoverAttempt[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}
