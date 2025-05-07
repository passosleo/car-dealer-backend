import { IBrandRepository } from '../../../../domain/admin/brands/repositories/brand-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class DeleteBrandUseCase {
  constructor(
    private readonly brandRepository: IBrandRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute(brandId: string): Promise<void> {
    const brandExists = await this.brandRepository.findById(brandId);

    if (!brandExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Brand not found');
    }

    await Promise.all([this.brandRepository.delete(brandId), this.imageStorage.deleteImage(brandExists.imageUrl)]);
  }
}
