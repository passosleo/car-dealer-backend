import { Banner } from '../../../../domain/admin/entities/banner-entity';
import { IBannerRepository } from '../../../../domain/admin/repositories/banner-repository';
import { BannerResponseDTO } from '../../../../infra/admin/http/dtos/banners/banner-response-dto';
import { CreateBannerRequestDTO } from '../../../../infra/admin/http/dtos/banners/create-banner-request-dto';

export class CreateBannerUseCase {
  constructor(private readonly bannerRepository: IBannerRepository) {}

  public async execute(data: CreateBannerRequestDTO): Promise<BannerResponseDTO> {
    const banner = await this.bannerRepository.create(Banner.create(data));
    return BannerResponseDTO.create(banner);
  }
}
