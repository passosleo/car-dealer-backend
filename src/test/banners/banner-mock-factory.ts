import { faker } from '@faker-js/faker';
import { Paginated } from '../../infra/shared/types/generic';
import { Banner } from '../../domain/banners/entities/banner-entity';

export class BannerMockFactory {
  public static createEntity(data: Partial<Banner> = {}): Banner {
    return Banner.create({
      bannerId: faker.string.uuid(),
      title: faker.lorem.sentence(),
      imageDesktopUrl: faker.image.url(),
      imageMobileUrl: faker.image.url(),
      startAt: faker.date.past(),
      endAt: faker.date.future(),
      active: faker.datatype.boolean(),
      ...data,
    });
  }

  public static createEntities(amount = 10): Banner[] {
    return Array.from({ length: amount }, this.createEntity);
  }

  public static createPaginatedEntities(page = 1, limit = 10, total = 100): Paginated<Banner> {
    const items = this.createEntities(limit);
    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
