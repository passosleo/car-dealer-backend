import { GetVehicleByIdUseCase } from '../../../../application/vehicles/use-cases/admin/get-vehicle-by-id-use-case';
import { VehicleRepositoryPrisma } from '../../repositories/vehicle-repository-prisma';

export class GetVehicleByIdUseCaseFactory {
  public static create(): GetVehicleByIdUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    return new GetVehicleByIdUseCase(vehicleRepository);
  }
}
