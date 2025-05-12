import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { CategoryRepositoryPrisma } from '../../../categories/repositories/category-repository-prisma';
import { VehicleRepositoryPrisma } from '../../repositories/vehicle-repository-prisma';
import { UpdateVehicleUseCase } from '../../../../application/vehicles/use-cases/admin/update-vehicle-use-case';
import { BrandRepositoryPrisma } from '../../../brands/repositories/brand-repository-prisma';

export class UpdateVehicleUseCaseFactory {
  public static create(): UpdateVehicleUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    const categoryRepository = new CategoryRepositoryPrisma();
    const brandRepository = new BrandRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new UpdateVehicleUseCase(vehicleRepository, categoryRepository, brandRepository, imageStorage);
  }
}
