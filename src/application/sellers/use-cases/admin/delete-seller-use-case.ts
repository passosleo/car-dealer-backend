import { ISellerRepository } from '../../../../domain/sellers/repositories/seller-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class DeleteSellerUseCase {
  constructor(
    private readonly sellerRepository: ISellerRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute(sellerId: string): Promise<void> {
    const sellerExists = await this.sellerRepository.findById(sellerId);

    if (!sellerExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Seller not found');
    }

    await Promise.all([this.sellerRepository.delete(sellerId), this.imageStorage.deleteImage(sellerExists.imageUrl)]);
  }
}
