import { IBrandRepository } from '../../../../domain/brands/repositories/brand-repository';
import { BrandResponseDTO } from '../../../../infra/brands/dtos/shared/brand-response-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class GetBrandByIdUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  public async execute(brandId: string): Promise<BrandResponseDTO> {
    const brand = await this.brandRepository.findById(brandId);
    if (!brand) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Brand not found');
    }
    return BrandResponseDTO.create(brand);
  }
}
