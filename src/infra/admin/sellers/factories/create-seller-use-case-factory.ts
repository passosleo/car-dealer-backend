import { CreateSellerUseCase } from '../../../../application/admin/sellers/use-cases/create-seller-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { SellerRepositoryPrisma } from '../data/repositories/seller-repository-prisma';

export class CreateSellerUseCaseFactory {
  public static create(): CreateSellerUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new CreateSellerUseCase(sellerRepository, imageStorage);
  }
}
