import { UpdateSellerUseCase } from '../../../../application/admin/sellers/use-cases/update-seller-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { SellerRepositoryPrisma } from '../data/repositories/seller-repository-prisma';

export class UpdateSellerUseCaseFactory {
  public static create(): UpdateSellerUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new UpdateSellerUseCase(sellerRepository, imageStorage);
  }
}
