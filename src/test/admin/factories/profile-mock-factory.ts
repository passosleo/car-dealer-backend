import { faker } from '@faker-js/faker';
import { Paginated } from '../../../infra/shared/types/generic';
import { Profile } from '../../../domain/admin/profiles/entities/profile-entity';
import { RoleMockFactory } from './role-mock-factory';

export class ProfileMockFactory {
  public static createEntity(data: Partial<Profile> = {}): Profile {
    return Profile.create({
      profileId: faker.string.uuid(),
      name: faker.company.name(),
      roles: RoleMockFactory.createEntities(5),
      ...data,
    });
  }

  public static createEntities(amount = 10): Profile[] {
    return Array.from({ length: amount }, this.createEntity);
  }

  public static createPaginatedEntities(page = 1, limit = 10, total = 100): Paginated<Profile> {
    const items = this.createEntities(total);
    return {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
      items: items.slice((page - 1) * limit, page * limit),
    };
  }
}
