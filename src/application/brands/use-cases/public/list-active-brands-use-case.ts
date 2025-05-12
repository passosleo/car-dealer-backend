import { IBrandRepository } from '../../../../domain/brands/repositories/brand-repository';
import { ListActiveBrandsRequestDTO } from '../../../../infra/brands/dtos/public/list-active-brands-request-dto';
import { BrandResponseDTO } from '../../../../infra/brands/dtos/shared/brand-response-dto';
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
