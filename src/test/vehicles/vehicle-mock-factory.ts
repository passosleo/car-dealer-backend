import { faker } from '@faker-js/faker';
import { Paginated } from '../../infra/shared/types/generic';
import { Vehicle } from '../../domain/vehicles/entities/vehicle-entity';
import { BrandMockFactory } from '../brands/brand-mock-factory';
import { CategoryMockFactory } from '../categories/category-mock-factory';

export class VehicleMockFactory {
  public static createEntity(data: Partial<Vehicle> = {}): Vehicle {
    return Vehicle.create({
      vehicleId: faker.string.uuid(),
      model: faker.vehicle.model(),
      year: faker.date.past().getFullYear(),
      plate: faker.vehicle.vrm(),
      description: faker.lorem.paragraph(),
      price: faker.number.float({ min: 1000, max: 100000 }),
      mileage: faker.number.int({ min: 0, max: 300000 }),
      color: faker.color.human(),
      transmission: faker.helpers.arrayElement(['manual', 'automatic']),
      fuelType: faker.helpers.arrayElement(['gasoline', 'diesel', 'electric']),
      doors: faker.number.int({ min: 2, max: 5 }),
      seats: faker.number.int({ min: 2, max: 7 }),
      horsepower: faker.number.int({ min: 50, max: 500 }),
      torque: faker.number.int({ min: 100, max: 500 }),
      driveTrain: faker.helpers.arrayElement(['FWD', 'RWD', 'AWD']),
      brand: BrandMockFactory.createEntity(),
      category: CategoryMockFactory.createEntity(),
      active: faker.datatype.boolean(),
      vehicleImages: Array.from({ length: 3 }, () => faker.image.url()),
      vehicleFeatures: Array.from({ length: 3 }, () => faker.lorem.word()),
      ...data,
    });
  }

  public static createEntities(amount = 10): Vehicle[] {
    return Array.from({ length: amount }, this.createEntity);
  }

  public static createPaginatedEntities(page = 1, limit = 10, total = 100): Paginated<Vehicle> {
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
