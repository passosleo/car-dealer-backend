import { CreateVehicleUseCase } from '../../../../application/admin/vehicles/use-cases/create-vehicle-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { BrandRepositoryPrisma } from '../../brands/data/repositories/brand-repository-prisma';
import { CategoryRepositoryPrisma } from '../../categories/data/repositories/category-repository-prisma';
import { VehicleRepositoryPrisma } from '../data/repositories/vehicle-repository-prisma';

export class CreateVehicleUseCaseFactory {
  public static create(): CreateVehicleUseCase {
    const vehicleRepository = new VehicleRepositoryPrisma();
    const categoryRepository = new CategoryRepositoryPrisma();
    const brandRepository = new BrandRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new CreateVehicleUseCase(vehicleRepository, categoryRepository, brandRepository, imageStorage);
  }
}
