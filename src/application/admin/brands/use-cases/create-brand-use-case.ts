import { Brand } from '../../../../domain/admin/brands/entities/brand-entity';
import { IBrandRepository } from '../../../../domain/admin/brands/repositories/brand-repository';
import { BrandResponseDTO } from '../../../../infra/admin/brands/http/dtos/brand-response-dto';
import { CreateBrandRequestDTO } from '../../../../infra/admin/brands/http/dtos/create-brand-request-dto';
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
