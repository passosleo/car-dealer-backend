import { ListActiveVehiclesUseCase } from '../../../../application/vehicles/use-cases/public/list-active-vehicles-use-case';
import { VehicleRepositoryPrisma } from '../../repositories/vehicle-repository-prisma';

export class ListActiveVehiclesUseCaseFactory {
  public static create(): ListActiveVehiclesUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    return new ListActiveVehiclesUseCase(vehicleRepository);
  }
}
