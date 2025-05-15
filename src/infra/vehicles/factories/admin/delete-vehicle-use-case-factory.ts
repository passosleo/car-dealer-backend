import { DeleteVehicleUseCase } from '../../../../application/vehicles/use-cases/admin/delete-vehicle-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { VehicleRepositoryPrisma } from '../../repositories/vehicle-repository-prisma';

export class DeleteVehicleUseCaseFactory {
  public static create(): DeleteVehicleUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new DeleteVehicleUseCase(vehicleRepository, imageStorage);
  }
}
