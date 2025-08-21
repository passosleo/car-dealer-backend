import { GetActiveVehicleByIdUseCase } from '../../../../application/vehicles/use-cases/public/get-active-vehicle-by-id-use-case';
import { VehicleRepositoryPrisma } from '../../repositories/vehicle-repository-prisma';

export class GetActiveVehicleByIdUseCaseFactory {
  public static create(): GetActiveVehicleByIdUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    return new GetActiveVehicleByIdUseCase(vehicleRepository);
  }
}
