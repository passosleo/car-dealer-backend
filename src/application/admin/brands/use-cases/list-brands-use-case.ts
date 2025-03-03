import { IBrandRepository } from '../../../../domain/admin/brands/repositories/brand-repository';
import { BrandResponseDTO } from '../../../../infra/admin/brands/http/dtos/brand-response-dto';
import { ListBrandsRequestDTO } from '../../../../infra/admin/brands/http/dtos/list-brands-request-dto';
import { Paginated } from '../../../../infra/shared/types/generic';

export class ListBrandsUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  public async execute(data: ListBrandsRequestDTO): Promise<Paginated<BrandResponseDTO>> {
    const brands = await this.brandRepository.list(data);
    return {
      ...brands,
      items: brands.items.map(BrandResponseDTO.create),
    };
  }
}
