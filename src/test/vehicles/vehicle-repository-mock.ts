import { Vehicle } from '../../domain/vehicles/entities/vehicle-entity';
import { IVehicleRepository, ListVehiclesParams } from '../../domain/vehicles/repositories/vehicle-repository';
import { Paginated } from '../../infra/shared/types/generic';

export const VehicleRepositoryMock: jest.Mocked<IVehicleRepository> = {
  create: jest.fn<Promise<Vehicle>, [Vehicle]>(),
  update: jest.fn<Promise<Vehicle>, [string, Partial<Vehicle>]>(),
  delete: jest.fn<Promise<void>, [string]>(),
  findById: jest.fn<Promise<Vehicle | null>, [string]>(),
  findByPlate: jest.fn<Promise<Vehicle | null>, [string]>(),
  list: jest.fn<Promise<Paginated<Vehicle>>, [ListVehiclesParams]>(),
};
