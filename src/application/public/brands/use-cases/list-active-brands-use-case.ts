import { IBrandRepository } from '../../../../domain/admin/brands/repositories/brand-repository';
import { BrandResponseDTO } from '../../../../infra/admin/brands/http/dtos/brand-response-dto';
import { ListActiveBrandsRequestDTO } from '../../../../infra/public/brands/http/dtos/list-active-brands-request-dto';
import { Paginated } from '../../../../infra/shared/types/generic';

export class ListActiveBrandsUseCase {
  constructor(private readonly brandRepository: IBrandRepository) {}

  public async execute(data: ListActiveBrandsRequestDTO): Promise<Paginated<BrandResponseDTO>> {
    const brands = await this.brandRepository.list({
      ...data,
      status: 'active',
    });
    return {
      ...brands,
      items: brands.items.map(BrandResponseDTO.create),
    };
  }
}
