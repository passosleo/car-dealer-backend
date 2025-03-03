import { IBrandRepository } from '../../../../domain/admin/brands/repositories/brand-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class DeleteBrandUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  public async execute(brandId: string): Promise<void> {
    const brandExists = await this.brandRepository.findById(brandId);
    if (!brandExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Brand not found');
    }
    await this.brandRepository.delete(brandId);
  }
}
