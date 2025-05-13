import { DeleteSellerUseCase } from '../../../../application/sellers/use-cases/admin/delete-seller-use-case';
import { ImageStorageCloudinary } from '../../../shared/storages/image-storage-cloudinary';
import { SellerRepositoryPrisma } from '../../repositories/seller-repository-prisma';

export class DeleteSellerUseCaseFactory {
  public static create(): DeleteSellerUseCase {
    const sellerRepository = new SellerRepositoryPrisma();
    const imageStorage = new ImageStorageCloudinary();
    return new DeleteSellerUseCase(sellerRepository, imageStorage);
  }
}
