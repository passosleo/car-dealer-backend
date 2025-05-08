import { faker } from '@faker-js/faker';
import { Role } from '../../../domain/admin/roles/entities/role-entity';

export class RoleMockFactory {
  public static createEntity(data: Partial<Role> = {}): Role {
    return Role.create({
      roleId: faker.string.uuid(),
      name: faker.lorem.word(),
      label: faker.lorem.word(),
      description: faker.lorem.sentence(),
      ...data,
    });
  }

  public static createEntities(amount = 10): Role[] {
    return Array.from({ length: amount }, this.createEntity);
  }
}
