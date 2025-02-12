import { faker } from '@faker-js/faker';
import { User } from '../../../domain/admin/entities/user-entity';

export class UserMockFactory {
  public static createEntity(data: Partial<User> = {}): User {
    return User.create({
      userId: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdBy: faker.string.uuid(),
      ...data,
    });
  }

  public static createEntities(amount = 10): User[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}
