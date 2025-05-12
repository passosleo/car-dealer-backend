import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { CategoryRepositoryPrisma } from '../../../categories/repositories/category-repository-prisma';
import { VehicleRepositoryPrisma } from '../../repositories/vehicle-repository-prisma';
import { CreateVehicleUseCase } from '../../../../application/vehicles/use-cases/admin/create-vehicle-use-case';
import { BrandRepositoryPrisma } from '../../../brands/repositories/brand-repository-prisma';

export class CreateVehicleUseCaseFactory {
  public static create(): CreateVehicleUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    const categoryRepository = new CategoryRepositoryPrisma();
    const brandRepository = new BrandRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new CreateVehicleUseCase(vehicleRepository, categoryRepository, brandRepository, imageStorage);
  }
}
