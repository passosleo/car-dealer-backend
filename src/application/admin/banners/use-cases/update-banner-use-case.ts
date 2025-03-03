import { IBannerRepository } from '../../../../domain/admin/banners/repositories/banner-repository';
import { BannerResponseDTO } from '../../../../infra/admin/banners/http/dtos/banner-response-dto';
import { UpdateBannerRequestDTO } from '../../../../infra/admin/banners/http/dtos/update-banner-request-dto';

import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class UpdateBannerUseCase {
  constructor(private readonly bannerRepository: IBannerRepository) {}

  public async execute(bannerId: string, data: UpdateBannerRequestDTO): Promise<BannerResponseDTO> {
    const bannerExists = await this.bannerRepository.findById(bannerId);
    if (!bannerExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Banner not found');
    }
    const banner = await this.bannerRepository.update(bannerId, data);
    return BannerResponseDTO.create(banner);
  }
}
