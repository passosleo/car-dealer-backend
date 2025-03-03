import { IBannerRepository } from '../../../../domain/admin/banners/repositories/banner-repository';
import { BannerResponseDTO } from '../../../../infra/admin/banners/http/dtos/banner-response-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class GetBannerByIdUseCase {
  constructor(private readonly bannerRepository: IBannerRepository) {}

  public async execute(brandId: string): Promise<BannerResponseDTO> {
    const banner = await this.bannerRepository.findById(brandId);
    if (!banner) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Banner not found');
    }
    return BannerResponseDTO.create(banner);
  }
}
