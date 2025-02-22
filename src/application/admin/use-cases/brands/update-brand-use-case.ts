import { IBrandRepository } from '../../../../domain/admin/repositories/brand-repository';
import { BrandResponseDTO } from '../../../../infra/admin/http/dtos/brands/brand-response-dto';
import { UpdateBrandRequestDTO } from '../../../../infra/admin/http/dtos/brands/update-brand-request-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class UpdateBrandUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  public async execute(brandId: string, data: UpdateBrandRequestDTO): Promise<BrandResponseDTO> {
    const brandExists = await this.brandRepository.findById(brandId);
    if (!brandExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Brand not found');
    }
    const brandWithSameNameExists = await this.brandRepository.findByName(data.name);
    if (brandWithSameNameExists && brandWithSameNameExists.brandId !== brandId) {
      throw new HttpException(HttpStatus.CONFLICT, 'Brand with same name already exists');
    }
    const brand = await this.brandRepository.update(brandId, data);
    return BrandResponseDTO.create(brand);
  }
}
