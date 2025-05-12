import { UpdateSellerUseCase } from '../../../../application/sellers/use-cases/admin/update-seller-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { SellerRepositoryPrisma } from '../../repositories/seller-repository-prisma';

export class UpdateSellerUseCaseFactory {
  public static create(): UpdateSellerUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new UpdateSellerUseCase(sellerRepository, imageStorage);
  }
}
