import { ListVehiclesUseCase } from '../../../../application/admin/vehicles/use-cases/list-vehicles-use-case';
import { VehicleRepositoryPrisma } from '../../repositories/vehicle-repository-prisma';

export class ListVehiclesUseCaseFactory {
  public static create(): ListVehiclesUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    return new ListVehiclesUseCase(vehicleRepository);
  }
}
