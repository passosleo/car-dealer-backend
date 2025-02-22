import { IBrandRepository } from '../../../../domain/admin/repositories/brand-repository';
import { BrandResponseDTO } from '../../../../infra/admin/http/dtos/brands/brand-response-dto';
import { ListBrandsRequestDTO } from '../../../../infra/admin/http/dtos/brands/list-brands-request-dto';
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
