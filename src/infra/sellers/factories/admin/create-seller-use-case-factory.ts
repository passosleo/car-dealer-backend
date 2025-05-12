import { CreateSellerUseCase } from '../../../../application/sellers/use-cases/admin/create-seller-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { SellerRepositoryPrisma } from '../../repositories/seller-repository-prisma';

export class CreateSellerUseCaseFactory {
  public static create(): CreateSellerUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new CreateSellerUseCase(sellerRepository, imageStorage);
  }
}
