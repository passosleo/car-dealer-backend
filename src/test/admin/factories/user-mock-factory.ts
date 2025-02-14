import { faker } from '@faker-js/faker';
import { User } from '../../../domain/admin/entities/user-entity';
import { Profile } from '../../../domain/admin/entities/profile-entity';
import { Role } from '../../../domain/admin/entities/role-entity';

export class UserMockFactory {
  public static createEntity(data: Partial<User> = {}): User {
    return User.create({
      userId: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      profile: Profile.create({
        profileId: faker.string.uuid(),
        name: faker.lorem.word(),
        roles: [
          Role.create({
            roleId: faker.string.uuid(),
            name: faker.lorem.word(),
            description: faker.lorem.sentence(),
            label: faker.lorem.word(),
          }),
        ],
      }),
      ...data,
    });
  }

  public static createEntities(amount = 10): User[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}
