import { Seller } from '../../../../domain/sellers/entities/seller-entity';
import { ISellerRepository } from '../../../../domain/sellers/repositories/seller-repository';
import { CreateSellerRequestDTO } from '../../../../infra/sellers/dtos/admin/create-seller-request-dto';
import { SellerResponseDTO } from '../../../../infra/sellers/dtos/shared/seller-response-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class CreateSellerUseCase {
  constructor(
    private readonly sellerRepository: ISellerRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute({ image, ...data }: CreateSellerRequestDTO): Promise<SellerResponseDTO> {
    const newSeller = Seller.create(data);

    if (image) {
      const isImageValid = StringHelper.isBase64Image(image);

      if (!isImageValid) {
        throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The image must be in base64 format');
      }

      const imageUrl = await this.imageStorage.uploadImageBase64(image);
      newSeller.imageUrl = imageUrl;
    }

    const seller = await this.sellerRepository.create(newSeller);

    return SellerResponseDTO.create(seller);
  }
}
