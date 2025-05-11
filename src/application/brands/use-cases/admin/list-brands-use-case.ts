import { IBrandRepository } from '../../../../domain/brands/repositories/brand-repository';
import { ListBrandsRequestDTO } from '../../../../infra/brands/dtos/admin/list-brands-request-dto';
import { BrandResponseDTO } from '../../../../infra/brands/dtos/shared/brand-response-dto';
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
