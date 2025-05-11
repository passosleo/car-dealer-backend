import { Brand } from '../../../../domain/brands/entities/brand-entity';
import { IBrandRepository } from '../../../../domain/brands/repositories/brand-repository';
import { CreateBrandRequestDTO } from '../../../../infra/brands/dtos/admin/create-brand-request-dto';
import { BrandResponseDTO } from '../../../../infra/brands/dtos/shared/brand-response-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class CreateBrandUseCase {
  constructor(
    private readonly brandRepository: IBrandRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute({ image, ...data }: CreateBrandRequestDTO): Promise<BrandResponseDTO> {
    const isImageValid = StringHelper.isBase64Image(image);

    if (!isImageValid) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The image must be in base64 format');
    }

    const brandExists = await this.brandRepository.findByName(data.name);

    if (brandExists) {
      throw new HttpException(HttpStatus.CONFLICT, 'Brand already exists');
    }

    const imageUrl = await this.imageStorage.uploadImageBase64(image);

    const newBrand = Brand.create({
      ...data,
      imageUrl,
    });

    const brand = await this.brandRepository.create(newBrand);

    return BrandResponseDTO.create(brand);
  }
}
