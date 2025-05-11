import { faker } from '@faker-js/faker';
import { User } from '../../../domain/admin/users/entities/user-entity';
import { Role } from '../../../domain/admin/roles/entities/role-entity';
import { Profile } from '../../../domain/admin/profiles/entities/profile-entity';

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
