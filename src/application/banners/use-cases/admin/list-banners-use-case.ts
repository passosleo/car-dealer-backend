import { IBannerRepository } from '../../../../domain/banners/repositories/banner-repository';
import { ListBannersRequestDTO } from '../../../../infra/banners/dtos/admin/list-banners-request-dto';
import { BannerResponseDTO } from '../../../../infra/banners/dtos/shared/banner-response-dto';
import { Paginated } from '../../../../infra/shared/types/generic';

export class ListBannersUseCase {
  constructor(private readonly bannerRepository: IBannerRepository) {}

  public async execute(data: ListBannersRequestDTO): Promise<Paginated<BannerResponseDTO>> {
    const banners = await this.bannerRepository.list(data);
    return {
      ...banners,
      items: banners.items.map(BannerResponseDTO.create),
    };
  }
}
