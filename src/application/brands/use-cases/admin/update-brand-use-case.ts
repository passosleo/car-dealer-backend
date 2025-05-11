import { Brand } from '../../../../domain/brands/entities/brand-entity';
import { IBrandRepository } from '../../../../domain/brands/repositories/brand-repository';
import { UpdateBrandRequestDTO } from '../../../../infra/brands/dtos/admin/update-brand-request-dto';
import { BrandResponseDTO } from '../../../../infra/brands/dtos/shared/brand-response-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class UpdateBrandUseCase {
  constructor(
    private readonly brandRepository: IBrandRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute(brandId: string, { image, ...data }: UpdateBrandRequestDTO): Promise<BrandResponseDTO> {
    const brandExists = await this.brandRepository.findById(brandId);

    if (!brandExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Brand not found');
    }

    const brandWithSameNameExists = await this.brandRepository.findByName(data.name);

    if (brandWithSameNameExists && brandWithSameNameExists.brandId !== brandId) {
      throw new HttpException(HttpStatus.CONFLICT, 'Brand with same name already exists');
    }

    const imageUrl = await this.getImageUpdatePromise(image, brandExists.imageUrl);

    const updateBrandData: Partial<Brand> = {
      ...data,
      imageUrl,
    };

    const brand = await this.brandRepository.update(brandId, updateBrandData);

    return BrandResponseDTO.create(brand);
  }

  private async getImageUpdatePromise(newImage: string, currentImage: string) {
    if (StringHelper.isBase64Image(newImage)) {
      return this.imageStorage.updateImageBase64(currentImage, newImage);
    }
    return Promise.resolve(currentImage);
  }
}
