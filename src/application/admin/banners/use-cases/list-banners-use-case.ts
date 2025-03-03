import { IBannerRepository } from '../../../../domain/admin/banners/repositories/banner-repository';
import { BannerResponseDTO } from '../../../../infra/admin/banners/http/dtos/banner-response-dto';
import { ListBannersRequestDTO } from '../../../../infra/admin/banners/http/dtos/list-banners-request-dto';
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
