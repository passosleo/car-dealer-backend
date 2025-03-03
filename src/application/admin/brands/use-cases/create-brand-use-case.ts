import { Brand } from '../../../../domain/admin/brands/entities/brand-entity';
import { IBrandRepository } from '../../../../domain/admin/brands/repositories/brand-repository';
import { BrandResponseDTO } from '../../../../infra/admin/brands/http/dtos/brand-response-dto';
import { CreateBrandRequestDTO } from '../../../../infra/admin/brands/http/dtos/create-brand-request-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class CreateBrandUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  public async execute(data: CreateBrandRequestDTO): Promise<BrandResponseDTO> {
    const brandExists = await this.brandRepository.findByName(data.name);
    if (brandExists) {
      throw new HttpException(HttpStatus.CONFLICT, 'Brand already exists');
    }
    const brand = await this.brandRepository.create(Brand.create(data));
    return BrandResponseDTO.create(brand);
  }
}
