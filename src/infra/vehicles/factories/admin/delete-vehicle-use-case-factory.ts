import { DeleteVehicleUseCase } from '../../../../application/vehicles/use-cases/admin/delete-vehicle-use-case';
import { VehicleRepositoryPrisma } from '../../repositories/vehicle-repository-prisma';

export class DeleteVehicleUseCaseFactory {
  public static create(): DeleteVehicleUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    return new DeleteVehicleUseCase(vehicleRepository);
  }
}
