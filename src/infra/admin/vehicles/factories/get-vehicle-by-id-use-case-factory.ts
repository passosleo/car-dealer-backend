import { GetVehicleByIdUseCase } from '../../../../application/admin/vehicles/use-cases/get-vehicle-by-id-use-case';
import { VehicleRepositoryPrisma } from '../data/repositories/vehicle-repository-prisma';

export class GetVehicleByIdUseCaseFactory {
  public static create(): GetVehicleByIdUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    return new GetVehicleByIdUseCase(vehicleRepository);
  }
}
