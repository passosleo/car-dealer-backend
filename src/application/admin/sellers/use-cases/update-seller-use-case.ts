import { Seller } from '../../../../domain/admin/sellers/entities/seller-entity';
import { ISellerRepository } from '../../../../domain/admin/sellers/repositories/seller-repository';
import { SellerResponseDTO } from '../../../../infra/admin/sellers/http/dtos/seller-response-dto';
import { UpdateSellerRequestDTO } from '../../../../infra/admin/sellers/http/dtos/update-seller-request-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class UpdateSellerUseCase {
  constructor(
    private readonly sellerRepository: ISellerRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute(sellerId: string, { image, ...data }: UpdateSellerRequestDTO): Promise<SellerResponseDTO> {
    const sellerExists = await this.sellerRepository.findById(sellerId);

    if (!sellerExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Seller not found');
    }

    const imageUrl = await this.getImageUpdatePromise(image, sellerExists.imageUrl);

    const updateSellerData: Partial<Seller> = {
      ...data,
      imageUrl,
    };

    const seller = await this.sellerRepository.update(sellerId, updateSellerData);

    return SellerResponseDTO.create(seller);
  }

  private async getImageUpdatePromise(newImage: string | null, currentImage: string | null) {
    if (newImage && StringHelper.isBase64Image(newImage)) {
      if (!currentImage) {
        return this.imageStorage.uploadImageBase64(newImage);
      }
      return this.imageStorage.updateImageBase64(currentImage, newImage);
    }
    return Promise.resolve(currentImage);
  }
}
