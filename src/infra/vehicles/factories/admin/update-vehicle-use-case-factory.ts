import { UpdateVehicleUseCase } from '../../../../application/admin/vehicles/use-cases/update-vehicle-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { BrandRepositoryPrisma } from '../../brands/data/repositories/brand-repository-prisma';
import { CategoryRepositoryPrisma } from '../../../categories/repositories/category-repository-prisma';
import { VehicleRepositoryPrisma } from '../../repositories/vehicle-repository-prisma';

export class UpdateVehicleUseCaseFactory {
  public static create(): UpdateVehicleUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    const categoryRepository = new CategoryRepositoryPrisma();
    const brandRepository = new BrandRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new UpdateVehicleUseCase(vehicleRepository, categoryRepository, brandRepository, imageStorage);
  }
}
