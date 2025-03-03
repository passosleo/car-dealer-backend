import { Banner } from '../../../../domain/admin/banners/entities/banner-entity';
import { IBannerRepository } from '../../../../domain/admin/banners/repositories/banner-repository';
import { BannerResponseDTO } from '../../../../infra/admin/banners/http/dtos/banner-response-dto';
import { CreateBannerRequestDTO } from '../../../../infra/admin/banners/http/dtos/create-banner-request-dto';

export class CreateBannerUseCase {
  constructor(private readonly bannerRepository: IBannerRepository) {}

  public async execute(data: CreateBannerRequestDTO): Promise<BannerResponseDTO> {
    const banner = await this.bannerRepository.create(Banner.create(data));
    return BannerResponseDTO.create(banner);
  }
}
